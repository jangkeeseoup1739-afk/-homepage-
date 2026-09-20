import React from 'react';
import { Calendar, Phone, MessageSquare, ArrowUp } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface FloatingActionBarProps {
  onOpenBooking: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile Fixed Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#14161f]/95 backdrop-blur-lg border-t border-[#2d303d] p-2.5 px-4 flex items-center gap-2">
        <a
          href={`tel:${SALON_INFO.phonePrimary}`}
          className="flex-1 py-3 rounded-xl bg-[#20232e] border border-[#373b4b] text-white text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>전화 상담</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-[1.5] py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c660] to-[#b89225] text-[#121316] text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-[#d4af37]/20 active:scale-95 transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span>네이버 예약 & 상담</span>
        </button>
      </div>

      {/* Desktop Floating Speed Dial */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2.5">
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#1e212b] border border-[#343846] text-[#a0a5b4] hover:text-white hover:border-[#d4af37] flex items-center justify-center shadow-lg transition-all"
          title="맨 위로"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        <a
          href={`tel:${SALON_INFO.phonePrimary}`}
          className="px-4 py-2.5 rounded-full bg-[#1e212b] border border-[#383d4c] hover:border-[#d4af37] text-white text-xs font-semibold flex items-center gap-2 shadow-lg transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>0507-1490-1888</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="px-5 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89225] text-[#121316] font-bold text-sm flex items-center gap-2 shadow-xl shadow-[#d4af37]/25 hover:brightness-105 active:scale-95 transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span>네이버 예약 & 1:1 상담</span>
        </button>
      </div>
    </>
  );
};
