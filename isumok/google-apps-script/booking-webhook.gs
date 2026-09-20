/**
 * 이수목헤어스토리 — 예약·상담 신청 수신 스크립트
 *
 * 홈페이지의 1:1 예약 및 맞춤 상담 폼에서 보낸 내용을 구글 시트에 한 줄씩 쌓고,
 * 동시에 이메일 알림을 보냅니다.
 *
 * 설치 방법은 저장소의 BOOKING_SETUP.md 를 그대로 따라 하시면 됩니다.
 */

/** 신청 내용이 쌓일 시트(탭) 이름 */
var SHEET_NAME = '예약신청';

/**
 * 알림을 받을 이메일 주소. 여기에 원장님 주소를 넣으세요.
 *
 * 구글 계정이 아니어도 됩니다. 네이버·다음 메일 주소도 그대로 쓸 수 있습니다.
 *   예: var NOTIFY_EMAIL = 'name@naver.com';
 *
 * 여러 명이 받으려면 쉼표로 구분하세요.
 *   예: var NOTIFY_EMAIL = 'name@naver.com, shop@gmail.com';
 *
 * 비워 두면 이 스크립트를 만든 구글 계정의 주소로 발송됩니다.
 *
 * 네이버 메일로 받는 경우, 첫 메일은 스팸함으로 갈 수 있습니다.
 * 테스트 후 메일이 안 보이면 스팸함을 확인하고 '스팸 아님' 처리해 주세요.
 */
var NOTIFY_EMAIL = '';

var HEADERS = [
  '접수시각',
  '접수번호',
  '고객명',
  '연락처',
  '희망 방문일',
  '희망 시간',
  '희망 시술',
  '모발·두피 고민',
  '기타 문의사항',
  '개인정보 동의',
  '진행 상태',
];

function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) || '';
    var booking = JSON.parse(raw);

    if (!booking || !String(booking.customerName || '').trim() || !String(booking.phone || '').trim()) {
      return jsonOut_({ ok: false, error: 'name_and_phone_required' });
    }

    // 홈페이지는 응답을 읽지 못했을 때 한 번 더 보냅니다.
    // 같은 신청이 두 줄로 쌓이지 않도록 최근 줄에서 먼저 확인합니다.
    if (isRecentDuplicate_(booking)) {
      return jsonOut_({ ok: true, duplicate: true });
    }

    var concerns = booking.hairConcerns;
    var concernText = Object.prototype.toString.call(concerns) === '[object Array]'
      ? concerns.join('\n')
      : String(concerns || '');

    var row = [
      booking.createdAt || new Date().toLocaleString('ko-KR'),
      booking.id || '',
      String(booking.customerName).trim(),
      // 앞자리 0 이 사라지지 않도록 문자로 고정합니다.
      "'" + String(booking.phone).trim(),
      booking.preferredDate || '',
      booking.preferredTime || '',
      booking.serviceCategory || '',
      concernText,
      booking.notes || '',
      booking.privacyAgreed ? '동의' : '미동의',
      booking.status || '접수완료',
    ];

    getSheet_().appendRow(row);

    // 메일 발송 실패(Gmail 일일 한도 초과, 수신 거부 등)가 접수 자체를 실패로
    // 만들면 안 됩니다. 시트에는 이미 들어갔으므로 고객에게는 접수 완료가 맞습니다.
    var mailError = '';
    try {
      notify_(booking, concernText);
    } catch (mailErr) {
      mailError = String(mailErr);
      console.error('알림 메일 발송 실패: ' + mailError);
    }

    return jsonOut_(mailError ? { ok: true, mailError: mailError } : { ok: true });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

