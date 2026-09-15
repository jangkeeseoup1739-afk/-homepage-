import React, { useState } from 'react';
import { ElementType } from '../types';
import { ELEMENT_NAMES_KR } from '../utils/manseEngine';
import { ELEMENT_REMEDIES, BALANCED_REMEDY } from '../utils/remedyData';
import { 
  Sparkles, 
  Footprints, 
  Shirt, 
  Utensils, 
  Home, 
  Lightbulb, 
  Compass,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface LackingElementRemedyViewProps {
  lackingElements: ElementType[];
  dominantElement: ElementType;
  dayMaster: string;
  userName: string;
}

export const LackingElementRemedyView: React.FC<LackingElementRemedyViewProps> = ({
  lackingElements,
  dominantElement,
  dayMaster,
  userName,
}) => {
  const hasLacking = lackingElements.length > 0;
  const initialElement = hasLacking ? lackingElements[0] : 'wood';
  const [selectedElement, setSelectedElement] = useState<ElementType>(initialElement);
  const [showAllElements, setShowAllElements] = useState(false);

  const activeRemedy = ELEMENT_REMEDIES[selectedElement];

  return (
    <div 
      id="lacking-element-remedy-section" 
      className="bg-[#14151E] border border-[#2F2D3E] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden"
    >
      {/* Subtle background accent glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D4AF7C]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#2D2A3D] pb-5 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#F5D298] font-bold mb-1.5 px-3 py-1 rounded-full bg-[#1C1D27] border border-[#D4AF7C]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#F5D298]" />
            <span>오행 맞춤 개운법 (開運法 처방전)</span>
          </div>
          <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-[#FFFFFF] mt-1">
            {hasLacking ? (
              <>
                {userName}님의 부족한{' '}
                <span className="text-[#F5D298]">
                  {lackingElements.map((e) => ELEMENT_REMEDIES[e].nameKr).join(', ')}
                </span>{' '}
                기운을 채우는 비결
              </>
            ) : (
              <>
                {userName}님의{' '}
                <span className="text-[#F5D298]">오행(五行) 조화</span>를 이어가는 개운 비결
              </>
            )}
          </h3>
          <p className="text-xs sm:text-sm text-[#CBD5E1] mt-1">
            사주에서 부족한 오행은 일상의 생활 습관, 색상, 음식, 환경을 통해 충분히 보완하고 운을 틔울 수 있습니다.
          </p>
        </div>

        {/* Lacking element selector tabs */}
        {hasLacking && (
          <div className="flex flex-wrap items-center gap-2">
            {lackingElements.map((elem) => {
              const remedy = ELEMENT_REMEDIES[elem];
              const isSelected = selectedElement === elem;
              return (
                <button
                  key={elem}
                  type="button"
                  onClick={() => setSelectedElement(elem)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-serif-kr font-bold transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-[#F5D298] text-[#0B0C10] border-[#F5D298] shadow-md scale-105'
                      : 'bg-[#0B0C10] text-[#CBD5E1] border-[#2F2D3E] hover:border-[#D4AF7C]/60 hover:text-[#FFFFFF]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#0B0C10]' : 'bg-[#D4AF7C]'}`} />
                  부족한 {remedy.nameKr} 처방
                </button>
              );
            })}

            {/* Optional explore other elements toggle */}
            <button
              type="button"
              onClick={() => setShowAllElements(!showAllElements)}
              className="text-xs text-[#94A3B8] hover:text-[#F5D298] underline underline-offset-4 px-2 py-1 transition-colors"
            >
              {showAllElements ? '처방 접기' : '다른 오행 보기'}
            </button>
          </div>
        )}
      </div>

      {/* If user clicked '다른 오행 보기', display 5-element quick switcher */}
      {showAllElements && (
        <div className="mt-4 p-3 rounded-xl bg-[#0B0C10] border border-[#2F2D3E] flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#94A3B8] mr-1 font-medium">전체 오행 선택:</span>
          {(['wood', 'fire', 'earth', 'metal', 'water'] as ElementType[]).map((elem) => (
            <button
              key={elem}
              type="button"
              onClick={() => setSelectedElement(elem)}
              className={`px-2.5 py-1 rounded-lg text-xs font-serif-kr transition-colors ${
                selectedElement === elem
                  ? 'bg-[#2D2A3D] text-[#F5D298] font-bold border border-[#D4AF7C]/50'
                  : 'text-[#94A3B8] hover:text-[#CBD5E1]'
              }`}
            >
              {ELEMENT_NAMES_KR[elem]} ({ELEMENT_REMEDIES[elem].hanja})
            </button>
          ))}
        </div>
      )}

      {/* Main remedy content box for the selected element */}
      <div className="mt-6">
        {/* Element Summary Header Card */}
        <div className={`p-4 sm:p-5 rounded-xl border ${activeRemedy.badgeBg} ${activeRemedy.badgeBorder} mb-6`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h4 className="font-serif-kr text-base sm:text-lg font-bold text-[#FFFFFF] flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${activeRemedy.badgeBg} ${activeRemedy.badgeText} border ${activeRemedy.badgeBorder}`}>
                {activeRemedy.nameKr}
              </span>
              {activeRemedy.title}
            </h4>
            <span className="text-xs text-[#CBD5E1] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F5D298]" />
              원국 보완 우선 처방
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
            {activeRemedy.summary}
          </p>
        </div>

        {/* 5 Practical Remedy Dimension Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* 1. Habits (행동 개운) */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#0B0C10] border border-[#2F2D3E] hover:border-[#D4AF7C]/50 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-[#F5D298] font-bold font-serif-kr text-sm sm:text-base mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#1C1D27] border border-[#2F2D3E] flex items-center justify-center text-[#F5D298]">
                  <Footprints className="w-4 h-4" />
                </div>
                <span>{activeRemedy.habits.title} (행동 개운)</span>
              </div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                {activeRemedy.habits.desc}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#1C1D27] text-[11px] text-[#94A3B8]">
              💡 일상 루틴으로 체화하기
            </div>
          </div>

          {/* 2. Fashion & Colors (색상·소품 개운) */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#0B0C10] border border-[#2F2D3E] hover:border-[#D4AF7C]/50 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-[#F5D298] font-bold font-serif-kr text-sm sm:text-base mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#1C1D27] border border-[#2F2D3E] flex items-center justify-center text-[#F5D298]">
                  <Shirt className="w-4 h-4" />
                </div>
                <span>{activeRemedy.fashion.title} (색상 개운)</span>
              </div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                {activeRemedy.fashion.desc}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#1C1D27] text-[11px] text-[#94A3B8]">
              💡 몸에 지니는 색상과 장신구
            </div>
          </div>

          {/* 3. Food (식품 개운) */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#0B0C10] border border-[#2F2D3E] hover:border-[#D4AF7C]/50 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-[#F5D298] font-bold font-serif-kr text-sm sm:text-base mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#1C1D27] border border-[#2F2D3E] flex items-center justify-center text-[#F5D298]">
                  <Utensils className="w-4 h-4" />
                </div>
                <span>{activeRemedy.food.title} (식품 개운)</span>
              </div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                {activeRemedy.food.desc}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#1C1D27] text-[11px] text-[#94A3B8]">
              💡 속을 다스리는 제철 기운
            </div>
          </div>

          {/* 4. Interior & Space (환경·풍수 개운) */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#0B0C10] border border-[#2F2D3E] hover:border-[#D4AF7C]/50 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-[#F5D298] font-bold font-serif-kr text-sm sm:text-base mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#1C1D27] border border-[#2F2D3E] flex items-center justify-center text-[#F5D298]">
                  <Home className="w-4 h-4" />
                </div>
                <span>{activeRemedy.interior.title} (환경 개운)</span>
              </div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                {activeRemedy.interior.desc}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#1C1D27] text-[11px] text-[#94A3B8]">
              💡 머무는 방위와 인테리어 소품
            </div>
          </div>

          {/* 5. Mindset (심리·마인드 개운) */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#0B0C10] border border-[#2F2D3E] hover:border-[#D4AF7C]/50 transition-colors flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center gap-2.5 text-[#F5D298] font-bold font-serif-kr text-sm sm:text-base mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#1C1D27] border border-[#2F2D3E] flex items-center justify-center text-[#F5D298]">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <span>{activeRemedy.mindset.title} (마음가짐 개운)</span>
              </div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                {activeRemedy.mindset.desc}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#1C1D27] text-[11px] text-[#F5D298] font-medium flex items-center gap-1.5">
              <span>🌟 일간 {dayMaster}의 기운과 조화를 이루는 핵심 마음가짐입니다.</span>
            </div>
          </div>

        </div>

        {/* Balanced state advice if no lacking elements */}
        {!hasLacking && (
          <div className="mt-4 p-4 rounded-xl bg-[#0B0C10] border border-[#2F2D3E] text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
            <span className="text-[#F5D298] font-bold block mb-1">
              ✨ {BALANCED_REMEDY.title}
            </span>
            {BALANCED_REMEDY.summary}
          </div>
        )}
      </div>
    </div>
  );
};
