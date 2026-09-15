import React from 'react';
import { Compass, Coins, Briefcase, Heart, CalendarClock, MessageSquareText } from 'lucide-react';

interface CategoryCardsProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'saju',
      title: '사주팔자',
      desc: '타고난 기질과 인생의 큰 흐름을 확인하세요.',
      icon: Compass,
      badge: '기본 분석',
    },
    {
      id: 'wealth',
      title: '재물운',
      desc: '돈의 흐름과 재물운의 기회를 알아보세요.',
      icon: Coins,
      badge: '자산 & 부',
    },
    {
      id: 'career',
      title: '사업운',
      desc: '사업과 직업의 성공 가능성을 확인하세요.',
      icon: Briefcase,
      badge: '직무 & 성공',
    },
    {
      id: 'match',
      title: '궁합',
      desc: '두 사람의 인연과 궁합을 분석해보세요.',
      icon: Heart,
      badge: '인연 & 조화',
    },
    {
      id: 'luck',
      title: '대운·세운',
      desc: '10년 단위의 대운과 올해의 운세를 확인하세요.',
      icon: CalendarClock,
      badge: '인생 타이밍',
    },
    {
      id: 'ai-chat',
      title: 'AI상담',
      desc: '궁금한 점을 AI와 바로 상담하세요.',
      icon: MessageSquareText,
      badge: '1:1 실시간',
    },
  ];

  return (
    <section className="py-12 bg-[#101117] border-y border-[#262432]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className="group cursor-pointer bg-[#14151E] hover:bg-[#1C1E2B] border border-[#2F2D3E] hover:border-[#D4AF7C] rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col items-center text-center shadow-md hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-13 h-13 rounded-full bg-[#1E202B] border border-[#D4AF7C]/40 flex items-center justify-center mb-3.5 text-[#D4AF7C] group-hover:scale-110 group-hover:border-[#D4AF7C] transition-transform shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#1E202B] text-[#F5D298] mb-2 border border-[#D4AF7C]/30">
                  {cat.badge}
                </span>

                <h3 className="font-serif-kr text-lg sm:text-xl font-bold text-[#FFFFFF] group-hover:text-[#F5D298] transition-colors mb-1.5">
                  {cat.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#CBD5E1] font-normal line-clamp-2 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
