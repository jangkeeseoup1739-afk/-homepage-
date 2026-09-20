# 이수목헤어스토리

서울 송파구 새말로17길 천연 모발·두피 케어 전문 1인 프리미엄 헤어살롱 **이수목헤어스토리** 홈페이지.

열펌 · 링거펌 · 볼륨매직 시술 안내, 시술 전후 갤러리, 포트폴리오, 후기, 네이버 예약·상담 연결을 제공합니다.

## 기술 스택

- React 19 + TypeScript
- Vite 6 (정적 SPA 빌드)
- Tailwind CSS 4
- Motion, lucide-react

백엔드·데이터베이스는 사용하지 않습니다. 관리자 모달에서 편집한 갤러리·후기·예약 내역은
브라우저 `localStorage`에 저장되므로 기기별로 유지됩니다.

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:3000
```

## 빌드

```bash
npm run build    # dist/ 생성
npm run preview  # 빌드 결과 확인
npm run lint     # tsc --noEmit 타입 검사
```

## 배포 (Vercel)

프레임워크 프리셋 `Vite`, 빌드 명령 `npm run build`, 출력 디렉터리 `dist`로 자동 인식됩니다.
`vercel.json`의 rewrite가 모든 경로를 `index.html`로 보내 SPA 라우팅을 처리합니다.

환경 변수는 예약 신청 전송용 `VITE_BOOKING_ENDPOINT` 하나만 쓰며, 없어도 빌드·배포는 됩니다.

## 이미지 경로 규칙

런타임에 문자열 경로로 참조하는 이미지는 반드시 `public/` 아래에 두고 `/파일명.webp` 로 참조합니다.
`/src/assets/...` 경로는 개발 서버에서만 동작하고 프로덕션 빌드에서는 404가 되므로 사용하지 않습니다.
컴포넌트에서 `import` 하는 이미지는 `src/assets/` 에 두어도 됩니다 (Vite가 번들에 포함).
이미지는 모두 WebP로 저장합니다. 원본 JPEG는 용량이 10배 가까이 커집니다.

## 예약 신청 받기

고객이 남긴 예약 신청을 구글 시트로 받고 이메일 알림을 받으려면
[`BOOKING_SETUP.md`](BOOKING_SETUP.md) 의 순서를 따르세요.

웹앱 주소는 Vercel 환경 변수 `VITE_BOOKING_ENDPOINT` 또는 `src/config.ts` 의
`FALLBACK_BOOKING_ENDPOINT` 에 넣습니다. 주소를 넣기 전까지는 신청이 전달되지 않고,
고객에게 전화 예약을 안내하는 화면이 대신 표시됩니다.
