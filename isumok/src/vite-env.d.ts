/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * 예약 신청 내용을 받을 구글 앱스 스크립트 웹앱 주소.
   * Vercel 환경 변수로 넣으면 src/config.ts 의 기본값보다 우선합니다.
   */
  readonly VITE_BOOKING_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
