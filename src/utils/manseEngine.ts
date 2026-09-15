import { ElementType, FiveElementsCount, Pillar, SajuInput, SajuResult } from '../types';

export const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const STEMS_KR = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];

export const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
export const BRANCHES_KR = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

export const STEM_ELEMENTS: Record<string, ElementType> = {
  '甲': 'wood', '乙': 'wood',
  '丙': 'fire', '丁': 'fire',
  '戊': 'earth', '己': 'earth',
  '庚': 'metal', '辛': 'metal',
  '壬': 'water', '癸': 'water',
};

export const BRANCH_ELEMENTS: Record<string, ElementType> = {
  '寅': 'wood', '卯': 'wood',
  '巳': 'fire', '午': 'fire',
  '辰': 'earth', '戌': 'earth', '丑': 'earth', '未': 'earth',
  '申': 'metal', '酉': 'metal',
  '亥': 'water', '子': 'water',
};

export const ELEMENT_NAMES_KR: Record<ElementType, string> = {
  wood: '목(木)',
  fire: '화(火)',
  earth: '토(土)',
  metal: '금(金)',
  water: '수(水)',
};

export const ELEMENT_COLORS: Record<ElementType, { bg: string; text: string; border: string; badge: string }> = {
  wood: { bg: 'bg-emerald-950/60', text: 'text-emerald-300', border: 'border-emerald-700/50', badge: 'bg-emerald-800/40 text-emerald-300' },
  fire: { bg: 'bg-red-950/60', text: 'text-rose-300', border: 'border-rose-700/50', badge: 'bg-red-800/40 text-rose-300' },
  earth: { bg: 'bg-amber-950/60', text: 'text-amber-300', border: 'border-amber-700/50', badge: 'bg-amber-800/40 text-amber-300' },
  metal: { bg: 'bg-slate-800/60', text: 'text-slate-200', border: 'border-slate-500/50', badge: 'bg-slate-700/50 text-slate-200' },
  water: { bg: 'bg-blue-950/60', text: 'text-cyan-300', border: 'border-blue-700/50', badge: 'bg-blue-800/40 text-cyan-300' },
};

// 지장간 (Hidden stems)
const HIDDEN_STEMS: Record<string, string[]> = {
  '子': ['임(壬)', '계(癸)'],
  '丑': ['계(癸)', '신(辛)', '기(己)'],
  '寅': ['무(戊)', '병(丙)', '갑(甲)'],
  '卯': ['갑(甲)', '을(乙)'],
  '辰': ['을(乙)', '계(癸)', '무(戊)'],
  '巳': ['무(戊)', '경(庚)', '병(丙)'],
  '午': ['병(丙)', '기(己)', '정(丁)'],
  '未': ['정(丁)', '을(乙)', '기(己)'],
  '申': ['무(戊)', '임(壬)', '경(庚)'],
  '酉': ['경(庚)', '신(辛)'],
  '戌': ['신(辛)', '정(丁)', '무(戊)'],
  '亥': ['무(戊)', '갑(甲)', '임(壬)'],
};

// 십신(육친) 계산 함수 (일간 기준)
function calculateTenGod(dayStemIdx: number, targetStemIdx: number): string {
  if (targetStemIdx < 0) return '일간(본원)';
  const dayElem = STEM_ELEMENTS[STEMS[dayStemIdx]];
  const targetElem = STEM_ELEMENTS[STEMS[targetStemIdx]];
  const isSamePolarity = (dayStemIdx % 2) === (targetStemIdx % 2);

  const elemOrder: ElementType[] = ['wood', 'fire', 'earth', 'metal', 'water'];
  const dayIdx = elemOrder.indexOf(dayElem);
  const targetIdx = elemOrder.indexOf(targetElem);

  const diff = (targetIdx - dayIdx + 5) % 5;

  if (diff === 0) {
    return isSamePolarity ? '비견(比肩)' : '겁재(劫財)';
  } else if (diff === 1) {
    return isSamePolarity ? '식신(食神)' : '상관(傷官)';
  } else if (diff === 2) {
    return isSamePolarity ? '편재(偏財)' : '정재(正財)';
  } else if (diff === 3) {
    return isSamePolarity ? '편관(偏官)' : '정관(正官)';
  } else {
    return isSamePolarity ? '편인(偏印)' : '정인(正印)';
  }
}

