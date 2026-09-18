/**
 * 고연당 홈페이지 설정 — 이 파일만 고치면 페이지 내용이 바뀝니다.
 * (빌드 없이 그대로 배포되는 정적 파일입니다.)
 */
window.GOYEONDANG = {
  /* ── 기본 정보 ───────────────────────────────────────────────── */
  name: '고연당',
  nameEn: 'GOYEONDANG',
  tagline: '민화 공방 · 커피',
  description: '옛 그림을 오늘의 손끝으로. 햇살 드는 한옥 작업실에서 민화를 그리고, 한 잔의 커피로 쉬어 갑니다.',

  /* ── 연락처 · 위치 ───────────────────────────────────────────────
   * TODO: 실제 값으로 바꿔 주세요. 비워 두면(''), 해당 버튼/줄이 자동으로 숨겨집니다. */
  address: '',              // 예: '서울 종로구 ○○로 12'
  addressDetail: '',        // 예: '1층 고연당'
  phone: '',                // 예: '02-000-0000'
  hours: [
    {days: '화 – 토', time: '11:00 – 19:00'},
    {days: '일', time: '11:00 – 17:00'},
    {days: '월', time: '정기 휴무'},
  ],
  hoursNote: '클래스 일정에 따라 변동될 수 있어요. 방문 전 인스타그램 공지를 확인해 주세요.',

  /* ── 링크 ───────────────────────────────────────────────────── */
  links: {
    naverPlace: 'https://naver.me/5ECMh6uy',
    instagram: 'https://www.instagram.com/goyeondang_/',
    booking: '',            // 예약 폼/네이버 예약 주소가 있으면 넣어 주세요
  },

  /* ── 카카오톡 공유 ────────────────────────────────────────────────
   * https://developers.kakao.com → 내 애플리케이션 → 앱 키 → "JavaScript 키"
   * 그리고 [플랫폼 → Web]에 배포 도메인을 등록해야 동작합니다.
   * 키가 비어 있으면 공유 버튼은 '링크 복사 / 기본 공유'로 자동 대체됩니다. */
  kakaoJsKey: '',

  /* ── 클래스 ───────────────────────────────────────────────────── */
  classes: [
    {
      title: '원데이 클래스',
      duration: '약 2시간 30분',
      price: '문의',
      summary: '처음 붓을 잡는 분을 위한 수업. 모란·화조도 중 하나를 골라 그날 완성해 갑니다.',
      points: ['재료 일체 제공', '완성작 · 커피 한 잔 포함', '2인 이상 예약 가능'],
      featured: false,
    },
    {
      title: '정규반 (4주)',
      duration: '주 1회 · 3시간',
      price: '문의',
      summary: '분채와 아교부터 차근히. 밑그림, 채색, 마무리까지 한 점을 제대로 완성하는 과정입니다.',
      points: ['소수 정예 4인', '개인 진도에 맞춘 지도', '작품 액자 제작 안내'],
      featured: true,
    },
    {
      title: '단체 · 출장 클래스',
      duration: '협의',
      price: '문의',
      summary: '팀 워크숍, 기념일 모임, 기관 프로그램을 공간 사정에 맞게 구성해 드립니다.',
      points: ['최소 6인부터', '공방 · 출장 모두 가능', '소요 시간 조정 가능'],
      featured: false,
    },
  ],

  /* ── 메뉴 ─────────────────────────────────────────────────────
   * price를 ''로 두면 가격 없이 이름만 표시됩니다. */
  menu: [
    {
      group: '커피 · 차',
      items: [
        {name: '핸드드립 (싱글 오리진)', price: '', note: '그날의 원두로 내려 드려요'},
        {name: '아메리카노', price: ''},
        {name: '카페 라떼', price: ''},
        {name: '오미자차', price: ''},
        {name: '작설차', price: ''},
      ],
    },
    {
      group: '디저트',
      items: [
        {name: '약과', price: ''},
        {name: '단호박 설기', price: ''},
        {name: '계절 과일 정과', price: ''},
      ],
    },
  ],

  /* ── 갤러리 ───────────────────────────────────────────────────────
   * public/goyeondang/images/gallery/ 폴더에 사진을 넣고,
   * 아래 목록의 src 파일명을 맞춰 주세요 (jpg·png·webp 모두 가능).
   * 파일이 아직 없으면 자리표시자 카드가 대신 보입니다. */
  gallery: [
    {src: 'images/gallery/01.jpg', caption: '작업실 풍경'},
    {src: 'images/gallery/02.jpg', caption: '모란도 채색'},
    {src: 'images/gallery/03.jpg', caption: '분채와 붓'},
    {src: 'images/gallery/04.jpg', caption: '오늘의 커피'},
    {src: 'images/gallery/05.jpg', caption: '수강생 작품'},
    {src: 'images/gallery/06.jpg', caption: '창가 자리'},
  ],
};
