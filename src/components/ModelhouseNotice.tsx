import React from 'react';
import { Calendar, Clock, Car, MapPin, Phone, ShieldCheck, Gift } from 'lucide-react';
import { PROPERTY_INFO } from '../data/propertyData';
import { triggerPhoneCall } from '../utils/phoneUtils';

interface ModelhouseNoticeProps {
  onOpenReservation: () => void;
}

export const ModelhouseNotice: React.FC<ModelhouseNoticeProps> = ({ onOpenReservation }) => {
  return (
    <section className="py-16 bg-[#ffffff] border-y border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0a1a30] via-[#102a4c] to-[#07121f] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c2a36b]/20 border border-[#c2a36b]/40 text-[#e0cba3] text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c2a36b]" />
                100% 사전 방문예약제 리뉴얼 오픈
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                모델하우스 방문 예약 안내
              </h3>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                청라 더리브 티아모 까사 홍보관은 쾌적하고 안전한 관람 환경과 VIP 1:1 맞춤 상담을 위해{' '}
                <strong className="text-[#e0cba3] font-medium">100% 사전 예약제</strong>로 운영됩니다.
                출발 전 반드시 예약해 주시기 바랍니다. (당일 예약 가능)
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                  <Clock className="w-4 h-4 text-[#c2a36b] shrink-0" />
                  <span>운영시간 10:00 ~ 18:00</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                  <Car className="w-4 h-4 text-[#c2a36b] shrink-0" />
                  <span>방문 고객 전용 무료 주차</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                  <Gift className="w-4 h-4 text-[#c2a36b] shrink-0" />
                  <span>사전예약 방문 시 소정의 사은품 증정</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                  <Calendar className="w-4 h-4 text-[#c2a36b] shrink-0" />
                  <span>연중무휴 (주말·공휴일 정상운영)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0 min-w-[240px]">
              <a
                href={PROPERTY_INFO.naverReservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] font-bold text-base transition shadow-lg text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5 text-[#0a1a30]" />
                <span>네이버 폼으로 방문예약</span>
              </a>
              <a
                href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
                onClick={(e) => {
                  e.preventDefault();
                  triggerPhoneCall(e);
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#c2a36b]" />
                전화로 당일 예약
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