// 십이운성 계산
function calculateTwelveState(dayStemIdx: number, branchIdx: number): string {
  const states = ['장생', '목욕', '관대', '건록', '제왕', '쇠', '병', '사', '묘', '절', '태', '양'];
  // 양간(갑병무경임)은 순행, 음간(을정기신계)은 역행
  const isYang = dayStemIdx % 2 === 0;
  // 각 천간의 장생지
  const birthBranches: Record<number, number> = {
    0: 11, // 갑(甲) -> 해(亥)
    1: 6,  // 을(乙) -> 오(午)
    2: 2,  // 병(丙) -> 인(寅)
    3: 9,  // 정(丁) -> 유(酉)
    4: 2,  // 무(戊) -> 인(寅)
    5: 9,  // 기(己) -> 유(酉)
    6: 8,  // 경(庚) -> 사(巳)
    7: 0,  // 신(辛) -> 자(子)
    8: 8,  // 임(壬) -> 신(申)
    9: 3,  // 계(癸) -> 묘(卯)
  };

  const startBranch = birthBranches[dayStemIdx] ?? 0;
  let offset: number;
  if (isYang) {
    offset = (branchIdx - startBranch + 12) % 12;
  } else {
    offset = (startBranch - branchIdx + 12) % 12;
  }
  return states[offset] || '건록';
}

// 율리우스일수 기반 일주 계산
function getDayPillarIndices(year: number, month: number, day: number): { stemIdx: number; branchIdx: number } {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;
  
  // 60갑자 주기 오프셋 보정
  const cycle60 = Math.floor(JD + 0.5 + 49) % 60;
  const stemIdx = cycle60 % 10;
  const branchIdx = cycle60 % 12;
  return { stemIdx: (stemIdx + 10) % 10, branchIdx: (branchIdx + 12) % 12 };
}

// 24절기 기준 월주 계산 (간이 근사 절기일: 입춘 2/4, 경칩 3/6, 청명 4/5, 입하 5/6, 망종 6/6, 소서 7/7, 입추 8/8, 백로 9/8, 한로 10/8, 입동 11/7, 대설 12/7, 소한 1/6)
function getMonthPillarIndices(year: number, month: number, day: number, yearStemIdx: number): { stemIdx: number; branchIdx: number; adjustedYearStemIdx: number } {
  // 절기 기준일
  const solarTermDays = [6, 4, 6, 5, 6, 6, 7, 8, 8, 8, 7, 7]; // 1월부터 12월
  const termDay = solarTermDays[month - 1];

  let sajuMonth: number;
  let adjustedYearStemIdx = yearStemIdx;

  if (month === 1) {
    if (day < termDay) {
      sajuMonth = 11; // 이전 해 자월
    } else {
      sajuMonth = 12; // 축월
    }
  } else if (month === 2) {
    if (day < termDay) {
      sajuMonth = 12; // 입춘 전: 이전 해 축월
    } else {
      sajuMonth = 1; // 인월 (새해 시작)
    }
  } else {
    if (day < termDay) {
      sajuMonth = month - 2;
    } else {
      sajuMonth = month - 1;
    }
  }

  // 입춘 전이면 년주도 전년도로 계산
  if (month === 1 || (month === 2 && day < termDay)) {
    adjustedYearStemIdx = (yearStemIdx - 1 + 10) % 10;
  }

  // 월지: 인(1월)=2, 묘(2월)=3, ... 축(12월)=1
  const branchIdx = (sajuMonth + 1) % 12;

  // 월간 도출 (오호둔월법: 갑기년 -> 병인월 시작)
  const startStem = (adjustedYearStemIdx % 5) * 2 + 2; // 병(2), 무(4), 경(6), 임(8), 갑(0)
  const monthOffset = (sajuMonth - 1 + 12) % 12;
  const stemIdx = (startStem + monthOffset) % 10;

  return { stemIdx, branchIdx, adjustedYearStemIdx };
}

