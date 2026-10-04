/**
 * 예약 · 문의 접수 설정
 * ---------------------------------------------------------------
 * 아래 BUILT_IN_GAS_URL 따옴표 안에 구글 Apps Script 웹앱 주소를 넣으면,
 * 모든 방문자의 신청이 구글 시트로 전송됩니다.
 *
 * Vercel에 올리신 경우 환경변수 VITE_GAS_URL 로 넣으셔도 됩니다.
 * (환경변수가 있으면 그쪽이 우선합니다. 코드를 고치지 않아도 됩니다.)
 *
 * 비워두면 폼이 "접수되었습니다"를 띄우지 않고 전화번호를 안내합니다.
 * 받지도 못한 신청을 접수됐다고 알리지 않기 위한 동작입니다.
 */
const BUILT_IN_GAS_URL = '';

const fromEnv =
  typeof import.meta !== 'undefined' && import.meta.env
    ? (import.meta.env.VITE_GAS_URL as string | undefined)
    : undefined;

export const GAS_URL: string = (fromEnv || BUILT_IN_GAS_URL || '').trim();

/** 접수 주소가 설정되어 있는지. false면 폼은 전화 안내만 한다. */
export const IS_INTAKE_READY: boolean = GAS_URL.length > 0;

export const SALES_PHONE = '010-8873-7258';

/**
 * 신청 1건을 접수 서버로 보낸다.
 *
 * 구글 Apps Script는 CORS 헤더를 주지 않아 no-cors로 보낼 수밖에 없고,
 * 그래서 서버가 실제로 저장했는지는 브라우저가 알 수 없다. 여기서 true는
 * "요청을 네트워크에 실어 보냈다"는 뜻이지 "시트에 기록됐다"는 뜻이 아니다.
 * 주소가 비어 있거나 네트워크 자체가 실패하면 false.
 */
export async function submitEnquiry(
  fields: Record<string, string>
): Promise<boolean> {
  if (!IS_INTAKE_READY) return false;
  try {
    await fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams(fields)
    });
    return true;
  } catch (err) {
    console.error('접수 전송 실패:', err);
    return false;
  }
}
