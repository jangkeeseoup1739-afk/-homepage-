export interface FloorPlan {
  id: string;
  type: string;
  subName: string;
  units: number;
  exclusiveAreaM2: number;
  exclusiveAreaPy: number;
  supplyAreaM2: number;
  supplyAreaPy: number;
  contractAreaM2: number;
  contractAreaPy: number;
  ratio: string;
  bayType: string;
  image: string;
  description: string;
  options: string[];
}

export interface DevelopmentItem {
  id: string;
  year: string;
  title: string;
  status: 'done' | 'in_progress' | 'planned';
  statusLabel: string;
  highlights: string[];
  image: string;
  category: '교통' | '쇼핑' | '의료/업무';
}

export const PROPERTY_INFO = {
  name: '청라 더리브 티아모 Casa',
  enName: 'Cheongna The Liv Tiamo Casa',
  subtitle: '청라국제도시 최중심 지상 43층 초고층 랜드마크',
  builder: 'SGC 이테크건설',
  phone: '010-8873-7258',
  phoneDisplay: '010-8873-7258',
  smsNumber: '01088737258',
  location: '인천광역시 서구 청라동 157-11',
  subway: '서울지하철 7호선 커낼웨이역(가칭) 직결 도보 1분대',
  depositBenefit: '계약금 4,000만원 정액제',
  scale: '지하 3층 ~ 지상 43층, 3개 동 / 총 523실',
  parking: '652대 (세대당 여유로운 1.25대)',
  structure: '철근콘크리트구조',
  zoning: '경제자유구역, 일반상업지역, 지구단위계획구역, 성장관리권역',
  landArea: '10,685.00㎡ (3,232.21평)',
  buildingArea: '5,844.5888㎡ (1,767.99평)',
  grossFloorArea: '91,210.6607㎡ (27,591.22평)',
  buildingCoverage: '54.70%',
  floorAreaRatio: '599.99%',
  modelhouseInfo: '청라국제도시 모델하우스 리뉴얼 오픈 (100% 사전 예약제 운영)',
  naverReservationUrl: 'https://naver.me/GnRoDpAC',
};

export const IMAGES = {
  hero: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/hero.webp',
  aerial: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/aerial.webp',
  locationMap: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/locationmap.webp',
  locationSurrounding: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/location.webp',
  kitchen: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/kitchen.webp',
  interiorMain: '/images/cheongna_living_kitchen_1791105042669.jpg',
  interiorMaster: '/images/cheongna_master_bedroom_1791105051770.jpg',
  interiorKitchen: '/images/cheongna_dada_kitchen_1791105061871.jpg',
  interiorLiving: '/images/cheongna_living_room_1791105074747.jpg',
  skybridge: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/skybridge.webp',
  view: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/view.webp',
  common: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/common.webp',
  retail: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/retail.webp',
  siteplan: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/siteplan.webp',
  siteplan2: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/siteplan2.webp',
  unitmap: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/unitmap.webp',
  devStatus: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/dev-status.webp',
  devCostco: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/dev-costco.webp',
  devBridge: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/dev-bridge.webp',
  devHana: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/dev-hana.webp',
  devStarfield: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/dev-starfield.webp',
  devHospital: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/dev-hospital.webp',
  devLine7: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/dev-line7.webp',
  devExpressway: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/dev-expressway.webp',
  devCompare: 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/dev-compare.webp',
  plans: {
    '76': 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/plan-76.webp',
    '84A': 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/plan-84a.webp',
    '84B': 'https://raw.githubusercontent.com/jangkeeseoup1739-afk/-homepage-/6440da58ecdce05afa292473eecdc3be3b61b0ae/cheongna-tiamo-casa/images/plan-84b.webp'
  }
};

