import React, { useState, useEffect } from 'react';
import { Maximize2, Check, Sparkles, Building, Layers, Eye, Phone, Upload, Image as ImageIcon, Camera, HelpCircle, FileText } from 'lucide-react';
import { FLOOR_PLANS, IMAGES, PROPERTY_INFO, FloorPlan } from '../data/propertyData';
import { FloorPlanUploadModal } from './FloorPlanUploadModal';
import { triggerPhoneCall } from '../utils/phoneUtils';

interface FloorPlanSectionProps {
  onOpenLightbox: (src: string, alt: string) => void;
  onOpenReservation: (type?: string) => void;
}

export const FloorPlanSection: React.FC<FloorPlanSectionProps> = ({
  onOpenLightbox,
  onOpenReservation,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('84A');
  const [unitMode, setUnitMode] = useState<'m2' | 'py'>('py');

  // Custom attached images loaded from localStorage
  const [customPlanImages, setCustomPlanImages] = useState<Record<string, string>>({});
  const [uploadModalTarget, setUploadModalTarget] = useState<{
    isOpen: boolean;
    planId: string;
    planName: string;
    currentImage: string;
  }>({
    isOpen: false,
    planId: '84A',
    planName: '84A Type',
    currentImage: '',
  });

  // Load custom images from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('TIAMO_CUSTOM_PLANS');
      if (saved) {
        setCustomPlanImages(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveCustomImage = (planId: string, imageSrc: string) => {
    const updated = { ...customPlanImages, [planId]: imageSrc };
    setCustomPlanImages(updated);
    try {
      localStorage.setItem('TIAMO_CUSTOM_PLANS', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetCustomImage = (planId: string) => {
    const updated = { ...customPlanImages };
    delete updated[planId];
    setCustomPlanImages(updated);
    try {
      localStorage.setItem('TIAMO_CUSTOM_PLANS', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const currentPlan = FLOOR_PLANS.find((p) => p.id === selectedPlanId) || FLOOR_PLANS[1];
  const activePlanImage = customPlanImages[currentPlan.id] || currentPlan.image;
  const isCustomImageApplied = Boolean(customPlanImages[currentPlan.id]);

  const openUploadForPlan = (plan: FloorPlan) => {
    setUploadModalTarget({
      isOpen: true,
      planId: plan.id,
      planName: plan.type,
      currentImage: customPlanImages[plan.id] || plan.image,
    });
  };

  return (
    <section id="plan" className="py-20 lg:py-28 bg-[#f8fafc] text-[#1d2430]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="font-serif text-3xl sm:text-4xl text-[#c2a36b] tracking-wider uppercase mb-2">
            FLOOR PLAN
          </p>
          <div className="w-12 h-0.5 bg-[#c2a36b] mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a1a30] mb-3">
            실수요 선호도 1위 3R 혁신 평면 설계
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            전용 23~25평 구성 ｜ 3-Bay &amp; 4-Bay 맞통풍 판상형 &amp; 파노라마 더블조망권
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            실제 분양 카탈로그 및 도면 실사 사진을 직접 첨부하고 큰 화면으로 확인하실 수 있습니다.
          </p>
        </div>

        {/* Notice & Guide Bar: "실제 평면도 사진 첨부 안내" */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0a1a30] to-[#16365e] text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg border border-[#c2a36b]/40">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#c2a36b]/20 border border-[#c2a36b] text-[#c2a36b] flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white">
                  실제 평면도 사진 첨부 공간
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#c2a36b] text-[#0a1a30] font-black">
                  실시간 업로드 지원
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                내 PC나 스마트폰의 실제 분양 홍보물 사진을 [사진 첨부] 버튼으로 즉시 등록하거나 교체할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => openUploadForPlan(currentPlan)}
              className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 shadow cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>현재 {currentPlan.type} 실제 사진 첨부하기</span>
            </button>
          </div>
        </div>

        {/* Unit Mix Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="bg-[#0a1a30] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-[#c2a36b]" />
              <h3 className="font-bold text-sm sm:text-base">타입별 공급 호실 및 면적 구성표</h3>
            </div>
            {/* Unit switch toggle */}
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-lg text-xs self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setUnitMode('py')}
                className={`px-3 py-1 rounded font-semibold transition cursor-pointer ${
                  unitMode === 'py' ? 'bg-[#c2a36b] text-[#0a1a30]' : 'text-gray-300 hover:text-white'
                }`}
              >
                평(PY) 기준
              </button>
              <button
                type="button"
                onClick={() => setUnitMode('m2')}
                className={`px-3 py-1 rounded font-semibold transition cursor-pointer ${
                  unitMode === 'm2' ? 'bg-[#c2a36b] text-[#0a1a30]' : 'text-gray-300 hover:text-white'
                }`}
              >
                ㎡ 기준
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 text-center">Type</th>
                  <th className="py-3 px-4 text-center">공급호실</th>
                  <th className="py-3 px-4 text-center">
                    전용면적 {unitMode === 'py' ? '(평)' : '(㎡)'}
                  </th>
                  <th className="py-3 px-4 text-center">
                    공급면적 {unitMode === 'py' ? '(평)' : '(㎡)'}
                  </th>
                  <th className="py-3 px-4 text-center">
                    계약면적 {unitMode === 'py' ? '(평)' : '(㎡)'}
                  </th>
                  <th className="py-3 px-4 text-center">공급비율</th>
                  <th className="py-3 px-4 text-center">실제 사진</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {FLOOR_PLANS.map((plan) => (
                  <tr
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`cursor-pointer transition hover:bg-gray-50/80 ${
                      selectedPlanId === plan.id ? 'bg-[#c2a36b]/10 font-medium' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center font-bold text-[#0a1a30]">
                      <span className="inline-block px-2.5 py-1 rounded bg-[#0a1a30]/5 text-[#0a1a30]">
                        {plan.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold text-gray-900">
                      {plan.units}실
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-[#16365e]">
                      {unitMode === 'py'
                        ? `${plan.exclusiveAreaPy.toFixed(2)}평`
                        : `${plan.exclusiveAreaM2.toFixed(2)}㎡`}
                    </td>
                    <td className="py-3.5 px-4 text-center text-gray-600">
                      {unitMode === 'py'
                        ? `${plan.supplyAreaPy.toFixed(2)}평`
                        : `${plan.supplyAreaM2.toFixed(2)}㎡`}
                    </td>
                    <td className="py-3.5 px-4 text-center text-gray-600">
                      {unitMode === 'py'
                        ? `${plan.contractAreaPy.toFixed(2)}평`
                        : `${plan.contractAreaM2.toFixed(2)}㎡`}
                    </td>
                    <td className="py-3.5 px-4 text-center text-gray-700 font-medium">
                      {plan.ratio}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlanId(plan.id);
                          openUploadForPlan(plan);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-white hover:bg-gray-100 text-[#0a1a30] font-bold border border-gray-300 transition"
                      >
                        <Camera className="w-3 h-3 text-[#c2a36b]" />
                        <span>{customPlanImages[plan.id] ? '사진 변경' : '사진 첨부'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Plan Type Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {FLOOR_PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`px-5 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                selectedPlanId === plan.id
                  ? 'bg-[#0a1a30] text-white border-[#0a1a30] shadow-lg shadow-[#0a1a30]/20 scale-105'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#c2a36b] hover:text-[#0a1a30]'
              }`}
            >
              <span>{plan.type}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedPlanId === plan.id ? 'bg-[#c2a36b] text-[#0a1a30]' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {plan.units}실
              </span>
              {customPlanImages[plan.id] && (
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="실제 사진 등록됨" />
              )}
            </button>
          ))}
        </div>

        {/* Main Floor Plan Detail Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden mb-16">
          {/* Plan Header Strip */}
          <div className="bg-gradient-to-r from-[#0d2242] via-[#102a4c] to-[#16365e] text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                {currentPlan.type}
              </span>
              <span className="px-3 py-1 rounded-full border border-white/30 text-xs font-semibold tracking-wide text-[#e0cba3]">
                {currentPlan.units}실 공급 ({currentPlan.ratio})
              </span>
              {isCustomImageApplied && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold">
                  실제 사진 적용 중
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-200">
              <div>
                <span className="text-gray-400 block text-[11px]">전용면적</span>
                <strong className="text-white text-base">
                  {currentPlan.exclusiveAreaM2.toFixed(2)}㎡
                </strong>{' '}
                <span className="text-[#c2a36b]">({currentPlan.exclusiveAreaPy.toFixed(2)}평)</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10" />
              <div>
                <span className="text-gray-400 block text-[11px]">공급면적</span>
                <strong className="text-white text-base">
                  {currentPlan.supplyAreaM2.toFixed(2)}㎡
                </strong>{' '}
                <span className="text-[#c2a36b]">({currentPlan.supplyAreaPy.toFixed(2)}평)</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10" />
              <div>
                <span className="text-gray-400 block text-[11px]">계약면적</span>
                <strong className="text-white text-base">
                  {currentPlan.contractAreaM2.toFixed(2)}㎡
                </strong>{' '}
                <span className="text-[#c2a36b]">({currentPlan.contractAreaPy.toFixed(2)}평)</span>
              </div>
            </div>
          </div>

          {/* Plan Body: Image Drawing on Left, Free Options list on Right */}
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Drawing / Actual Photo Display */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full relative rounded-2xl border border-gray-200 overflow-hidden bg-[#16233b] p-4 group">
                <img
                  src={activePlanImage}
                  alt={`${currentPlan.type} 평면도`}
                  className="w-full h-auto object-contain mx-auto group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Overlay Badge & Action */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur text-white text-xs font-bold border border-white/20">
                    {isCustomImageApplied ? '📷 실제 첨부 사진' : '📐 공급 설계도면'}
                  </span>
                </div>

                {/* Bottom Overlay Buttons */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openUploadForPlan(currentPlan)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#0a1a30]/90 text-white hover:bg-[#0a1a30] text-xs font-bold border border-[#c2a36b] transition shadow-lg cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#c2a36b]" />
                    <span>실제 사진 첨부</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(activePlanImage, `${currentPlan.type} 평면도`)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 text-gray-900 text-xs font-bold hover:bg-white transition shadow-lg cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>크게보기</span>
                  </button>
                </div>
              </div>

              <div className="w-full flex items-center justify-between mt-3 px-1 text-xs">
                <span className="font-semibold text-[#16365e] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#c2a36b]" />
                  {currentPlan.bayType}
                </span>
                <button
                  type="button"
                  onClick={() => openUploadForPlan(currentPlan)}
                  className="text-gray-500 hover:text-[#0a1a30] underline flex items-center gap-1 cursor-pointer"
                >
                  <Camera className="w-3 h-3 text-[#c2a36b]" />
                  <span>실제 도면 사진을 여기에 직접 첨부하기</span>
                </button>
              </div>

              <p className="mt-2 text-xs text-gray-500 text-center max-w-md">
                {currentPlan.description}
              </p>
            </div>

            {/* Free Options Checklist Box */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] rounded-2xl p-6 sm:p-7 border border-gray-200">
              <div className="flex items-center justify-between pb-3.5 border-b border-gray-200 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#c2a36b]" />
                  <h4 className="font-bold text-sm sm:text-base text-[#0a1a30]">
                    기본 제공 무상 풀옵션 품목
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-[#c2a36b] bg-[#c2a36b]/15 px-2.5 py-0.5 rounded-full">
                  FREE OPTION
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                별도의 유상옵션 추가 없이 최상급 가전과 가구가 기본으로 장착됩니다.
              </p>

              <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
                {currentPlan.options.map((opt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-gray-100 text-xs sm:text-[13px] text-gray-700 shadow-2xs"
                  >
                    <Check className="w-4 h-4 text-[#c2a36b] shrink-0 mt-0.5 font-bold" />
                    <span className="leading-snug">{opt}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col gap-2.5">
                <a
                  href={PROPERTY_INFO.naverReservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] font-bold text-sm transition shadow cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{currentPlan.type} 네이버 폼으로 잔여호실 신청</span>
                </a>
                <a
                  href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
                  onClick={(e) => {
                    e.preventDefault();
                    triggerPhoneCall(e);
                  }}
                  className="w-full py-3 rounded-xl bg-white hover:bg-gray-50 text-[#0a1a30] font-semibold text-xs border border-gray-300 transition text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c2a36b]" />
                  분양가 및 옵션 전화문의
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Actual Floor Plan Photo Showcase Space (실제 평면도 / 카탈로그 사진 전용 갤러리 공간) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-md mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-8">
            <div>
              <span className="text-xs font-bold text-[#c2a36b] uppercase tracking-wider block mb-1">
                ACTUAL PHOTO ARCHIVE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0a1a30]">
                타입별 실제 평면도 사진 전용 공간
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                각 타입별 카드를 클릭하여 실제 촬영한 도면 사진을 바로 첨부하거나 큰 화면으로 열람하실 수 있습니다.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">
                * 사진 등록 시 브라우저에 자동 저장됩니다.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLOOR_PLANS.slice(0, 3).map((plan) => {
              const photo = customPlanImages[plan.id] || plan.image;
              const isCustom = Boolean(customPlanImages[plan.id]);

              return (
                <div
                  key={plan.id}
                  className="bg-[#f8fafc] rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative aspect-[4/3] bg-[#16233b] overflow-hidden p-2">
                      <img
                        src={photo}
                        alt={`${plan.type} 실제 평면도`}
                        className="w-full h-full object-contain mx-auto group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur text-white text-[11px] font-bold border border-white/20">
                          {plan.type} ({unitMode === 'py' ? `${plan.exclusiveAreaPy.toFixed(1)}평` : `${plan.exclusiveAreaM2.toFixed(1)}㎡`})
                        </span>
                      </div>
                      {isCustom && (
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                            실제사진
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="p-4">
                      <h4 className="font-bold text-sm text-[#0a1a30] mb-1">
                        {plan.type} 실제 평면도
                      </h4>
                      <p className="text-xs text-gray-500 leading-snug">
                        {plan.bayType} · {plan.units}실 공급
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => openUploadForPlan(plan)}
                      className="py-2 px-3 rounded-xl bg-white hover:bg-gray-100 text-[#0a1a30] font-bold text-xs border border-gray-300 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#c2a36b]" />
                      <span>{isCustom ? '사진 변경' : '사진 첨부'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(photo, `${plan.type} 실제 평면도 사진`)}
                      className="py-2 px-3 rounded-xl bg-[#0a1a30] hover:bg-[#16365e] text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>확대보기</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Code Guide Box: 소스코드 상에서 첨부하는 위치 안내 */}
        <div className="p-5 rounded-2xl bg-[#0a1a30] text-gray-300 border border-white/10 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-[#c2a36b] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">
                개발자 / 소스코드에서 영구적으로 실제 평면도 사진을 넣는 위치
              </strong>
              <p className="text-gray-400">
                프로젝트 코드의 <code className="text-[#e0cba3] font-mono bg-black/40 px-1.5 py-0.5 rounded">src/data/propertyData.ts</code> 파일 내 <code className="text-[#e0cba3] font-mono bg-black/40 px-1.5 py-0.5 rounded">IMAGES.plans</code> 객체에 실제 평면도 이미지 경로/URL을 지정하시면 기본 사진으로 영구 반영됩니다.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => openUploadForPlan(currentPlan)}
            className="shrink-0 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#c2a36b] font-bold text-xs border border-[#c2a36b]/40 transition cursor-pointer"
          >
            지금 화면에서 바로 사진 첨부하기 &gt;
          </button>
        </div>
      </div>

      {/* Upload & Attach Modal */}
      <FloorPlanUploadModal
        isOpen={uploadModalTarget.isOpen}
        planId={uploadModalTarget.planId}
        planName={uploadModalTarget.planName}
        currentImage={uploadModalTarget.currentImage}
        onSave={handleSaveCustomImage}
        onReset={handleResetCustomImage}
        onClose={() => setUploadModalTarget((prev) => ({ ...prev, isOpen: false }))}
      />
    </section>
  );
};
