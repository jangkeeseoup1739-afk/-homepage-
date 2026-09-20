import React, { useState } from 'react';
import { Calendar, Phone, Sparkles, ShieldCheck, Car, Clock, ArrowRight, Award, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreMenu: () => void;
  onExploreBeforeAfter: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onExploreMenu,
  onExploreBeforeAfter
}) => {
  const [heroView, setHeroView] = useState<'storefront' | 'styling'>('storefront');
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#121316] via-[#16181f] to-[#121316] py-16 sm:py-24 border-b border-[#252833]">
      {/* Decorative Gold Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#d4af37]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#c59b27]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Storytelling & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#20222a] border border-[#d4af37]/50 text-xs sm:text-sm text-white font-medium shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-pulse" />
              <span className="text-[#f7e7b4] font-bold">1인 프라이빗 살롱</span>
              <span className="text-[#686e80]">|</span>
              <span className="text-white font-semibold">모발과 두피를 천연제품으로 관리하는 곳</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-serif-luxury font-bold text-white tracking-tight leading-[1.25]">
              자극 없이 건강하게, <br className="hidden sm:inline" />
              <span className="gold-gradient-text">천연 제품</span>으로 피어나는 <br />
              당신만의 헤어 실루엣
            </h1>

            {/* Descriptive Subtext */}
            <p className="text-base sm:text-lg text-[#d8dde8] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <strong className="text-white font-bold">이수목헤어스토리</strong>는 대형 미용실처럼 스텝이 바뀌지 않는
              <span className="text-[#f7e7b4] font-bold"> 원장 1인 책임 전담제</span> 살롱입니다.
              손상모를 되살리는 열펌부터 특허 링거펌, 차분한 볼륨매직까지 
              순한 천연 유기농 성분으로 두피와 모발 건강을 최우선으로 가꿉니다.
            </p>

            {/* Core Feature Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="p-3.5 rounded-xl bg-[#1a1c24] border border-[#303442] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">원장 1인 전담제</h4>
                  <p className="text-xs text-[#cbd2e1] font-medium mt-0.5">처음부터 끝까지 1:1 맞춤</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1a1c24] border border-[#303442] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">천연 유기농 케어</h4>
                  <p className="text-xs text-[#cbd2e1] font-medium mt-0.5">무자극 두피·모발 영양</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1a1c24] border border-[#303442] col-span-2 sm:col-span-1 flex items-start gap-2.5">
                <Car className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">편리한 무료 주차</h4>
                  <p className="text-xs text-[#cbd2e1] font-medium mt-0.5">102호 매장 바로 앞 주차</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c660] to-[#b89225] text-[#121316] font-bold text-sm sm:text-base shadow-lg shadow-[#d4af37]/25 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5 text-[#121316]" />
                <span>네이버 예약 & 1:1 상담</span>
              </button>

              <button
                onClick={onExploreBeforeAfter}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#1f212a] hover:bg-[#282b36] border border-[#3e424f] hover:border-[#d4af37]/60 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 group"
              >
                <span>시술 전후 비교 갤러리</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${SALON_INFO.phonePrimary}`}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl border border-[#373b49] hover:border-[#525768] text-white hover:text-[#f7e7b4] text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>전화 상담</span>
              </a>
            </div>

            {/* Notice / Business Hours Info */}
            <div className="pt-2 text-xs sm:text-sm text-[#cbd2e1] font-medium flex items-center justify-center lg:justify-start gap-3 flex-wrap">
              <span className="flex items-center gap-1.5 text-white">
                <Clock className="w-4 h-4 text-[#d4af37]" />
                <span>영업시간: <strong className="text-white">평일 09:00 ~ 18:00</strong></span>
              </span>
              <span className="text-[#595f70]">•</span>
              <span className="text-[#ff9f8e] font-bold">
                정기 휴무: 매주 수요일, 일요일
              </span>
            </div>
          </div>

          {/* Right Column: Visual Card Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Card */}
              <div className="relative rounded-2xl p-1 bg-gradient-to-b from-[#d4af37]/50 via-[#313544] to-[#1d1f27] shadow-2xl">
                <div className="rounded-[14px] bg-[#161820] overflow-hidden p-4 sm:p-5 space-y-4">
                  
                  {/* View Switcher Tabs */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#121316] border border-[#2d313d]">
                    <button
                      type="button"
                      onClick={() => setHeroView('storefront')}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        heroView === 'storefront'
                          ? 'bg-[#d4af37] text-[#121316] shadow-md'
                          : 'text-[#cbd2e1] hover:text-white hover:bg-[#1f222d]'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>매장 전경 (문정동)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroView('styling')}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        heroView === 'styling'
                          ? 'bg-[#d4af37] text-[#121316] shadow-md'
                          : 'text-[#cbd2e1] hover:text-white hover:bg-[#1f222d]'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>헤어 스타일링</span>
                    </button>
                  </div>

                  {/* Hero Salon Image with Badge */}
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-[#353947]">
                    <img
                      src={
                        heroView === 'storefront'
                          ? '/isumok_storefront.webp'
                          : '/hero_korean_salon_1789556822966.webp'
                      }
                      alt={
                        heroView === 'storefront'
                          ? '이수목헤어스토리 실제 매장 전면 및 102호 전용 주차 공간'
                          : '이수목헤어스토리 1:1 맞춤 헤어 스타일링 및 살롱'
                      }
                      className="w-full h-full object-cover brightness-100 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/30" />
                    
                    <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-[#121316]/90 backdrop-blur-md border border-[#d4af37]/60 text-xs text-[#f7e7b4] font-bold flex items-center gap-1.5 shadow">
                      {heroView === 'storefront' ? (
                        <>
                          <ImageIcon className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>송파구 문정동 실제 매장 외관 (102호)</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>프리미엄 1:1 살롱 케어</span>
                        </>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-[#121316]/90 backdrop-blur-md px-3.5 py-2.5 rounded-lg border border-[#363a49]">
                      <div>
                        <p className="font-bold text-white text-xs sm:text-sm">이수목 원장 1:1 예약제</p>
                        <p className="text-xs text-[#d0d5e2] font-medium mt-0.5">
                          {heroView === 'styling'
                            ? '열펌 · 링거펌 · 볼륨매직 전문'
                            : '1층 102호 전면 무료 주차 완비'}
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-[#d4af37]/25 text-[#f7e7b4] text-xs font-bold border border-[#d4af37]/40 shadow-sm">
                        100% 천연제품
                      </span>
                    </div>
                  </div>

                  {/* Summary Attributes */}
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm p-3 rounded-lg bg-[#1c1f29] border border-[#2d3240]">
                      <span className="text-[#cbd2e1] font-semibold">위치 안내</span>
                      <span className="text-white font-bold text-right truncate max-w-[220px]">
                        {SALON_INFO.address}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs sm:text-sm p-3 rounded-lg bg-[#1c1f29] border border-[#2d3240]">
                      <span className="text-[#cbd2e1] font-semibold">주차 지원</span>
                      <span className="text-[#f7e7b4] font-bold">
                        102호 앞 전용 무료 주차 가능
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm p-3 rounded-lg bg-[#1c1f29] border border-[#2d3240]">
                      <span className="text-[#cbd2e1] font-semibold">대표 전화</span>
                      <div className="flex items-center gap-2">
                        <a href="tel:0507-1490-1888" className="text-white font-bold hover:text-[#d4af37] transition-colors">0507-1490-1888</a>
                        <span className="text-[#656b7c]">/</span>
                        <a href="tel:02-3012-1888" className="text-white font-bold hover:text-[#d4af37] transition-colors">02-3012-1888</a>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Quick Button */}
                  <button
                    onClick={onExploreMenu}
                    className="w-full py-3 text-center text-xs sm:text-sm text-[#f7e7b4] hover:text-white bg-[#222530] hover:bg-[#2c303f] border border-[#3e4454] hover:border-[#d4af37] rounded-xl transition-all flex items-center justify-center gap-1.5 font-bold shadow-sm"
                  >
                    <span>♥♥머리 이야기 시술 메뉴 전체보기♥♥</span>
                    <ArrowRight className="w-4 h-4 text-[#d4af37]" />
                  </button>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
