import React, { useState } from 'react';
import { Camera, Eye, X, Calendar, Sparkles } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  onSelectStyle: (styleTitle: string) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ items, onSelectStyle }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const categories = ['전체', '열펌', '링거펌', '매직/볼륨매직', '일반펌', '커트'];

  const filteredItems = selectedFilter === '전체'
    ? items
    : items.filter(item => item.category === selectedFilter);

  return (
    <section id="portfolio" className="py-20 bg-[#14161d] border-b border-[#252833] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20222a] border border-[#d4af37]/30 text-xs text-[#d4af37]">
            <Camera className="w-3.5 h-3.5" />
            <span className="font-semibold">STYLE GALLERY</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
            포트폴리오 갤러리
          </h2>

          <p className="text-xs sm:text-sm text-[#9ea3b2]">
            원장 1인의 정교한 디자인과 천연 케어로 완성한 시술 결과물을 확인해보세요.
          </p>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  selectedFilter === cat
                    ? 'bg-[#d4af37] text-[#121316] font-bold shadow-md shadow-[#d4af37]/20'
                    : 'bg-[#1b1d25] text-[#a6abb8] hover:text-white border border-[#282b36]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#181a22] border border-[#282b36] hover:border-[#d4af37]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-lg flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#121316]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14161d] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#121316]/80 backdrop-blur-md border border-[#2f3340] text-[11px] text-[#f7e7b4] font-medium">
                  {item.category}
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="px-3.5 py-2 rounded-lg bg-[#d4af37] text-[#121316] text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <Eye className="w-3.5 h-3.5" />
                    상세보기
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-base font-serif-luxury font-bold text-white group-hover:text-[#f3e5ab] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9095a5] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded text-xs font-semibold bg-[#222530] text-[#cbd2e1] border border-[#343846]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#171922] rounded-2xl border border-[#d4af37]/50 overflow-hidden shadow-2xl space-y-0">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:text-[#d4af37] transition-colors border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-black">
              <img
                src={activeModalItem.imageUrl}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-4 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md text-[#f7e7b4] text-xs sm:text-sm font-bold border border-[#d4af37]/50 shadow">
                {activeModalItem.category}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
                {activeModalItem.title}
              </h3>

              <p className="text-sm text-white leading-relaxed font-normal">
                {activeModalItem.description}
              </p>

              {activeModalItem.designerNote && (
                <div className="p-4 rounded-xl bg-[#1f222d] border border-[#363a49] text-xs sm:text-sm text-[#dcdfe6] space-y-1.5">
                  <div className="text-xs font-bold text-[#f7e7b4] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    원장의 디자인 & 시술 팁
                  </div>
                  <p className="text-[#cbd2e1] leading-relaxed">{activeModalItem.designerNote}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeModalItem.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded text-xs font-semibold bg-[#242733] text-[#f7e7b4] border border-[#3e4456]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action */}
              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    const title = activeModalItem.title;
                    setActiveModalItem(null);
                    onSelectStyle(title);
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e2c158] to-[#b89225] text-[#121316] font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-md"
                >
                  <Calendar className="w-4 h-4 text-[#121316]" />
                  <span>이 스타일로 상담/예약 신청</span>
                </button>
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-6 py-3.5 rounded-xl bg-[#232631] hover:bg-[#2e3240] text-white text-xs sm:text-sm font-bold border border-[#3a3e4e] transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
