export type Gender = 'male' | 'female';
export type CalendarType = 'solar' | 'lunar';

export type ElementType = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

export interface FiveElementsCount {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
}

export interface Pillar {
  heavenlyStem: string;     // 천간 (예: 甲, 乙, ...)
  heavenlyStemKr: string;   // 천간 한글 (예: 갑, 을, ...)
  heavenlyStemElement: ElementType; // 오행
  heavenlyStemTenGod: string; // 십신 (예: 비견, 정재, ...)
  
  earthlyBranch: string;    // 지지 (예: 子, 丑, ...)
  earthlyBranchKr: string;  // 지지 한글 (예: 자, 축, ...)
  earthlyBranchElement: ElementType; // 오행
  earthlyBranchTenGod: string; // 십신
  
  hiddenStems: string[];    // 지장간 (한글)
  twelveState: string;      // 십이운성 (장생, 목욕, 제왕 등)
}

export interface SajuResult {
  name: string;
  gender: Gender;
  solarDate: string;
  birthTimeStr: string;
  isTimeUnknown: boolean;
  region: string;
  
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar?: Pillar;
  
  dayMaster: string;        // 일간 (나를 나타내는 기운, 예: 갑목, 병화)
  dayMasterDesc: string;    // 일간의 특성
  
  elements: FiveElementsCount;
  elementPercentages: Record<ElementType, number>;
  dominantElement: ElementType;
  lackingElement: ElementType[];
  
  majorLuckNumber: number;  // 대운수 (예: 3대운, 7대운)
  majorLuckPillars: Array<{
    age: number;
    stem: string;
    stemKr: string;
    branch: string;
    branchKr: string;
  }>;
}

export interface SajuInput {
  name: string;
  gender: Gender;
  calendarType: CalendarType;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  isTimeUnknown: boolean;
  region: string;
}

export interface InterpretationResponse {
  summary: string;
  personality: string;
  wealthLuck: string;
  careerLuck: string;
  loveLuck: string;
  year2026Luck: string;
  fortuneAdvice: string;
  luckyElements: {
    color: string;
    direction: string;
    number: string;
  };
}
