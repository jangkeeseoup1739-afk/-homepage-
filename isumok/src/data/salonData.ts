import { SalonInfo, ServiceItem, BeforeAfterItem, PortfolioItem, ReviewItem, BookingRequest } from '../types';

export const SALON_INFO: SalonInfo = {
  name: '이수목헤어스토리',
  tagline: '모발과 두피를 천연제품으로 정성껏 다스리는 1인 프라이빗 헤어살롱',
  address: '서울 송파구 새말로17길 12 1층 102호',
  detailAddress: '문정동 래미안·로데오거리 인근 / 102호 전용 주차 공간 완비',
  phonePrimary: '0507-1490-1888',
  phoneSecondary: '02-3012-1888',
  weekdayHours: '09:00 ~ 18:00',
  closedDays: ['수요일', '일요일'],
  staff: '원장 1인 맞춤 전담 시술 (100% 예약 우선제)',
  specialty: '모발과 두피를 천연제품으로 관리하는 곳 (친환경 유기농 저자극 케어)',
  parking: '매장 1층 102호 앞 전용 무료 주차 가능',
  naverBookingUrl: 'https://m.booking.naver.com',
  naverMapUrl: 'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%20%EC%86%A1%ED%8C%8C%EA%B5%AC%20%EC%83%88%EB%A7%90%EB%A1%9C17%EA%B8%B8%2012',
  kakaoMapUrl: 'https://map.kakao.com/link/search/서울 송파구 새말로17길 12'
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'perm-digital-setting',
    category: '열펌',
    name: '열펌 (디지털, 셋팅)',
    description: '모발 손상을 최소화하는 천연 유기농 연화제 사용. 자연스럽고 탄력 있는 컬감과 풍성한 웨이브를 완성합니다.',
    highlight: '시그니처 열펌 & 모발 복구',
    estimatedTime: '150분 ~ 180분',
    recommendedFor: ['손상 없는 탄력 웨이브를 원하는 분', '아침 손질이 편한 내추럴 웨이브', '가는 모발로 컬이 잘 안 나오는 분'],
    isSignature: true,
    imageUrl: '/korean_digital_perm_1789556859945.webp',
    styleExampleLabel: '탄력 있는 글램 셋팅 웨이브'
  },
  {
    id: 'perm-magic-volume',
    category: '매직/볼륨매직',
    name: '열펌 (매직, 볼륨 매직)',
    description: '곱슬기를 차분하게 펴주면서도 뿌리와 모발 끝의 자연스러운 볼륨감을 살려주는 세련된 스트레이트 라인입니다.',
    highlight: '차분하고 윤기나는 스트레이트',
    estimatedTime: '150분 ~ 180분',
    recommendedFor: ['부스스한 곱슬모가 고민이신 분', '뿌리 볼륨과 찰랑이는 결을 동시에 원하는 분', '비 오는 날에도 흐트러짐 없는 단정함'],
    isSignature: true,
    imageUrl: '/korean_volume_magic_1789556874453.webp',
    styleExampleLabel: '윤기 흐르는 실키 볼륨매직'
  },
  {
    id: 'perm-magic-setting',
    category: '열펌',
    name: '열펌 (매직셋팅)',
    description: '뿌리와 상단은 깔끔한 매직으로 정돈하고, 하단은 셋팅 펌으로 풍성한 C/S컬을 연출하는 프리미엄 복합 시술입니다.',
    highlight: '상단 매직 + 하단 C/S컬 환상 조합',
    estimatedTime: '180분 ~ 210분',
    recommendedFor: ['상단 곱슬 정돈과 하단 컬을 한 번에 원하시는 분', '우아하고 고급스러운 여신 웨이브', '손질이 가장 쉬운 믹스펌'],
    imageUrl: '/korean_magic_setting_1789556893498.webp',
    styleExampleLabel: '상단 매직 + 하단 우아한 C/S컬'
  },
  {
    id: 'ringer-perm',
    category: '링거펌',
    name: '링거펌 (모류교정 & 뿌리볼륨)',
    description: '특수 로트와 천연 레시피를 이용해 갈라지는 가르마, 정수리 납작함, 쏟아지는 모류를 뿌리부터 꼿꼿하게 살려냅니다.',
    highlight: '원장 특화 뿌리교정 특허 링거펌',
    estimatedTime: '60분 ~ 90분',
    recommendedFor: ['정수리 숱이 적어 가르마가 훤히 보이는 분', '뒷통수 납작함으로 볼륨이 꺼지는 분', '모류가 돌아가서 앞머리가 갈라지는 분'],
    isSignature: true,
    imageUrl: '/korean_ringer_perm_1789556908150.webp',
    styleExampleLabel: '모근 수직기립 뿌리볼륨 특허 링거펌'
  },
  {
    id: 'perm-general',
    category: '일반펌',
    name: '펌 (일반)',
    description: '두피에 자극이 없는 순한 천연 베이스 펌제로 시술하여 풍성한 볼륨감과 부드러운 컬감을 선사합니다.',
    highlight: '두피 저자극 내추럴 웨이브',
    estimatedTime: '90분 ~ 120분',
    recommendedFor: ['가성비 좋고 클래식한 웨이브', '두피가 민감하여 자극 없는 펌을 찾는 분', '짧은 헤어스타일의 볼륨감 부여'],
    imageUrl: '/korean_digital_perm_1789556859945.webp',
    styleExampleLabel: '자연스러운 소프트 내추럴 펌'
  },
  {
    id: 'cut-women',
    category: '커트',
    name: '커트 (여자)',
    description: '개개인의 얼굴형, 두상, 모질 및 라이프스타일을 면밀히 분석한 1:1 맞춤 감성 디자인 커트입니다.',
    highlight: '얼굴형 보완 1:1 맞춤 커트',
    estimatedTime: '40분 ~ 50분',
    recommendedFor: ['레이어드컷, 보브단발, 숏컷 맞춤형', '가벼운 텍스처와 라인 정리가 필요한 분', '시간이 지나도 무너지지 않는 질감 커트'],
    imageUrl: '/korean_women_cut_1789556925720.webp',
    styleExampleLabel: '감성 레이어드 허쉬 & 보브 단발'
  },
  {
    id: 'cut-men',
    category: '커트',
    name: '커트 (남자)',
    description: '두상 굴곡과 모류 방향을 고려한 정밀 페이드 및 댄디 라인. 다운펌 필요성을 줄여주는 입체 커트입니다.',
    highlight: '라인이 살아있는 깔끔한 맨즈컷',
    estimatedTime: '30분 ~ 45분',
    recommendedFor: ['옆머리가 뜨고 뒤통수가 납작한 남성', '단정하고 세련된 직장인 댄디 스타일', '손질 3분 컷을 원하는 분'],
    imageUrl: '/korean_men_cut_1789556962771.webp',
    styleExampleLabel: '단정하고 세련된 맨즈 댄디컷'
  },
  {
    id: 'perm-men',
    category: '일반펌',
    name: '펌 (남자)',
    description: '애즈펌, 쉐도우펌, 가르마펌, 다운펌 결합 등 남성 두상에 맞춘 자연스러운 흐름과 볼륨을 형성합니다.',
    highlight: '손질 편한 맨즈 맞춤 텍스처펌',
    estimatedTime: '80분 ~ 100분',
    recommendedFor: ['아침마다 드라이하기 번거로운 남성', '이마를 살짝 드러내는 트렌디 애즈펌', 'M자 커버 및 정수리 볼륨 교정'],
    imageUrl: '/korean_men_perm_1789556947340.webp',
    styleExampleLabel: '트렌디 맨즈 애즈 & 쉐도우펌'
  },
  {
    id: 'styling',
    category: '스타일링',
    name: '스타일링 (드라이 & 두피케어)',
    description: '중요한 모임, 면접, 특별한 날을 위한 감각적인 블로우 드라이 및 천연 두피 진정 스케일링 스타일링입니다.',
    highlight: '특별한 날을 위한 럭셔리 드라이',
    estimatedTime: '40분 ~ 60분',
    recommendedFor: ['모임, 가족 행사, 프로필 촬영', '두피 유수분 밸런스가 무너져 리프레시가 필요한 분', '자연스럽고 우아한 웨이브 드라이'],
    imageUrl: '/korean_styling_care_1789556981838.webp',
    styleExampleLabel: '품격 있는 블로우 드라이 & 두피케어'
  }
];

