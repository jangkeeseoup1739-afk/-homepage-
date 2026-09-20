import React, { useState } from 'react';
import { Sparkles, Clock, CheckCircle2, ChevronRight, PlusCircle, Sliders, Shield } from 'lucide-react';
import { BeforeAfterItem, ServiceCategory } from '../types';

interface BeforeAfterSectionProps {
  items: BeforeAfterItem[];
  onOpenBooking: (serviceName?: string) => void;
  onOpenAdmin: () => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({
  items,
  onOpenBooking,
  onOpenAdmin
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const categories = ['전체', '열펌', '링거펌', '매직/볼륨매직', '일반펌'];

  const filteredItems = selectedCategory === '전체'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const activeItem = filteredItems[activeItemIndex] || filteredItems[0] || items[0];

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pos);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX, rect);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  return (
    <section id="before-after" className="py-20 bg-[#121316] border-b border-[#252833] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20222a] border border-[#d4af37]/40 text-xs text-[#d4af37] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>정직한 변화, 모발과 두피 건강 복구</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
              스타일별 시술 전·후 비교
            </h2>
            <p className="text-sm text-[#9da2b2] mt-2 max-w-xl">
              타 미용실에서 태우거나 망가진 극손상모 복구, 가르마 갈라짐 링거펌 교정 등 
              이수목 원장이 직접 시술한 실제 고객의 전후 사진입니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#1f222b] hover:bg-[#282c38] text-xs font-semibold text-[#d4af37] border border-[#d4af37]/40 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>관리자: 전후 사진 등록</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveItemIndex(0);
                setSliderPosition(50);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#d4af37] text-[#121316] font-bold shadow-md'
                  : 'bg-[#1b1c24] text-[#a8acb9] hover:text-white border border-[#272a35]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Interactive Showcase Grid */}
        {activeItem ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Slider Container (Col 7) */}
            <div className="lg:col-span-7 space-y-4">
              <div
                className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#161820] border border-[#2c303c] select-none cursor-ew-resize group shadow-2xl"
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  handleSliderMove(e.clientX, rect);
                }}
              >
                {/* AFTER Image (Full background) */}
                <img
                  src={activeItem.afterImage}
                  alt={`시술 후 - ${activeItem.title}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* BEFORE Image (Clipped overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={activeItem.beforeImage}
                    alt={`시술 전 - ${activeItem.title}`}
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Before Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-red-600/90 text-white font-bold text-xs sm:text-sm tracking-wider border border-red-400 shadow-md">
                    BEFORE (시술 전)
                  </div>
                </div>

                {/* After Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-[#d4af37] text-[#121316] font-bold text-xs sm:text-sm tracking-wider border border-[#f7e7b4] shadow-md">
                  AFTER (시술 후)
                </div>

                {/* Vertical Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.8)] pointer-events-none"
                  style={{ left: `calc(${sliderPosition}% - 2px)` }}
                >
                  {/* Circular Slider Handle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#161820] border-2 border-[#d4af37] flex items-center justify-center shadow-lg text-[#d4af37]">
                    <Sliders className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Instruction Pill */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#121316]/95 backdrop-blur-md border border-[#3e4354] text-xs text-white font-semibold pointer-events-none shadow-lg">
                  화면을 좌우로 드래그하여 전후 차이를 직접 비교해보세요
                </div>
              </div>

              {/* Slider Thumbnails Selector */}
              <div className="grid grid-cols-4 gap-3">
                {filteredItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveItemIndex(idx);
                      setSliderPosition(50);
                    }}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] border transition-all ${
                      activeItem.id === item.id
                        ? 'border-[#d4af37] ring-2 ring-[#d4af37]/60 scale-102 shadow-md'
                        : 'border-[#303342] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.afterImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <span className="absolute bottom-1.5 left-1.5 right-1.5 text-xs text-white font-bold truncate text-left drop-shadow">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Details & Prescription Card (Col 5) */}
            <div className="lg:col-span-5 bg-[#171922] rounded-2xl p-6 sm:p-7 border border-[#2b2e3a] space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded bg-[#d4af37]/25 border border-[#d4af37]/50 text-[#f7e7b4] text-xs sm:text-sm font-bold shadow-sm">
                    {activeItem.category}
                  </span>
                  <span className="text-xs sm:text-sm text-[#cbd2e1] font-semibold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#d4af37]" />
                    시술 시간: <strong className="text-white font-bold">{activeItem.procedureTime}</strong>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white leading-snug">
                  {activeItem.title}
                </h3>
              </div>

              {/* Problem Analysis */}
              <div className="p-4 rounded-xl bg-[#1f222c] border border-[#2d303b] space-y-2">
                <span className="text-xs font-bold text-red-300 uppercase tracking-wider block">
                  고객 모발 상태 & 고민
                </span>
                <p className="text-sm text-white leading-relaxed font-normal">
                  {activeItem.clientProblem}
                </p>
              </div>

              {/* Solution Recipe */}
              <div className="p-4 rounded-xl bg-[#1f222c] border border-[#2d303b] space-y-2">
                <span className="text-xs font-bold text-[#f7e7b4] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  이수목 원장의 맞춤 처방
                </span>
                <p className="text-sm text-white leading-relaxed font-normal">
                  {activeItem.solutionKey}
                </p>
              </div>

              {/* Natural Ingredients Used */}
              <div className="p-4 rounded-xl bg-[#1a2422] border border-[#2b594b] space-y-2">
                <span className="text-xs font-bold text-[#86efac] uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#86efac]" />
                  사용된 천연 유기농 케어 제품
                </span>
                <p className="text-sm text-[#ecfdf5] leading-relaxed font-medium">
                  {activeItem.naturalCareUsed}
                </p>
              </div>

              {/* CTA button */}
              <button
                onClick={() => onOpenBooking(activeItem.title)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e2c158] to-[#b89225] text-[#121316] font-bold text-sm sm:text-base shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>나도 이 스타일로 상담받기</span>
                <ChevronRight className="w-4 h-4 text-[#121316]" />
              </button>
            </div>

          </div>
        ) : (
          <div className="text-center py-16 bg-[#161821] rounded-2xl border border-[#2b2e3b]">
            <p className="text-[#a0a5b4] text-sm">해당 카테고리의 전후 비교 사진이 없습니다.</p>
            <button
              onClick={onOpenAdmin}
              className="mt-4 px-4 py-2 bg-[#d4af37] text-[#121316] font-semibold text-xs rounded-lg"
            >
              관리자 모드에서 첫 전후 사진 올리기
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
