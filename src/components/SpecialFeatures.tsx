import React from 'react';
import { Calendar, RefreshCw, Clock, MapPin, Activity, TrendingUp } from 'lucide-react';

export const SpecialFeatures: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: '정확한 만세력 계산',
      desc: '천문 기반 정밀 알고리즘',
    },
    {
      icon: RefreshCw,
      title: '양력·음력 완벽 지원',
      desc: '윤달 및 평달 자동 판별',
    },
    {
      icon: Clock,
      title: '출생시간 정밀 계산',
      desc: '시간 미상 모드 지원',
    },
    {
      icon: MapPin,
      title: '출생지역 시차 보정',
      desc: '지역별 진태양시 정밀 보정',
    },
    {
      icon: Activity,
      title: '오행 밸런스 분석',
      desc: '기운의 과다와 결핍 조화',
    },
    {
      icon: TrendingUp,
      title: '대운·세운 심층 분석',
      desc: '10년 주기와 연도별 타이밍',
    },
  ];

  return (
    <section className="py-16 bg-[#0D0E14] border-t border-[#262432]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="font-serif-kr text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FFFFFF] tracking-tight">
            명결이 특별한 이유
          </h2>
          <p className="text-[#F1F5F9] text-sm sm:text-base font-normal leading-relaxed">
            정확한 사주 분석과 AI 기술로, 당신의 삶에 깊이 있는 통찰을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-[#14151E] border border-[#2F2D3E] hover:border-[#D4AF7C]/70 rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center shadow-md transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#1E202B] border border-[#D4AF7C]/40 flex items-center justify-center text-[#F5D298] mb-3.5 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif-kr text-base sm:text-lg font-bold text-[#FFFFFF] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#CBD5E1] font-normal leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Traditional Korean Verse Banner */}
        <div className="mt-14 max-w-xl mx-auto p-7 rounded-2xl bg-[#14151E] border border-[#D4AF7C]/50 relative overflow-hidden shadow-2xl">
          <p className="font-serif-kr text-lg sm:text-xl text-[#FFFFFF] font-bold">
            &ldquo;명결은 당신의 소중한 오늘과<br className="sm:hidden" /> 더 빛날 내일을 함께합니다.&rdquo;
          </p>
          <div className="mt-2.5 text-xs sm:text-sm text-[#F5D298] font-serif-kr font-semibold">
            명(命)을 풀고, 사람과 운을 연결하다
          </div>
        </div>
      </div>
    </section>
  );
};
