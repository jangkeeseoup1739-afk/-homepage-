import React from 'react';
import { Maximize2, Building, CheckCircle2, MapPin, Layers, Car, Shield } from 'lucide-react';
import { PROPERTY_INFO, IMAGES } from '../data/propertyData';

interface OverviewProps {
  onOpenLightbox: (src: string, alt: string) => void;
}

export const Overview: React.FC<OverviewProps> = ({ onOpenLightbox }) => {
  const specs = [
    { label: '사 업 명', value: '인천 청라국제도시(157-11) 오피스텔 신축공사' },
    { label: '대지위치', value: PROPERTY_INFO.location },
    { label: '지역지구', value: PROPERTY_INFO.zoning },
    { label: '대지면적', value: PROPERTY_INFO.landArea },
    { label: '건축면적', value: PROPERTY_INFO.buildingArea },
    { label: '건 폐 율', value: PROPERTY_INFO.buildingCoverage },
    { label: '용 적 률', value: PROPERTY_INFO.floorAreaRatio },
    { label: '연 면 적', value: PROPERTY_INFO.grossFloorArea },
    { label: '규모/구조', value: PROPERTY_INFO.scale + ' / ' + PROPERTY_INFO.structure },
    { label: '주차대수', value: PROPERTY_INFO.parking },
    { label: '시 공 사', value: PROPERTY_INFO.builder + ' (책임준공)' },
    { label: '주요특징', value: '7호선 커낼웨이역 직결, 20층 스카이브릿지, Dada 주방' }
  ];

  return (
    <section id="overview" className="py-20 lg:py-28 bg-[#f8fafc] text-[#1d2430]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="font-serif text-3xl sm:text-4xl text-[#c2a36b] tracking-wider uppercase mb-2">
            OVERVIEW
          </p>
          <div className="w-12 h-0.5 bg-[#c2a36b] mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a1a30] mb-4">
            청라의 스카이라인을 바꾸는 새로운 랜드마크
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
            청라국제도시의 최중심에 들어서는 지상 43층 초고층 명품 주거공간
          </p>
          <p className="text-sm sm:text-base text-gray-500 mt-4 leading-relaxed">
            최고 43층 높이로 설계된 3개 동이 20층 스카이브릿지로 하늘에서 연결됩니다.
            커낼웨이와 7호선 역사 직결 프리미엄으로 청라국제도시를 대표할 랜드마크를 만나보세요.
          </p>
        </div>

        {/* Aerial View Image Card with Lightbox trigger */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 group bg-gray-900 mb-12">
          <img
            src={IMAGES.aerial}
            alt="청라 더리브 티아모 Casa 단지 조감도 및 사업개요"
            className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
            <span className="text-white text-sm font-medium">단지 전경 조감도 (지상 43층 초고층)</span>
            <button
              onClick={() => onOpenLightbox(IMAGES.aerial, '청라 더리브 티아모 Casa 단지 전경 조감도')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-gray-900 text-xs font-semibold hover:bg-white transition shadow cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              크게보기
            </button>
          </div>
          <button
            onClick={() => onOpenLightbox(IMAGES.aerial, '청라 더리브 티아모 Casa 단지 전경 조감도')}
            className="sm:hidden absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-black/70 text-white text-[11px]"
          >
            <Maximize2 className="w-3 h-3" /> 크게보기
          </button>
        </div>

        {/* Project Overview Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-12">
          <div className="bg-[#0a1a30] text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-[#c2a36b]" />
              <h3 className="font-bold text-base sm:text-lg">사업개요 상세정보</h3>
            </div>
            <span className="text-xs text-gray-300 font-light hidden sm:inline">
              * 인허가 및 사업추진 과정에서 변경될 수 있습니다.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="divide-y divide-gray-100">
              {specs.slice(0, 6).map((item, idx) => (
                <div key={idx} className="grid grid-cols-3 sm:grid-cols-4 p-4 text-sm hover:bg-gray-50/70 transition">
                  <span className="font-semibold text-gray-700 col-span-1">{item.label}</span>
                  <span className="text-gray-800 col-span-2 sm:col-span-3 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="divide-y divide-gray-100">
              {specs.slice(6).map((item, idx) => (
                <div key={idx} className="grid grid-cols-3 sm:grid-cols-4 p-4 text-sm hover:bg-gray-50/70 transition">
                  <span className="font-semibold text-gray-700 col-span-1">{item.label}</span>
                  <span className="text-gray-800 col-span-2 sm:col-span-3 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Highlights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#c2a36b]/10 text-[#c2a36b] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0a1a30] mb-1">7호선 커낼웨이역 직결</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                단지 지하 1층에서 커낼웨이 및 7호선 역사와 연결되는 초역세권
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#c2a36b]/10 text-[#c2a36b] flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0a1a30] mb-1">20층 스카이브릿지</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                3개 동을 연결하는 하늘길, 지진 대비 내진 안정성과 비상대피로 확보
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#c2a36b]/10 text-[#c2a36b] flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0a1a30] mb-1">Dada 이탈리아 명품주방</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                세계 최고 가구 몰테니앤씨 브랜드 Dada 전 세대 기본 무상 적용
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#c2a36b]/10 text-[#c2a36b] flex items-center justify-center shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0a1a30] mb-1">652대 여유로운 주차</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                세대당 약 1.25대의 쾌적한 주차면적 및 스마트 주차유도시스템
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
