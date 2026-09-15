import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryCards } from './components/CategoryCards';
import { SajuResultView } from './components/SajuResultView';
import { SpecialFeatures } from './components/SpecialFeatures';
import { Footer } from './components/Footer';
import { SajuInput, SajuResult, InterpretationResponse } from './types';
import { calculateManse } from './utils/manseEngine';
import { BookOpen, Sparkles, KeyRound, CreditCard, Cpu, Layers } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [sajuResult, setSajuResult] = useState<SajuResult | null>(null);
  const [interpretation, setInterpretation] = useState<InterpretationResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showTechGuide, setShowTechGuide] = useState<boolean>(false);

  const handleSajuSubmit = async (input: SajuInput) => {
    setIsLoading(true);

    // 1. Calculate astronomical Korean Manse-ryeok instantly in browser
    const calculated = calculateManse(input);
    setSajuResult(calculated);

    // Smooth scroll down to result
    setTimeout(() => {
      const el = document.getElementById('saju-result-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    // 2. Call AI interpretation API
    try {
      const response = await fetch('/api/saju/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ saju: calculated }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI interpretation');
      }

      const data: InterpretationResponse = await response.json();
      setInterpretation(data);
    } catch (err) {
      console.error('AI Interpretation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setActiveSection(categoryId);
    // If saju is already calculated, scroll to it
    if (sajuResult) {
      const el = document.getElementById('saju-result-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // scroll to input form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0E14] text-[#EDE7DF] selection:bg-[#D4AF7C]/30 selection:text-[#FBF7F0]">
      {/* Navigation Header */}
      <Header
        onNavClick={(sec) => {
          setActiveSection(sec);
          if (sec === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (sajuResult) {
            const el = document.getElementById('saju-result-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        activeSection={activeSection}
      />

      {/* Main Hero with Saju Input Form & Hanbok Visual */}
      <main className="flex-1">
        <HeroSection onSubmit={handleSajuSubmit} isLoading={isLoading} />

        {/* 6 Theme Category Cards */}
        <CategoryCards onSelectCategory={handleCategorySelect} />

        {/* Calculated Saju Result & AI Interpretation */}
        {sajuResult && (
          <SajuResultView
            saju={sajuResult}
            interpretation={interpretation}
            isLoadingAi={isLoading}
            onReset={() => {
              setSajuResult(null);
              setInterpretation(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            activeCategory={activeSection}
          />
        )}

        {/* Reasons Why Myeonggyeol is Special */}
        <SpecialFeatures />

        {/* Easy Technical Architecture & Commercial Roadmap Guide */}
        <section className="py-12 bg-[#0D0E14] border-t border-[#262432]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#14151E] border border-[#2B2938] rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262433] pb-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF7C] font-semibold mb-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>개발 & 상용화 기술 안내서</span>
                  </div>
                  <h3 className="font-serif-kr text-xl font-bold text-[#FAF6F0]">
                    명결(命結) 구현 기술 및 서비스 확장 안내
                  </h3>
                </div>
                <button
                  id="toggle-tech-guide-btn"
                  onClick={() => setShowTechGuide(!showTechGuide)}
                  className="px-3.5 py-2 rounded-xl bg-[#1C1D27] hover:bg-[#252735] text-xs font-medium text-[#D4AF7C] border border-[#D4AF7C]/30 transition-all self-start sm:self-auto"
                >
                  {showTechGuide ? '설명 접기' : '알기 쉬운 기술 설명 보기'}
                </button>
              </div>

              {/* Collapsible Tech Explanations */}
              {showTechGuide && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-[#CDC7BD] leading-relaxed pt-2">
                  <div className="p-4 rounded-xl bg-[#0B0C10] border border-[#262433] space-y-2">
                    <div className="flex items-center gap-2 text-[#FAF6F0] font-semibold font-serif-kr">
                      <Cpu className="w-4 h-4 text-[#D4AF7C]" />
                      <span>만세력 (천문 사주 계산 엔진)</span>
                    </div>
                    <p className="text-[#9E988F] text-xs">
                      <strong className="text-[#EDE7DF]">개념:</strong> 생년월일시와 출생 지역을 바탕으로 24절기와 60갑자(甲子) 주기를 수학적으로 연산하여 사주 네 기둥(년·월·일·시)과 오행(목·화·토·금·수)을 정확히 뽑아내는 달력 알고리즘입니다.
                    </p>
                    <p className="text-[11px] text-emerald-400">
                      ✔ 현재 브라우저 내 정밀 알고리즘으로 100% 로컬 계산 완료
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B0C10] border border-[#262433] space-y-2">
                    <div className="flex items-center gap-2 text-[#FAF6F0] font-semibold font-serif-kr">
                      <Layers className="w-4 h-4 text-[#D4AF7C]" />
                      <span>AI 사주 풀이 (Claude / Gemini)</span>
                    </div>
                    <p className="text-[#9E988F] text-xs">
                      <strong className="text-[#EDE7DF]">개념:</strong> 복잡한 한자 나열 대신, AI가 사주 원국의 십신과 오행 배치를 현대적인 언어와 심리학적 통찰로 알기 쉽게 해설해 주는 인공지능 명리학자 역할입니다.
                    </p>
                    <p className="text-[11px] text-[#D4AF7C]">
                      ✔ 현재 Google AI Studio 내장 Gemini API 실시간 연동 (추후 Claude Agent SDK 전환 용이)
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B0C10] border border-[#262433] space-y-2">
                    <div className="flex items-center gap-2 text-[#FAF6F0] font-semibold font-serif-kr">
                      <CreditCard className="w-4 h-4 text-[#D4AF7C]" />
                      <span>OAuth & 구독 요금제 (상용화)</span>
                    </div>
                    <p className="text-[#9E988F] text-xs">
                      <strong className="text-[#EDE7DF]">개념:</strong> 카카오나 구글 간편로그인(OAuth)으로 회원 정보를 안전하게 연결하고, 월간/연간 구독(포트원/토스페이먼츠)을 통해 심층 AI 사주 상담 권한을 부여하는 상용화 시스템입니다.
                    </p>
                    <p className="text-[11px] text-[#9E988F]">
                      ✔ 현재는 로컬 사용 단계이므로 결제/가입 없이 100% 즉시 이용 가능
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
