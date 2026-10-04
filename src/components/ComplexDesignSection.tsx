import React from 'react';
import { Maximize2, Shield, Eye, Layers, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { IMAGES, FLOOR_STRUCTURE, SMART_SYSTEMS } from '../data/propertyData';

interface ComplexDesignSectionProps {
  onOpenLightbox: (src: string, alt: string) => void;
}

export const ComplexDesignSection: React.FC<ComplexDesignSectionProps> = ({
  onOpenLightbox
}) => {
  return (
    <section id="design" className="py-20 lg:py-28 bg-[#0a1a30] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-serif text-3xl sm:text-4xl text-[#c2a36b] tracking-wider uppercase mb-2">
            SPECIAL DESIGN
          </p>
          <div className="w-12 h-0.5 bg-[#c2a36b] mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
            청라를 상징하는 독보적 단지 특화설계
          </h2>
          <p className="text-base sm:text-lg text-[#b9c5d6] font-normal">
            하늘을 잇는 스카이브릿지부터 3면 조망, 43층 랜드마크 스카이라인
          </p>
        </div>

        {/* 20F Skybridge Feature Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20 bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-10">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c2a36b]/20 border border-[#c2a36b]/40 text-[#e0cba3] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#c2a36b]" />
              특화설계 01
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              3개 동을 하나로 잇는<br />
              <span className="text-[#c2a36b]">지상 20층 스카이브릿지</span>
            </h3>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              청라 더리브 티아모 까사의 20층 스카이브릿지는 단순히 외관의 화려함만을 위한 조형물이 아닙니다.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <Shield className="w-5 h-5 text-[#c2a36b] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white mb-1">지진 대비 구조적 내진 안정성 강화</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    초고층 3개 동의 횡하중과 풍하중을 분산 흡수하여 건물 전체의 구조적 안전성을 비약적으로 높였습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <Layers className="w-5 h-5 text-[#c2a36b] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white mb-1">비상 대피 통로 겸용 안심 설계</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    유사시 인접 동으로 즉각 피난할 수 있는 공중 안전 통로 역할을 수행하는 특화 설계를 적용했습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-wider text-[#c2a36b] font-bold mb-3">
                층별 구성 가이드
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                {FLOOR_STRUCTURE.map((f, i) => (
                  <li key={i} className="flex items-baseline gap-2.5">
                    <span className="text-[#e0cba3] font-bold shrink-0 min-w-[85px]">{f.floor}</span>
                    <span className="text-gray-400 leading-relaxed">{f.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-gray-900">
              <img
                src={IMAGES.skybridge}
                alt="청라 더리브 티아모 Casa 20층 스카이브릿지"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-5">
                <span className="text-white text-xs sm:text-sm font-semibold">
                  20층 스카이브릿지 외관 투시도
                </span>
                <button
                  onClick={() => onOpenLightbox(IMAGES.skybridge, '20층 스카이브릿지 외관 투시도')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-gray-900 text-xs font-semibold hover:bg-white transition cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" /> 크게보기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Way Panorama View Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16365e] text-[#c2a36b] text-xs font-semibold mb-3">
              <Compass className="w-3.5 h-3.5" />
              남향 위주 배치 &amp; 3면 파노라마 조망
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              어느 방향에서도 막힘 없는 와이드 뷰
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              풍부한 일조량과 채광을 확보하고, 시티타워·커낼웨이·심곡천의 3가지 매력을 선사합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-[#c2a36b] font-bold block mb-1">남서향 VIEW</span>
              <h4 className="text-base font-bold text-white">시티타워 View</h4>
              <p className="text-xs text-gray-400 mt-1">청라의 초고층 시티라인과 도심 야경</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-[#c2a36b] font-bold block mb-1">남동향 VIEW</span>
              <h4 className="text-base font-bold text-white">커낼웨이 View</h4>
              <p className="text-xs text-gray-400 mt-1">도심 속 수변공원의 활기찬 정취</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-[#c2a36b] font-bold block mb-1">남향 VIEW</span>
              <h4 className="text-base font-bold text-white">심곡천 View</h4>
              <p className="text-xs text-gray-400 mt-1">심곡천 물길과 자연이 주는 편안한 휴식</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group bg-gray-900">
            <img
              src={IMAGES.view}
              alt="청라 더리브 티아모 Casa 남향 위주 배치 및 방향별 조망"
              className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-5">
              <span className="text-white text-xs sm:text-sm font-semibold">
                단지 배치 방향별 조망권 안내도
              </span>
              <button
                onClick={() => onOpenLightbox(IMAGES.view, '단지 배치 방향별 조망권 안내도')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-gray-900 text-xs font-semibold hover:bg-white transition cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" /> 크게보기
              </button>
            </div>
          </div>
        </div>

        {/* Common Amenities & Retail MD Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Common Amenities */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#c2a36b] uppercase tracking-wider block mb-2">
                Public Amenity
              </span>
              <h4 className="text-lg font-bold text-white mb-2">입주민 힐링 공용공간</h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                1층 웰컴테라스, 2층 시크릿정원 &amp; 휴게정원, 20층 스카이브릿지까지 단지 안에서 풍요로운 여가를 누립니다.
              </p>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-white/10 group bg-black/40 mt-2">
              <img
                src={IMAGES.common}
                alt="공용공간 안내"
                className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
              />
              <button
                onClick={() => onOpenLightbox(IMAGES.common, '입주민 힐링 공용공간 안내도')}
                className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-black/70 text-white text-[11px]"
              >
                <Maximize2 className="w-3 h-3" /> 크게보기
              </button>
            </div>
          </div>

          {/* Retail MD */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#c2a36b] uppercase tracking-wider block mb-2">
                Canal Street
              </span>
              <h4 className="text-lg font-bold text-white mb-2">단지 내 근린생활시설 MD 구성</h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                지하 1층 커낼스트리트 상권과 바로 이어지며 대형 F&amp;B, 메디컬 등 앵커 테넌트로 완성됩니다.
              </p>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-white/10 group bg-black/40 mt-2">
              <img
                src={IMAGES.retail}
                alt="근린생활시설 MD 구성"
                className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
              />
              <button
                onClick={() => onOpenLightbox(IMAGES.retail, '단지 내 근린생활시설 MD 구성')}
                className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-black/70 text-white text-[11px]"
              >
                <Maximize2 className="w-3 h-3" /> 크게보기
              </button>
            </div>
          </div>
        </div>

        {/* 12 Smart Systems Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              입주민을 위한 12대 스마트 첨단 시스템
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              안전, 에너지 절약, 편리한 주차까지 생활 전반을 케어하는 스마트 라이프 솔루션
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {SMART_SYSTEMS.map((sys, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#c2a36b] transition flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-[#c2a36b] mt-1.5 shrink-0" />
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-white mb-0.5">{sys.name}</h5>
                  <p className="text-[11px] text-gray-400 leading-tight">{sys.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Site Layout & Unit Map Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              단지 배치도 &amp; 동호수 배치도
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              대지 약 100M × 185M의 쾌적한 동간 거리 확보와 프라이버시 보호 설계
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/30 group">
              <img
                src={IMAGES.siteplan2}
                alt="단지 배치도"
                className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="p-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-300 font-medium">단지 배치도 (타입별 호실수 포함)</span>
                <button
                  onClick={() => onOpenLightbox(IMAGES.siteplan2, '단지 배치도')}
                  className="text-xs text-[#c2a36b] hover:underline cursor-pointer"
                >
                  확대보기
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/30 group">
              <img
                src={IMAGES.siteplan}
                alt="동간거리 배치도"
                className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="p-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-300 font-medium">동간거리 배치도</span>
                <button
                  onClick={() => onOpenLightbox(IMAGES.siteplan, '동간거리 배치도')}
                  className="text-xs text-[#c2a36b] hover:underline cursor-pointer"
                >
                  확대보기
                </button>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/30 group">
            <img
              src={IMAGES.unitmap}
              alt="동·호수 배치도"
              className="w-full h-auto object-cover group-hover:scale-[1.01] transition duration-500"
            />
            <div className="p-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-300 font-medium">101 · 102 · 103동 동·호수 배치도</span>
              <button
                onClick={() => onOpenLightbox(IMAGES.unitmap, '101 · 102 · 103동 동·호수 배치도')}
                className="text-xs text-[#c2a36b] hover:underline cursor-pointer"
              >
                확대보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
