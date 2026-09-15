import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#090A0E] border-t border-[#262432] py-12 text-[#CBD5E1] text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#201F2B] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1E202B] border border-[#D4AF7C]/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#F5D298]" />
            </div>
            <div>
              <span className="font-serif-kr text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-wide">
                명결 (命結)
              </span>
              <span className="text-xs sm:text-sm text-[#F5D298] ml-2.5 font-serif-kr font-semibold">
                전통 AI 사주 풀이
              </span>
            </div>
          </div>

          <div className="text-center md:text-right text-xs sm:text-sm text-[#CBD5E1]">
            명(命)을 풀고, 사람과 운을 연결합니다.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#CBD5E1]">
          <p>© {new Date().getFullYear()} 명결(命結). All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>만세력 천문 데이터 및 차세대 AI 모델 기반 분석</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
