import React, { useState } from 'react';
import { Maximize2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { IMAGES } from '../data/propertyData';

interface GallerySectionProps {
  onOpenLightbox: (src: string, alt: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenLightbox }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'exterior' | 'interior' | 'location'>('all');

  const galleryItems = [
    {
      id: 1,
      category: 'exterior',
      src: IMAGES.hero,
      title: '단지 메인 야경 조감도',
      subtitle: '지상 43층 초고층 랜드마크 스카이라인'
    },
    {
      id: 2,
      category: 'exterior',
      src: IMAGES.aerial,
      title: '단지 주간 전경 조감도',
      subtitle: '청라 커낼웨이 중심상업지구 앞 3개 동 전경'
    },
    {
      id: 3,
      category: 'interior',
      src: IMAGES.interiorMain,
      title: '모델하우스 거실 & 이탈리아 Dada 다이닝 실사',
      subtitle: '대리석 아일랜드 식탁과 우물천장 간접조명 일체형 LDK 구조'
    },
    {
      id: 31,
      category: 'interior',
      src: IMAGES.interiorKitchen,
      title: 'Molteni&C | Dada 하이엔드 주방 실사',
      subtitle: '이탈리아 최고급 수입 가구 및 삼성 비스포크 빌트인 풀옵션'
    },
    {
      id: 32,
      category: 'interior',
      src: IMAGES.interiorMaster,
      title: '마스터 베드룸 (호텔식 침실 특화) 실사',
      subtitle: '간접 LED 무드월 헤드보드 및 부부 전용 프리미엄 침실'
    },
    {
      id: 33,
      category: 'interior',
      src: IMAGES.interiorLiving,
      title: '와이드 거실 & 아트월 디자인 실사',
      subtitle: '광폭 포세린 타일 바닥과 감각적인 인테리어 연출'
    },
    {
      id: 4,
      category: 'exterior',
      src: IMAGES.skybridge,
      title: '지상 20층 스카이브릿지',
      subtitle: '내진 안정성 및 비상대피로 특화설계'
    },
    {
      id: 5,
      category: 'location',
      src: IMAGES.locationSurrounding,
      title: '커낼웨이 및 호수공원 주변 입지',
      subtitle: '수변공원과 대형마트가 인접한 원스톱 라이프'
    },
    {
      id: 6,
      category: 'exterior',
      src: IMAGES.view,
      title: '남향 위주 3면 파노라마 조망',
      subtitle: '시티타워·커낼웨이·심곡천 3가지 뷰 프리미엄'
    },
    {
      id: 7,
      category: 'interior',
      src: IMAGES.common,
      title: '입주민 힐링 공용공간',
      subtitle: '웰컴테라스, 시크릿정원, 아케이드'
    },
    {
      id: 8,
      category: 'location',
      src: IMAGES.retail,
      title: '단지 내 근린생활시설 (커낼스트리트)',
      subtitle: '지하 1층 커낼웨이 상권 직결 앵커 테넌트'
    },
    {
      id: 9,
      category: 'location',
      src: IMAGES.devCostco,
      title: '코스트코 청라점 (개장 완료)',
      subtitle: '약 18,000평 대규모 창고형 쇼핑 인프라'
    }
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#f1f5f9] text-[#1d2430]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-serif text-3xl sm:text-4xl text-[#c2a36b] tracking-wider uppercase mb-2">
            GALLERY
          </p>
          <div className="w-12 h-0.5 bg-[#c2a36b] mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a1a30] mb-3">
            단지 갤러리 &amp; 모델하우스 프리뷰
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-normal">
            청라의 하늘을 수놓는 외관부터 최고급 인테리어까지 한눈에 감상하세요
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#0a1a30] text-white shadow'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
            }`}
          >
            전체 사진 ({galleryItems.length})
          </button>
          <button
            onClick={() => setActiveTab('exterior')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === 'exterior'
                ? 'bg-[#0a1a30] text-white shadow'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
            }`}
          >
            단지 외관 &amp; 특화설계
          </button>
          <button
            onClick={() => setActiveTab('interior')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === 'interior'
                ? 'bg-[#0a1a30] text-white shadow'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
            }`}
          >
            인테리어 &amp; 명품주방
          </button>
          <button
            onClick={() => setActiveTab('location')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === 'location'
                ? 'bg-[#0a1a30] text-white shadow'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
            }`}
          >
            입지 &amp; 생활환경
          </button>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item.src, item.title)}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-gray-900 text-xs font-bold shadow">
                    <Maximize2 className="w-3.5 h-3.5" />
                    사진 확대보기
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-base text-[#0a1a30] mb-1 group-hover:text-[#16365e] transition">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.subtitle}</p>
                </div>
                <div className="mt-3 text-right">
                  <span className="text-[11px] font-semibold text-[#c2a36b]">
                    클릭하여 원본보기 &gt;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center mt-10">
          ※ 상기 이미지 및 투시도는 소비자의 이해를 돕기 위한 참고 자료이며, 실제 시공 시 차이가 있을 수 있습니다.
        </p>
      </div>
    </section>
  );
};
