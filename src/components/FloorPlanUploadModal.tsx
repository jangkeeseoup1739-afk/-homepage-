import React, { useState } from 'react';
import { X, Upload, Link, Image as ImageIcon, CheckCircle2, RotateCcw, FileText, Info } from 'lucide-react';

interface FloorPlanUploadModalProps {
  isOpen: boolean;
  planId: string;
  planName: string;
  currentImage: string;
  onSave: (planId: string, imageSrc: string) => void;
  onReset: (planId: string) => void;
  onClose: () => void;
}

export const FloorPlanUploadModal: React.FC<FloorPlanUploadModalProps> = ({
  isOpen,
  planId,
  planName,
  currentImage,
  onSave,
  onReset,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'file' | 'url' | 'guide'>('file');
  const [previewSrc, setPreviewSrc] = useState<string>(currentImage);
  const [urlInput, setUrlInput] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Read image as Data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPreviewSrc(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      setPreviewSrc(urlInput.trim());
    }
  };

  const handleSave = () => {
    onSave(planId, previewSrc);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 900);
  };

  const handleResetDefault = () => {
    onReset(planId);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0a1a30] text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#c2a36b] tracking-wider uppercase block mb-0.5">
              실제 평면도 사진 첨부 및 관리
            </span>
            <h3 className="text-lg sm:text-xl font-bold">
              {planName} 실제 평면도 사진 등록
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-bold text-gray-600">
          <button
            type="button"
            onClick={() => setActiveTab('file')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'file'
                ? 'border-[#0a1a30] text-[#0a1a30] bg-white'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            <Upload className="w-4 h-4 text-[#c2a36b]" />
            <span>내 PC/스마트폰 사진 파일 첨부</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'url'
                ? 'border-[#0a1a30] text-[#0a1a30] bg-white'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            <Link className="w-4 h-4 text-[#c2a36b]" />
            <span>웹 이미지 URL 링크 첨부</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'guide'
                ? 'border-[#0a1a30] text-[#0a1a30] bg-white'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            <Info className="w-4 h-4 text-[#c2a36b]" />
            <span>코드 영구 첨부 안내</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'file' && (
            <div className="space-y-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                실제 분양 홍보물 카탈로그 촬영본, 모델하우스 실제 도면, 또는 고해상도 평면도 이미지(JPG, PNG, WEBP)를 바로 첨부하실 수 있습니다.
              </p>

              {/* Upload Box */}
              <label className="border-2 border-dashed border-[#c2a36b]/60 hover:border-[#c2a36b] bg-gray-50 hover:bg-[#c2a36b]/5 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition text-center group">
                <div className="w-12 h-12 rounded-full bg-[#c2a36b]/20 text-[#0a1a30] flex items-center justify-center mb-2 group-hover:scale-110 transition">
                  <Upload className="w-6 h-6 text-[#c2a36b]" />
                </div>
                <span className="font-bold text-sm text-gray-800 mb-1">
                  클릭하여 실제 평면도 사진 선택
                </span>
                <span className="text-xs text-gray-500">
                  또는 이미지를 여기로 드래그하세요 (JPG, PNG, WEBP 지원)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {activeTab === 'url' && (
            <div className="space-y-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                인터넷이나 클라우드, 블로그 등에 업로드된 평면도 이미지 주소(URL)를 입력하시면 즉시 연동됩니다.
              </p>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://.../plan-actual.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-[#0a1a30] outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-4 py-2.5 rounded-xl bg-[#0a1a30] text-white font-bold text-xs hover:bg-[#16365e] transition cursor-pointer"
                >
                  미리보기 적용
                </button>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-3.5 text-xs text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-2 text-[#0a1a30] font-bold text-sm">
                <FileText className="w-4 h-4 text-[#c2a36b]" />
                <span>소스코드 상에 영구적으로 첨부하는 위치</span>
              </div>
              <p className="leading-relaxed">
                현재 프로젝트 소스코드에서 실제 평면도 사진 경로가 지정된 곳은 아래 파일입니다:
              </p>
              <div className="bg-[#0a1a30] text-[#e0cba3] p-3 rounded-xl font-mono text-[11px] leading-relaxed break-all">
                📂 <strong>/src/data/propertyData.ts</strong><br />
                라인 75 ~ 80 부근:<br />
                <span className="text-gray-300">
                  plans: &#123;<br />
                  &nbsp;&nbsp;&apos;76&apos;: &apos;실제사진_경로_또는_URL&apos;,<br />
                  &nbsp;&nbsp;&apos;84A&apos;: &apos;실제사진_경로_또는_URL&apos;,<br />
                  &nbsp;&nbsp;&apos;84B&apos;: &apos;실제사진_경로_또는_URL&apos;<br />
                  &#125;
                </span>
              </div>
              <p className="text-gray-500 text-[11px] leading-relaxed">
                * 위 파일에서 따옴표 안의 URL 주소를 원하시는 실제 사진 파일 링크로 교체하시면 사이트 전체에 기본 적용됩니다.
              </p>
            </div>
          )}

          {/* Current / New Image Preview */}
          <div className="mt-5 pt-4 border-t border-gray-200">
            <span className="text-xs font-bold text-gray-700 block mb-2">
              등록될 평면도 미리보기
            </span>
            <div className="w-full h-48 bg-[#16233b] rounded-2xl border border-gray-200 flex items-center justify-center p-2 overflow-hidden relative group">
              {previewSrc ? (
                <img
                  src={previewSrc}
                  alt="평면도 미리보기"
                  className="max-h-full max-w-full object-contain mx-auto"
                />
              ) : (
                <div className="text-gray-400 text-xs flex flex-col items-center gap-1">
                  <ImageIcon className="w-6 h-6" />
                  <span>사진을 첨부해 주세요</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetDefault}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>기본 도면으로 복원</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] font-bold text-xs sm:text-sm transition shadow cursor-pointer"
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                  <span>저장 완료!</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>이 사진으로 적용하기</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
