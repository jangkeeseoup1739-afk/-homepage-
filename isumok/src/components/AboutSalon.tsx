import React from 'react';
import { ShieldCheck, Leaf, Sparkles, UserCheck, HeartHandshake, CheckCircle } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import directorPhoto from '../assets/images/KakaoTalk_20260918_140116699.webp';

export const AboutSalon: React.FC = () => {
  return (
    <section id="natural-care" className="py-20 bg-[#14151c] border-b border-[#252833] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Portrait & Salon Vibe */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-2xl">
              <img
                src={directorPhoto}
                alt="이수목 원장 1:1 맞춤 헤어 살롱"
                className="w-full h-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#161821]/95 backdrop-blur-md border border-[#373c4d] shadow-lg">
                <p className="text-[#f7e7b4] font-bold text-xs sm:text-sm tracking-wider uppercase mb-1">
                  DIRECTOR & MASTER STYLIST
                </p>
                <h3 className="text-xl font-serif-luxury font-bold text-white">
                  원장 1인 맞춤 책임제
                </h3>
                <p className="text-sm text-[#cbd2e1] mt-1.5 leading-relaxed font-normal">
                  "공장형 미용실과 달리, 시작부터 마무리 샴푸까지 오직 한 분만을 위해 진심을 다합니다."
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 px-4 py-3 rounded-xl bg-[#1d202a] border border-[#d4af37] shadow-xl text-center hidden sm:block">
              <span className="text-xs font-semibold text-[#cbd2e1]">예약제 살롱</span>
              <p className="text-sm font-bold text-[#f7e7b4]">100% 1:1 집중</p>
            </div>
          </div>

          {/* Right Column: Natural Care Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1e2129] border border-[#d4af37]/40 text-xs sm:text-sm text-[#f7e7b4] font-bold">
              <Leaf className="w-4 h-4 text-[#5eead4]" />
              <span>NATURAL HAIR & SCALP CARE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight leading-snug">
              화학 성분의 자극 대신, <br />
              <span className="gold-gradient-text">천연 유기농 성분</span>으로 채우는 건강한 모발
            </h2>

            <p className="text-sm sm:text-base text-[#d8dde8] leading-relaxed">
              우리의 두피는 피부 중에서도 모공이 가장 크고 흡수율이 높습니다. 
              {SALON_INFO.name}은 유해 화학물질을 배제하고, 자연에서 얻은 천연 에센셜 오일과 
              순한 식물성 단백질 복합체를 사용하여 시술 중에도 두피가 숨 쉴 수 있는 환경을 만듭니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#181a22] border border-[#2d3240] space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#222530] text-[#f7e7b4] flex items-center justify-center font-bold border border-[#393e4f]">
                  01
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">무자극·무취 천연 연화제</h4>
                <p className="text-xs sm:text-sm text-[#cbd2e1] leading-relaxed">
                  코를 찌르는 암모니아 냄새 없이, 순한 천연 성분으로 모발 단백질 결합을 유연하게 다스립니다.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181a22] border border-[#2d3240] space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#222530] text-[#f7e7b4] flex items-center justify-center font-bold border border-[#393e4f]">
                  02
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">모근 강화 링거 테크닉</h4>
                <p className="text-xs sm:text-sm text-[#cbd2e1] leading-relaxed">
                  갈라지고 꺼지는 정수리 모류를 특허 링거 테크닉과 천연 모근 영양수로 꼿꼿하게 세워줍니다.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181a22] border border-[#2d3240] space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#222530] text-[#f7e7b4] flex items-center justify-center font-bold border border-[#393e4f]">
                  03
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">동시 시술 없는 프라이빗 룸</h4>
                <p className="text-xs sm:text-sm text-[#cbd2e1] leading-relaxed">
                  여러 명을 동시에 돌리지 않고, 예약 시간 동안 오직 한 분에게만 온전히 집중하여 완성도를 높입니다.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181a22] border border-[#2d3240] space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#222530] text-[#f7e7b4] flex items-center justify-center font-bold border border-[#393e4f]">
                  04
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">편안한 1층 전용 주차</h4>
                <p className="text-xs sm:text-sm text-[#cbd2e1] leading-relaxed">
                  새말로17길 12 건물 1층 102호 바로 앞에 주차가 가능하여 비 오는 날이나 편안한 방문이 보장됩니다.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