export const INITIAL_BEFORE_AFTER: BeforeAfterItem[] = [
  {
    id: 'ba-1',
    title: '극손상 탈색모 → 천연 매직셋팅 윤기 복구',
    category: '열펌',
    beforeImage: '/korean_frizzy_before_1789556997388.webp',
    afterImage: '/korean_magic_setting_1789556893498.webp',
    clientProblem: '잦은 고열 드라이와 탈색으로 모발 끝이 갈라지고 부스스하여 빗질이 불가능했던 상태',
    solutionKey: '천연 식물성 단백질 전처리 후 저온 디지털 셋팅과 상단 매직 연화 작업 병행',
    naturalCareUsed: '유기농 아르간 모발 영양팩 & 천연 실크 아미노산 연화 케어',
    procedureTime: '3시간 20분',
    date: '2026.09'
  },
  {
    id: 'ba-2',
    title: '갈라진 정수리 가르마 → 링거펌 모류교정 볼륨업',
    category: '링거펌',
    beforeImage: '/korean_flat_crown_1789557014650.webp',
    afterImage: '/korean_ringer_perm_1789556908150.webp',
    clientProblem: '오랜 세월 굳어진 가르마 방향으로 두피가 하얗게 드러나고 뒤통수가 주저앉음',
    solutionKey: '특수 링거 로트로 모류 방향을 180도 전환하여 두피 자극 없이 모근 자체를 수직으로 기립',
    naturalCareUsed: '천연 허브 모근 강화 앰플 & 저자극 천연 두피 진정수',
    procedureTime: '1시간 10분',
    date: '2026.08'
  },
  {
    id: 'ba-3',
    title: '곱슬거리고 붕 뜨는 모발 → 찰랑이는 볼륨 매직',
    category: '매직/볼륨매직',
    beforeImage: '/korean_frizzy_before_1789556997388.webp',
    afterImage: '/korean_volume_magic_1789556874453.webp',
    clientProblem: '습도 높은 날이면 사자 갈기처럼 팽창하고 끝부분이 뻗치는 악성 반곱슬',
    solutionKey: '모발 뿌리는 풍성하게 각도를 주며, 중간부터 끝까지는 부드러운 C컬 인컬로 감싸듯 매직 프레스',
    naturalCareUsed: '약산성 천연 케라틴 콤플렉스 & 동백 오일 코팅',
    procedureTime: '2시간 40분',
    date: '2026.08'
  },
  {
    id: 'ba-4',
    title: '힘없이 처지는 모발 → 댄디 애즈펌 & 모류 정돈',
    category: '일반펌',
    beforeImage: '/korean_men_cut_1789556962771.webp',
    afterImage: '/korean_men_perm_1789556947340.webp',
    clientProblem: '이마가 좁아 보이고 모발에 힘이 없어 두피에 달라붙어 손질이 어렵던 상태',
    solutionKey: '자연스러운 가르마 라인을 열어주고 앞머리 볼륨을 극대화한 댄디 텍스처 펌',
    naturalCareUsed: '천연 티트리 두피 청결팩 & 식물성 펌제',
    procedureTime: '1시간 20분',
    date: '2026.07'
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p-1',
    title: '내추럴 그레이스 디지털 열펌',
    category: '열펌',
    imageUrl: '/korean_digital_perm_1789556859945.webp',
    tags: ['#열펌', '#디지털펌', '#천연케어', '#여신웨이브'],
    description: '물결치듯 흐르는 굵고 탄력 있는 웨이브로 여성스러운 분위기를 극대화한 스타일입니다.',
    designerNote: '천연 연화제를 사용하여 손상 없이 모발 끝까지 탱글탱글한 질감을 유지했습니다.'
  },
  {
    id: 'p-2',
    title: '뿌리 집중 링거펌 & 정수리 교정',
    category: '링거펌',
    imageUrl: '/korean_ringer_perm_1789556908150.webp',
    tags: ['#링거펌', '#모류교정', '#뿌리볼륨', '#이수목특화'],
    description: '정수리 쪽 갈라짐을 완벽하게 교정하여 어떤 각도에서도 봉긋한 입체감을 선사합니다.',
    designerNote: '자란 뒤에도 꺾임 현상이 없는 1:1 맞춤형 마이크로 링거 시술입니다.'
  },
  {
    id: 'p-3',
    title: '윤기 촉촉 슬릭 볼륨매직',
    category: '매직/볼륨매직',
    imageUrl: '/korean_volume_magic_1789556874453.webp',
    tags: ['#볼륨매직', '#슬릭스타일', '#손상모복구', '#천연오일'],
    description: '빛을 머금은 듯 반짝이는 엔젤링과 안쪽으로 부드럽게 감기는 C컬 마무리.',
    designerNote: '열 손상을 최소화하는 천연 보호막 시술로 찰랑거리는 질감을 장시간 유지합니다.'
  },
  {
    id: 'p-4',
    title: '우아한 매직셋팅 페미닌펌',
    category: '열펌',
    imageUrl: '/korean_magic_setting_1789556893498.webp',
    tags: ['#매직셋팅', '#빌드펌', '#차분함과풍성함'],
    description: '윗머리의 지저분한 곱슬은 매끈하게 잡고 밑머리는 고급스러운 S컬로 완성했습니다.',
    designerNote: '샴푸 후 털어 말리기만 해도 미용실에서 드라이한 듯한 형태가 잡힙니다.'
  },
  {
    id: 'p-5',
    title: '맨즈 내추럴 댄디 애즈펌',
    category: '일반펌',
    imageUrl: '/korean_men_perm_1789556947340.webp',
    tags: ['#남자펌', '#애즈펌', '#두상보정컷', '#남성스타일'],
    description: '자연스러운 가르마와 옆머리 슬림핏으로 이목구비가 한층 뚜렷해 보이는 맨즈 스타일링입니다.',
    designerNote: '옆머리 들뜸을 눌러주고 가르마 흐름을 타도록 모류를 디자인했습니다.'
  },
  {
    id: 'p-6',
    title: '레이어드 C컬 감성 컷 & 스타일링',
    category: '커트',
    imageUrl: '/korean_women_cut_1789556925720.webp',
    tags: ['#여자커트', '#레이어드컷', '#C컬드라이', '#가벼운텍스처'],
    description: '모발 무게감을 덜어내어 턱선과 쇄골 라인을 슬림하게 연출하는 시그니처 컷입니다.',
    designerNote: '천연 에센스만 살짝 발라도 층감이 공기처럼 살아나는 질감 컷 기법입니다.'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: '김*은 고객님',
    rating: 5,
    date: '2026.09.12',
    treatment: '열펌 (매직셋팅) + 천연 두피케어',
    comment: '송파에서 미용실 정착 못하고 있었는데 이수목헤어스토리 만나고 드디어 정착했습니다! 다른 데서는 매직셋팅하면 머리 다 타서 바스락거렸는데, 원장님이 천연 제품으로 정성껏 연화해주셔서 머릿결이 오히려 시술 전보다 좋아졌어요. 1인 원장님이라 온전히 저에게만 집중해주시는 시간도 너무 편안했습니다.',
    verifiedVisit: true,
    replyFromOwner: '소중한 후기 진심으로 감사드립니다! 우리 고객님 모발이 많이 지쳐있어서 천연 단백질을 듬뿍 채워 시술해드렸는데 윤기가 잘 살아나 정말 기쁩니다. 집에서도 홈케어 잘 부탁드립니다 ♥',
    likes: 18
  },
  {
    id: 'rev-2',
    author: '박*훈 고객님',
    rating: 5,
    date: '2026.09.08',
    treatment: '링거펌 (뿌리볼륨 모류교정) + 남자 컷',
    comment: '정수리 가르마가 심하게 갈라져서 늘 비어 보이고 스트레스였는데, 링거펌 상담받고 시술했습니다. 와... 왜 진작 안 했을까 싶을 정도로 볼륨이 꼿꼿하게 살아났어요. 매장 앞에 주차도 편하고 원장님 솜씨가 진짜 장인이십니다.',
    verifiedVisit: true,
    replyFromOwner: '박*훈 고객님! 링거펌 만족도가 높으셔서 저도 뿌듯합니다. 한 달 반 뒤 커트하실 때 뿌리 유지 상태 한번 더 봐드릴게요. 감사합니다!',
    likes: 14
  },
  {
    id: 'rev-3',
    author: '이*정 고객님',
    rating: 5,
    date: '2026.09.02',
    treatment: '열펌 (디지털 셋팅)',
    comment: '냄새나는 독한 파마약 냄새가 전혀 안 나서 여쭤보니 전부 좋은 천연 성분 쓰신다고 하더라구요. 두피가 예민해서 펌 한번 하고 나면 가렵고 빨개지는데 여기서는 전혀 그런 게 없었어요. 컬도 탱글하게 너무 예뻐요!',
    verifiedVisit: true,
    likes: 11
  },
  {
    id: 'rev-4',
    author: '최*민 고객님',
    rating: 5,
    date: '2026.08.28',
    treatment: '열펌 (볼륨 매직) + 헤어 클리닉',
    comment: '원장님 1분이 처음부터 끝까지 샴푸, 시술, 드라이까지 꼼꼼히 챙겨주시니 대우받는 기분이에요. 대형 미용실처럼 스텝 손 바뀌는 불안감이 전혀 없습니다. 새말로 골목 안쪽에 이런 숨은 보석 같은 살롱이 있을 줄이야.',
    verifiedVisit: true,
    replyFromOwner: '믿고 찾아와주셔서 감사합니다 고객님! 한 분 한 분 정성을 다하는 것이 저의 소신입니다. 건강한 헤어 항상 지켜드리겠습니다 ^^',
    likes: 9
  },
  {
    id: 'rev-5',
    author: '정*우 고객님',
    rating: 5,
    date: '2026.08.19',
    treatment: '커트 (남자) + 펌 (남자)',
    comment: '남성 헤어도 두상에 맞게 정말 잘 만져주십니다. 아침에 머리 말리기만 해도 형태가 잡혀서 출근 준비 시간 10분 줄었습니다. 네이버 예약하고 오면 대기 시간 없이 바로 시술받을 수 있어 좋습니다.',
    verifiedVisit: true,
    likes: 8
  }
];

export const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: 'book-101',
    customerName: '홍길동',
    phone: '010-8765-4321',
    preferredDate: '2026-09-18',
    preferredTime: '10:00',
    serviceCategory: '열펌 (매직셋팅)',
    hairConcerns: ['모발 손상', '곱슬기 교정'],
    notes: '끝부분이 갈라져 있어서 천연 케어 추가하고 싶습니다.',
    privacyAgreed: true,
    createdAt: '2026-09-15 14:20',
    status: '예약확정'
  },
  {
    id: 'book-102',
    customerName: '김민지',
    phone: '010-3344-5566',
    preferredDate: '2026-09-19',
    preferredTime: '14:00',
    serviceCategory: '링거펌 (모류교정 & 뿌리볼륨)',
    hairConcerns: ['가르마 갈라짐', '뿌리 볼륨 꺼짐'],
    notes: '상담 후 커트도 함께 진행하고 싶어요.',
    privacyAgreed: true,
    createdAt: '2026-09-16 09:15',
    status: '접수완료'
  }
];
