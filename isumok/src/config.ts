/**
 * 예약·상담 신청 전송 설정
 *
 * 홈페이지에서 고객이 남긴 예약 신청을 구글 시트에 자동으로 쌓고 이메일 알림을
 * 받으려면, 구글 앱스 스크립트 웹앱 주소를 아래 FALLBACK_BOOKING_ENDPOINT 에
 * 붙여넣으세요. 설정 방법은 저장소의 BOOKING_SETUP.md 에 있습니다.
 *
 * Vercel 대시보드에서 환경 변수 VITE_BOOKING_ENDPOINT 를 넣어도 됩니다.
 * 환경 변수가 있으면 그 값이 우선합니다.
 *
 * 비워 두면 예약 내용이 고객 브라우저에만 저장되고 사장님께는 전달되지 않습니다.
 * 이 경우 고객에게 전화 예약을 안내하는 화면이 대신 표시됩니다.
 */
const FALLBACK_BOOKING_ENDPOINT = '';

// import.meta.env.VITE_* 는 빌드할 때 값으로 통째로 치환됩니다.
// 중간에 ?. 같은 것을 끼우면 치환이 안 되므로 이 형태를 유지하세요.
const fromEnv = String(import.meta.env.VITE_BOOKING_ENDPOINT ?? '').trim();

export const BOOKING_ENDPOINT: string = fromEnv || FALLBACK_BOOKING_ENDPOINT.trim();

export const IS_BOOKING_DELIVERY_ENABLED: boolean = BOOKING_ENDPOINT.length > 0;
