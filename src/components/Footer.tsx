import React from 'react';
import { Phone, ShieldCheck, MapPin, Building2, FileSpreadsheet } from 'lucide-react';
import { PROPERTY_INFO } from '../data/propertyData';
import { triggerPhoneCall } from '../utils/phoneUtils';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050c15] text-gray-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 pb-24 lg:pb-16 text-xs leading-relaxed">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Brand */}
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <div className="w-6 h-6 rounded border border-[#c2a36b] text-[#c2a36b] flex items-center justify-center text-[10px] font-black">
            청라
          </div>
          <span>더리브 티아모</span>
          <span className="font-serif italic text-[#c2a36b] font-normal text-xl">Casa</span>
        </div>

        {/* Business details */}
        <div className="space-y-1.5 text-gray-400 max-w-2xl">
          <p>
            <strong className="text-gray-300">현장명 :</strong> {PROPERTY_INFO.name} ｜{' '}
            <strong className="text-gray-300">사업명 :</strong> 인천 청라국제도시(157-11) 오피스텔 신축공사
          </p>
          <p>
            <strong className="text-gray-300">현장 위치 :</strong> {PROPERTY_INFO.location} ｜{' '}
            <strong className="text-gray-300">시공사 :</strong> {PROPERTY_INFO.builder} (책임준공)
          </p>
          <p>
            <strong className="text-gray-300">분양상담 직통 :</strong>{' '}
            <a
              href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
              onClick={(e) => {
                e.preventDefault();
                triggerPhoneCall(e);
              }}
              className="text-[#c2a36b] font-bold text-sm hover:underline cursor-pointer"
            >
              {PROPERTY_INFO.phoneDisplay}
            </a>{' '}
            ｜ <strong className="text-gray-300">운영형태 :</strong> 100% 사전 예약제 홍보관
          </p>
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl text-gray-400 text-[11px] leading-relaxed border-t border-white/5 pt-6">
          <p>
            ※ 본 분양 안내 홈페이지에 수록된 개발 계획, 조감도, 투시도, 아이소메트릭, 사진 및 면적 수치는 소비자의 이해를 돕기 위한 참고 자료이며, 관계 기관의 인·허가 및 설계 변경에 따라 실제 시공과 다소 차이가 있을 수 있습니다.
          </p>
          <p className="mt-1">
            ※ 서울지하철 7호선 연장선, 스타필드 청라, 서울아산청라병원 등 개발 호재는 각 주관 기관의 사정에 따라 일정 및 내용이 변경될 수 있으므로 계약 전 분양공고 및 계약서를 반드시 직접 확인하시기 바랍니다.
          </p>
        </div>

        <div className="text-gray-400 text-[11px]">
          Copyright © {new Date().getFullYear()} {PROPERTY_INFO.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
