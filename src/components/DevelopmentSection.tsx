import React, { useState } from 'react';
import { Maximize2, CheckCircle2, Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { DEVELOPMENTS, IMAGES, DevelopmentItem } from '../data/propertyData';

interface DevelopmentSectionProps {
  onOpenLightbox: (src: string, alt: string) => void;
}

export const DevelopmentSection: React.FC<DevelopmentSectionProps> = ({
  onOpenLightbox
}) => {
  const [filter, setFilter] = useState<'all' | 'done' | 'in_progress'>('all');

  const filteredDevs = DEVELOPMENTS.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <section id="develop" className="py-20 lg:py-28 bg-[#f8fafc] text-[#1d2430]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="font-serif text-3xl sm:text-4xl text-[#c2a36b] tracking-wider uppercase mb-2">
            DEVELOPMENT
          </p>
          <div className="w-12 h-0.5 bg-[#c2a36b] mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a1a30] mb-3">
            청라국제도시 메가 비전 &amp; 7대 개발호재
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            2024년 코스트코 개장을 시작으로 차례로 실현되는 특급 미래가치
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            교통 · 상업 · 업무 · 첨단의료 인프라가 집중되어 완성형 자족도시로 도약합니다.
          </p>
        </div>

        {/* Development Map Status Overview */}
        <div className="mb-14">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 group bg-gray-900">
            <img
              src={IMAGES.devStatus}
              alt="청라지구 개발 현황도"
              className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-5">
              <span className="text-white text-sm font-semibold">
                청라국제도시 주요 개발 10건 위치도
              </span>
              <button
                onClick={() => onOpenLightbox(IMAGES.devStatus, '청라국제도시 개발 현황도')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-gray-900 text-xs font-semibold hover:bg-white transition cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" /> 크게보기
              </button>
            </div>
            <button
              onClick={() => onOpenLightbox(IMAGES.devStatus, '청라국제도시 개발 현황도')}
              className="sm:hidden absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-black/70 text-white text-[11px]"
            >
              <Maximize2 className="w-3 h-3" /> 크게보기
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2.5">
            청라국제도시 개발 현황도 — 청라 더리브 티아모 Casa 위치와 핵심 개발 10선
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
              filter === 'all'
                ? 'bg-[#0a1a30] text-white shadow'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
            }`}
          >
            전체 호재 (7건)
          </button>
          <button
            onClick={() => setFilter('done')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 ${
              filter === 'done'
                ? 'bg-[#102a4c] text-white shadow'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#c2a36b]" />
            오픈/개통/준공 완료
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 ${
              filter === 'in_progress'
                ? 'bg-[#16365e] text-white shadow'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-[#c2a36b]" />
            공사진행 및 예정
          </button>
        </div>

        {/* Development Timeline Grid */}
        <div className="space-y-6 mb-16">
          {filteredDevs.map((dev) => (
            <div
              key={dev.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* Card Header */}
              <div className="p-6 sm:p-7 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#c2a36b]">
                    {dev.year}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0a1a30] tracking-tight">
                    {dev.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 rounded bg-gray-100 text-gray-600 font-semibold">
                    {dev.category}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 ${
                      dev.status === 'done'
                        ? 'bg-[#0a1a30] text-white'
                        : 'bg-[#c2a36b]/20 text-[#16365e]'
                    }`}
                  >
                    {dev.status === 'done' ? (
                      <CheckCircle2 className="w-3 h-3 text-[#c2a36b]" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    {dev.statusLabel}
                  </span>
                </div>
              </div>

              {/* Card Content & Image */}
              <div className="p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7">
                  <ul className="space-y-2.5 text-sm sm:text-base text-gray-600">
                    {dev.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#c2a36b] mt-2 shrink-0" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-xl overflow-hidden border border-gray-200 group/img bg-gray-900">
                    <img
                      src={dev.image}
                      alt={dev.title}
                      className="w-full h-auto object-cover group-hover/img:scale-105 transition duration-500"
                    />
                    <button
                      onClick={() => onOpenLightbox(dev.image, dev.title)}
                      className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 text-white text-xs hover:bg-black transition cursor-pointer"
                    >
                      <Maximize2 className="w-3 h-3" /> 조감도 보기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison with Songdo */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm mb-8">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h4 className="text-lg sm:text-xl font-bold text-[#0a1a30] mb-1">
              송도국제도시와 청라국제도시 비교 분석
            </h4>
            <p className="text-xs sm:text-sm text-gray-500">
              서울 접근성 및 대형 유통·의료 집약도에서 압도적인 가치를 지닌 청라
            </p>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-gray-200 group bg-gray-900">
            <img
              src={IMAGES.devCompare}
              alt="송도국제도시와 청라국제도시 비교 자료"
              className="w-full h-auto object-cover group-hover:scale-[1.01] transition duration-500"
            />
            <button
              onClick={() => onOpenLightbox(IMAGES.devCompare, '송도국제도시와 청라국제도시 비교 자료')}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs hover:bg-black transition cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" /> 전체 비교표 확대보기
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center">
          ※ 상기 개발 계획 및 개통·준공 일정은 관계 정부 부처 및 지자체, 시행사의 사정에 따라 다소 변경되거나 지연될 수 있습니다.
        </p>
      </div>
    </section>
  );
};
