import React, { useState } from 'react';
import { Sparkles, Check, Phone, ShieldCheck, ArrowRight, Maximize2 } from 'lucide-react';
import { CORE_BENEFITS, PREMIUM_EIGHT, IMAGES, PROPERTY_INFO } from '../data/propertyData';
import { triggerPhoneCall } from '../utils/phoneUtils';

interface PremiumSectionProps {
  onOpenLightbox: (src: string, alt: string) => void;
  onOpenReservation: () => void;
}

export const PremiumSection: React.FC<PremiumSectionProps> = ({
  onOpenLightbox,
  onOpenReservation
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const interiorPhotos = [
    {
      src: IMAGES.interiorMain,
      title: 'LDK 통합형 거실 & 이탈리아 Dada 다이닝 식탁',
      desc: '탁 트인 개방감의 거실과 대리석 아일랜드 식탁 일체형'
    },
    {
      src: IMAGES.interiorKitchen,
      title: 'Molteni&C | Dada 최고급 주방 & 비스포크 가전',
      desc: '이탈리아 직수입 세라믹 상판 및 프리미엄 수전'
    },
    {
      src: IMAGES.interiorMaster,
      title: '호텔 스위트룸 감성의 마스터 베드룸',
      desc: '은은한 간접 LED 무드등과 와이드 침실'
    },
    {
      src: IMAGES.interiorLiving,
      title: '광폭 포세린 타일 바닥과 감각적 아트월 거실',
      desc: '우물형 천장 조명과 럭셔리 소파 라운지'
    }
  ];

  const selectedPhoto = interiorPhotos[selectedPhotoIndex] || interiorPhotos[0];

  return (
    <section id="premium" className="py-20 lg:py-28 bg-[#ffffff] text-[#1d2430]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-serif text-3xl sm:text-4xl text-[#c2a36b] tracking-wider uppercase mb-2">
            PREMIUM
          </p>
          <div className="w-12 h-0.5 bg-[#c2a36b] mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a1a30] mb-3">
            비교할 수 없는 8대 핵심 프리미엄
          </h2>
          <p className="text-base sm:text-lg text-gray-500 font-normal">
            선택의 이유가 분명한 청라 더리브 티아모 Casa만의 특별한 가치
          </p>
        </div>

        {/* 3 Core Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {CORE_BENEFITS.map((item, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-2xl bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] border border-gray-200 hover:border-[#c2a36b] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-4xl text-[#c2a36b] font-semibold block mb-3">
                  {item.num}
                </span>
                <span className="text-xs font-semibold text-[#16365e] tracking-wider uppercase block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="text-xl font-bold text-[#0a1a30] mb-3 group-hover:text-[#16365e] transition">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between">
                <span className="text-xs text-[#c2a36b] font-semibold">Special Benefit</span>
                <span className="w-6 h-6 rounded-full bg-[#c2a36b]/15 text-[#c2a36b] flex items-center justify-center text-xs group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Premium 01 ~ 08 Grid */}
        <div className="mb-20">
          <h3 className="text-xl font-bold text-center text-[#0a1a30] mb-8">
            청라국제도시를 압도하는 8대 특장점
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {PREMIUM_EIGHT.map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-[#c2a36b] hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-xs font-semibold tracking-wider text-[#c2a36b] uppercase block mb-2">
                    {p.tag}
                  </span>
                  <h4 className="text-base font-bold text-[#0a1a30] mb-2 leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dada Kitchen Special Feature Section */}
        <div id="kitchen" className="rounded-3xl bg-[#0a1a30] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c2a36b]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text description */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c2a36b]/20 border border-[#c2a36b]/40 text-[#e0cba3] text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#c2a36b]" />
                전 세대 무상 기본 적용 (일부 펜트 제외)
              </div>

              <div className="font-serif text-3xl sm:text-4xl text-[#c2a36b] mb-2 tracking-wide">
                Molteni&C <span className="text-white/40">|</span> Dada
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                그동안 볼 수 없었던<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e0cba3] to-[#c2a36b]">
                  이탈리아 하이엔드 주방가구
                </span>
              </h3>

              <div className="space-y-3.5 text-gray-300 text-sm leading-relaxed mb-6 font-light">
                <p>
                  세계 최고의 명품 가구 그룹 <strong className="text-white font-medium">Molteni&C의 럭셔리 주방 브랜드 Dada</strong>가
                  청라 더리브 티아모 까사와 함께합니다.
                </p>
                <p>
                  고급 주상복합이나 한남동 하이엔드 펜트하우스에서나 볼 수 있던 프리미엄 사양을{' '}
                  <strong className="text-[#e0cba3] font-semibold">전 호실에 기본 무상 인테리어</strong>로
                  적용하여 일상의 품격을 높여드립니다.
                </p>
              </div>

              {/* Specification Highlights */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
                  <div className="text-[#c2a36b] font-bold mb-1">Dada 프리미엄 가구</div>
                  <div className="text-gray-300">주방 도어 · 주방벽 · 세라믹 상판</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
                  <div className="text-[#c2a36b] font-bold mb-1">이탈리아 GESSI 수전</div>
                  <div className="text-gray-300">디자인과 내구성을 겸비한 명품</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
                  <div className="text-[#c2a36b] font-bold mb-1">네덜란드 REGINOX 싱크볼</div>
                  <div className="text-gray-300">저소음 코팅 및 와이드 볼 설계</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
                  <div className="text-[#c2a36b] font-bold mb-1">삼성 비스포크 빌트인 풀옵션</div>
                  <div className="text-gray-300">냉장고·세탁기·건조기·오븐 무상</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenReservation}
                  className="px-6 py-3 rounded-lg bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] font-bold text-sm transition shadow cursor-pointer"
                >
                  모델하우스에서 직접 확인하기
                </button>
                <a
                  href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
                  onClick={(e) => {
                    e.preventDefault();
                    triggerPhoneCall(e);
                  }}
                  className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 transition cursor-pointer"
                >
                  옵션 유선문의
                </a>
              </div>
            </div>

            {/* Kitchen & Interior Photo Interactive Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-black/40">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end justify-between p-5 sm:p-6">
                  <div>
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#c2a36b] block font-semibold mb-1">
                      REAL MODELHOUSE INTERIOR · 실사 촬영
                    </span>
                    <span className="text-white text-sm sm:text-base font-bold block">
                      {selectedPhoto.title}
                    </span>
                    <span className="text-gray-300 text-xs font-light hidden sm:block mt-0.5">
                      {selectedPhoto.desc}
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenLightbox(selectedPhoto.src, selectedPhoto.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-gray-900 text-xs font-semibold hover:bg-white transition cursor-pointer shrink-0 ml-2"
                  >
                    <Maximize2 className="w-3.5 h-3.5" /> 크게보기
                  </button>
                </div>
              </div>

              {/* 4 Multi-cut Thumbnails */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {interiorPhotos.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer h-16 sm:h-20 ${
                      selectedPhotoIndex === idx
                        ? 'border-[#c2a36b] ring-2 ring-[#c2a36b]/40 scale-[1.02]'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    {selectedPhotoIndex === idx && (
                      <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#c2a36b]" />
                    )}
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-gray-400 text-right mt-2">
                ※ 모델하우스 실제 전시 세대 촬영 이미지로, 실물 방문 시 동일하게 관람하실 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