export const FLOOR_PLANS: FloorPlan[] = [
  {
    id: '76',
    type: '76 Type',
    subName: '판상형 채광 특화 3-Bay 설계',
    units: 208,
    exclusiveAreaM2: 76.6326,
    exclusiveAreaPy: 23.18,
    supplyAreaM2: 107.9174,
    supplyAreaPy: 32.64,
    contractAreaM2: 150.4997,
    contractAreaPy: 45.53,
    ratio: '39.80%',
    bayType: '3-Bay 설계 (전면 3개실 배치)',
    image: IMAGES.plans['76'],
    description: '3R 2B 구조로 실거주 선호도가 가장 높으며, 탁 트인 시야와 풍부한 일조권을 누리는 남향 위주 설계입니다.',
    options: [
      '3연동 슬라이딩 고급 현관 중문',
      '3구 하이브리드 쿡탑 (인덕션/하이라이트)',
      '독립형 프리미엄 후드',
      '빌트인 전기복합오븐',
      '비스포크 냉장고 · 냉동고 (1Door 오토스위치형)',
      '비스포크 그랑데 세탁기 · 건조기 세트',
      '이탈리아 하이엔드 Dada 주방가구 · 주방벽 · 세라믹 상판',
      '이탈리아 명품 GESSI 주방수전',
      '네덜란드 REGINOX 프리미엄 싱크볼',
      '공기청정형 고성능 전열교환기 환기시스템',
      '팬코일 유니트(FCU) 천장형 냉난방기',
      '실3 고급 붙박이장',
      '욕실 일체형 스마트 비데'
    ]
  },
  {
    id: '84A',
    type: '84A Type',
    subName: '선호도 1위 4-Bay 판상형 맞통풍 설계',
    units: 208,
    exclusiveAreaM2: 84.9878,
    exclusiveAreaPy: 25.71,
    supplyAreaM2: 119.3696,
    supplyAreaPy: 36.11,
    contractAreaM2: 166.5946,
    contractAreaPy: 50.40,
    ratio: '39.80%',
    bayType: '4-Bay 설계 (거실 및 침실 3개 전면 배치)',
    image: IMAGES.plans['84A'],
    description: '일반 아파트 33평형과 동일한 체감 공간감과 환기성을 선사하는 4-Bay 맞통풍 특화 평면입니다.',
    options: [
      '3연동 슬라이딩 고급 현관 중문',
      '3구 하이브리드 쿡탑',
      '독립형 프리미엄 후드',
      '빌트인 전기복합오븐',
      '비스포크 냉장고 · 냉동고 (1Door 오토스위치형)',
      '비스포크 그랑데 세탁기 · 건조기 세트',
      '이탈리아 하이엔드 Dada 주방가구 · 주방벽 · 세라믹 상판',
      '이탈리아 명품 GESSI 주방수전',
      '네덜란드 REGINOX 프리미엄 싱크볼',
      '공기청정형 고성능 전열교환기 환기시스템',
      '팬코일 유니트(FCU) 천장형 냉난방기',
      '실3 고급 붙박이장',
      '욕실 일체형 스마트 비데'
    ]
  },
  {
    id: '84B',
    type: '84B Type',
    subName: '양면 개방 2면 파노라마 더블조망권 설계',
    units: 104,
    exclusiveAreaM2: 84.9843,
    exclusiveAreaPy: 25.71,
    supplyAreaM2: 119.6914,
    supplyAreaPy: 36.21,
    contractAreaM2: 166.9145,
    contractAreaPy: 50.50,
    ratio: '19.90%',
    bayType: '더블조망권 특화 설계 (2면 개방형 와이드 거실)',
    image: IMAGES.plans['84B'],
    description: '거실 양면으로 펼쳐지는 파노라마 뷰로 커낼웨이와 도심 야경을 24시간 감상할 수 있는 감각적인 설계입니다.',
    options: [
      '3연동 슬라이딩 고급 현관 중문',
      '3구 하이브리드 쿡탑',
      '독립형 프리미엄 후드',
      '빌트인 전기복합오븐',
      '비스포크 냉장고 · 냉동고 (1Door 오토스위치형)',
      '비스포크 그랑데 세탁기 · 건조기 세트',
      '이탈리아 하이엔드 Dada 주방가구 · 주방벽 · 세라믹 상판',
      '이탈리아 명품 GESSI 주방수전',
      '네덜란드 REGINOX 프리미엄 싱크볼',
      '웰컴월 및 일부 벽 판넬 (디자인 PVC · 간접조명 특화)',
      '공기청정형 고성능 전열교환기 환기시스템',
      '팬코일 유니트(FCU) 천장형 냉난방기',
      '실3 고급 붙박이장',
      '욕실 일체형 스마트 비데'
    ]
  },
  {
    id: '211',
    type: '211 Type',
    subName: '지상 43층 최상층 펜트하우스 (희소 3세대)',
    units: 3,
    exclusiveAreaM2: 211.70,
    exclusiveAreaPy: 64.04,
    supplyAreaM2: 297.80,
    supplyAreaPy: 90.08,
    contractAreaM2: 414.43,
    contractAreaPy: 125.37,
    ratio: '0.60%',
    bayType: '청라 최상층 스카이 펜트하우스',
    image: IMAGES.plans['84A'], // placeholder fallback
    description: '청라 상공 43층에서 누리는 최고급 펜트하우스. 단 3세대만을 위한 프라이빗 테라스 및 하이엔드 설계가 적용됩니다.',
    options: [
      '최상층 스카이 프라이빗 테라스',
      '최고급 대리석 및 수입 마감재 풀옵션',
      '마스터존 독립 설계 & 와이드 드레스룸',
      '하이엔드 주방 및 홈바 시스템',
      '지하 1층 전용 주차 및 발렛 존 연계'
    ]
  }
];

