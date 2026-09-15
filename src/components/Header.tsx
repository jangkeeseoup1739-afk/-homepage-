import React, { useState } from 'react';
import { Menu, X, Sparkles, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavClick, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'saju', label: '사주팔자' },
    { id: 'wealth', label: '재물운' },
    { id: 'career', label: '사업운' },
    { id: 'match', label: '궁합' },
    { id: 'luck', label: '대운·세운' },
    { id: 'ai-chat', label: 'AI상담' },
  ];

  return (
    <header data-myeonggyeol-header className="sticky top-0 z-50 bg-[#0D0E14]/90 backdrop-blur-md border-b border-[#262432]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <div 
          id="brand-logo"
          onClick={() => onNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Traditional Symbol with Sun/Moon and Mountain motif */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1E202B] to-[#12131A] border border-[#D4AF7C]/50 flex items-center justify-center relative shadow-md group-hover:border-[#D4AF7C] transition-all">
            <div className="absolute inset-0 rounded-full bg-[#D4AF7C]/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sparkles className="w-6 h-6 text-[#D4AF7C]" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-kr text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FFFFFF] group-hover:text-[#D4AF7C] transition-colors">
                명결
              </span>
              <span className="text-sm text-[#D4AF7C] font-serif-kr font-semibold tracking-widest">
                命結
              </span>
            </div>
            <p className="text-xs text-[#E2E8F0] font-normal tracking-wide hidden sm:block">
              당신의 운명을 이어주는 특별한 순간
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onNavClick(item.id)}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all ${
                activeSection === item.id
                  ? 'text-[#FFFFFF] bg-[#222436] shadow-sm border border-[#D4AF7C]/50'
                  : 'text-[#E2E8F0] hover:text-[#FFFFFF] hover:bg-[#1A1C26]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181A24] border border-[#D4AF7C]/40 text-xs sm:text-sm font-medium text-[#F5D298]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            정통 만세력 & AI 도사 상시 대기
          </div>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#E2E8F0] hover:text-[#FFFFFF] hover:bg-[#1A1C26]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#12131A] border-b border-[#262432] px-4 pt-2 pb-5 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => {
                onNavClick(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                activeSection === item.id
                  ? 'text-[#D4AF7C] bg-[#1E202B] border-l-2 border-[#D4AF7C]'
                  : 'text-[#CDC7BD] hover:bg-[#1A1C26]'
              }`}
            >
              <span>{item.label}</span>
              {item.id === 'ai-chat' && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4AF7C]/20 text-[#D4AF7C]">
                  AI 풀이
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
