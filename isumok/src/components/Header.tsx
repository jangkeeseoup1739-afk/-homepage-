import React, { useState } from 'react';
import { Phone, Calendar, Clock, MapPin, ShieldCheck, Car, Menu, X, Sparkles, Key } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface HeaderProps {
  onOpenBooking: (serviceName?: string) => void;
  onOpenAdmin: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenAdmin,
  activeSection,
  setActiveSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'salon-tour', label: '매장·실내' },
    { id: 'menu', label: '머리이야기' },
    { id: 'before-after', label: '전후비교' },
    { id: 'portfolio', label: '포트폴리오' },
    { id: 'natural-care', label: '천연케어' },
    { id: 'reviews', label: '고객리뷰' },
    { id: 'location', label: '오시는길·주차' },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#121316]/95 backdrop-blur-md border-b border-[#2a2d36] transition-all">
      {/* Top Banner with Quick Contact & Status */}
      <div className="bg-[#18191f] border-b border-[#252830] text-xs text-[#a0a4b0] py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-[#d4af37]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <strong className="text-white font-medium">원장 1인 맞춤 전담제</strong>
            </span>
            <span className="hidden sm:inline-block text-[#3e424f]">|</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#e6ca65]" />
              천연제품 모발·두피 집중 케어
            </span>
            <span className="hidden sm:inline-block text-[#3e424f]">|</span>
            <span className="flex items-center gap-1.5 text-[#b8bcc8]">
              <Car className="w-3.5 h-3.5 text-[#d4af37]" />
              102호 전용 무료 주차 가능
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#b8bcc8]">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>평일 09:00~18:00 (수·일 휴무)</span>
            </span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[11px] text-[#8e93a0] hover:text-[#d4af37] bg-[#22242b] hover:bg-[#2c2f38] px-2 py-0.5 rounded transition-colors ml-1"
              title="시술 전후 사진 및 살롱 관리"
            >
              <Key className="w-3 h-3 text-[#d4af37]" />
              관리자
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 xl:gap-4 flex-nowrap whitespace-nowrap">
        {/* Brand Logo - Single Line Layout */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 sm:gap-2.5 group shrink-0 whitespace-nowrap"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#d4af37]/60 bg-gradient-to-br from-[#242731] to-[#16171c] flex items-center justify-center text-[#d4af37] font-serif-luxury font-bold text-sm sm:text-base shadow-sm group-hover:border-[#d4af37] transition-colors shrink-0">
            이
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap whitespace-nowrap">
            <span className="font-serif-luxury text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white group-hover:text-[#f3e5ab] transition-colors whitespace-nowrap">
              {SALON_INFO.name}
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-wider uppercase text-[#d4af37] font-medium font-cinzel whitespace-nowrap">
              HAIR STORY
            </span>
            <span className="hidden xl:inline-block text-[#3e424f]">|</span>
            <span className="hidden xl:inline-block text-xs font-bold text-[#cbd2e1] whitespace-nowrap">
              1:1 맞춤 천연 모발·두피 살롱
            </span>
          </div>
        </a>

        {/* Desktop Nav Links - Single Line */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 flex-nowrap whitespace-nowrap">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-2 xl:px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium whitespace-nowrap transition-all ${
                activeSection === item.id
                  ? 'text-[#d4af37] bg-[#20222a] border border-[#d4af37]/30 shadow-sm'
                  : 'text-[#c2c6d2] hover:text-white hover:bg-[#1a1c22]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons - Single Line */}
        <div className="hidden sm:flex items-center gap-2 shrink-0 whitespace-nowrap">
          <a
            href={`tel:${SALON_INFO.phonePrimary}`}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#393d49] text-xs font-medium text-[#dcdfe6] hover:bg-[#20232c] hover:border-[#d4af37]/50 transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>0507-1490-1888</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e2c158] to-[#b89225] text-[#121316] font-semibold text-xs xl:text-sm shadow-md hover:brightness-105 active:scale-95 transition-all whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>네이버 예약 & 상담</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded-lg text-[#c2c6d2] hover:text-white hover:bg-[#1e2027] shrink-0"
          aria-label="메뉴 열기"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#16181f] border-b border-[#2d303b] px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#d4d8e2] hover:text-[#d4af37] hover:bg-[#20232c] transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#252833] flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89225] text-[#121316] font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              네이버 예약 & 1:1 상담 신청
            </button>
            <div className="grid grid-cols-2 gap-2 text-center">
              <a
                href={`tel:${SALON_INFO.phonePrimary}`}
                className="py-2 px-2 bg-[#20222a] border border-[#333742] rounded-lg text-xs text-[#dcdfe6] flex items-center justify-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                전화 1
              </a>
              <a
                href={`tel:${SALON_INFO.phoneSecondary}`}
                className="py-2 px-2 bg-[#20222a] border border-[#333742] rounded-lg text-xs text-[#dcdfe6] flex items-center justify-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                전화 2
              </a>
            </div>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="w-full py-2 text-xs text-[#8e93a0] hover:text-[#d4af37] flex items-center justify-center gap-1 bg-[#1a1c23] rounded border border-[#2b2d37]"
            >
              <Key className="w-3 h-3 text-[#d4af37]" />
              관리자 모드 (전후 사진 및 예약 관리)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
