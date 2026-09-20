import React, { useState, useEffect } from 'react';
import { X, Calendar, Phone, Clock, Sparkles, CheckCircle, ExternalLink, Heart, AlertCircle, Loader2 } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { BookingRequest } from '../types';
import { sendBooking } from '../lib/sendBooking';

interface ConsultationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  onAddBooking: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => BookingRequest;
}

/** 제출 버튼을 누른 뒤의 화면 상태 */
type SubmitState = 'idle' | 'sending' | 'success' | 'failed';

export const ConsultationBookingModal: React.FC<ConsultationBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  onAddBooking
}) => {
  const [activeTab, setActiveTab] = useState<'naver' | 'direct' | 'call'>('direct');
  
  // Direct form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [service, setService] = useState('열펌 (디지털,셋팅)');
  const [concerns, setConcerns] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
      setActiveTab('direct');
    }
  }, [preselectedService, isOpen]);

  // Set default minimum date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  if (!isOpen) return null;

  const concernOptions = [
    '잦은 염색/열 손상으로 모발이 끊어짐',
    '가르마 갈라짐 & 정수리 볼륨 꺼짐 (링거펌 상담)',
    '비오는 날 심해지는 부스스한 곱슬',
    '두피 가려움 & 민감성 (천연 저자극 케어 필요)',
    '손질이 편한 내추럴한 웨이브 원함'
  ];

  const handleToggleConcern = (item: string) => {
    if (concerns.includes(item)) {
      setConcerns(concerns.filter(c => c !== item));
    } else {
      setConcerns([...concerns, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date || !privacyAgreed) return;
    if (submitState === 'sending') return;

    setSubmitState('sending');

    // 전송에 실패하더라도 고객 브라우저에는 남겨 둡니다.
    const booking = onAddBooking({
      customerName: name,
      phone,
      preferredDate: date,
      preferredTime: time,
      serviceCategory: service,
      hairConcerns: concerns,
      notes,
      privacyAgreed
    });

    const status = await sendBooking(booking);

    // 'sent-unconfirmed' 는 브라우저가 응답을 못 읽었을 뿐 접수는 전달된 상태입니다.
    if (status === 'sent' || status === 'sent-unconfirmed') {
      setSubmitState('success');
      setTimeout(() => {
        setSubmitState('idle');
        setName('');
        setPhone('');
        setNotes('');
        setConcerns([]);
        setPrivacyAgreed(false);
        onClose();
      }, 2600);
      return;
    }

    // 'failed'(네트워크 오류)와 'disabled'(전송 주소 미설정)는 모두
    // 원장님께 전달되지 않은 상태이므로 전화 예약을 안내합니다.
    setSubmitState('failed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#171922] rounded-2xl border border-[#d4af37]/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#292c37] flex items-center justify-between bg-[#15171f]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif-luxury font-bold text-white">
                이수목헤어스토리 예약 & 상담 센터
              </h3>
              <p className="text-xs sm:text-sm text-[#cbd2e1] font-medium">
                1인 원장 맞춤 케어로 100% 예약 우선제로 운영됩니다
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#cbd2e1] hover:text-white hover:bg-[#20232c] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-[#292c37] bg-[#14161d]">
          <button
            onClick={() => setActiveTab('direct')}
            className={`flex-1 py-3.5 text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-1.5 border-b-2 ${
              activeTab === 'direct'
                ? 'border-[#d4af37] text-[#f7e7b4] bg-[#191b24]'
                : 'border-transparent text-[#cbd2e1] hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span>1:1 빠른 온라인 상담·예약</span>
          </button>

          <button
            onClick={() => setActiveTab('naver')}
            className={`flex-1 py-3.5 text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-1.5 border-b-2 ${
              activeTab === 'naver'
                ? 'border-[#03c75a] text-[#5ef5a5] bg-[#191b24]'
                : 'border-transparent text-[#cbd2e1] hover:text-white'
            }`}
          >
            <span className="w-4 h-4 rounded bg-[#03c75a] text-white font-bold text-xs flex items-center justify-center">N</span>
            <span>네이버 실시간 예약</span>
          </button>

          <button
            onClick={() => setActiveTab('call')}
            className={`flex-1 py-3.5 text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-1.5 border-b-2 ${
              activeTab === 'call'
                ? 'border-[#e6ca65] text-[#f7e7b4] bg-[#191b24]'
                : 'border-transparent text-[#cbd2e1] hover:text-white'
            }`}
          >
            <Phone className="w-4 h-4 text-[#d4af37]" />
            <span>전화 바로 연결</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">

          {/* TAB 1: Direct Form */}
          {activeTab === 'direct' && (
            <div>
              {submitState === 'success' ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    예약 및 상담 신청이 접수되었습니다!
                  </h4>
                  <p className="text-sm text-white max-w-md mx-auto leading-relaxed">
                    이수목 원장이 고객님의 요청사항을 확인한 후, <br />
                    빠른 시간 내에 남겨주신 연락처로 일정 확정 연락을 드리겠습니다.
                  </p>
                </div>
              ) : submitState === 'failed' ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-red-500/15 border border-red-400/70 flex items-center justify-center text-red-300 mx-auto">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    신청 전송에 실패했습니다
                  </h4>
                  <p className="text-sm text-[#cbd2e1] max-w-md mx-auto leading-relaxed">
                    일시적인 통신 오류로 원장님께 신청이 전달되지 못했습니다.<br />
                    번거로우시겠지만 아래 번호로 전화 주시면 바로 예약 도와드리겠습니다.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-1">
                    <a
                      href={`tel:${SALON_INFO.phonePrimary}`}
                      className="py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c660] to-[#b89225] text-[#121316] font-bold text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{SALON_INFO.phonePrimary}</span>
                    </a>
                    <a
                      href={`tel:${SALON_INFO.phoneSecondary}`}
                      className="py-3 rounded-xl bg-[#1d202a] border border-[#3c4152] hover:border-[#d4af37] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
                    >
                      <Phone className="w-4 h-4 text-[#d4af37]" />
                      <span>{SALON_INFO.phoneSecondary}</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitState('idle')}
                    className="text-xs text-[#cbd2e1] underline underline-offset-4 hover:text-white transition-colors"
                  >
                    작성한 내용으로 다시 시도하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="p-3.5 rounded-lg bg-[#20222b] border border-[#343849] flex items-start gap-2.5 text-xs sm:text-sm text-[#cbd2e1]">
                    <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      원장 1인 시술 특성상 고객님 한 분만을 위해 시간을 비워둡니다. 모발 고민을 자세히 적어주시면 천연 케어 레시피를 미리 준비합니다.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-white mb-1.5">
                        고객명 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="예: 홍길동"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#21232d] border border-[#383d4e] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-white mb-1.5">
                        연락처 (휴대폰 번호) <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010-1234-5678"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#21232d] border border-[#383d4e] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-white mb-1.5">
                        희망 방문일자 <span className="text-red-400 font-normal">* (수·일 정기 휴무)</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#21232d] border border-[#383d4e] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-white mb-1.5">
                        희망 시간대 (09:00 ~ 17:00)
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#21232d] border border-[#383d4e] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="09:00">09:00 (오전 첫 타임)</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00 (마지막 타임)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-1.5">
                      희망 시술 메뉴 (♥♥머리 이야기♥♥)
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#21232d] border border-[#383d4e] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="열펌 (디지털,셋팅)">열펌 (디지털,셋팅)</option>
                      <option value="열펌 (매직,볼륨 매직)">열펌 (매직,볼륨 매직)</option>
                      <option value="열펌 (매직셋팅)">열펌 (매직셋팅)</option>
                      <option value="링거펌 (모류교정 & 뿌리볼륨)">링거펌 (모류교정 & 뿌리볼륨)</option>
                      <option value="펌 (일반)">펌 (일반)</option>
                      <option value="커트 (여자)">커트 (여자)</option>
                      <option value="커트 (남자)">커트 (남자)</option>
                      <option value="펌 (남자)">펌 (남자)</option>
                      <option value="스타일링 (드라이 & 두피케어)">스타일링 (드라이 & 두피케어)</option>
                      <option value="방문 후 원장님과 맞춤 상담 결정">방문 후 원장님과 맞춤 상담 결정</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-2">
                      현재 모발 & 두피 고민 (중복 선택 가능)
                    </label>
                    <div className="space-y-2">
                      {concernOptions.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#20222b] hover:bg-[#272b38] cursor-pointer text-xs sm:text-sm text-white border border-[#323646] transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={concerns.includes(opt)}
                            onChange={() => handleToggleConcern(opt)}
                            className="w-4 h-4 accent-[#d4af37] rounded"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-1.5">
                      기타 문의사항 또는 전달하고 싶은 내용
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="원하시는 스타일 사진 링크나 특별한 요청사항이 있으시면 적어주세요."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#21232d] border border-[#383d4e] text-xs sm:text-sm text-white placeholder-[#787d8e] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#20222b] border border-[#343849] space-y-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={privacyAgreed}
                        onChange={(e) => setPrivacyAgreed(e.target.checked)}
                        className="w-4 h-4 mt-0.5 accent-[#d4af37] rounded shrink-0"
                      />
                      <span className="text-xs sm:text-sm text-white font-bold">
                        개인정보 수집·이용에 동의합니다 <span className="text-red-400">*</span>
                      </span>
                    </label>
                    <p className="text-[11px] sm:text-xs text-[#a6adbd] leading-relaxed pl-[26px]">
                      수집 항목: 성함, 연락처, 희망 일시, 시술 및 모발 고민 내용 · 이용 목적: 예약 확정
                      안내와 맞춤 상담 · 보유 기간: 예약 완료 후 1년. 동의를 거부하실 수 있으나 이 경우
                      온라인 예약 신청이 어려우며, 전화로 예약해 주시면 됩니다.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitState === 'sending' || !privacyAgreed}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c660] to-[#b89225] text-[#121316] font-bold text-sm sm:text-base shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:active:scale-100"
                    >
                      {submitState === 'sending' ? (
                        <>
                          <Loader2 className="w-4 h-4 text-[#121316] animate-spin" />
                          <span>신청 전송 중…</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 text-[#121316]" />
                          <span>1:1 예약 및 맞춤 상담 신청하기</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: Naver Booking */}
          {activeTab === 'naver' && (
            <div className="space-y-6 py-2">
              <div className="rounded-2xl p-6 bg-gradient-to-br from-[#182a20] to-[#161a22] border border-[#03c75a]/40 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#03c75a] text-white font-black text-lg flex items-center justify-center">
                    N
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      네이버 스마트플레이스 실시간 예약
                    </h4>
                    <p className="text-xs text-[#a0dfb8]">
                      이수목헤어스토리 실시간 잔여 시간 확인 & 네이버페이 결제 가능
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#c2dfce] pt-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#03c75a] shrink-0 mt-0.5" />
                    <span>네이버 실시간 일정표를 통해 원하는 날짜와 비어있는 시간을 즉시 확정할 수 있습니다.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#03c75a] shrink-0 mt-0.5" />
                    <span>네이버페이 포인트 적립 혜택 및 방문 인증 리뷰 작성이 가능합니다.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#03c75a] shrink-0 mt-0.5" />
                    <span>당일 예약이나 긴급 변경은 전화(0507-1490-1888)를 이용해주시면 가장 빠릅니다.</span>
                  </div>
                </div>

                <div className="pt-3">
                  <a
                    href="https://m.booking.naver.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 rounded-xl bg-[#03c75a] hover:bg-[#02b351] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <span>네이버 예약 페이지 바로가기</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#1d202a] border border-[#343849] text-xs sm:text-sm text-[#cbd2e1] space-y-1">
                <p className="font-bold text-[#f7e7b4]">💡 네이버 예약 이용 팁</p>
                <p>시술 메뉴(열펌, 링거펌, 커트 등)를 선택하시면 예상 소요 시간만큼 타임 슬롯이 안전하게 배정됩니다.</p>
              </div>
            </div>
          )}

          {/* TAB 3: Phone Direct */}
          {activeTab === 'call' && (
            <div className="space-y-6 py-2">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 border border-[#d4af37] mx-auto flex items-center justify-center text-[#d4af37]">
                  <Phone className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">
                  전화로 빠른 상담 & 당일 예약 확인
                </h4>
                <p className="text-xs sm:text-sm text-[#cbd2e1] font-medium">
                  시술 중일 경우 통화가 잠시 지연될 수 있습니다. 부재 시 확인 후 바로 회신드립니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a
                  href={`tel:${SALON_INFO.phonePrimary}`}
                  className="p-5 rounded-xl bg-[#1d202a] hover:bg-[#252834] border border-[#d4af37]/60 hover:border-[#d4af37] text-center space-y-2 transition-all block group shadow-md"
                >
                  <span className="text-xs font-bold text-[#f7e7b4] uppercase tracking-wider block">
                    대표 스마트콜 전화
                  </span>
                  <p className="text-lg sm:text-xl font-bold text-white group-hover:text-[#f3e5ab]">
                    {SALON_INFO.phonePrimary}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] font-bold">
                    <Phone className="w-3.5 h-3.5" /> 터치하여 바로 통화
                  </span>
                </a>

                <a
                  href={`tel:${SALON_INFO.phoneSecondary}`}
                  className="p-5 rounded-xl bg-[#1d202a] hover:bg-[#252834] border border-[#3c4152] hover:border-[#d4af37] text-center space-y-2 transition-all block group shadow-md"
                >
                  <span className="text-xs font-bold text-[#cbd2e1] uppercase tracking-wider block">
                    매장 일반 유선 전화
                  </span>
                  <p className="text-lg sm:text-xl font-bold text-white group-hover:text-[#f3e5ab]">
                    {SALON_INFO.phoneSecondary}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#cbd2e1] font-bold">
                    <Phone className="w-3.5 h-3.5" /> 터치하여 바로 통화
                  </span>
                </a>
              </div>

              <div className="p-4 rounded-xl bg-[#1f222d] border border-[#343849] text-xs sm:text-sm text-[#cbd2e1] space-y-1">
                <div className="flex items-center gap-1.5 text-[#f7e7b4] font-bold">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                  <span>전화 상담 가능 시간</span>
                </div>
                <p>평일 오전 09:00 ~ 오후 18:00 (매주 수요일, 일요일 정기 휴무)</p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
