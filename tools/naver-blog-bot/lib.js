// 공통 설정과 도우미 함수

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = dirname(fileURLToPath(import.meta.url));
export const PROFILE_DIR = join(ROOT, '.naver-profile');
export const POSTS_DIR = join(ROOT, 'posts');
export const DONE_DIR = join(ROOT, 'done');
export const LOG_FILE = join(ROOT, '발행기록.csv');

export function loadConfig() {
  const raw = JSON.parse(readFileSync(join(ROOT, 'config.json'), 'utf8'));
  return {
    blogId: raw.blogId,
    openness: raw.openness ?? '전체공개',
    headless: raw.headless ?? false,
    countdownSeconds: raw.countdownSeconds ?? 5,
    postsPerRun: raw.postsPerRun ?? 1,
    delayBetweenPostsMs: raw.delayBetweenPostsMs ?? 180000,
  };
}

// 사람이 쓰는 브라우저와 최대한 비슷하게 맞춥니다.
// 자동화 표시(navigator.webdriver 등)를 줄이는 최소한의 설정입니다.
export function launchArgs() {
  return {
    channel: 'chrome',
    viewport: null,
    locale: 'ko-KR',
    timezoneId: 'Asia/Seoul',
    args: [
      '--disable-blink-features=AutomationControlled',
      '--start-maximized',
      '--lang=ko-KR',
    ],
    ignoreDefaultArgs: ['--enable-automation'],
  };
}

export function log(msg) {
  const t = new Date().toLocaleTimeString('ko-KR', { hour12: false });
  console.log(msg ? `[${t}] ${msg}` : '');
}

// 사람이 타자 치는 것처럼 글자 사이에 불규칙한 간격을 둡니다.
export async function humanType(locator, text, { min = 25, max = 90 } = {}) {
  for (const ch of text) {
    await locator.type(ch, { delay: 0 });
    await sleep(min + Math.random() * (max - min));
  }
}

export function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// 여러 후보 선택자를 순서대로 시도합니다.
// 네이버 에디터는 클래스명이 자주 바뀌어서, 하나가 막히면 다음을 씁니다.
export async function firstVisible(scope, selectors, timeout = 15000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    for (const sel of selectors) {
      const loc = scope.locator(sel).first();
      try {
        if (await loc.isVisible({ timeout: 300 })) return loc;
      } catch {
        /* 다음 후보로 */
      }
    }
    await sleep(400);
  }
  throw new Error(
    '화면에서 요소를 찾지 못했습니다.\n시도한 선택자:\n  ' + selectors.join('\n  ')
  );
}
