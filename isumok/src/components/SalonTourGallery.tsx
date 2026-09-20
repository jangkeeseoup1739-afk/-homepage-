import React, { useState } from 'react';
import { Sparkles, Eye, X, ZoomIn, Sun, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

// 사용자가 지정한 4개의 이미지 직접 import
import photoKakao06 from '../assets/images/KakaoTalk_20260918_140116699_06.webp';
import photoKakao02 from '../assets/KakaoTalk_20260918_140116699_02.webp';
import photoKakao03 from '../assets/images/KakaoTalk_20260918_140116699_03.webp';
import photoKakao05 from '../assets/images/KakaoTalk_20260918_140116699_05.webp';

interface SalonPhoto {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  imageUrl: string;
}

// 사용자가 명시적으로 지정한 4장의 사진으로 정확히 구성
const FIXED_SALON_PHOTOS: SalonPhoto[] = [
  {
    id: 'photo-kakao-06',
    title: '원목 인테리어 1:1 맞춤 시술 공간',
    subtitle: '아늑한 편백·원목 감성과 따뜻한 간접조명의 프라이빗 시술석',
    tag: '1인 프라이빗석',
    imageUrl: photoKakao06
  },
  {
    id: 'photo-kakao-02',
    title: '비건 인증 케어 라인 & 원목 벽면 진열대',
    subtitle: 'EVE VEGAN 인증 프리미엄 두피 힐링 케어 제품과 아늑한 원목 인테리어',
    tag: '비건 두피 케어',
    imageUrl: photoKakao02
  },
  {
    id: 'photo-kakao-03',
    title: '프라이빗 샴푸실 & 안락한 시술 체어',
    subtitle: '부드러운 레이스 커튼으로 분리된 편안한 샴푸존과 1:1 맞춤 좌석',
    tag: '샴푸실 & 시술존',
    imageUrl: photoKakao03
  },
  {
    id: 'photo-kakao-05',
    title: '100% 천연 오가닉 케어 제품 진열 공간',
    subtitle: '화학 성분을 최소화하고 두피와 손상모를 보호하는 엄선된 저자극 제품',
    tag: '천연 오가닉 제품',
    imageUrl: photoKakao05
  }
];

export const SalonTourGallery: React.FC = () => {
  const photos = FIXED_SALON_PHOTOS;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [brightnessLevel, setBrightnessLevel] = useState<'bright' | 'extraBright'>('bright');

  // 사진을 시원하고 화사하게 밝혀주는 CSS 필터
  const brightnessFilterClass = brightnessLevel === 'extraBright' 
    ? 'brightness-[1.20] contrast-[1.04] saturate-[1.06]' 
    : 'brightness-[1.12] contrast-[1.03] saturate-[1.05]';

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  };

  return (
    <section id="salon-tour" className="py-16 sm:py-20 bg-[#11131a] border-b border-[#222634] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#232838]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c202d] border border-[#d4af37]/40 text-xs text-[#f7e7b4] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-bold tracking-wider">SALON PHOTO GALLERY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-luxury font-bold text-white tracking-tight">
              실내 공간 & <span className="gold-gradient-text">사진 갤러리</span>
            </h2>
            <p className="text-sm sm:text-base text-[#a6b0c3] mt-2 max-w-2xl leading-relaxed">
              이수목헤어스토리의 정수리 링거펌 시술과 아늑한 원목 인테리어, 천연 오가닉 케어 환경입니다.
            </p>
          </div>

          {/* 사진 밝기 제어 툴 */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#9aa2b5] font-medium flex items-center gap-1.5 mr-1">
              <Sun className="w-4 h-4 text-[#d4af37]" />
              사진 밝기:
            </span>
            <button
              type="button"
              onClick={() => setBrightnessLevel('bright')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                brightnessLevel === 'bright'
                  ? 'bg-[#d4af37] text-[#121316] shadow-md'
                  : 'bg-[#1a1d27] text-[#8e95a7] hover:text-white border border-[#2b3040]'
              }`}
            >
              화사한 밝기
            </button>
            <button
              type="button"
              onClick={() => setBrightnessLevel('extraBright')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                brightnessLevel === 'extraBright'
                  ? 'bg-[#d4af37] text-[#121316] shadow-md'
                  : 'bg-[#1a1d27] text-[#8e95a7] hover:text-white border border-[#2b3040]'
              }`}
            >
              아주 밝게 (+20%)
            </button>
          </div>
        </div>

        {/* 큼직한 2열 대형 갤러리 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group rounded-3xl bg-[#161922] border border-[#2c3244] hover:border-[#d4af37]/70 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[#d4af37]/10 cursor-pointer"
            >
              {/* 대형 와이드 사진 영역 (16:10 비율, 밝기 필터 적용) */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0f15]">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${brightnessFilterClass}`}
                  loading="lazy"
                />

                {/* 태그 뱃지 */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-[#d4af37]/50 text-xs font-bold text-[#f7e7b4] flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{photo.tag}</span>
                </div>

                {/* 확대 아이콘 버튼 */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-[#d4af37] group-hover:bg-black/80 transition-all shadow-lg">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* 마우스 호버 오버레이 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[1px]">
                  <span className="px-4 py-2 rounded-xl bg-[#12141c]/90 text-xs sm:text-sm font-bold text-white flex items-center gap-2 border border-[#d4af37]/60 shadow-xl">
                    <ZoomIn className="w-4 h-4 text-[#d4af37]" />
                    <span>클릭하여 고화질 원본 크게 보기</span>
                  </span>
                </div>
              </div>

              {/* 하단 텍스트 정보 */}
              <div className="p-5 sm:p-6 bg-gradient-to-b from-[#161922] to-[#13151d] border-t border-[#252a3a]">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-base sm:text-lg font-serif-luxury font-bold text-white group-hover:text-[#f7e7b4] transition-colors">
                    {photo.title}
                  </h3>
                  <span className="text-xs text-[#8c94a8] font-medium shrink-0 group-hover:text-[#d4af37] flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>크게 보기</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#9ea8bc] leading-relaxed">
                  {photo.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 전체 화면 대형 라이트박스 팝업 */}
      {selectedPhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#151722] border border-[#3b4155] rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-7 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              type="button"
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-[#202432] hover:bg-[#2c3246] text-[#b0b7c7] hover:text-white transition-colors z-20 shadow-lg cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 이전/다음 네비게이션 */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#d4af37] text-white hover:text-[#121316] border border-white/20 hover:border-[#d4af37] transition-all z-20 cursor-pointer shadow-xl"
              aria-label="이전 사진"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#d4af37] text-white hover:text-[#121316] border border-white/20 hover:border-[#d4af37] transition-all z-20 cursor-pointer shadow-xl"
              aria-label="다음 사진"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* 헤더 정보 */}
            <div className="pr-12">
              <span className="inline-block px-3 py-1 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 text-xs font-bold text-[#f7e7b4] mb-1.5">
                {photos[selectedPhotoIndex].tag} ({selectedPhotoIndex + 1} / {photos.length})
              </span>
              <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
                {photos[selectedPhotoIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#cbd3e4] mt-1">
                {photos[selectedPhotoIndex].subtitle}
              </p>
            </div>

            {/* 대형 사진 표시 영역 */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0a0c10] border border-[#2a2f3f] max-h-[72vh] flex items-center justify-center">
              <img
                src={photos[selectedPhotoIndex].imageUrl}
                alt={photos[selectedPhotoIndex].title}
                className={`w-full h-auto max-h-[72vh] object-contain ${brightnessFilterClass}`}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