export const CORE_BENEFITS = [
  {
    num: '01',
    title: '계약금 4천만 원 정액제',
    subtitle: '초기 자금 부담 완벽 해소',
    desc: '입주 때까지 소액으로 부담 없이 분양권을 선점할 수 있으며, 자금 운용의 안정성을 극대화했습니다.'
  },
  {
    num: '02',
    title: '선착순 계약자 특별 혜택',
    subtitle: '지금 문의 시 즉시 상담',
    desc: '선착순 로열층 계약자분들을 위한 한정 금융 지원 및 무상 확장 옵션 혜택이 주어집니다. (유선 문의)'
  },
  {
    num: '03',
    title: '원스톱 하이엔드 인프라',
    subtitle: '도보 1분 지하철부터 몰세권까지',
    desc: '7호선 커낼웨이역 직결, 롯데마트, 홈플러스, 24년 개장 코스트코, 스타필드 청라(예정)까지 완벽한 몰세권.'
  }
];

export const PREMIUM_EIGHT = [
  {
    tag: 'Premium 01',
    title: '청라의 자부심 스카이브릿지',
    desc: '단지의 품격을 극대화하는 지상 20층 스카이브릿지로 3개 동이 하늘에서 연결되는 유니크한 랜드마크 외관 설계'
  },
  {
    tag: 'Premium 02',
    title: '최고 43층 랜드마크 스카이라인',
    desc: '청라국제도시 중심을 상징하는 지상 43층 초고층 높이와 최상층 펜트하우스로 완성되는 독보적인 위상'
  },
  {
    tag: 'Premium 03',
    title: '7호선 커낼웨이역 초역세권',
    desc: '단지 지하 1층에서 직결되는 7호선 커낼웨이역(가칭 도보 1분대) 및 2호선 연장(예정), 청라IC, BRT/GRT 쾌속망'
  },
  {
    tag: 'Premium 04',
    title: '커낼웨이 & 심곡천 수변 조망',
    desc: '청라호수공원, 커낼웨이 수변공원, 심곡천을 모두 품은 3면 조망과 도심 힐링 에코라이프'
  },
  {
    tag: 'Premium 05',
    title: '하이엔드 이탈리아 주방가구 Dada',
    desc: '세계 최고의 이탈리아 럭셔리 몰테니앤씨(Molteni&C) 그룹의 Dada 주방가구가 전 세대에 기본 무상 적용'
  },
  {
    tag: 'Premium 06',
    title: '생활가전 프리미엄 풀옵션 무상',
    desc: 'FCU 에어컨, 비스포크 냉장/냉동고, 그랑데 세탁기/건조기, 전기오븐, 하이브리드쿡탑 등 가전 풀제공 (펜트 3세대 제외)'
  },
  {
    tag: 'Premium 07',
    title: '한 걸음에 누리는 원스톱 몰세권',
    desc: '단지 앞 홈플러스, 롯데마트, 개장 완료된 코스트코 청라점, 2028년 완공 예정인 스타필드 청라와 돔구장'
  },
  {
    tag: 'Premium 08',
    title: '청라의 폭발적인 미래가치',
    desc: '하나금융그룹 본사 이전(4천명 유입), 서울아산청라병원(800병상), 로봇랜드 등 고소득 배후 임대수요 풍부'
  }
];

