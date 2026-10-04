import React, { useState } from 'react';
import { Calculator, Sparkles, CheckCircle2, Phone, HelpCircle, ArrowRight } from 'lucide-react';
import { PROPERTY_INFO } from '../data/propertyData';
import { triggerPhoneCall } from '../utils/phoneUtils';

interface FinanceCalculatorProps {
  onOpenReservation: () => void;
}

export const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({ onOpenReservation }) => {
  const [selectedType, setSelectedType] = useState<'76' | '84A' | '84B'>('84A');
  const [loanRatio, setLoanRatio] = useState<number>(60); // 60%
  const [interestRate, setInterestRate] = useState<number>(3.8); // 3.8%
  const [loanYears, setLoanYears] = useState<number>(30); // 30 years

  // Approximate reference pricing guide for simulation
  const typeBasePrices = {
    '76': 580000000,
    '84A': 650000000,
    '84B': 660000000,
  };

  const estimatedPrice = typeBasePrices[selectedType];
  const fixedInitialDeposit = 40000000; // 40,000,000 KRW
  const loanPrincipal = (estimatedPrice * loanRatio) / 100;
  
  // Calculate monthly repayment (Equal Principal and Interest Repayment formula)
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanYears * 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanPrincipal / totalMonths;

  const formatManwon = (amount: number) => {
    const man = Math.round(amount / 10000);
    return `${man.toLocaleString()}만원`;
  };

  const formatEokMan = (amount: number) => {
    const eok = Math.floor(amount / 100000000);
    const man = Math.round((amount % 100000000) / 10000);
    if (eok === 0) return `${man.toLocaleString()}만원`;
    if (man === 0) return `${eok}억원`;
    return `${eok}억 ${man.toLocaleString()}만원`;
  };

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-[#0a1a30] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="font-serif text-3xl sm:text-4xl text-[#c2a36b] tracking-wider uppercase mb-2">
            FINANCE GUIDE
          </p>
          <div className="w-12 h-0.5 bg-[#c2a36b] mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
            계약금 4,000만원 정액제 &amp; 자금 시뮬레이션
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-normal">
            입주 때까지 초기 자금 부담을 획기적으로 낮춘 맞춤형 분양 혜택
          </p>
        </div>

        {/* 3 Core Financial Advantages Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#c2a36b] text-[#0a1a30] font-black flex items-center justify-center shrink-0 text-base">
              1
            </div>
            <div>
              <h4 className="font-bold text-base text-white mb-1">계약금 4천만원 정액제</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                통상 분양가의 10%(6~7천만원대)가 소요되는 초기 자금을 4천만원으로 줄여 부담 없이 로열층 선점 가능
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#c2a36b] text-[#0a1a30] font-black flex items-center justify-center shrink-0 text-base">
              2
            </div>
            <div>
              <h4 className="font-bold text-base text-white mb-1">중도금 대출 지원</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                입주 지정일까지 중도금 관련 안심 금융 프로그램 지원 (자세한 조건은 모델하우스 상담)
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#c2a36b] text-[#0a1a30] font-black flex items-center justify-center shrink-0 text-base">
              3
            </div>
            <div>
              <h4 className="font-bold text-base text-white mb-1">가전·인테리어 무상옵션</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                수천만원 상당의 이탈리아 Dada 주방 및 삼성 비스포크 가전이 무상 포함되어 입주 비용 대폭 절감
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Simulator Card */}
        <div className="bg-white text-[#1d2430] rounded-3xl p-6 sm:p-10 shadow-2xl border border-gray-200">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="p-2.5 rounded-xl bg-[#0a1a30] text-[#c2a36b]">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0a1a30]">
                입주 자금 &amp; 예상 월 납입액 계산기
              </h3>
              <p className="text-xs text-gray-500">
                원하시는 평형과 대출 조건을 선택하시면 예상 상환액을 즉시 계산해 드립니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls (Left) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Type Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  관심 타입 선택
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['76', '84A', '84B'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedType(t)}
                      className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm border transition cursor-pointer ${
                        selectedType === t
                          ? 'bg-[#0a1a30] text-white border-[#0a1a30] shadow'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {t} Type
                    </button>
                  ))}
                </div>
              </div>

              {/* LTV Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-700 mb-2">
                  <span>예상 대출 비율 (LTV)</span>
                  <span className="text-[#16365e] font-black text-sm">{loanRatio}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="70"
                  step="5"
                  value={loanRatio}
                  onChange={(e) => setLoanRatio(Number(e.target.value))}
                  className="w-full accent-[#0a1a30] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>40% (보수적)</span>
                  <span>50%</span>
                  <span>60% (일반적)</span>
                  <span>70% (최대)</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-700 mb-2">
                  <span>적용 예상 금리</span>
                  <span className="text-[#16365e] font-black text-sm">연 {interestRate.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="6.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#0a1a30] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>3.0%</span>
                  <span>4.0%</span>
                  <span>5.0%</span>
                  <span>6.0%</span>
                </div>
              </div>

              {/* Loan Period */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  상환 기간
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[20, 30, 40].map((years) => (
                    <button
                      key={years}
                      type="button"
                      onClick={() => setLoanYears(years)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition cursor-pointer ${
                        loanYears === years
                          ? 'bg-[#16365e] text-white border-[#16365e]'
                          : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {years}년 원리금균등
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulation Results (Right) */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#0a1a30] to-[#102a4c] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="text-xs text-[#c2a36b] font-bold">
                    {selectedType} Type 예상 분양 조건
                  </span>
                  <span className="text-[11px] text-gray-400">기준층 예시 기준</span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-gray-300">초기 실 납부 계약금</span>
                    <strong className="text-2xl font-black text-[#c2a36b]">
                      {formatManwon(fixedInitialDeposit)}
                    </strong>
                  </div>

                  <div className="flex justify-between items-baseline text-sm">
                    <span className="text-gray-300">예상 대출 가능 금액 ({loanRatio}%)</span>
                    <strong className="text-base text-white">{formatEokMan(loanPrincipal)}</strong>
                  </div>

                  <div className="p-4 rounded-xl bg-white/10 border border-white/15 mt-4">
                    <span className="text-xs text-gray-300 block mb-1">
                      월 예상 상환액 (원리금 균등)
                    </span>
                    <div className="text-3xl font-black text-[#f3e7ce]">
                      약 {formatManwon(monthlyPayment)}
                      <span className="text-xs font-normal text-gray-300 ml-1">/월</span>
                    </div>
                    <span className="text-[11px] text-gray-400 block mt-1">
                      * 금리 {interestRate.toFixed(1)}%, {loanYears}년 상환 가정 시
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 space-y-3">
                <a
                  href={PROPERTY_INFO.naverReservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] font-bold text-sm transition shadow cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <span>네이버 폼으로 호실별 분양가 및 금융 혜택 상담 예약</span>
                </a>
                <a
                  href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
                  onClick={(e) => {
                    e.preventDefault();
                    triggerPhoneCall(e);
                  }}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c2a36b]" />
                  분양상담실 직통 {PROPERTY_INFO.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          * 상기 시뮬레이션 금액은 층수, 향, 금융기관 심사 기준 및 대출 상품에 따라 실제 계약 시 차이가 발생할 수 있으며, 정확한 분양가는 분양상담사를 통해 확인하시기 바랍니다.
        </p>
      </div>
    </section>
  );
};
