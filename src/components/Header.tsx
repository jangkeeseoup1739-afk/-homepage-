import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Sparkles } from 'lucide-react';
import { PROPERTY_INFO } from '../data/propertyData';
import { triggerPhoneCall } from '../utils/phoneUtils';

interface HeaderProps {
  onOpenReservation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Simple active section detection
      const sections = [
        'overview',
        'location',
        'premium',
        'kitchen',
        'plan',
        'design',
        'develop',
        'calculator',
        'gallery',
        'contact',
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '사업개요', href: '#overview', id: 'overview' },
    { label: '입지환경', href: '#location', id: 'location' },
    { label: '프리미엄', href: '#premium', id: 'premium' },
    { label: 'Dada주방', href: '#kitchen', id: 'kitchen' },
    { label: '평면안내', href: '#plan', id: 'plan' },
    { label: '단지설계', href: '#design', id: 'design' },
    { label: '개발호재', href: '#develop', id: 'develop' },
    { label: '분양혜택', href: '#calculator', id: 'calculator' },
    { label: '갤러리', href: '#gallery', id: 'gallery' },
    { label: '방문예약', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a1a30]/95 backdrop-blur-md shadow-lg shadow-black/25 border-b border-white/10 py-2.5'
            : 'bg-[#0a1a30]/90 backdrop-blur-sm py-3 border-b border-white/10'
        }`}
      >
        <div className="w-full max-w-[1560px] mx-auto px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-2 lg:gap-3">
          {/* 1. Brand Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 sm:gap-2.5 shrink-0 group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-[#c2a36b] bg-[#c2a36b]/15 flex items-center justify-center text-[#c2a36b] font-bold text-xs tracking-tighter group-hover:bg-[#c2a36b] group-hover:text-[#0a1a30] transition-colors">
              청라
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-white font-bold text-sm sm:text-base lg:text-[17px] tracking-tight whitespace-nowrap">
                  더리브 티아모
                </span>
                <span className="font-serif italic text-xs sm:text-sm text-[#e0cba3] font-normal">
                  Casa
                </span>
              </div>
              <span className="text-[9.5px] sm:text-[10px] text-gray-400 tracking-wider -mt-0.5 whitespace-nowrap hidden sm:inline">
                지상 43층 랜드마크 · 7호선 직결
              </span>
            </div>
          </a>

          {/* 2. Direct Section Jump Buttons (한 줄로 볼 수 있는 바로가기 메뉴바) */}
          <nav className="hidden md:flex items-center justify-center gap-0.5 lg:gap-1 xl:gap-1.5 flex-1 min-w-0 px-1 overflow-x-auto no-scrollbar">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-2 lg:px-2.5 xl:px-3 py-1.5 rounded-md text-[11.5px] lg:text-[12.5px] xl:text-[13px] font-medium tracking-tight whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-[#0a1a30] bg-[#c2a36b] font-bold shadow-sm'
                      : 'text-gray-200 hover:text-[#c2a36b] hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* 3. Quick Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Reservation Button - Naver Form */}
            <a
              href={PROPERTY_INFO.naverReservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded text-xs font-bold bg-[#c2a36b] text-[#0a1a30] hover:bg-[#e0cba3] transition shadow-md shadow-black/20 whitespace-nowrap cursor-pointer hover:scale-[1.02]"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>방문예약 신청 (네이버폼)</span>
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
              onClick={(e) => {
                e.preventDefault();
                triggerPhoneCall(e);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-bold bg-[#16365e] hover:bg-[#1f4a80] text-white border border-[#c2a36b]/40 hover:border-[#c2a36b] transition shadow-md whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#c2a36b] animate-pulse shrink-0" />
              <span className="tracking-wide font-mono">{PROPERTY_INFO.phoneDisplay}</span>
            </a>

            {/* Mobile Hamburger Button (Only on mobile < 768px) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-white hover:text-[#c2a36b] transition focus:outline-none"
              aria-label="메뉴 열기"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Sub-bar for phone screens (< 768px) so mobile users also get a 1-line quick scroll! */}
        <div className="md:hidden flex items-center gap-1 overflow-x-auto no-scrollbar px-3 pt-2 pb-1 border-t border-white/5 bg-[#0a1a30]/80">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="px-2.5 py-1 rounded text-[11px] font-medium text-gray-300 hover:text-[#c2a36b] bg-white/5 hover:bg-white/10 whitespace-nowrap shrink-0 transition"
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      {/* Mobile Fullscreen Drawer Menu (Opened via hamburger on mobile) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden pt-[95px] bg-[#0a1a30]/98 backdrop-blur-xl border-b border-white/10 animate-in slide-in-from-top-4 duration-200">
          <div className="max-w-md mx-auto px-6 py-6 flex flex-col gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-2">
              <div className="flex items-center justify-between text-xs text-[#c2a36b] mb-1">
                <span>공식 분양상담 직통</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> 사전방문예약제
                </span>
              </div>
              <div className="text-xl font-bold text-white tracking-wider font-mono">
                {PROPERTY_INFO.phoneDisplay}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                출발 전 미리 예약하시면 대기 없이 맞춤 상담 가능합니다.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-4 py-3 rounded bg-white/[0.04] hover:bg-white/[0.1] text-sm font-medium text-gray-200 hover:text-[#c2a36b] transition border border-white/5 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-[#c2a36b] text-xs">&gt;</span>
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href={PROPERTY_INFO.naverReservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3.5 rounded bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] font-bold text-sm flex items-center justify-center gap-2 shadow"
              >
                <Calendar className="w-4 h-4" />
                네이버 폼으로 방문예약 접수하기
              </a>
              <a
                href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  triggerPhoneCall(e);
                }}
                className="w-full py-3.5 rounded bg-[#16365e] text-white font-bold text-sm flex items-center justify-center gap-2 border border-[#c2a36b]/40 text-center cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#c2a36b]" />
                전화 바로 걸기 ({PROPERTY_INFO.phoneDisplay})
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
