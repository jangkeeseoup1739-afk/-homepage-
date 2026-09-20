import React, { useState } from 'react';
import { Sparkles, Clock, Check, Heart, Shield, ArrowRight, Eye, X } from 'lucide-react';
import { SERVICES_DATA } from '../data/salonData';
import { ServiceItem } from '../types';

interface MenuSectionProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectServiceForBooking }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string; desc: string } | null>(null);

  const filterTabs = ['전체', '열펌', '매직/볼륨매직', '링거펌', '일반펌', '커트', '스타일링'];

  const filteredServices = selectedFilter === '전체'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === selectedFilter);

  return (
    <section id="menu" className="py-20 bg-[#14151b] border-b border-[#252833] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20232c] border border-[#d4af37]/30 text-xs text-[#d4af37]">
            <Heart className="w-3.5 h-3.5 fill-[#d4af37]/20 text-[#d4af37]" />
            <span className="font-semibold tracking-wide">이수목 원장의 정성 어린 시술 메뉴</span>
            <Heart className="w-3.5 h-3.5 fill-[#d4af37]/20 text-[#d4af37]" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
            ♥♥ 머리 이야기 ♥♥
          </h2>

          <p className="text-sm sm:text-base text-[#9ea3b2] leading-relaxed">
            모든 펌과 시술은 모발과 두피에 무리를 주지 않는 <span className="text-[#f7e7b4] font-medium">천연 유기농 베이스 제품</span>으로 진행됩니다.
            스타일별 실제 완성 사진을 통해 원하시는 느낌을 미리 확인해 보세요.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  selectedFilter === tab
                    ? 'bg-[#d4af37] text-[#121316] font-bold shadow-md shadow-[#d4af37]/25'
                    : 'bg-[#1c1e26] text-[#cbd2e1] hover:text-white hover:bg-[#252833] border border-[#2d313d]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid with Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              className={`rounded-2xl bg-[#181a22] border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group shadow-lg ${
                service.isSignature
                  ? 'border-[#d4af37]/70 shadow-[#d4af37]/15 bg-gradient-to-b from-[#1b1e28] to-[#181a22]'
                  : 'border-[#2d313d] hover:border-[#4f5567]'
              }`}
            >
              <div>
                {/* Photo Header */}
                {service.imageUrl && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#121317]">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181a22] via-[#181a22]/30 to-transparent" />

                    {/* Category & Signature Badges on Image */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                      <span className="px-3 py-1 rounded-md bg-black/80 backdrop-blur-md text-xs font-bold text-[#f7e7b4] border border-[#d4af37]/50 shadow">
                        {service.category}
                      </span>
                      {service.isSignature && (
                        <span className="px-2.5 py-1 rounded-md bg-[#d4af37] text-[#121316] text-xs font-bold shadow flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          원장 시그니처
                        </span>
                      )}
                    </div>

                    {/* Quick Preview Button */}
                    <button
                      onClick={() => setPreviewImage({
                        url: service.imageUrl!,
                        title: service.name,
                        desc: service.styleExampleLabel || service.description
                      })}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-[#dcdfe6] hover:text-[#f7e7b4] hover:bg-black/90 flex items-center justify-center transition-all border border-white/20 z-10"
                      title="사진 크게보기"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Style Example Label on Image Bottom */}
                    {service.styleExampleLabel && (
                      <div className="absolute bottom-2.5 left-3 right-3 z-10">
                        <span className="inline-block px-3 py-1 rounded-lg bg-[#14151b]/90 backdrop-blur-md text-xs sm:text-sm text-white border border-[#3e4353] font-semibold">
                          ✦ {service.styleExampleLabel}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Card Body */}
                <div className="p-5 sm:p-6 space-y-3.5">
                  {/* Highlight */}
                  {service.highlight && (
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#f7e7b4]">
                      <Sparkles className="w-4 h-4 text-[#d4af37]" />
                      <span>{service.highlight}</span>
                    </div>
                  )}

                  {/* Service Name */}
                  <h3 className="text-lg sm:text-xl font-serif-luxury font-bold text-white group-hover:text-[#f7e7b4] transition-colors">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#cbd2e1] leading-relaxed font-normal">
                    {service.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#cbd2e1] pt-2 pb-3 border-b border-[#2d313e]">
                    <Clock className="w-4 h-4 text-[#d4af37]" />
                    <span>소요 시간: <strong className="text-white font-bold">{service.estimatedTime}</strong></span>
                  </div>

                  {/* Recommended list */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-xs font-bold text-[#f7e7b4] uppercase tracking-wider">이런 분께 추천해요</p>
                    {service.recommendedFor.map((rec, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs sm:text-sm text-[#cbd2e1]">
                        <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => onSelectServiceForBooking(service.name)}
                  className="w-full py-3 px-4 rounded-xl bg-[#222530] hover:bg-[#d4af37] text-xs sm:text-sm font-bold text-white hover:text-[#121316] border border-[#373c4c] hover:border-[#d4af37] transition-all flex items-center justify-center gap-1.5 group/btn shadow"
                >
                  <span>이 시술로 예약 및 상담 신청</span>
                  <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover/btn:text-[#121316] group-hover/btn:translate-x-0.5 transition-all" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Natural Care Principle Callout */}
        <div className="mt-14 rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#191b24] via-[#1d202b] to-[#191b24] border border-[#d4af37]/45 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center shrink-0 text-[#d4af37] shadow">
              <Shield className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-base sm:text-xl font-serif-luxury font-bold text-white">
                이수목헤어스토리의 ‘천연 성분 고집’ 약속
              </h4>
              <p className="text-sm text-[#cbd2e1] max-w-2xl leading-relaxed">
                두피 가려움, 따가움, 잔류 화학 냄새가 없는 친환경 천연 식물성 베이스 펌제와 앰플만을 엄선하여 사용합니다. 
                임산부나 두피가 민감하신 분들도 안심하고 시술받으실 수 있습니다.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => onSelectServiceForBooking('천연 두피·모발 케어 상담')}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-[#242733] hover:bg-[#d4af37] text-sm text-[#f7e7b4] hover:text-[#121316] border border-[#d4af37]/50 hover:border-[#d4af37] font-bold transition-all shadow"
          >
            1:1 천연케어 맞춤 상담받기
          </button>
        </div>

      </div>

      {/* Lightbox Modal for Style Photo */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="relative max-w-2xl w-full bg-[#181a24] rounded-2xl border border-[#d4af37]/50 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full bg-black">
              <img src={previewImage.url} alt={previewImage.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-1.5">
              <h3 className="text-lg font-bold text-white">{previewImage.title}</h3>
              <p className="text-xs sm:text-sm text-[#d4af37]">{previewImage.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
