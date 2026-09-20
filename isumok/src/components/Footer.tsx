import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck, Car, Heart, Sparkles, Key } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin }) => {
  return (
    <footer className="bg-[#0f1013] border-t border-[#252834] text-xs sm:text-sm text-[#cbd2e1] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#d4af37]/70 bg-[#1e2029] flex items-center justify-center text-[#d4af37] font-serif-luxury font-bold text-sm">
                이
              </div>
              <span className="font-serif-luxury text-lg font-bold text-white tracking-tight">
                {SALON_INFO.name}
              </span>
            </div>
            <p className="text-[#cbd2e1] leading-relaxed font-normal">
              모발과 두피를 천연제품으로 정성껏 다스리는 송파구 문정동 1인 프리미엄 예약제 헤어살롱입니다.
            </p>
            <div className="flex items-center gap-1.5 text-[#f7e7b4] font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>원장 1인 맞춤 책임 시술제</span>
            </div>
          </div>

          {/* Contact Col */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase">
              고객 문의 & 전화 예약
            </h4>
            <div className="space-y-1">
              <a
                href={`tel:${SALON_INFO.phonePrimary}`}
                className="block text-sm sm:text-base font-bold text-[#f7e7b4] hover:text-[#d4af37] transition-colors"
              >
                {SALON_INFO.phonePrimary}
              </a>
              <a
                href={`tel:${SALON_INFO.phoneSecondary}`}
                className="block text-xs sm:text-sm text-[#cbd2e1] font-semibold hover:text-white transition-colors"
              >
                {SALON_INFO.phoneSecondary}
              </a>
            </div>
            <p className="text-xs text-[#cbd2e1]/80 font-normal">
              시술 중에는 전화 연결이 지연될 수 있습니다. 네이버 예약 이용 시 가장 편리합니다.
            </p>
          </div>

          {/* Hours & Holiday */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase">
              영업시간 및 정기 휴무
            </h4>
            <div className="space-y-1.5 text-xs sm:text-sm text-[#cbd2e1]">
              <p className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#d4af37]" />
                <span>평일: <strong className="text-white font-bold">09:00 ~ 18:00</strong></span>
              </p>
              <p className="text-[#ff9f8e] font-bold pl-5">
                정기 휴무: 매주 수요일, 일요일
              </p>
              <p className="flex items-center gap-1.5 pt-1 text-[#f7e7b4] font-bold">
                <Car className="w-4 h-4 text-[#d4af37]" />
                <span>102호 앞 전용 무료 주차 가능</span>
              </p>
            </div>
          </div>

          {/* Address & Quick Actions */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase">
              살롱 위치
            </h4>
            <p className="text-xs sm:text-sm text-[#cbd2e1] flex items-start gap-1.5 leading-relaxed font-medium">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <span>{SALON_INFO.address} (1층 102호)</span>
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-lg bg-[#22242e] hover:bg-[#d4af37] text-white hover:text-[#121316] font-bold text-xs sm:text-sm transition-colors border border-[#373c4d] shadow"
              >
                실시간 예약 & 1:1 상담
              </button>
              <button
                onClick={onOpenAdmin}
                className="text-xs text-[#cbd2e1] hover:text-[#d4af37] flex items-center justify-center gap-1.5 py-1.5 font-medium transition-colors"
              >
                <Key className="w-3.5 h-3.5" />
                <span>관리자 모드 (전후 비교 및 포트폴리오 관리)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-[#1c1e26] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#cbd2e1]">
          <p>© {new Date().getFullYear()} {SALON_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <span>상호: {SALON_INFO.name}</span>
            <span>대표자: 이수목</span>
            <span>특색: 천연 모발·두피 케어 살롱</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
