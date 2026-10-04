import React from 'react';
import { Phone, MessageSquare, Calendar, Home } from 'lucide-react';
import { PROPERTY_INFO } from '../data/propertyData';
import { triggerPhoneCall } from '../utils/phoneUtils';

interface MobileFixedBarProps {
  onOpenReservation: () => void;
}

export const MobileFixedBar: React.FC<MobileFixedBarProps> = ({ onOpenReservation }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#07121f]/95 backdrop-blur-md border-t border-white/10 shadow-[0_-4px_16px_rgba(0,0,0,0.4)]">
      <div className="grid grid-cols-4 divide-x divide-white/10 text-center">
        {/* Call CTA */}
        <a
          href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
          onClick={(e) => {
            e.preventDefault();
            triggerPhoneCall(e);
          }}
          className="py-3 px-1 flex flex-col items-center justify-center gap-1 text-white bg-[#c2a36b] hover:bg-[#e0cba3] transition active:scale-95 cursor-pointer"
        >
          <Phone className="w-4 h-4 text-[#0a1a30] fill-current" />
          <span className="text-[11px] font-bold text-[#0a1a30]">전화상담</span>
        </a>

        {/* SMS CTA */}
        <a
          href={`sms:${PROPERTY_INFO.smsNumber}?body=${encodeURIComponent(
            '청라 더리브 티아모 까사 분양 상담 문의드립니다.'
          )}`}
          className="py-3 px-1 flex flex-col items-center justify-center gap-1 text-gray-200 hover:text-white transition active:scale-95"
        >
          <MessageSquare className="w-4 h-4 text-[#c2a36b]" />
          <span className="text-[11px] font-medium">문자상담</span>
        </a>

        {/* Plan link */}
        <a
          href="#plan"
          className="py-3 px-1 flex flex-col items-center justify-center gap-1 text-gray-200 hover:text-white transition active:scale-95"
        >
          <Home className="w-4 h-4 text-[#c2a36b]" />
          <span className="text-[11px] font-medium">평면도</span>
        </a>

        {/* Visit Reservation -> Naver Form */}
        <a
          href={PROPERTY_INFO.naverReservationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-1 flex flex-col items-center justify-center gap-1 text-[#e0cba3] font-bold hover:text-white transition active:scale-95 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#c2a36b]" />
          <span className="text-[11px]">네이버 예약</span>
        </a>
      </div>
    </div>
  );
};
