// posts 폴더의 글을 네이버 블로그에 올립니다.
// 올린 글은 done 폴더로 옮기고, 발행기록.csv 에 남깁니다.

import { chromium } from 'playwright';
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, appendFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import {
  PROFILE_DIR, POSTS_DIR, DONE_DIR, LOG_FILE,
  loadConfig, launchArgs, log, sleep, humanType, firstVisible,
} from './lib.js';

const cfg = loadConfig();

/* ---------------- 글 파일 읽기 ---------------- */

function listPosts() {
  if (!existsSync(POSTS_DIR)) return [];
  return readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.txt'))
    .sort();
}

// 파일 형식:
//   # 제목
//   태그: 주안지식산업센터, 제이원플렉스
//
//   본문 첫 문단
//
//   본문 둘째 문단
function parsePost(path) {
  const raw = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
  const lines = raw.split('\n');

  let title = '';
  let tags = [];
  const bodyLines = [];

  for (const line of lines) {
    if (!title && line.startsWith('# ')) { title = line.slice(2).trim(); continue; }
    const tagMatch = line.match(/^태그\s*[:：]\s*(.+)$/);
    if (tagMatch && tags.length === 0) {
      tags = tagMatch[1].split(/[,，]/).map((t) => t.trim().replace(/^#/, '')).filter(Boolean);
      continue;
    }
    bodyLines.push(line);
  }

  if (!title) throw new Error(`${basename(path)} 에 제목이 없습니다. 첫 줄을 "# 제목" 형식으로 써 주세요.`);

  // 빈 줄로 나눈 문단 단위
  const paragraphs = bodyLines.join('\n').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (paragraphs.length === 0) throw new Error(`${basename(path)} 에 본문이 없습니다.`);

  return { title, tags, paragraphs };
}

/* ---------------- 에디터 조작 ---------------- */

// 네이버 에디터는 화면 구조가 자주 바뀝니다.
// 후보를 여러 개 두고 순서대로 시도합니다.
const SEL = {
  title: [
    '.se-documentTitle .se-text-paragraph',
    '.se-title-text .se-text-paragraph',
    '[data-placeholder="제목"]',
    '.se-section-documentTitle .se-text-paragraph',
  ],
  body: [
    '.se-component.se-text:not(.se-documentTitle) .se-text-paragraph',
    '.se-main-container .se-text-paragraph',
    '[data-placeholder*="본문"]',
  ],
  publishOpen: [
    'button:has-text("발행")',
    '.publish_btn__m9KHH',
    '[class*="publish_btn"]',
  ],
  publishConfirm: [
    '.confirm_btn__WEaBq',
    '[class*="confirm_btn"]',
    '.layer_btn_area button:has-text("발행")',
    'button[data-testid="seOnePublishBtn"]',
  ],
  tagInput: [
    '#tag-input',
    '.tag_input__rvUB5',
    'input[placeholder*="태그"]',
  ],
};

// 첫 진입 시 뜨는 안내·이어쓰기 팝업을 닫습니다.
async function dismissPopups(scope, page) {
  const closers = [
    '.se-help-panel-close-button',
    'button:has-text("취소")',
    '.se-popup-button-cancel',
    '[class*="popup"] button:has-text("닫기")',
  ];
  for (const sel of closers) {
    try {
      const loc = scope.locator(sel).first();
      if (await loc.isVisible({ timeout: 700 })) {
        await loc.click({ timeout: 2000 });
        await sleep(600);
      }
    } catch { /* 없으면 넘어감 */ }
  }
  // 브라우저 기본 confirm 창 대비
  page.on('dialog', (d) => d.accept().catch(() => {}));
}

async function writeOnePost({ page, post, file }) {
  const url = `https://blog.naver.com/${cfg.blogId}/postwrite`;
  log(`글쓰기 화면 열기 → ${url}`);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sleep(4000);

  // 에디터가 iframe 안에 있는 경우와 아닌 경우를 모두 처리
  const hasFrame = (await page.locator('#mainFrame').count()) > 0;
  const scope = hasFrame ? page.frameLocator('#mainFrame') : page;
  if (hasFrame) log('에디터가 iframe 안에 있습니다.');

  await dismissPopups(scope, page);

  /* 제목 */
  log(`제목 입력: ${post.title}`);
  const titleBox = await firstVisible(scope, SEL.title, 20000);
  await titleBox.click();
  await sleep(500);
  await humanType(titleBox, post.title);
  await sleep(800);

  /* 본문 */
  log(`본문 입력: ${post.paragraphs.length}개 문단`);
  const bodyBox = await firstVisible(scope, SEL.body, 15000);
  await bodyBox.click();
  await sleep(500);

  for (let i = 0; i < post.paragraphs.length; i++) {
    await page.keyboard.type(post.paragraphs[i], { delay: 18 });
    if (i < post.paragraphs.length - 1) {
      await page.keyboard.press('Enter');
      await page.keyboard.press('Enter');
    }
    await sleep(400 + Math.random() * 600);
  }

  await sleep(1500);

  /* 발행 창 열기 */
  log('발행 창 열기');
  const publishBtn = await firstVisible(scope, SEL.publishOpen, 15000);
  await publishBtn.click();
  await sleep(2500);

  /* 공개 설정 */
  try {
    const openness = scope.locator(`label:has-text("${cfg.openness}")`).first();
    if (await openness.isVisible({ timeout: 2000 })) {
      await openness.click();
      log(`공개 설정: ${cfg.openness}`);
      await sleep(600);
    }
  } catch { log('공개 설정 항목을 찾지 못해 기본값으로 둡니다.'); }

  /* 태그 */
  if (post.tags.length) {
    try {
      const tagBox = await firstVisible(scope, SEL.tagInput, 4000);
      await tagBox.click();
      for (const tag of post.tags) {
        await page.keyboard.type(tag, { delay: 40 });
        await page.keyboard.press('Enter');
        await sleep(350);
      }
      log(`태그 ${post.tags.length}개 입력`);
    } catch { log('태그 입력란을 찾지 못해 건너뜁니다.'); }
  }

  /* 발행 직전 대기 — 이 사이에 창을 닫으면 취소됩니다 */
  for (let s = cfg.countdownSeconds; s > 0; s--) {
    log(`${s}초 후 발행합니다. 취소하려면 지금 창을 닫으세요.`);
    await sleep(1000);
  }

  const confirmBtn = await firstVisible(scope, SEL.publishConfirm, 15000);
  await confirmBtn.click();
  log('발행 버튼 클릭');

  await sleep(8000);

  /* 정리 */
  if (!existsSync(DONE_DIR)) mkdirSync(DONE_DIR, { recursive: true });
  renameSync(file, join(DONE_DIR, basename(file)));

  if (!existsSync(LOG_FILE)) {
    appendFileSync(LOG_FILE, '﻿발행시각,제목,파일명\n', 'utf8');
  }
  const now = new Date().toLocaleString('ko-KR', { hour12: false });
  appendFileSync(LOG_FILE, `"${now}","${post.title.replace(/"/g, '""')}","${basename(file)}"\n`, 'utf8');

  log(`✓ 발행 완료: ${post.title}`);
}

/* ---------------- 실행 ---------------- */

async function main() {
  if (!existsSync(PROFILE_DIR)) {
    log('✗ 로그인 정보가 없습니다. 먼저 "2-로그인" 을 실행해 주세요.');
    process.exit(1);
  }

  const files = listPosts();
  if (files.length === 0) {
    log('posts 폴더에 올릴 글이 없습니다.');
    log(`  ${POSTS_DIR} 에 .md 파일을 넣어 주세요.`);
    return;
  }

  const targets = files.slice(0, cfg.postsPerRun);
  log(`대기 중인 글 ${files.length}개 중 ${targets.length}개를 올립니다.`);

  const ctx = await chromium.launchPersistentContext(PROFILE_DIR, {
    headless: cfg.headless,
    ...launchArgs(),
  });
  const page = ctx.pages()[0] ?? (await ctx.newPage());

  let done = 0;
  for (const name of targets) {
    const file = join(POSTS_DIR, name);
    try {
      const post = parsePost(file);
      log('');
      log(`── ${name} ──`);
      await writeOnePost({ page, post, file });
      done++;
    } catch (err) {
      log(`✗ ${name} 실패: ${err.message}`);
      const shot = join(PROFILE_DIR, '..', `오류화면-${Date.now()}.png`);
      try {
        await page.screenshot({ path: shot, fullPage: true });
        log(`  오류 화면을 저장했습니다: ${basename(shot)}`);
        log('  이 파일을 보내주시면 원인을 찾을 수 있습니다.');
      } catch { /* 스크린샷 실패는 무시 */ }
    }

    if (done < targets.length) {
      log(`다음 글까지 ${Math.round(cfg.delayBetweenPostsMs / 1000)}초 대기`);
      await sleep(cfg.delayBetweenPostsMs);
    }
  }

  log('');
  log(`끝. ${done}개 발행, 남은 글 ${listPosts().length}개.`);
  await sleep(3000);
  await ctx.close();
}

main().catch((err) => {
  log('✗ 오류: ' + err.message);
  process.exit(1);
});
