import React from 'react';
import { MapPin, Navigation, Train, ShoppingBag, Trees, Briefcase, Phone, Maximize2 } from 'lucide-react';
import { PROPERTY_INFO, IMAGES } from '../data/propertyData';
import { triggerPhoneCall } from '../utils/phoneUtils';

interface LocationSectionProps {
  onOpenLightbox: (src: string, alt: string) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenLightbox }) => {
  const infraCategories = [
    {
      icon: Train,
      title: '초역세권 쾌속 교통',
      items: [
        '서울 7호선 청라연장 커낼웨이역(가칭) 단지 지하 1층 직결 도보 1분대',
        '서울 지하철 2호선 청라 연장선 추진 계획',
        '공항철도 청라국제도시역 (공항철도-9호선 직결 사업 추진)',
        '수도권제1순환고속도로, 경인고속도로, 인천국제공항고속도로 청라IC 인접',
        'BRT(간선급행버스), GRT(유도고속차량) 대중교통 거점'
      ]
    },
    {
      icon: ShoppingBag,
      title: '원스톱 명품 몰세권',
      items: [
        '단지 바로 앞 홈플러스 청라점, 롯데마트 청라점 도보권',
        '2024년 8월 개장 완료! 대규모 창고형 쇼핑 ‘코스트코 청라점’',
        '2028년 완공 예정 ‘스타필드 청라’ & 2만 3천석 멀티 돔구장',
        '단지 지하 1층~지상 1층 커낼스트리트 대형 테라스 상권 연계'
      ]
    },
    {
      icon: Trees,
      title: '청정 에코 힐링라이프',
      items: [
        '청라국제도시의 상징 4.5km 청라 커낼웨이 수변공원 바로 앞',
        '여의도 공원 약 3배 규모의 청라호수공원 인접 도보 산책',
        '남향 위주 배치로 심곡천 수변 파노라마 조망 확보',
        '도심 속에서 365일 쾌적한 힐링을 누리는 친환경 주거지'
      ]
    },
    {
      icon: Briefcase,
      title: '풍부한 고소득 배후수요',
      items: [
        '하나금융그룹 글로벌 헤드쿼터(HQ) 이전 완료로 4,000여 명 금융인력 유입',
        '800병상 규모 서울아산청라병원 의료복합타운 건립 (5,000여 명 의료인력)',
        '인천 로봇랜드 조성사업 및 도시첨단산업단지 배후 임대수요',
        '2026년 청라하늘대교(제3연륙교) 개통으로 영종~청라 바이오 벨트 연결'
      ]
    }
  ];

  return (
    <section id="location" className="py-20 lg:py-28 bg-[#f1f5f9] text-[#1d2430]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-serif text-3xl sm:text-4xl text-[#c2a36b] tracking-wider uppercase mb-2">
            LOCATION
          </p>
          <div className="w-12 h-0.5 bg-[#c2a36b] mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a1a30] mb-4">
            서울지하철 7호선 바로 앞 (커낼웨이역)
          </h2>
          <p className="text-lg font-semibold text-[#16365e]">
            역 출입구까지 100m 이내, 보행 기준 1분대 압도적 초역세권
          </p>
        </div>

        {/* Split Grid: Image on Left, Explanations on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Location Map Image */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 group bg-gray-900">
              <img
                src={IMAGES.locationMap}
                alt="청라 더리브 티아모 Casa 광역 입지도"
                className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-5">
                <span className="text-white text-sm font-medium">청라 더리브 티아모 Casa 광역 입지도</span>
                <button
                  onClick={() => onOpenLightbox(IMAGES.locationMap, '청라 더리브 티아모 Casa 광역 입지도')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-gray-900 text-xs font-semibold hover:bg-white transition cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  크게보기
                </button>
              </div>
              <button
                onClick={() => onOpenLightbox(IMAGES.locationMap, '청라 더리브 티아모 Casa 광역 입지도')}
                className="sm:hidden absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-black/70 text-white text-[11px]"
              >
                <Maximize2 className="w-3 h-3" /> 크게보기
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2.5">
              * 상기 입지도는 소비자의 이해를 돕기 위한 그래픽 컷으로 실제와 다소 차이가 있을 수 있습니다.
            </p>
          </div>

          {/* Location Text Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16365e]/10 text-[#16365e] text-xs font-bold w-fit mb-4">
              <Navigation className="w-3.5 h-3.5" />
              청라국제도시 핵심 요지
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#0a1a30] leading-snug mb-4">
              날씨 걱정 없는 커낼웨이역 직결 동선,<br />
              <span className="text-[#c2a36b]">서울 강남까지 원스톱</span>
            </h3>

            <div className="space-y-3.5 text-gray-600 text-sm leading-relaxed mb-6">
              <p>
                청라 더리브 티아모 까사는 현재 착공하여 활발히 공사가 진행 중인{' '}
                <strong className="text-gray-900 font-semibold">
                  서울지하철 7호선 청라연장선 커낼웨이역(가칭)
                </strong>{' '}
                바로 앞에 위치한 최고의 입지입니다.
              </p>
              <p>
                특히 <strong className="text-[#16365e]">단지 지하 1층에서 커낼웨이 및 지하철 역사로 바로 연결</strong>
                되어 비가 오거나 눈이 오는 날에도 지상으로 올라올 필요 없이 쾌적하게 지하철을 이용하실 수 있습니다.
              </p>
              <p className="bg-white p-3.5 rounded-lg border border-gray-200 text-[#16365e] font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c2a36b] shrink-0" />
                <span>역 출입구 100m 이내 / 보행 기준 1분대 최단 동선</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
                onClick={(e) => {
                  e.preventDefault();
                  triggerPhoneCall(e);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] font-bold text-sm transition shadow-sm cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>입지 전문상담 010-8873-7258</span>
              </a>
            </div>
          </div>
        </div>

        {/* Surrounding Aerial View Figure */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 group bg-gray-900">
            <img
              src={IMAGES.locationSurrounding}
              alt="청라 더리브 티아모 Casa 주변 조감도 — 커낼웨이, 홈플러스, 롯데마트"
              className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
              <span className="text-white text-sm font-medium">단지 주변 조감도 — 커낼웨이 중심상업지구와 청라호수공원</span>
              <button
                onClick={() => onOpenLightbox(IMAGES.locationSurrounding, '청라 더리브 티아모 Casa 단지 주변 조감도')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-gray-900 text-xs font-semibold hover:bg-white transition cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                크게보기
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2.5 font-medium">
            단지 주변 — 커낼웨이 중심상업지구와 청라호수공원, 대형마트가 인접한 완성형 인프라
          </p>
        </div>

        {/* 4 Life Infra Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infraCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 sm:p-7 border border-gray-200/80 shadow-sm hover:border-[#c2a36b] transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-11 h-11 rounded-lg bg-[#0a1a30] text-[#c2a36b] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0a1a30]">{cat.title}</h4>
                </div>
                <ul className="space-y-2.5 text-sm text-gray-600">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c2a36b] mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
