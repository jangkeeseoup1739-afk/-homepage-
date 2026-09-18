/**
 * 고연당 홈페이지 설정 — 이 파일만 고치면 페이지 내용이 바뀝니다.
 * 빈 문자열('')로 두면 해당 줄이나 버튼은 자동으로 숨습니다.
 */
window.GOYEONDANG = {
  /* ── 기본 ────────────────────────────────────────────────── */
  name: '고연당',
  nameEn: 'GOYEONDANG',
  tagline: '민화 공방 · 커피',

  heroTitle: '먹을 갈고,<br />커피를 내리는 자리',
  heroLead: '그림을 배우다 가다 한 잔 마시고,<br />커피를 마시러 와서 그림을 보는 곳.',
  description: '민화를 그리는 공방이자 커피를 내리는 찻자리. 서울 강동구 천호동 고연당입니다.',

  /* ── 위치 · 연락처 ───────────────────────────────────────── */
  address: '서울 강동구 천호옛12길 21',
  addressDetail: '1층 102호',
  phone: '',                 // TODO: 매장 번호를 넣으면 전화 버튼이 나타납니다
  hours: [                   // TODO: 실제 영업시간으로 바꿔 주세요
    {days: '화 – 토', time: '11:00 – 19:00'},
    {days: '일', time: '11:00 – 17:00'},
    {days: '월', time: '정기 휴무'},
  ],
  hoursNote: '클래스 일정에 따라 변동될 수 있어요. 방문 전 인스타그램 공지를 확인해 주세요.',
  parking: '인근 공영 주차장을 이용해 주세요.',

  /* ── 링크 ───────────────────────────────────────────────── */
  links: {
    naverPlace: 'https://naver.me/IMZY8C7p',
    instagramMinhwa: 'https://www.instagram.com/studio_goyeondang/',
    instagramCoffee: 'https://www.instagram.com/goyeondang_/',
    booking: '',             // 네이버 예약이나 문의 폼 주소가 생기면 넣어 주세요
  },
  instagramHandles: {
    minhwa: '@studio_goyeondang',
    coffee: '@goyeondang_',
  },

  /* ── 카카오톡 공유 ────────────────────────────────────────────
   * developers.kakao.com → 내 애플리케이션 → 앱 키 → JavaScript 키.
   * 플랫폼 → Web 에 배포 도메인도 등록해야 동작합니다.
   * 비어 있으면 공유 버튼은 링크 복사 / 기본 공유로 대체됩니다. */
  kakaoJsKey: '',

  /* ── 메인 진입 분기 카드 ─────────────────────────────────── */
  branches: [
    {
      eyebrow: '민화',
      title: '그리러 오셨나요',
      text: '하루에 한 점. 붓을 처음 잡아도 괜찮습니다.',
      cta: '민화 클래스 보기',
      href: '#class',
    },
    {
      eyebrow: '커피',
      title: '마시러 오셨나요',
      text: '그림이 걸린 자리에서 마시는 한 잔.',
      cta: '커피와 공간 보기',
      href: '#coffee',
    },
  ],

  /* ── 클래스 ─────────────────────────────────────────────── */
  classes: [
    {
      title: '원데이 클래스',
      duration: '약 2시간 30분',
      capacity: '1 – 4인',
      price: '문의',
      summary: '처음 붓을 잡는 분을 위한 수업. 모란도와 화조도 중 하나를 골라 그날 완성해 갑니다.',
      points: ['재료 일체 제공', '완성작 · 커피 한 잔 포함', '2인 이상 예약 가능'],
      featured: false,
    },
    {
      title: '정규반 (4주)',
      duration: '주 1회 · 3시간',
      capacity: '4인',
      price: '문의',
      summary: '분채와 아교부터 차근히. 밑그림에서 마무리까지 한 점을 제대로 완성하는 과정입니다.',
      points: ['소수 정예 4인', '개인 진도에 맞춘 지도', '작품 액자 제작 안내'],
      featured: true,
    },
    {
      title: '단체 · 출장 클래스',
      duration: '협의',
      capacity: '6인 이상',
      price: '문의',
      summary: '팀 워크숍, 기념일 모임, 기관 프로그램을 인원과 시간에 맞게 구성해 드립니다.',
      points: ['공방 · 출장 모두 가능', '소요 시간 조정 가능', '단체 사전 연락 필요'],
      featured: false,
    },
  ],

  /* ── 수업 진행 흐름 ─────────────────────────────────────── */
  steps: [
    {title: '밑그림 옮기기', text: '그릴 그림을 고르고 한지에 선을 옮깁니다.'},
    {title: '아교 · 바탕칠', text: '한지를 다듬고 바탕색을 올립니다.'},
    {title: '채색', text: '분채를 개어 얇게 여러 번 겹쳐 올립니다.'},
    {title: '마무리 · 액자', text: '선을 정리하고 액자에 넣어 가져갑니다.'},
  ],

  /* ── 커피 ───────────────────────────────────────────────── */
  coffeeLead: '수업이 없는 시간에는 그냥 카페입니다. 작품을 보면서 커피만 드시고 가셔도 됩니다.',
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
  coffeeNotes: [
    '수업 시간에는 자리가 비좁을 수 있어요.',
    '노트북 작업도 편하게 하실 수 있습니다.',
    '단체 방문은 미리 연락 주세요.',
  ],

  /* ── 갤러리 ───────────────────────────────────────────────────
   * public/goyeondang/images/gallery/ 폴더에 사진을 넣고 아래 파일명을 맞춰 주세요.
   * 파일이 없으면 자리표시자 카드가 대신 보입니다. */
  gallery: [
    {src: 'images/gallery/01.jpg', caption: '작업실 풍경'},
    {src: 'images/gallery/02.jpg', caption: '모란도 채색'},
    {src: 'images/gallery/03.jpg', caption: '분채와 붓'},
    {src: 'images/gallery/04.jpg', caption: '수강생 작품'},
    {src: 'images/gallery/05.jpg', caption: '오늘의 커피'},
    {src: 'images/gallery/06.jpg', caption: '창가 자리'},
  ],
};