// 시주 계산 (오서둔시법)
function getHourPillarIndices(dayStemIdx: number, hour: number, minute: number, region: string): { stemIdx: number; branchIdx: number } {
  // 한국 표준시(동경 135도)와 서울 실제 태양시(동경 127.5도) 사이의 약 32분 차이 보정
  let totalMinutes = hour * 60 + minute;
  if (region.includes('서울') || region.includes('경기') || region.includes('인천')) {
    totalMinutes -= 32;
  } else if (region.includes('부산') || region.includes('울산') || region.includes('경상')) {
    totalMinutes -= 24;
  } else {
    totalMinutes -= 30;
  }

  if (totalMinutes < 0) totalMinutes += 24 * 60;
  totalMinutes = totalMinutes % (24 * 60);

  // 자시: 23:30 ~ 01:29 (idx 0), 축시: 01:30 ~ 03:29 (idx 1), ...
  const branchIdx = Math.floor(((totalMinutes + 30) % (24 * 60)) / 120);

  // 시간 도출 (시간두: 갑기일 -> 갑자시, 을경일 -> 병자시, 병신일 -> 무자시, 정임일 -> 경자시, 무계일 -> 임자시)
  const startStem = (dayStemIdx % 5) * 2;
  const stemIdx = (startStem + branchIdx) % 10;

  return { stemIdx, branchIdx };
}

