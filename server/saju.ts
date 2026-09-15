import {GoogleGenAI} from '@google/genai';
import {
  chatFallbackReply,
  generateLocalChatReply,
  generateLocalFallbackInterpretation,
} from '../shared/fallbackInterpretation';

export {chatFallbackReply, generateLocalFallbackInterpretation};

const GEMINI_MODEL = 'gemini-3.8-flash';

// Initialize Gemini SDK with User-Agent header as required.
// Returns null when no key is configured so callers can fall back locally.
export const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

export async function interpretSaju(saju: any) {
  const ai = getGeminiClient();

  if (!ai) {
    // Return high-quality deterministic fallback if no API key
    return generateLocalFallbackInterpretation(saju);
  }

  const prompt = `
당신은 한국의 정통 명리학과 현대 심리학을 융합한 최고 권위의 사주 명리학자 '명결(命結)' AI입니다.
'명(命)을 풀고, 사람과 운을 연결한다'는 철학에 맞게, 고루하거나 미신적인 어조가 아닌 깊이 있는 품격과 현대적 통찰력을 담아 경어체(~합니다, ~입니다)로 상세히 풀이해 주세요.

[의뢰인 사주 정보]
- 이름: ${saju.name} (${saju.gender === 'male' ? '남성' : '여성'})
- 양력 생년월일: ${saju.solarDate} (${saju.birthTimeStr})
- 사주팔자(원국):
  * 년주(조상/초년): ${saju.yearPillar.heavenlyStemKr}${saju.yearPillar.earthlyBranchKr} (${saju.yearPillar.heavenlyStem}${saju.yearPillar.earthlyBranch})
  * 월주(부모/사회성): ${saju.monthPillar.heavenlyStemKr}${saju.monthPillar.earthlyBranchKr} (${saju.monthPillar.heavenlyStem}${saju.monthPillar.earthlyBranch})
  * 일주(나 자신/배우자): ${saju.dayPillar.heavenlyStemKr}${saju.dayPillar.earthlyBranchKr} (${saju.dayPillar.heavenlyStem}${saju.dayPillar.earthlyBranch}) - 일간: ${saju.dayMaster}
  ${saju.hourPillar ? `* 시주(자녀/말년): ${saju.hourPillar.heavenlyStemKr}${saju.hourPillar.earthlyBranchKr} (${saju.hourPillar.heavenlyStem}${saju.hourPillar.earthlyBranch})` : '* 시주: 시간 미상'}
- 오행 분포: 목(${saju.elements.wood}), 화(${saju.elements.fire}), 토(${saju.elements.earth}), 금(${saju.elements.metal}), 수(${saju.elements.water})
- 가장 왕성한 기운: ${saju.dominantElement}, 보완이 필요한 기운: ${saju.lackingElement.join(', ') || '없음'}
- 대운 시작 나이: ${saju.majorLuckNumber}세

다음 JSON 구조에 맞추어 매우 구체적이고 깊이 있는 해석을 작성해주세요:
{
  "summary": "핵심 사주 총평 (3~4문장 요약, 일간의 상징과 인생의 전반적인 방향성)",
  "personality": "타고난 기질과 내면 심리 분석 (장점과 경계해야 할 마음가짐)",
  "wealthLuck": "재물운과 부의 흐름 (돈이 모이는 방식, 재테크 스타일, 주의할 시기)",
  "careerLuck": "직업 및 사업 성공 기운 (잘 맞는 업종, 조직 vs 독립, 잠재력 발휘 방법)",
  "loveLuck": "연애 및 인연운 (이상적인 상대 유형, 관계 유지 시 조언)",
  "year2026Luck": "2026년(병오년)과 2027년(정미년)의 구체적인 운세 흐름과 기회",
  "fortuneAdvice": "운을 열어주는 개운법(開運法)과 마음가짐 실천 팁",
  "luckyElements": {
    "color": "행운의 색상 추천",
    "direction": "행운의 방위",
    "number": "행운의 숫자 2개"
  }
}
반드시 순수 JSON 형식으로만 응답해 주세요.
`;

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('AI generation timeout')), 8000)
  );

  const response = (await Promise.race([
    ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    }),
    timeoutPromise,
  ])) as any;

  const resultText = response?.text || '';
  return JSON.parse(resultText);
}

export async function chatWithSaju(message: string, saju: any, history: any) {
  const ai = getGeminiClient();

  if (!ai) {
    return generateLocalChatReply(saju);
  }

  const systemPrompt = `
당신은 명결(命結)의 전통 AI 사주 명리학자입니다.
의뢰인의 사주 원국:
- 이름: ${saju?.name}
- 일주: ${saju?.dayPillar?.heavenlyStemKr}${saju?.dayPillar?.earthlyBranchKr} (${saju?.dayMaster})
- 오행 분포: 목(${saju?.elements?.wood}), 화(${saju?.elements?.fire}), 토(${saju?.elements?.earth}), 금(${saju?.elements?.metal}), 수(${saju?.elements?.water})

[답변 작성 필수 지침 - 엄격 준수]
1. 구체적 제시: 추상적이거나 짧은 답변은 금지합니다. 의뢰인의 일간(${saju?.dayMaster})과 오행 흐름을 바탕으로 구체적인 시기(예: 상·하반기, 특정 월), 실천 행동, 조언을 명확히 짚어주세요.
2. 글자 수 규정 (공백 포함 50자 이상 ~ 100자 이내): 답변 길이는 반드시 50자 이상이어야 하며, 절대 100자를 초과하지 마세요. (약 60~85자가 가장 이상적입니다.)
3. 어조: 품격 있고 정중한 경어체(~합니다, ~하세요)를 사용하며 이전 대화 흐름을 자연스럽게 이어가세요.

[답변 예시 - 약 75자]
"${saju?.dayMaster || '본원'} 기운상 올해 하반기부터 문서운이 길하게 작용하니, 9월 이후 이직이나 자격증 취득에 집중하시면 기대 이상의 결실을 보게 됩니다."
`;

  // Multi-turn conversation contents
  const formattedHistory = Array.isArray(history)
    ? history
        .filter((h: any) => h && h.text && typeof h.text === 'string')
        .map((h: any) => ({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{text: h.text}],
        }))
    : [];

  const contents = [
    ...formattedHistory,
    {
      role: 'user',
      parts: [{text: message || '올해 제게 가장 중요한 기회는 무엇인가요?'}],
    },
  ];

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents,
    config: {
      systemInstruction: systemPrompt,
    },
  });

  let replyText = (response.text || '').trim();
  // Safety check for character count between 50 and 100 chars
  if (replyText.length < 50) {
    replyText = `${replyText} ${saju?.name || '귀하'}님의 ${saju?.dayMaster || '원국'} 기운을 잘 살리시면 점차 길한 운세가 열리게 됩니다.`;
  }
  if (replyText.length > 105) {
    // Trim gently to around 95 characters without breaking mid-sentence if possible
    const sentences = replyText.split(/(?<=[.?!])\s+/);
    let reconstructed = '';
    for (const s of sentences) {
      if ((reconstructed + (reconstructed ? ' ' : '') + s).length <= 100) {
        reconstructed += (reconstructed ? ' ' : '') + s;
      } else {
        break;
      }
    }
    if (reconstructed.length >= 50) {
      replyText = reconstructed;
    } else {
      replyText = replyText.slice(0, 95).replace(/[^가-힣a-zA-Z0-9]$/, '') + '...';
    }
  }

  return replyText;
}
