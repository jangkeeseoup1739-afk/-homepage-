// 네이버에 한 번 로그인해서 그 상태를 이 폴더에 저장합니다.
// 이후 글 올릴 때는 다시 로그인하지 않습니다.
//
// 반복 로그인은 네이버가 자동화를 탐지하는 가장 큰 단서입니다.
// 그래서 로그인은 사람이 직접 한 번만 하고, 세션을 재사용합니다.

import { chromium } from 'playwright';
import { PROFILE_DIR, launchArgs, log } from './lib.js';

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login';

async function main() {
  log('브라우저를 엽니다. 네이버 로그인 창이 뜨면 직접 로그인해 주세요.');
  log('(아이디·비밀번호는 이 프로그램이 저장하지 않습니다)');

  const ctx = await chromium.launchPersistentContext(PROFILE_DIR, {
    headless: false,
    ...launchArgs(),
  });

  const page = ctx.pages()[0] ?? (await ctx.newPage());
  await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded' });

  log('');
  log('로그인이 끝날 때까지 기다립니다. 최대 5분.');
  log('2단계 인증이나 기기 등록이 나오면 그것도 끝까지 진행해 주세요.');
  log('');

  const deadline = Date.now() + 5 * 60 * 1000;
  let ok = false;

  while (Date.now() < deadline) {
    await page.waitForTimeout(2000);

    const url = page.url();
    // 로그인에 성공하면 nid.naver.com 을 벗어납니다.
    if (!url.includes('nid.naver.com')) {
      // 실제로 로그인 쿠키가 생겼는지 확인
      const cookies = await ctx.cookies('https://www.naver.com');
      if (cookies.some((c) => c.name === 'NID_AUT' || c.name === 'NID_SES')) {
        ok = true;
        break;
      }
    }
  }

  if (!ok) {
    log('');
    log('✗ 로그인을 확인하지 못했습니다.');
    log('  창을 닫고 다시 실행해 주세요.');
    await ctx.close();
    process.exit(1);
  }

  log('');
  log('✓ 로그인 완료. 로그인 상태를 저장했습니다.');
  log('  이제 "3-글올리기" 를 실행하시면 됩니다.');
  log('');
  log('  이 상태는 보통 몇 주간 유지됩니다.');
  log('  나중에 "로그인이 필요합니다" 오류가 나면 이 파일을 다시 실행하세요.');

  await page.waitForTimeout(2000);
  await ctx.close();
}

main().catch((err) => {
  log('✗ 오류: ' + err.message);
  process.exit(1);
});
