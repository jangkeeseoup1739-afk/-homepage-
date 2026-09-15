// Deterministic saju reading used whenever the Gemini API is unavailable.
// Kept free of server-only imports so the browser bundle can use it too:
// on Imweb the page is served without a backend, and this keeps the result
// view fully populated instead of blank.

export const LUCKY_BY_DOMINANT: Record<string, {color: string; direction: string; number: string}> = {
  wood: {color: '청색, 초록빛', direction: '동쪽', number: '3, 8'},
  fire: {color: '붉은색, 자줏빛', direction: '남쪽', number: '2, 7'},
  earth: {color: '황금색, 베이지', direction: '중앙', number: '5, 10'},
  metal: {color: '백색, 은회색', direction: '서쪽', number: '4, 9'},
  water: {color: '감청색, 흑색', direction: '북쪽', number: '1, 6'},
};

const DOMINANT_TRAIT: Record<string, string> = {
  wood: '성장과 진취성',
  fire: '열정과 표현력',
  earth: '신뢰와 중재력',
  metal: '결단과 완성도',
  water: '지혜와 융통성',
};

export function generateLocalFallbackInterpretation(saju: any) {
  const dominant = saju?.dominantElement || 'wood';
  const lucky = LUCKY_BY_DOMINANT[dominant] || LUCKY_BY_DOMINANT.wood;
  const trait = DOMINANT_TRAIT[dominant] || DOMINANT_TRAIT.wood;
  const name = saju?.name || '의뢰인';
  const dayMaster = saju?.dayMaster || '본원';

  return {
    summary: `${name}님은 ${dayMaster}의 기운을 타고나 강인한 주체성과 깊은 내면의 잠재력을 지니셨습니다. 사주 전체에서 ${trait}이 돋보이며, 인생의 굴곡을 기회로 바꾸는 저력을 갖고 있습니다.`,
    personality: `타고난 성향은 곧고 책임감이 강하며, 남에게 의지하기보다 스스로의 힘으로 길을 개척하는 자주적인 성향입니다. 다만 지나치게 완벽을 기하다가 스스로에게 스트레스를 줄 수 있으니 유연한 마음가짐이 길합니다.`,
    wealthLuck: `재물은 일확천금보다는 꾸준한 노력과 시스템을 구축하여 점진적으로 축적하는 기운입니다. 중년 이후로 대운의 흐름이 재물선과 맞물려 안정적인 자산 형성이 예상됩니다.`,
    careerLuck: `자신의 전문성을 인정받는 직무나 기획, 리더십을 발휘할 수 있는 환경에서 큰 두각을 나타냅니다. 독립적인 프로젝트나 의사결정권이 주어질 때 역량이 극대화됩니다.`,
    loveLuck: `상대방에게 깊은 배려를 베풀며 진중한 관계를 지향합니다. 서로의 개인적인 영역을 존중해 주고 감정의 기복을 너그럽게 받아줄 수 있는 따뜻한 사람과의 인연이 길합니다.`,
    year2026Luck: `2026년(병오년)은 붉은 말의 해로서 화(火)의 왕성한 기운이 새로운 기회와 확장을 가져다주는 전환점입니다. 주저하던 일을 결단력 있게 실행에 옮기기에 최적의 해입니다.`,
    fortuneAdvice: `평소 사주에서 보완이 필요한 기운에 맞는 색상과 방위를 가까이 하시고, 아침 햇살을 받으며 하루를 계획하는 습관이 큰 개운(開運)의 힘을 발휘합니다.`,
    luckyElements: lucky,
  };
}

const CHAT_FALLBACKS = [
  (saju: any) =>
    `${saju?.name || '귀하'}님의 ${saju?.dayMaster || '일간'} 기운상 가을철부터 귀인의 조력이 강해지니, 조급해하지 말고 역량을 다져두시면 큰 결실을 맺게 됩니다.`,
  () =>
    `사주 원국의 오행 조화를 볼 때, 무리한 확장보다 현재 기반을 견고히 하시면 하반기에 재물과 명예운이 함께 상승하는 길한 흐름입니다.`,
  (saju: any) =>
    `${saju?.name || '의뢰인'}님은 신뢰를 쌓는 대인관계가 곧 개운의 열쇠이니, 주변과의 협력을 돈독히 하시면 뜻밖의 기회가 자연스럽게 찾아옵니다.`,
];

export function generateLocalChatReply(saju: any) {
  return CHAT_FALLBACKS[Math.floor(Math.random() * CHAT_FALLBACKS.length)](saju);
}

export function chatFallbackReply(saju: any) {
  return `${saju?.name || '귀하'}님의 사주 원국상 조급함을 내려놓고 본원 기운을 갈고 닦으시면, 가까운 시일 내에 뜻밖의 귀인이 나타나 큰 조력을 얻게 될 것입니다.`;
}
