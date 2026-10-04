import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Copy, Check, X, Calendar, Sparkles, ExternalLink } from 'lucide-react';
import { PROPERTY_INFO } from '../data/propertyData';

interface PhoneCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhoneCallModal: React.FC<PhoneCallModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Auto-copy phone number to clipboard when modal opens
      navigator.clipboard.writeText(PROPERTY_INFO.phone.replace(/[^0-9]/g, ''))
        .then(() => setCopied(true))
        .catch(() => {});

      const timer = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(PROPERTY_INFO.phone.replace(/[^0-9]/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectDial = () => {
    window.location.href = `tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#0a1a30] text-white rounded-3xl p-6 sm:p-8 border border-[#c2a36b]/40 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#c2a36b]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c2a36b] to-[#8f7447] text-[#0a1a30] flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#c2a36b]/20">
            <Phone className="w-7 h-7 fill-current animate-pulse" />
          </div>
          <span className="text-[11px] font-bold text-[#c2a36b] tracking-wider uppercase flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> VIP 분양상담실 직통 전화
          </span>
          <h3 className="text-xl sm:text-2xl font-bold mt-1 text-white">
            청라 더리브 티아모 Casa
          </h3>
          <p className="text-xs text-gray-300 mt-1">
            연중무휴 24시간 실시간 전문 상담원이 대기 중입니다.
          </p>
        </div>

        {/* Phone Number Display Box with Copy indicator */}
        <div className="bg-[#10233d] rounded-2xl p-4 sm:p-5 border border-white/10 text-center mb-6">
          <span className="text-xs text-gray-400 block mb-1">분양상담사 직통 번호</span>
          <a
            href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
            onClick={handleDirectDial}
            className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fcefd8] to-[#c2a36b] tracking-wider font-mono hover:scale-105 transition-transform inline-block"
          >
            {PROPERTY_INFO.phoneDisplay}
          </a>

          {/* Copy Status Badge */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-gray-200 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">클립보드에 복사되었습니다!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#c2a36b]" />
                  <span>전화번호 복사하기</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Direct Call Button */}
          <a
            href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
            onClick={handleDirectDial}
            className="w-full py-4 px-6 rounded-2xl bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] font-black text-base flex items-center justify-center gap-2.5 transition shadow-xl shadow-black/40 hover:scale-[1.02] cursor-pointer"
          >
            <Phone className="w-5 h-5 fill-current" />
            <span>지금 바로 통화 연결하기</span>
          </a>

          {/* SMS Button */}
          <a
            href={`sms:${PROPERTY_INFO.smsNumber}?body=${encodeURIComponent(
              '청라 더리브 티아모 까사 분양 상담 문의드립니다.'
            )}`}
            className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 border border-white/15 transition cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#c2a36b]" />
            <span>문자(SMS)로 간편 상담 문의</span>
          </a>

          {/* Naver Form Link */}
          <a
            href={PROPERTY_INFO.naverReservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#03C75A] hover:bg-[#02b351] text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
          >
            <span className="w-4 h-4 rounded bg-white text-[#03C75A] flex items-center justify-center font-black text-[10px]">N</span>
            <span>네이버 폼으로 방문예약 신청하기</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
          </a>
        </div>

        <p className="text-[11px] text-gray-400 text-center mt-5">
          * PC 또는 데스크톱 환경에서는 전화번호가 자동 복사되며, 스마트폰에서는 통화 화면으로 즉시 연결됩니다.
        </p>
      </div>
    </div>
  );
};
