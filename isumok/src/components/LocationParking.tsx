import React, { useState } from 'react';
import { MapPin, Phone, Clock, Car, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const LocationParking: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(SALON_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" className="py-20 bg-[#121316] border-b border-[#252833] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#20222a] border border-[#d4af37]/40 text-xs sm:text-sm text-[#f7e7b4]">
            <MapPin className="w-4 h-4 text-[#d4af37]" />
            <span className="font-bold tracking-wider">LOCATION & PARKING</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
            오시는 길 & 주차 안내
          </h2>

          <p className="text-sm sm:text-base text-[#cbd2e1]">
            서울 송파구 문정동 조용하고 아늑한 골목 안, 편안한 1층 전용 주차를 지원합니다.
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Info Cards */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            
            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-[#171922] border border-[#2b2e3a] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-[#f7e7b4] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#d4af37]" />
                  살롱 주소
                </span>
                <button
                  onClick={handleCopyAddress}
                  className="flex items-center gap-1.5 text-xs text-[#cbd2e1] hover:text-[#d4af37] bg-[#22242e] px-3 py-1.5 rounded-md transition-colors border border-[#353947]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">복사완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="font-medium">주소 복사</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {SALON_INFO.address}
                </h3>
                <p className="text-sm text-[#cbd2e1] mt-1 font-medium">
                  {SALON_INFO.detailAddress}
                </p>
              </div>

              {/* Map Links */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(SALON_INFO.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-[#03c75a]/20 hover:bg-[#03c75a]/30 text-[#68f5ac] text-xs sm:text-sm font-bold border border-[#03c75a]/40 transition-colors flex items-center gap-1.5"
                >
                  <span>네이버 지도에서 보기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://map.kakao.com/link/search/${encodeURIComponent(SALON_INFO.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-[#fee500]/20 hover:bg-[#fee500]/30 text-[#ffe924] text-xs sm:text-sm font-bold border border-[#fee500]/40 transition-colors flex items-center gap-1.5"
                >
                  <span>카카오맵 길찾기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Parking Card */}
            <div className="p-6 rounded-2xl bg-[#171922] border border-[#2b2e3a] space-y-2">
              <span className="text-xs sm:text-sm font-bold text-[#f7e7b4] flex items-center gap-1.5">
                <Car className="w-4 h-4 text-[#d4af37]" />
                주차 안내 (무료 지원)
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                매장 1층 102호 앞 바로 주차 가능
              </h3>
              <p className="text-sm text-[#cbd2e1] leading-relaxed">
                건물 1층 102호 매장 전면에 전용 주차 공간이 마련되어 있어 차를 가지고 오셔도 주차 스트레스 없이 여유롭게 시술을 받으실 수 있습니다.
              </p>
            </div>

            {/* Hours & Phone Card */}
            <div className="p-6 rounded-2xl bg-[#171922] border border-[#2b2e3a] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#cbd2e1] flex items-center gap-1.5 mb-1">
                    <Clock className="w-4 h-4 text-[#d4af37]" />
                    영업시간 및 휴무일
                  </span>
                  <p className="text-sm sm:text-base font-bold text-white">
                    평일: {SALON_INFO.weekdayHours}
                  </p>
                  <p className="text-xs sm:text-sm text-[#ff9f8e] font-bold mt-1">
                    매주 {SALON_INFO.closedDays.join(', ')} 정기 휴무
                  </p>
                </div>

                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#cbd2e1] flex items-center gap-1.5 mb-1">
                    <Phone className="w-4 h-4 text-[#d4af37]" />
                    예약 및 상담 전화
                  </span>
                  <div className="space-y-1">
                    <a
                      href={`tel:${SALON_INFO.phonePrimary}`}
                      className="block text-sm sm:text-base font-bold text-white hover:text-[#d4af37] transition-colors"
                    >
                      {SALON_INFO.phonePrimary}
                    </a>
                    <a
                      href={`tel:${SALON_INFO.phoneSecondary}`}
                      className="block text-xs sm:text-sm font-semibold text-[#cbd2e1] hover:text-[#d4af37] transition-colors"
                    >
                      {SALON_INFO.phoneSecondary}
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Map Representation & Real Storefront Photo */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden bg-[#171922] border border-[#2b2e3a] p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  송파구 문정동 찾아오시는 길
                </h3>
                <span className="px-2.5 py-1 rounded bg-[#20232c] text-xs font-semibold text-[#f7e7b4] border border-[#303442]">
                  1인 프라이빗 샵
                </span>
              </div>

              {/* Transit Tips */}
              <div className="space-y-3 text-xs sm:text-sm text-[#cbd2e1]">
                <div className="p-3.5 rounded-xl bg-[#1f222d] border border-[#2c303c]">
                  <strong className="text-white block mb-1 text-sm font-bold">🚇 지하철 & 도보</strong>
                  <span className="leading-relaxed">8호선 문정역 2번 출구 또는 장지역 인근 새말로 방면에서 도보 및 버스 이용 편리</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1f222d] border border-[#2c303c]">
                  <strong className="text-white block mb-1 text-sm font-bold">🚗 자가용 내비게이션 검색</strong>
                  <span className="leading-relaxed">'이수목헤어스토리' 또는 '서울 송파구 새말로17길 12' 입력 후 102호 앞 주차 구역 이용</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1f222d] border border-[#2c303c]">
                  <strong className="text-white block mb-1 text-sm font-bold">🌿 100% 예약 우선제 안내</strong>
                  <span className="leading-relaxed">원장 1인 시술 특성상 사전 예약 없이 방문 시 대기 시간이 길어질 수 있으므로 네이버 예약 또는 전화 예약을 권장드립니다.</span>
                </div>
              </div>
            </div>

            {/* Real Storefront Visual Graphic Card */}
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-[#303340] bg-[#121316] group shadow-lg">
              <img
                src="/isumok_storefront.webp"
                alt="이수목헤어스토리 실제 매장 전면 및 주차장"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/50 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                <div>
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#d4af37]" />
                    {SALON_INFO.name} (실제 매장 외관)
                  </p>
                  <p className="text-xs text-[#dbe0ea] font-medium mt-0.5">
                    {SALON_INFO.address} (1층 102호 앞 주차)
                  </p>
                </div>
                <a
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(SALON_INFO.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-[#d4af37] text-[#121316] text-xs font-bold shadow hover:brightness-105 transition-all shrink-0"
                >
                  네이버 길찾기
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
