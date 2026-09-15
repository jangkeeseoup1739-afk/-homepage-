import { ElementType } from '../types';

export interface ElementRemedyItem {
  element: ElementType;
  nameKr: string;
  hanja: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  title: string;
  summary: string;
  habits: {
    title: string;
    desc: string;
  };
  fashion: {
    title: string;
    desc: string;
  };
  food: {
    title: string;
    desc: string;
  };
  interior: {
    title: string;
    desc: string;
  };
  mindset: {
    title: string;
    desc: string;
  };
}

export const ELEMENT_REMEDIES: Record<ElementType, ElementRemedyItem> = {
  wood: {
    element: 'wood',
    nameKr: '목(木)',
    hanja: '木',
    badgeBg: 'bg-emerald-950/70',
    badgeBorder: 'border-emerald-500/60',
    badgeText: 'text-emerald-300',
    title: '성장과 추진의 목(木) 기운 보완법',
    summary: '목(木)은 봄의 생명력과 진취성, 시작하는 결단력을 관장합니다. 부족할 경우 의욕 저하나 주저함이 생기기 쉬우므로 푸른 생명력의 기운을 보충해 줍니다.',
    habits: {
      title: '생활 습관',
      desc: '아침 일찍 기상(동틀 무렵)하여 아침 공기 마시기, 숲길·수목원 산책, 가벼운 전신 스트레칭'
    },
    fashion: {
      title: '의류 & 패션',
      desc: '초록색, 청색, 민트 계열 의상 및 스카프, 천연 목재 소재의 팔찌나 안경테 활용'
    },
    food: {
      title: '추천 식품',
      desc: '신선한 녹색 쌈채소, 시금치, 부추, 유자, 신맛 나는 과일(사과·키위), 따뜻한 보리차'
    },
    interior: {
      title: '공간 & 인테리어',
      desc: '실내에 잎이 넓은 관엽식물(화분) 키우기, 원목 가구 배치, 동쪽 창문 매일 환기'
    },
    mindset: {
      title: '마음가짐',
      desc: '완벽한 준비를 기다리지 말고, 작은 일이라도 먼저 가볍게 시작해보는 진취적인 결단'
    }
  },
  fire: {
    element: 'fire',
    nameKr: '화(火)',
    hanja: '火',
    badgeBg: 'bg-rose-950/70',
    badgeBorder: 'border-rose-500/60',
    badgeText: 'text-rose-300',
    title: '열정과 표현의 화(火) 기운 보완법',
    summary: '화(火)는 태양 같은 활력, 따뜻한 사교성, 당당한 자기표현을 상징합니다. 부족하면 감정 표현이 소극적이거나 에너지가 위축될 수 있어 빛과 온기를 채워줍니다.',
    habits: {
      title: '생활 습관',
      desc: '낮 시간대 하루 20분 이상 자연 햇볕 쬐기(일광욕), 활기찬 유산소 운동, 먼저 밝은 미소로 인사하기'
    },
    fashion: {
      title: '의류 & 패션',
      desc: '붉은색, 주황색, 분홍색, 버건디 포인트 아이템 착용, 화사하고 생기 있는 스타일링'
    },
    food: {
      title: '추천 식품',
      desc: '토마토, 파프리카, 홍삼, 대추, 쓴맛 채소(치커리), 따뜻한 생강차나 계피차'
    },
    interior: {
      title: '공간 & 인테리어',
      desc: '실내 조명을 따뜻하고 환하게 유지하기, 캔들이나 무드등 활용, 남향 창문 채광 확보'
    },
    mindset: {
      title: '마음가짐',
      desc: '마음속 생각을 혼자 삭이지 않고, 솔직하고 시원하게 밖으로 표현하는 당당한 용기'
    }
  },
  earth: {
    element: 'earth',
    nameKr: '토(土)',
    hanja: '土',
    badgeBg: 'bg-amber-950/70',
    badgeBorder: 'border-amber-500/60',
    badgeText: 'text-amber-300',
    title: '안정과 중심의 토(土) 기운 보완법',
    summary: '토(土)는 대지처럼 든든한 신용, 흔들리지 않는 포용력, 중심을 잡는 힘입니다. 부족하면 환경 변화에 흔들리거나 불안해지기 쉬우므로 대지의 안정감을 끌어옵니다.',
    habits: {
      title: '생활 습관',
      desc: '흙길이나 잔디밭 맨발 걷기(어싱/접지), 규칙적인 식사 및 수면 리듬 유지, 차분한 명상'
    },
    fashion: {
      title: '의류 & 패션',
      desc: '노란색, 베이지, 브라운, 카키 등 차분한 대지색 컬러 의상, 원석이나 도자기 액세서리'
    },
    food: {
      title: '추천 식품',
      desc: '단호박, 고구마, 감자, 현미, 꿀, 노란 콩류 등 속을 든든하고 편안하게 덥혀주는 곡물'
    },
    interior: {
      title: '공간 & 인테리어',
      desc: '도자기 화병이나 흙소재 소품 비치, 따뜻한 황토색 패브릭, 집안 중앙 공간을 단정히 정돈'
    },
    mindset: {
      title: '마음가짐',
      desc: '주변 상황에 일희일비하지 않고, 묵묵히 내 원칙과 중심을 지키는 듬직한 인내심'
    }
  },
  metal: {
    element: 'metal',
    nameKr: '금(金)',
    hanja: '金',
    badgeBg: 'bg-slate-900/90',
    badgeBorder: 'border-slate-400/60',
    badgeText: 'text-slate-200',
    title: '결단과 원칙의 금(金) 기운 보완법',
    summary: '금(金)은 정밀한 칼날처럼 명확한 맺고 끊음, 정리정돈, 원칙과 결단력을 관장합니다. 부족하면 우유부단해지거나 관계를 정리하기 어려울 수 있으니 정갈함을 세워줍니다.',
    habits: {
      title: '생활 습관',
      desc: '불필요한 물건 과감히 버리는 미니멀 정리, 단호한 거절 연습, 웨이트 근력 운동'
    },
    fashion: {
      title: '의류 & 패션',
      desc: '흰색, 은색, 메탈 그레이 의류, 메탈 시계나 은반지 등 금속 소재의 세련된 액세서리'
    },
    food: {
      title: '추천 식품',
      desc: '도라지, 무, 배, 마늘, 양파, 백김치 등 깔끔하고 알싸한 맛의 흰색 건강 식재료'
    },
    interior: {
      title: '공간 & 인테리어',
      desc: '군더더기 없는 미니멀 인테리어, 금속 프레임 액자, 서쪽 방향을 항상 정갈하게 청소'
    },
    mindset: {
      title: '마음가짐',
      desc: '정에 휘둘리지 않고, 공과 사를 명확히 가르며 아닌 것은 단호하게 끊어내는 명쾌한 결단'
    }
  },
  water: {
    element: 'water',
    nameKr: '수(水)',
    hanja: '水',
    badgeBg: 'bg-cyan-950/70',
    badgeBorder: 'border-cyan-500/60',
    badgeText: 'text-cyan-300',
    title: '지혜와 유연함의 수(水) 기운 보완법',
    summary: '수(水)는 깊은 강물처럼 유연한 융통성, 지혜, 침착한 통찰력을 상징합니다. 부족하면 생각이 조급해지거나 유연성이 떨어질 수 있어 맑고 깊은 수기(水氣)를 보충합니다.',
    habits: {
      title: '생활 습관',
      desc: '하루 1.5L 이상 미온수 자주 마시기, 저녁 반신욕이나 족욕, 강변·호숫가 산책'
    },
    fashion: {
      title: '의류 & 패션',
      desc: '검은색, 짙은 남색(네이비), 블루블랙 의류, 부드러운 곡선 형태의 소품 지니기'
    },
    food: {
      title: '추천 식품',
      desc: '검은콩, 흑임자, 미역·다시마 등 해조류, 블루베리, 맑은 천연 암반수나 신선한 해산물'
    },
    interior: {
      title: '공간 & 인테리어',
      desc: '실내 소형 분수나 가습기 가동, 수족관, 북쪽 방향에 차분한 조명의 서재 공간 마련'
    },
    mindset: {
      title: '마음가짐',
      desc: '막히면 돌아가는 물처럼 부드럽게 대처하고, 남의 말을 먼저 깊이 경청하는 포용의 지혜'
    }
  }
};

export const BALANCED_REMEDY = {
  title: '오행(五行) 조화와 순환 유지법',
  summary: '사주에 목·화·토·금·수가 골고루 갖추어져 있어 한쪽으로 치우치지 않는 안정된 복을 타고났습니다. 이 균형을 유지하고 선순환시키는 것이 최고의 개운입니다.',
  habits: {
    title: '생활 습관',
    desc: '사계절의 섭리에 순응하는 규칙적인 기상과 수면 리듬 유지, 과로 및 폭음·폭식 금지'
  },
  fashion: {
    title: '의류 & 패션',
    desc: '자연스럽고 편안한 톤온톤 스타일링, 계절의 색채에 어울리는 단정한 내추럴 룩'
  },
  food: {
    title: '추천 식품',
    desc: '청·적·황·백·흑 5가지 색상의 제철 자연식단을 골고루 섭취하여 신체 리듬 보전'
  },
  interior: {
    title: '공간 & 인테리어',
    desc: '실내 통풍과 환기를 기본으로 한 쾌적하고 정갈한 주거 환경 유지'
  },
  mindset: {
    title: '마음가짐',
    desc: '원국의 조화에 감사하며, 본원(나)의 특색과 잠재력을 세상에 이롭게 펼치는 태도'
  }
};