export function calculateManse(input: SajuInput): SajuResult {
  const { name, gender, year, month, day, hour, minute, isTimeUnknown, region } = input;

  // 1. 년주 계산 (기본 1984년 甲子年 기준)
  const baseYearDiff = year - 1984;
  let yearStemIdx = ((baseYearDiff % 10) + 10) % 10;
  let yearBranchIdx = ((baseYearDiff % 12) + 12) % 12;

  // 2. 월주 및 입춘 전후 년주 보정
  const { stemIdx: monthStemIdx, branchIdx: monthBranchIdx, adjustedYearStemIdx } = getMonthPillarIndices(year, month, day, yearStemIdx);
  if (adjustedYearStemIdx !== yearStemIdx) {
    yearStemIdx = adjustedYearStemIdx;
    yearBranchIdx = (yearBranchIdx - 1 + 12) % 12;
  }

  // 3. 일주 계산
  const { stemIdx: dayStemIdx, branchIdx: dayBranchIdx } = getDayPillarIndices(year, month, day);

  // 4. 시주 계산
  let hourStemIdx = -1;
  let hourBranchIdx = -1;
  if (!isTimeUnknown) {
    const hp = getHourPillarIndices(dayStemIdx, hour, minute, region);
    hourStemIdx = hp.stemIdx;
    hourBranchIdx = hp.branchIdx;
  }

  // 기둥 빌드 함수
  const makePillar = (stemI: number, branchI: number): Pillar => {
    const s = STEMS[stemI];
    const b = BRANCHES[branchI];
    return {
      heavenlyStem: s,
      heavenlyStemKr: STEMS_KR[stemI],
      heavenlyStemElement: STEM_ELEMENTS[s],
      heavenlyStemTenGod: calculateTenGod(dayStemIdx, stemI),
      earthlyBranch: b,
      earthlyBranchKr: BRANCHES_KR[branchI],
      earthlyBranchElement: BRANCH_ELEMENTS[b],
      earthlyBranchTenGod: calculateTenGod(dayStemIdx, stemI === dayStemIdx ? -1 : stemI), // 지지 십신 근사
      hiddenStems: HIDDEN_STEMS[b] || [],
      twelveState: calculateTwelveState(dayStemIdx, branchI),
    };
  };

  const yearPillar = makePillar(yearStemIdx, yearBranchIdx);
  const monthPillar = makePillar(monthStemIdx, monthBranchIdx);
  const dayPillar = makePillar(dayStemIdx, dayBranchIdx);
  const hourPillar = !isTimeUnknown && hourStemIdx >= 0 ? makePillar(hourStemIdx, hourBranchIdx) : undefined;

  // 오행 개수 집계
  const elements: FiveElementsCount = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  const allElements = [
    yearPillar.heavenlyStemElement, yearPillar.earthlyBranchElement,
    monthPillar.heavenlyStemElement, monthPillar.earthlyBranchElement,
    dayPillar.heavenlyStemElement, dayPillar.earthlyBranchElement,
  ];
  if (hourPillar) {
    allElements.push(hourPillar.heavenlyStemElement, hourPillar.earthlyBranchElement);
  }

  allElements.forEach((el) => {
    elements[el] += 1;
  });

  const totalCount = allElements.length;
  const elementPercentages: Record<ElementType, number> = {
    wood: Math.round((elements.wood / totalCount) * 100),
    fire: Math.round((elements.fire / totalCount) * 100),
    earth: Math.round((elements.earth / totalCount) * 100),
    metal: Math.round((elements.metal / totalCount) * 100),
    water: Math.round((elements.water / totalCount) * 100),
  };

  let maxEl: ElementType = 'wood';
  let maxCount = -1;
  const lacking: ElementType[] = [];
  (Object.keys(elements) as ElementType[]).forEach((el) => {
    if (elements[el] > maxCount) {
      maxCount = elements[el];
      maxEl = el;
    }
    if (elements[el] === 0) {
      lacking.push(el);
    }
  });

  // 대운 계산 (양남음녀 순행, 음남양녀 역행)
  const isYearStemYang = yearStemIdx % 2 === 0;
  const isForward = (gender === 'male' && isYearStemYang) || (gender === 'female' && !isYearStemYang);
  
  const majorLuckNumber = Math.max(1, ((year + month + day) % 9) + 1); // 1~9 대운수
  const majorLuckPillars = [];
  for (let i = 1; i <= 8; i++) {
    const step = isForward ? i : -i;
    const mStem = (monthStemIdx + step * 1 + 60) % 10;
    const mBranch = (monthBranchIdx + step * 1 + 60) % 12;
    majorLuckPillars.push({
      age: majorLuckNumber + (i - 1) * 10,
      stem: STEMS[mStem],
      stemKr: STEMS_KR[mStem],
      branch: BRANCHES[mBranch],
      branchKr: BRANCHES_KR[mBranch],
    });
  }

  // 일간 설명
  const dayMaster = `${dayPillar.heavenlyStemKr}(${dayPillar.heavenlyStem}) ${ELEMENT_NAMES_KR[dayPillar.heavenlyStemElement]}`;
  const dayMasterDescMap: Record<string, string> = {
    '갑': '큰 나무(대들보)와 같은 꿋꿋한 추진력과 진취적 리더십',
    '을': '유연한 초목처럼 뛰어난 적응력과 외유내강의 생명력',
    '병': '태양처럼 만물을 밝히는 열정과 당당한 사교성',
    '정': '촛불이나 등대처럼 은은한 온기와 섬세한 통찰력',
    '무': '웅장한 산처럼 묵직한 신뢰감과 포용력을 지닌 기상',
    '기': '비옥한 대지처럼 품어주고 조율하는 현실적 수완',
    '경': '단단한 쇠나 바위처럼 결단력 있고 의리 있는 기개',
    '신': '보석처럼 정교하고 품격 높은 예술적 감각과 자존감',
    '임': '도도한 큰 바다처럼 깊은 지혜와 광활한 포용력',
    '계': '스며드는 이슬비처럼 총명하고 부드러운 직관력',
  };

  return {
    name: name || '귀하',
    gender,
    solarDate: `${year}년 ${month}월 ${day}일`,
    birthTimeStr: isTimeUnknown ? '시간 미상' : `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
    isTimeUnknown,
    region,
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    dayMaster,
    dayMasterDesc: dayMasterDescMap[dayPillar.heavenlyStemKr] || '균형 잡힌 기운',
    elements,
    elementPercentages,
    dominantElement: maxEl,
    lackingElement: lacking,
    majorLuckNumber,
    majorLuckPillars,
  };
}