/** 브라우저에서 주소를 직접 열었을 때 동작 확인용 */
function doGet() {
  return jsonOut_({ ok: true, message: '이수목헤어스토리 예약 접수 스크립트가 정상 동작 중입니다.' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#F3EDDC');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 150); // 접수시각
    sheet.setColumnWidth(3, 90); // 고객명
    sheet.setColumnWidth(4, 130); // 연락처
    sheet.setColumnWidth(5, 110); // 희망 방문일
    sheet.setColumnWidth(7, 220); // 희망 시술
    sheet.setColumnWidth(8, 300); // 모발·두피 고민
    sheet.setColumnWidth(9, 300); // 기타 문의사항
  }

  return sheet;
}

/**
 * 최근 신청 줄 중에 접수번호와 연락처가 모두 같은 것이 있는지 확인합니다.
 * 재전송으로 생기는 중복만 걸러내려는 것이므로 최근 20줄만 봅니다.
 */
function isRecentDuplicate_(booking) {
  var sheet = getSheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  var count = Math.min(20, lastRow - 1);
  var startRow = lastRow - count + 1;
  // B열(접수번호) ~ D열(연락처)
  var values = sheet.getRange(startRow, 2, count, 3).getValues();

  var id = String(booking.id || '').trim();
  var phone = String(booking.phone || '').trim();
  if (!id) return false;

  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]).trim() === id && String(values[i][2]).trim() === phone) {
      return true;
    }
  }
  return false;
}

function notify_(booking, concernText) {
  var to = String(NOTIFY_EMAIL || '').trim() || Session.getEffectiveUser().getEmail();
  if (!to) return;

  var name = String(booking.customerName || '').trim();
  var phone = String(booking.phone || '').trim();
  var visitDate = String(booking.preferredDate || '').trim();
  var visitTime = String(booking.preferredTime || '').trim();

  var subject =
    '[이수목헤어스토리] 예약 신청 — ' + name + ' ' + phone + ' (' + visitDate + ' ' + visitTime + ')';

  var rows = [
    ['고객명', name],
    ['연락처', phone],
    ['희망 방문일', visitDate],
    ['희망 시간', visitTime],
    ['희망 시술', booking.serviceCategory || '-'],
    ['모발·두피 고민', concernText || '-'],
    ['기타 문의사항', booking.notes || '-'],
    ['개인정보 동의', booking.privacyAgreed ? '동의' : '미동의'],
    ['접수시각', booking.createdAt || ''],
    ['접수번호', booking.id || ''],
  ];

  var tableRows = rows
    .map(function (r) {
      return (
        '<tr>' +
        '<td style="padding:7px 14px 7px 0;color:#7A6E52;white-space:nowrap;vertical-align:top">' +
        escapeHtml_(r[0]) +
        '</td>' +
        '<td style="padding:7px 0;font-weight:600;color:#1B1B1F">' +
        escapeHtml_(String(r[1])).replace(/\n/g, '<br>') +
        '</td>' +
        '</tr>'
      );
    })
    .join('');

  var html =
    '<div style="font-family:-apple-system,BlinkMacSystemFont,\'Malgun Gothic\',sans-serif;font-size:15px;line-height:1.7;color:#1B1B1F">' +
    '<p style="margin:0 0 4px;font-size:13px;letter-spacing:.08em;color:#A08B4F">이수목헤어스토리</p>' +
    '<h2 style="margin:0 0 18px;font-size:20px">새 예약 신청이 접수되었습니다</h2>' +
    '<table style="border-collapse:collapse;margin-bottom:22px">' +
    tableRows +
    '</table>' +
    '<p style="margin:0"><a href="tel:' +
    encodeURIComponent(phone.replace(/-/g, '')) +
    '" style="display:inline-block;background:#B89225;color:#fff;text-decoration:none;font-weight:700;padding:11px 20px;border-radius:8px">' +
    escapeHtml_(phone) +
    ' 전화 걸기</a></p>' +
    '</div>';

  var plain = rows
    .map(function (r) {
      return r[0] + ': ' + r[1];
    })
    .join('\n');

  // 발신자 이름을 지정하면 받는 쪽에서 정체가 분명해져 스팸으로 분류될 확률이 줄어듭니다.
  MailApp.sendEmail({
    to: to,
    subject: subject,
    body: plain,
    htmlBody: html,
    name: '이수목헤어스토리 홈페이지',
  });
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function jsonOut_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
