import { BookingRequest } from '../types';
import { BOOKING_ENDPOINT, IS_BOOKING_DELIVERY_ENABLED } from '../config';

export type BookingDeliveryStatus =
  /** 접수처에서 정상 응답을 받음 */
  | 'sent'
  /** 전송은 했지만 브라우저가 응답을 읽을 수 없어 확인 불가 */
  | 'sent-unconfirmed'
  /** 전송 주소가 설정되지 않음 (브라우저 저장만 동작) */
  | 'disabled'
  /** 전송 실패 */
  | 'failed';

const TIMEOUT_MS = 8000;

function withTimeout(): { signal: AbortSignal; done: () => void } {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  return { signal: controller.signal, done: () => clearTimeout(timer) };
}

/**
 * 예약·상담 신청 내용을 구글 앱스 스크립트 웹앱으로 보냅니다.
 *
 * Content-Type 을 text/plain 으로 두는 것은 의도한 것입니다. CORS 사전 요청
 * (preflight) 없이 보내기 위한 것으로, 앱스 스크립트는 본문을 그대로 받아
 * JSON.parse 합니다.
 */
export async function sendBooking(booking: BookingRequest): Promise<BookingDeliveryStatus> {
  if (!IS_BOOKING_DELIVERY_ENABLED) return 'disabled';

  const body = JSON.stringify(booking);
  const headers = { 'Content-Type': 'text/plain;charset=utf-8' };

  const first = withTimeout();
  try {
    const res = await fetch(BOOKING_ENDPOINT, {
      method: 'POST',
      headers,
      body,
      redirect: 'follow',
      signal: first.signal,
    });
    if (res.ok) {
      // 앱스 스크립트는 접수를 거절할 때도 HTTP 200 에 { ok: false } 를 담아 보냅니다.
      // HTTP 상태만 보면 거절당한 신청을 접수된 것으로 오인하게 됩니다.
      try {
        const data = await res.json();
        // 거절은 재전송해도 결과가 같으므로 바로 실패로 처리합니다.
        if (data && data.ok === false) return 'failed';
      } catch {
        // 본문을 읽지 못한 경우(CORS 등)에는 200 을 받은 것으로 충분합니다.
      }
      return 'sent';
    }
  } catch {
    // 아래 no-cors 재시도로 넘어갑니다.
  } finally {
    first.done();
  }

  // 응답을 읽지 못하는 상황(CORS 차단 등)에서도 접수 자체는 전달되도록 한 번 더 보냅니다.
  // 앱스 스크립트 쪽에서 접수번호로 중복을 걸러냅니다.
  const second = withTimeout();
  try {
    await fetch(BOOKING_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers,
      body,
      signal: second.signal,
    });
    return 'sent-unconfirmed';
  } catch {
    return 'failed';
  } finally {
    second.done();
  }
}