export const DEVELOPMENTS: DevelopmentItem[] = [
  {
    id: 'costco',
    year: '2024.08',
    title: '코스트코 청라점',
    status: 'done',
    statusLabel: '오픈 완료 (운영 중)',
    category: '쇼핑',
    highlights: [
      '약 18,000평 대규모 부지에 완공, 100% 지상 야외 주차 가능',
      '일반 대형마트부터 창고형 쇼핑까지 청라 원스톱 몰세권 완성',
      '개장 이후 주말 및 평일 수도권 서북부 대규모 쇼핑 유동인구 집객'
    ],
    image: IMAGES.devCostco
  },
  {
    id: 'bridge',
    year: '2026.01',
    title: '청라하늘대교 (제3연륙교)',
    status: 'done',
    statusLabel: '개통 완료',
    category: '교통',
    highlights: [
      '4.68km 왕복 6차선 최첨단 해상교량으로 영종국제도시와 청라 직결',
      '인천국제공항까지 이동시간 기존 50분대에서 20분대로 획기적 단축',
      '보도·자전거도로 및 세계 최고 높이 해상 교량 전망대 조성'
    ],
    image: IMAGES.devBridge
  },
  {
    id: 'hana',
    year: '2026.05',
    title: '하나금융그룹 글로벌 HQ',
    status: 'done',
    statusLabel: '준공 완료',
    category: '의료/업무',
    highlights: [
      '지하 7층 ~ 지상 15층, 연면적 약 13만㎡ 규모의 핵심 글로벌 신사옥',
      '그룹 헤드쿼터 이전으로 하나은행 등 핵심 계열사 집적화',
      '약 4,000여 명의 고연봉 금융 핵심 전문인력 유입으로 풍부한 임대수요 확보'
    ],
    image: IMAGES.devHana
  },
  {
    id: 'starfield',
    year: '2028',
    title: '스타필드 청라 & 멀티 돔구장',
    status: 'in_progress',
    statusLabel: '공사 진행 중',
    category: '쇼핑',
    highlights: [
      '지하 3층 ~ 지상 9층, 세계 최초 복합쇼핑몰 + 2만 3천석 멀티 돔구장 결합',
      'SSG 프로야구 경기, K-POP 대형 콘서트, 호텔, 쇼핑이 한곳에 집약',
      '연간 약 2,500만 명의 수도권 및 글로벌 광역 유동인구 흡수 기대'
    ],
    image: IMAGES.devStarfield
  },
  {
    id: 'hospital',
    year: '2029 하반기',
    title: '서울아산청라병원',
    status: 'in_progress',
    statusLabel: '조성 추진 중',
    category: '의료/업무',
    highlights: [
      '총 800병상 규모, 국내 최고 권위 서울아산병원 중증질환 전문센터 건립',
      '의료복합타운 조성으로 글로벌 바이오 연구 및 첨단 의료 서비스 제공',
      '의사·간호사·연구인력 등 고소득 의료 전문직 5,000여 명 직주근접 수요'
    ],
    image: IMAGES.devHospital
  },
  {
    id: 'line7',
    year: '2030.10',
    title: '서울지하철 7호선 청라연장선',
    status: 'in_progress',
    statusLabel: '1단계 개통 예정',
    category: '교통',
    highlights: [
      '석남 ~ 청라국제도시역 총 15.7km 구간 신설 역사 8개소 추진',
      '단지 바로 앞 커낼웨이역(가칭)에서 강남/고속터미널 등 환승 없이 직결',
      '단지 지하 1층에서 역사 및 커낼웨이 무단차 연결로 우천 시에도 편리한 이동'
    ],
    image: IMAGES.devLine7
  },
  {
    id: 'expressway',
    year: '2033',
    title: '경인고속도로 지하화 사업',
    status: 'in_progress',
    statusLabel: '착공 및 추진 중',
    category: '교통',
    highlights: [
      '서인천IC ~ 신월IC 약 15.3km 구간 대심도 고속도로 지하화 (총 19.3km)',
      '만성 정체 해소로 청라에서 여의도까지 자차 30분대, 마포/강남 쾌속 연결',
      '상부 구간 친환경 녹지 축 및 공원화로 도시 주거환경 획기적 개선'
    ],
    image: IMAGES.devExpressway
  }
];

