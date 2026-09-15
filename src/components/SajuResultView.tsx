import React, { useState, useRef, useEffect } from 'react';
import { 
  SajuResult, 
  InterpretationResponse, 
  ElementType,
  Pillar 
} from '../types';
import { 
  ELEMENT_NAMES_KR, 
  ELEMENT_COLORS 
} from '../utils/manseEngine';
import { 
  Sparkles, 
  Send, 
  Coins, 
  Briefcase, 
  Heart, 
  Calendar, 
  UserCheck, 
  RotateCcw,
  Compass,
  Lightbulb,
  MessageCircleQuestion,
  ArrowDown
} from 'lucide-react';
import { LackingElementRemedyView } from './LackingElementRemedyView';
import { postJson } from '../config/api';
import { generateLocalChatReply } from '../../shared/fallbackInterpretation';

interface SajuResultViewProps {
  saju: SajuResult;
  interpretation: InterpretationResponse | null;
  isLoadingAi: boolean;
  onReset: () => void;
  activeCategory?: string;
}

export const SajuResultView: React.FC<SajuResultViewProps> = ({
  saju,
  interpretation,
  isLoadingAi,
  onReset,
  activeCategory = 'summary',
}) => {
  const [selectedTab, setSelectedTab] = useState<string>(
    activeCategory === 'wealth' ? 'wealth' :
    activeCategory === 'career' ? 'career' :
    activeCategory === 'match' ? 'love' :
    activeCategory === 'luck' ? 'year' : 'summary'
  );

  // Chat consultation state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `반갑습니다, ${saju.name}님. 일간 '${saju.dayMaster}'의 기운과 원국을 바탕으로 구체적인 시기와 해법을 짚어드리겠습니다. 궁금하신 점을 편하게 질문해 주세요.`,
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll whenever messages update or loading state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  const handleSendChat = async (e?: React.FormEvent, customQuestion?: string) => {
    if (e) e.preventDefault();
    const userMsg = (customQuestion || chatInput).trim();
    if (!userMsg || isChatLoading) return;

    setChatInput('');
    const updatedMessages = [...chatMessages, { sender: 'user' as const, text: userMsg }];
    setChatMessages(updatedMessages);
    setIsChatLoading(true);

    try {
      const data = await postJson<{ reply?: string }>('/api/saju/chat', {
        message: userMsg,
        saju,
        history: updatedMessages,
      });
      setChatMessages((prev) => [
        ...prev, 
        { 
          sender: 'ai', 
          text: data.reply || `${saju.name}님의 사주 원국과 대운 흐름을 볼 때, 조급함을 내려놓고 차분히 역량을 다져두시면 하반기부터 점차 길한 운세가 열리게 됩니다.` 
        }
      ]);
    } catch (err) {
      console.error('Chat error, using local reply:', err);
      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: generateLocalChatReply(saju) },
      ]);
    } finally {
      setIsChatLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // Render a pillar card
  const renderPillarCard = (title: string, pillar?: Pillar, isDay: boolean = false) => {
    if (!pillar) {
      return (
        <div className="bg-[#0B0C10] border border-dashed border-[#2B2938] rounded-xl p-3 sm:p-4 text-center flex flex-col justify-center min-h-[200px]">
          <span className="text-sm text-[#CBD5E1] font-bold">{title}</span>
          <span className="text-sm text-[#94A3B8] mt-2">시간 미상</span>
        </div>
      );
    }

    const stemColors = ELEMENT_COLORS[pillar.heavenlyStemElement];
    const branchColors = ELEMENT_COLORS[pillar.earthlyBranchElement];

    return (
      <div className={`bg-[#101117] border ${isDay ? 'border-[#D4AF7C] shadow-lg shadow-[#D4AF7C]/20 ring-1 ring-[#D4AF7C]/30' : 'border-[#2F2D3E]'} rounded-xl p-3 sm:p-4 text-center flex flex-col relative`}>
        {isDay && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF7C] text-[#0D0E14] text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
            나 (본원)
          </span>
        )}

        <span className="text-sm sm:text-base font-serif-kr text-[#FFFFFF] font-bold mb-2.5">
          {title}
        </span>

        {/* Heavenly Stem (천간) */}
        <div className="space-y-1.5 mb-3.5">
          <span className="text-xs sm:text-sm text-[#F1F5F9] block font-medium">
            {pillar.heavenlyStemTenGod}
          </span>
          <div className={`py-2.5 px-1.5 rounded-lg border ${stemColors.border} ${stemColors.bg} flex flex-col items-center shadow-inner`}>
            <span className={`text-2xl sm:text-3xl font-black font-serif-kr ${stemColors.text}`}>
              {pillar.heavenlyStem}
            </span>
            <span className="text-xs sm:text-sm text-[#FFFFFF] font-bold mt-0.5">
              {pillar.heavenlyStemKr} ({ELEMENT_NAMES_KR[pillar.heavenlyStemElement]})
            </span>
          </div>
        </div>

        {/* Earthly Branch (지지) */}
        <div className="space-y-1.5">
          <div className={`py-2.5 px-1.5 rounded-lg border ${branchColors.border} ${branchColors.bg} flex flex-col items-center shadow-inner`}>
            <span className={`text-2xl sm:text-3xl font-black font-serif-kr ${branchColors.text}`}>
              {pillar.earthlyBranch}
            </span>
            <span className="text-xs sm:text-sm text-[#FFFFFF] font-bold mt-0.5">
              {pillar.earthlyBranchKr} ({ELEMENT_NAMES_KR[pillar.earthlyBranchElement]})
            </span>
          </div>
          <span className="text-xs sm:text-sm text-[#F1F5F9] block font-medium">
            {pillar.earthlyBranchTenGod}
          </span>
        </div>

        {/* Hidden Stems & 12 States */}
        <div className="mt-3.5 pt-2.5 border-t border-[#2F2D3E] text-xs sm:text-sm text-[#CBD5E1] space-y-1">
          <div><span className="text-[#E2E8F0] font-semibold">지장간:</span> <span className="text-[#FFFFFF] font-medium">{pillar.hiddenStems.slice(0, 2).join(' ')}</span></div>
          <div><span className="text-[#E2E8F0] font-semibold">운성:</span> <span className="text-[#F5D298] font-bold">{pillar.twelveState}</span></div>
        </div>
      </div>
    );
  };

  return (
    <div id="saju-result-section" className="py-12 bg-[#0D0E14] text-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Result Header */}
        <div className="bg-[#14151E] border border-[#2F2D3E] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E202B] border border-[#D4AF7C]/50 text-xs sm:text-sm font-semibold text-[#F5D298]">
              <Sparkles className="w-4 h-4" />
              <span>명결 정밀 사주원국 풀이</span>
            </div>
            <h2 className="font-serif-kr text-2xl sm:text-4xl font-extrabold text-[#FFFFFF]">
              {saju.name}님의 사주명식(四柱命式)
            </h2>
            <p className="text-sm sm:text-base text-[#F1F5F9] font-normal">
              양력 {saju.solarDate} ({saju.birthTimeStr}) · {saju.gender === 'male' ? '남성' : '여성'} · {saju.region}
            </p>
            {saju.lunarDate && (
              <p className="text-xs sm:text-sm text-[#F5D298] font-medium">
                {saju.lunarDate}로 입력하신 날짜를 양력으로 환산해 계산했습니다.
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onReset}
              id="reset-saju-btn"
              className="px-5 py-3 rounded-xl bg-[#1C1D27] hover:bg-[#252735] text-[#FFFFFF] text-xs sm:text-sm font-bold border border-[#3B384D] hover:border-[#D4AF7C] flex items-center gap-2 transition-all shadow-md"
            >
              <RotateCcw className="w-4 h-4 text-[#F5D298]" />
              <span>다시 입력하기</span>
            </button>
          </div>
        </div>

        {/* 4 Pillars Grid & Five Elements Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left 7 cols: 4 Pillars Table */}
          <div className="lg:col-span-7 bg-[#14151E] border border-[#2F2D3E] rounded-2xl p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between mb-5 border-b border-[#2D2A3D] pb-3.5">
              <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-[#FFFFFF] flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-[#F5D298]" />
                사주 원국표 (四柱八字)
              </h3>
              <span className="text-sm sm:text-base text-[#F5D298] font-serif-kr font-bold">
                일간: {saju.dayMaster}
              </span>
            </div>

            {/* The 4 Pillars (Hour, Day, Month, Year - Right to Left or Left to Right) */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3.5">
              {renderPillarCard('시주(時柱)', saju.hourPillar)}
              {renderPillarCard('일주(日柱)', saju.dayPillar, true)}
              {renderPillarCard('월주(月柱)', saju.monthPillar)}
              {renderPillarCard('년주(年柱)', saju.yearPillar)}
            </div>

            {/* Day Master Character Insight */}
            <div className="mt-6 p-4 sm:p-5 rounded-xl bg-[#0B0C10] border border-[#2F2D3E] text-sm sm:text-base leading-relaxed text-[#FFFFFF]">
              <span className="font-serif-kr text-[#F5D298] font-bold text-base sm:text-lg block mb-1.5">
                본원(나)의 성향: {saju.dayMaster}
              </span>
              {saju.dayMasterDesc}
            </div>

            {/* 10-Year Major Luck Cycles (대운) */}
            <div className="mt-6 pt-5 border-t border-[#2D2A3D]">
              <div className="flex items-center justify-between mb-3.5">
                <h4 className="text-sm sm:text-base font-serif-kr font-bold text-[#FFFFFF]">
                  대운 흐름 (인생 10년 주기 변화 / {saju.majorLuckNumber}대운)
                </h4>
                <span className="text-xs sm:text-sm text-[#CBD5E1] font-medium">환경과 기운의 전환기</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 text-center">
                {saju.majorLuckPillars.map((p, idx) => (
                  <div key={idx} className="bg-[#0B0C10] border border-[#2F2D3E] rounded-xl p-2.5 text-xs sm:text-sm">
                    <span className="text-[#F5D298] font-extrabold block text-sm">{p.age}세</span>
                    <span className="text-[#FFFFFF] font-serif-kr font-bold text-sm sm:text-base">{p.stemKr}{p.branchKr}</span>
                    <span className="text-xs text-[#CBD5E1] block">({p.stem}{p.branch})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 cols: Five Elements Balance */}
          <div className="lg:col-span-5 bg-[#14151E] border border-[#2F2D3E] rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-[#FFFFFF] flex items-center gap-2.5 mb-5 border-b border-[#2D2A3D] pb-3.5">
                <Sparkles className="w-5 h-5 text-[#F5D298]" />
                오행(五行) 균형 분석
              </h3>

              {/* Progress bars for 5 elements */}
              <div className="space-y-4">
                {(['wood', 'fire', 'earth', 'metal', 'water'] as ElementType[]).map((elem) => {
                  const colors = ELEMENT_COLORS[elem];
                  const count = saju.elements[elem];
                  const percent = saju.elementPercentages[elem];

                  return (
                    <div key={elem} className="space-y-1.5">
                      <div className="flex justify-between text-sm sm:text-base font-bold">
                        <span className="text-[#FFFFFF] flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${colors.badge}`} />
                          {ELEMENT_NAMES_KR[elem]}
                        </span>
                        <span className="text-[#E2E8F0]">
                          {count}개 ({percent}%)
                        </span>
                      </div>
                      <div className="h-2.5 w-full bg-[#0B0C10] rounded-full overflow-hidden border border-[#2F2D3E]">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            elem === 'wood' ? 'bg-emerald-500' :
                            elem === 'fire' ? 'bg-rose-500' :
                            elem === 'earth' ? 'bg-amber-500' :
                            elem === 'metal' ? 'bg-slate-300' : 'bg-cyan-500'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dominant and lacking summary */}
              <div className="mt-6 grid grid-cols-2 gap-3.5 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-[#0B0C10] border border-[#2F2D3E]">
                  <span className="text-[#CBD5E1] block mb-1 font-medium">가장 발달한 기운</span>
                  <span className="text-lg sm:text-xl font-serif-kr font-extrabold text-[#F5D298]">
                    {ELEMENT_NAMES_KR[saju.dominantElement]}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0B0C10] border border-[#2F2D3E]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#CBD5E1] font-medium">보완이 필요한 기운</span>
                    <a
                      href="#lacking-element-remedy-section"
                      className="text-[11px] text-[#F5D298] hover:text-[#FFFFFF] underline flex items-center gap-0.5"
                    >
                      <span>처방전</span>
                      <ArrowDown className="w-3 h-3" />
                    </a>
                  </div>
                  <span className="text-lg sm:text-xl font-serif-kr font-extrabold text-[#FFFFFF]">
                    {saju.lackingElement.length > 0
                      ? saju.lackingElement.map((e) => ELEMENT_NAMES_KR[e]).join(', ')
                      : '오행 고루 완비'}
                  </span>
                </div>
              </div>
            </div>

            {/* Lucky Elements Box */}
            {interpretation && (
              <div className="mt-6 p-4.5 rounded-xl bg-[#1C1D27] border border-[#D4AF7C]/50 text-xs sm:text-sm space-y-2 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-serif-kr text-[#F5D298] font-bold text-sm sm:text-base flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-[#F5D298]" />
                    <span>나를 돕는 행운의 개운(開運) 요소</span>
                  </div>
                  <a
                    href="#lacking-element-remedy-section"
                    className="text-[11px] text-[#F5D298] hover:underline font-semibold"
                  >
                    맞춤 개운법 보기 ↓
                  </a>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[#E2E8F0] font-medium">
                  <div>색상: <span className="text-[#FFFFFF] font-bold">{interpretation.luckyElements.color}</span></div>
                  <div>방위: <span className="text-[#FFFFFF] font-bold">{interpretation.luckyElements.direction}</span></div>
                  <div>숫자: <span className="text-[#FFFFFF] font-bold">{interpretation.luckyElements.number}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lacking Element Remedy Prescription Section (모자라는 오행 맞춤 개운법) */}
        <LackingElementRemedyView 
          lackingElements={saju.lackingElement}
          dominantElement={saju.dominantElement}
          dayMaster={saju.dayMaster}
          userName={saju.name}
        />

        {/* AI Deep Interpretation Section */}
        <div className="bg-[#14151E] border border-[#2F2D3E] rounded-2xl p-6 sm:p-9 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2D2A3D] pb-5 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#F5D298] font-semibold mb-1">
                <Sparkles className="w-4 h-4" />
                <span>명결 AI 도사의 심층 해설</span>
              </div>
              <h3 className="font-serif-kr text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">
                인생과 운명의 흐름 분석
              </h3>
            </div>

            {/* Interpretation Category Tabs */}
            <div className="flex flex-wrap gap-2 bg-[#0B0C10] p-2 rounded-xl border border-[#2D2A3D]">
              {[
                { id: 'summary', label: '종합 총평', icon: Compass },
                { id: 'personality', label: '성향·기질', icon: UserCheck },
                { id: 'wealth', label: '재물운', icon: Coins },
                { id: 'career', label: '사업·직업', icon: Briefcase },
                { id: 'love', label: '연애·인연', icon: Heart },
                { id: 'year', label: '2026 세운', icon: Calendar },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                      selectedTab === tab.id
                        ? 'bg-[#222436] text-[#FFFFFF] border border-[#D4AF7C] shadow-md'
                        : 'text-[#CBD5E1] hover:text-[#FFFFFF]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="mt-6 min-h-[160px]">
            {isLoadingAi ? (
              <div className="py-12 text-center space-y-3.5">
                <div className="w-9 h-9 border-3 border-[#D4AF7C] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="font-serif-kr text-base sm:text-lg font-bold text-[#FFFFFF]">
                  사주 원국과 오행을 종합하여 심층 AI 풀이를 정성껏 짓고 있습니다...
                </p>
                <p className="text-xs sm:text-sm text-[#CBD5E1]">
                  한국 천문 표준시 보정 및 십신 대운 연산 중
                </p>
              </div>
            ) : interpretation ? (
              <div className="space-y-4">
                <div className="p-6 sm:p-7 rounded-xl bg-[#0B0C10] border border-[#2D2A3D] leading-relaxed text-[#FFFFFF] text-base sm:text-lg">
                  {selectedTab === 'summary' && (
                    <div className="space-y-3.5">
                      <h4 className="font-serif-kr text-xl sm:text-2xl font-black text-[#F5D298]">인생의 큰 기틀과 방향성</h4>
                      <p className="leading-relaxed text-[#FFFFFF]">{interpretation.summary}</p>
                      <div className="mt-5 pt-4 border-t border-[#2D2A3D] text-sm sm:text-base text-[#F1F5F9]">
                        💡 <strong className="text-[#FFFFFF] font-bold">개운 조언:</strong> {interpretation.fortuneAdvice}
                      </div>
                    </div>
                  )}

                  {selectedTab === 'personality' && (
                    <div className="space-y-3.5">
                      <h4 className="font-serif-kr text-xl sm:text-2xl font-black text-[#F5D298]">타고난 기질과 내면 심리</h4>
                      <p className="leading-relaxed text-[#FFFFFF]">{interpretation.personality}</p>
                    </div>
                  )}

                  {selectedTab === 'wealth' && (
                    <div className="space-y-3.5">
                      <h4 className="font-serif-kr text-xl sm:text-2xl font-black text-[#F5D298]">재물운과 부의 흐름</h4>
                      <p className="leading-relaxed text-[#FFFFFF]">{interpretation.wealthLuck}</p>
                    </div>
                  )}

                  {selectedTab === 'career' && (
                    <div className="space-y-3.5">
                      <h4 className="font-serif-kr text-xl sm:text-2xl font-black text-[#F5D298]">직업 적성과 사업 성공 기운</h4>
                      <p className="leading-relaxed text-[#FFFFFF]">{interpretation.careerLuck}</p>
                    </div>
                  )}

                  {selectedTab === 'love' && (
                    <div className="space-y-3.5">
                      <h4 className="font-serif-kr text-xl sm:text-2xl font-black text-[#F5D298]">연애운과 인연의 조화</h4>
                      <p className="leading-relaxed text-[#FFFFFF]">{interpretation.loveLuck}</p>
                    </div>
                  )}

                  {selectedTab === 'year' && (
                    <div className="space-y-3.5">
                      <h4 className="font-serif-kr text-xl sm:text-2xl font-black text-[#F5D298]">2026년(병오년) 세운의 전개</h4>
                      <p className="leading-relaxed text-[#FFFFFF]">{interpretation.year2026Luck}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* Interactive AI Chat Consultation Box */}
          <div className="mt-8 pt-8 border-t border-[#2D2A3D]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <h4 className="font-serif-kr text-lg sm:text-xl font-bold text-[#FFFFFF] flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#F5D298]" />
                명결 AI 도사에게 1:1 심층 질문하기
              </h4>
              <span className="text-xs sm:text-sm text-[#F5D298] font-bold px-3 py-1 rounded-full bg-[#1E202B] border border-[#D4AF7C]/40 inline-flex items-center gap-1.5 self-start sm:self-auto">
                <Sparkles className="w-3.5 h-3.5" />
                무제한 실시간 상담 (질문 횟수 제한 없음)
              </span>
            </div>

            {/* Quick suggested question chips */}
            <div className="mb-4">
              <span className="text-xs sm:text-sm text-[#CBD5E1] block mb-2 font-medium">
                자주 묻는 추천 질문 (클릭 시 즉시 질문):
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  '올해 재물운이 가장 좋은 시기는 언제인가요?',
                  '이직이나 사업 확장에 적절한 시기인가요?',
                  '저에게 잘 맞는 배우자나 인연의 성향은?',
                  '올해 건강이나 일상에서 특히 주의할 점은?',
                ].map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isChatLoading}
                    onClick={() => handleSendChat(undefined, q)}
                    className="px-3 py-1.5 rounded-lg bg-[#14151E] hover:bg-[#1E202B] text-xs sm:text-sm text-[#F5D298] border border-[#D4AF7C]/40 hover:border-[#D4AF7C] transition-all text-left flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <MessageCircleQuestion className="w-3.5 h-3.5 shrink-0" />
                    <span>{q}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat message history */}
            <div className="max-h-80 overflow-y-auto space-y-3.5 p-4 sm:p-5 rounded-xl bg-[#0B0C10] border border-[#2D2A3D] mb-4">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-3 text-sm sm:text-base leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#2E2419] text-[#FFFFFF] border border-[#D4AF7C] shadow-md font-medium'
                        : 'bg-[#181926] text-[#FFFFFF] border border-[#2F2D3E]'
                    }`}
                  >
                    {msg.sender === 'ai' && (
                      <span className="text-xs text-[#F5D298] font-bold block mb-1 font-serif-kr">
                        명결 AI 도사
                      </span>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#181926] text-[#E2E8F0] text-sm px-4 py-2.5 rounded-xl border border-[#2F2D3E] flex items-center gap-2.5">
                    <span className="w-4 h-4 border-2 border-[#D4AF7C] border-t-transparent rounded-full animate-spin" />
                    사주 원국을 바탕으로 답을 적고 있습니다...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="flex gap-2.5">
              <input
                ref={inputRef}
                type="text"
                id="chat-query-input"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="궁금한 점을 자유롭게 질문해보세요 (예: 올해 시험운, 이직, 건강, 연애운 등)"
                className="flex-1 px-4 py-3.5 rounded-xl bg-[#0B0C10] border border-[#3B384D] text-[#FFFFFF] text-sm sm:text-base placeholder:text-[#94A3B8] font-medium focus:outline-none focus:border-[#D4AF7C]"
              />
              <button
                type="submit"
                id="chat-send-btn"
                disabled={isChatLoading || !chatInput.trim()}
                className="px-6 py-3.5 rounded-xl bg-[#1E202B] hover:bg-[#272938] text-[#F5D298] font-bold text-sm sm:text-base border border-[#D4AF7C]/50 hover:border-[#D4AF7C] transition-all flex items-center gap-2 disabled:opacity-40 shadow-md"
              >
                <span>질문</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="mt-2.5 text-xs sm:text-sm text-[#94A3B8] flex items-center gap-1.5">
              <span>💡</span>
              <span>질문은 1회로 끝나지 않으며, 궁금하신 점이 풀릴 때까지 <strong>횟수 제한 없이 계속</strong> 물어보실 수 있습니다.</span>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
