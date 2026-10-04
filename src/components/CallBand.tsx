import React from 'react';
import { Phone, Calendar, Sparkles } from 'lucide-react';
import { PROPERTY_INFO } from '../data/propertyData';
import { triggerPhoneCall } from '../utils/phoneUtils';

interface CallBandProps {
  title?: string;
  subtitle?: string;
  onOpenReservation?: () => void;
}

export const CallBand: React.FC<CallBandProps> = ({
  title = '분양 문의 & 모델하우스 사전예약',
  subtitle = '모바일에서 전화번호를 터치하시면 분양상담사와 바로 연결됩니다.',
  onOpenReservation
}) => {
  return (
    <section className="bg-gradient-to-r from-[#0d2242] via-[#133a68] to-[#0a1a30] text-white py-14 px-4 sm:px-6 lg:px-8 border-y border-[#c2a36b]/30 relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#c2a36b]/15 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <span className="text-xs uppercase tracking-widest text-[#e0cba3] font-semibold flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#c2a36b]" />
          VIP CONSULTING DIRECT
        </span>

        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-6">
          {subtitle}
        </p>

        <a
          href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
          onClick={(e) => {
            e.preventDefault();
            triggerPhoneCall(e);
          }}
          className="inline-flex items-center gap-3 text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f3e7ce] to-[#c2a36b] hover:scale-105 transition-transform tracking-wider mb-6 cursor-pointer"
        >
          <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-[#c2a36b] fill-current animate-pulse" />
          <span>{PROPERTY_INFO.phoneDisplay}</span>
        </a>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={PROPERTY_INFO.naverReservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] font-bold text-xs sm:text-sm transition shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              네이버 폼으로 방문예약 신청하기
            </a>
            <span className="text-xs text-gray-400">
              * 상담 가능 시간: 연중무휴 24시간 문의 접수
            </span>
          </div>
      </div>
    </section>
  );
};