export const SMART_SYSTEMS = [
  { name: '무인 전자경비', desc: '외부인 출입 엄격 통제 및 24시간 보안' },
  { name: '홈 네트워크 시스템', desc: '스마트폰으로 조명/난방/환기 원격제어' },
  { name: '스마트 주차관제', desc: '차량 번호 인식 자동 입출차 관리' },
  { name: '지하주차장 비상벨', desc: '위급 상황 시 방재실 즉시 호출 연결' },
  { name: '원패스 시스템', desc: '원패스키 소지만으로 공동현관 자동 오픈' },
  { name: '스마트 주차유도', desc: '비어있는 주차면을 LED로 즉시 안내' },
  { name: '욕실 비상벨 스피커', desc: '욕실 내 낙상 등 응급 상황 알림' },
  { name: '통합제어 스위치', desc: '외출 시 일괄 소등, 가스 차단, 엘리베이터 호출' },
  { name: '디지털 원격검침', desc: '전기, 수도, 가스 사용량 비대면 자동 집계' },
  { name: '고화질 CCTV 감시', desc: '단지 사각지대 없는 고해상도 상시 녹화' },
  { name: '무인택배 시스템', desc: '안전한 택배 수령 및 알림 연동' },
  { name: '방송 공동수신 설비', desc: '지상파, 위성방송 등 고화질 TV 수신 환경' }
];

export const FLOOR_STRUCTURE = [
  { floor: '지하 1층', desc: '커낼웨이 수변로 및 7호선 커낼웨이역 직결 통로 / 근린생활시설' },
  { floor: '지상 1층', desc: '웰컴 테라스, 커낼스트리트 테라스형 근린생활시설' },
  { floor: '지상 2층', desc: '입주민 전용 시크릿 정원, 힐링 휴게정원 및 커뮤니티' },
  { floor: '지상 3층 ~ 43층', desc: '76 / 84A / 84B 명품 주거공간 (남향 위주 3면 개방형 배치)' },
  { floor: '지상 20층', desc: '3개 동을 잇는 스카이브릿지 (지진 대비 내진 안정성 강화 & 비상대피통로 겸용 특화설계)' },
  { floor: '지상 43층 최상층', desc: '최상층 펜트하우스 3실 (독립 조망 테라스 및 펜트 전용 설계)' }
];
