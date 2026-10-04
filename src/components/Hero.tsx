import React, { useState } from 'react';
import { Phone, Calendar, ChevronDown, ShieldCheck, MapPin, Sparkles, Maximize2, Eye, Sun, Moon } from 'lucide-react';
import { PROPERTY_INFO, IMAGES } from '../data/propertyData';
import { triggerPhoneCall } from '../utils/phoneUtils';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenLightbox: (src: string, alt: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onOpenLightbox }) => {
  const [viewMode, setViewMode] = useState<'night' | 'day'>('night');
  const [isMinimalMode, setIsMinimalMode] = useState(false);

  const currentImage = viewMode === 'night' ? IMAGES.hero : IMAGES.aerial;
  const currentTitle =
    viewMode === 'night'
      ? '청라 더리브 티아모 Casa 야경 투시도 (지상 43층 & 20층 스카이브릿지)'
      : '청라 더리브 티아모 Casa 주간 전경 조감도';

  const stats = [
    { label: '건물 규모', value: '지상 43층', sub: '청라 랜드마크 3개동' },
    { label: '교통 프리미엄', value: '7호선 1분', sub: '커낼웨이역 지하 직결' },
    { label: '계약금 혜택', value: '4천만원', sub: '입주 때까지 정액제' },
    { label: '공급 세대수', value: '523실', sub: '선호도 높은 3R 위주' },
  ];

  return (
    <section
      id="top"
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center bg-[#07121f] text-white pt-20 pb-16 overflow-hidden"
    >
      {/* Background Building Image - Clean, Bright, and Prominent */}
      <div className="absolute inset-0 z-0">
        <img
          key={viewMode}
          src={currentImage}
          alt={currentTitle}
          className="w-full h-full object-cover object-[center_20%] lg:object-[center_25%] transition-all duration-700 select-none animate-in fade-in duration-500"
        />

        {/* Minimal gradient overlays to ensure the building shines brightly while text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07121f]/75 via-black/15 to-[#07121f]/95 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* View Switcher Controls (Top Right of Hero) */}
      <div className="absolute top-24 right-4 sm:right-8 z-20 flex items-center gap-2 bg-[#07121f]/85 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-xl">
        <button
          type="button"
          onClick={() => setViewMode('night')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            viewMode === 'night'
              ? 'bg-[#c2a36b] text-[#0a1a30] shadow'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>야경 투시도</span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('day')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            viewMode === 'day'
              ? 'bg-[#c2a36b] text-[#0a1a30] shadow'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>주간 전경</span>
        </button>
        <button
          type="button"
          onClick={() => setIsMinimalMode(!isMinimalMode)}
          className={`p-1.5 rounded-full transition text-xs flex items-center gap-1 cursor-pointer ${
            isMinimalMode ? 'bg-white text-gray-900' : 'text-gray-300 hover:text-white'
          }`}
          title={isMinimalMode ? '전체 정보 보기' : '건물만 시원하게 보기'}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Area */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center transition-all duration-300 ${
          isMinimalMode ? 'opacity-25 hover:opacity-100' : 'opacity-100'
        }`}
      >
        {/* Top Badges */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1a30]/80 backdrop-blur-md border border-[#c2a36b]/60 text-[#f3e7ce] text-xs sm:text-sm font-semibold mb-4 shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-[#c2a36b]" />
          <span>서울 7호선 커낼웨이역 직결 초역세권 ｜ 계약금 4,000만원 정액제</span>
        </div>

        {/* Subtitle with High Contrast Shadow */}
        <p className="text-gray-100 text-xs sm:text-sm md:text-base tracking-widest uppercase font-medium mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          가장 이상적인 위치에서 시작되는 또다른 일상
        </p>

        {/* Main Title with Sharp Drop Shadow */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          청라의 새로운{' '}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fcefd8] to-[#c2a36b]">
            43층 랜드마크
          </span>
        </h1>

        {/* Brand Calligraphy */}
        <div className="flex items-center justify-center gap-3 text-2xl sm:text-3xl md:text-4xl font-medium tracking-wide text-white mb-4 drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
          <span className="font-bold">청라 더리브 티아모</span>
          <span className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-[#f3e7ce] font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            Casa
          </span>
        </div>

        {/* Builder Info & Location Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-200 bg-[#07121f]/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 mb-8 shadow-lg">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#c2a36b]" />
            시공사 <strong>SGC 이테크건설</strong>
          </span>
          <span className="text-gray-400">•</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#c2a36b]" />
            인천광역시 서구 청라동 157-11
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mx-auto mb-8">
          <a
            href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
            onClick={(e) => {
              e.preventDefault();
              triggerPhoneCall(e);
            }}
            className="w-full sm:w-1/2 py-3.5 px-6 rounded-xl bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] font-bold text-base flex items-center justify-center gap-2.5 transition shadow-xl shadow-black/50 hover:scale-[1.02] cursor-pointer"
          >
            <Phone className="w-5 h-5 fill-current" />
            <span>분양문의 전화</span>
          </a>
          <a
            href={PROPERTY_INFO.naverReservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 py-3.5 px-6 rounded-xl bg-[#0a1a30]/85 hover:bg-[#0a1a30] text-white font-semibold text-base border border-[#c2a36b]/60 backdrop-blur flex items-center justify-center gap-2.5 transition hover:scale-[1.02] cursor-pointer shadow-xl shadow-black/50"
          >
            <Calendar className="w-5 h-5 text-[#c2a36b]" />
            <span>네이버 방문예약</span>
          </a>
        </div>

        {/* Sleek Stats Bar with Glassmorphic Styling */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-4xl p-3 sm:p-4 rounded-2xl bg-[#07121f]/80 backdrop-blur-md border border-white/15 shadow-2xl">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/5 text-center flex flex-col justify-center"
            >
              <span className="text-[10px] sm:text-xs text-gray-300 font-medium tracking-tight mb-0.5">
                {s.label}
              </span>
              <div className="text-lg sm:text-2xl font-black text-[#e0cba3] tracking-tight">
                {s.value}
              </div>
              <span className="text-[10px] sm:text-[11px] text-gray-300">
                {s.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Building Full-res Zoom Trigger Button */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => onOpenLightbox(currentImage, currentTitle)}
            className="text-xs text-gray-200 hover:text-[#c2a36b] inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur border border-white/20 transition cursor-pointer shadow-md"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#c2a36b]" />
            <span>건물 조감도 전체화면 원본보기</span>
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#overview"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-gray-300 hover:text-white flex flex-col items-center gap-1 text-[10px] tracking-widest transition drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
      >
        <span>SCROLL DOWN</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#c2a36b]" />
      </a>
    </section>
  );
};
