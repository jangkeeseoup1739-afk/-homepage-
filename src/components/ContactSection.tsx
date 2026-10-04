import React, { useState } from 'react';
import { Phone, Calendar, Send, CheckCircle2, ShieldCheck, Clock, AlertCircle } from 'lucide-react';
import { PROPERTY_INFO } from '../data/propertyData';
import { triggerPhoneCall } from '../utils/phoneUtils';
import { submitEnquiry, SALES_PHONE } from '../config';

interface ContactSectionProps {
  initialType?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialType = '84A' }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('14:00 (오후 2시)');
  const [planType, setPlanType] = useState(initialType);
  const [memo, setMemo] = useState('');
  const [agree, setAgree] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    reservationNo: string;
    name: string;
    phone: string;
    date: string;
    type: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle phone formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw.length <= 3) {
      setPhone(raw);
    } else if (raw.length <= 7) {
      setPhone(`${raw.slice(0, 3)}-${raw.slice(3)}`);
    } else {
      setPhone(`${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('성함을 입력해 주세요.');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('연락처 휴대폰 번호(10~11자리)를 정확히 입력해 주세요.');
      return;
    }
    if (!agree) {
      setErrorMsg('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    const reservationNumber = 'TM-' + Math.floor(100000 + Math.random() * 900000);
    setIsSubmitting(true);

    try {
      const sent = await submitEnquiry({
        name: name.trim(),
        phone: phone.trim(),
        date: visitDate || '상담 후 협의',
        time: visitTime,
        type: planType,
        memo: memo.trim(),
        reservationNo: reservationNumber,
        timestamp: new Date().toISOString()
      });

      if (!sent) {
        setErrorMsg(
          `지금은 온라인 접수가 되지 않습니다. 번거로우시겠지만 ${SALES_PHONE}으로 연락 주시면 바로 안내해 드리겠습니다.`
        );
        setIsSubmitting(false);
        return;
      }

      // 이 기기에서 접수 내역을 다시 볼 수 있도록 남겨둔다 (전송과는 별개)
      const existing = JSON.parse(localStorage.getItem('TIAMO_RESERVATIONS') || '[]');
      existing.unshift({
        reservationNo: reservationNumber,
        name: name.trim(),
        phone: phone.trim(),
        date: visitDate || '협의',
        time: visitTime,
        type: planType,
        memo: memo.trim(),
        createdAt: new Date().toLocaleString('ko-KR'),
        status: '대기중'
      });
      localStorage.setItem('TIAMO_RESERVATIONS', JSON.stringify(existing));

      setSubmittedData({
        reservationNo: reservationNumber,
        name: name.trim(),
        phone: phone.trim(),
        date: visitDate ? `${visitDate} ${visitTime}` : '방문 일자 조율 예정',
        type: planType
      });

      // Clear input fields
      setName('');
      setPhone('');
      setMemo('');
    } catch (err) {
      console.error(err);
      setErrorMsg(`접수 처리 중 문제가 발생했습니다. 대표번호(${SALES_PHONE})로 연락 부탁드립니다.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#ffffff] text-[#1d2430]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-serif text-3xl sm:text-4xl text-[#c2a36b] tracking-wider uppercase mb-2">
            CONTACT &amp; RSVP
          </p>
          <div className="w-12 h-0.5 bg-[#c2a36b] mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a1a30] mb-3">
            모델하우스 방문예약 &amp; 분양상담 접수
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-normal">
            방문 예약 및 잔여호실 분양가 안내는 언제든 편안하게 신청해 주시기 바랍니다.
          </p>
        </div>

        {/* 1. Official Naver Form Primary Quick Banner */}
        <div className="mb-10 bg-gradient-to-r from-emerald-50 via-green-50 to-white border-2 border-[#03C75A] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-[#03C75A]/10">
          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#03C75A] text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-md">
              N
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#03C75A] text-white">
                  네이버 공식 폼 접수
                </span>
                <span className="text-xs text-emerald-800 font-medium">100% 사전 방문예약제</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0a1a30]">
                네이버 폼으로 1초 만에 간편 예약 신청
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                네이버 폼을 통해 빠르고 안전하게 예약 일정을 접수하실 수 있습니다.
              </p>
            </div>
          </div>

          <a
            href={PROPERTY_INFO.naverReservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-8 py-4 rounded-2xl bg-[#03C75A] hover:bg-[#02b351] text-white font-bold text-sm sm:text-base transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 shrink-0 hover:scale-[1.03]"
          >
            <span>네이버 폼으로 신청하기</span>
            <span className="text-lg font-bold">&gt;</span>
          </a>
        </div>

        {submittedData ? (
          /* Success Receipt Card */
          <div className="bg-gradient-to-br from-[#0a1a30] to-[#16365e] text-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#c2a36b]/20 border border-[#c2a36b] text-[#c2a36b] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#c2a36b] font-bold block mb-1">
              RESERVATION COMPLETED
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              방문예약 접수가 정상 완료되었습니다!
            </h3>
            <p className="text-gray-300 text-sm max-w-md mx-auto mb-8 font-light leading-relaxed">
              고객님의 방문 일정 및 주차 안내를 위해 담당 분양 상담사가 빠른 시간 내에 유선으로 연락드리겠습니다.
            </p>

            <div className="bg-white/10 rounded-2xl p-6 max-w-md mx-auto text-left text-xs sm:text-sm space-y-3 border border-white/10 mb-8">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">예약 접수번호</span>
                <strong className="text-[#e0cba3] font-mono text-base">{submittedData.reservationNo}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">성함</span>
                <span className="text-white font-medium">{submittedData.name} 님</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">연락처</span>
                <span className="text-white font-medium">{submittedData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">관심 평형</span>
                <span className="text-white font-medium">{submittedData.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">희망 방문일시</span>
                <span className="text-white font-medium">{submittedData.date}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
                onClick={(e) => {
                  e.preventDefault();
                  triggerPhoneCall(e);
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] font-bold text-sm transition shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                담당자 직통전화 연결 ({PROPERTY_INFO.phoneDisplay})
              </a>
              <button
                type="button"
                onClick={() => setSubmittedData(null)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 transition cursor-pointer"
              >
                새로운 추가 접수하기
              </button>
            </div>
          </div>
        ) : (
          /* Reservation Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#ffffff] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-200"
          >
            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  성함 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예) 홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0a1a30] focus:ring-1 focus:ring-[#0a1a30] outline-none text-sm transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  inputMode="numeric"
                  placeholder="010-1234-5678"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0a1a30] focus:ring-1 focus:ring-[#0a1a30] outline-none text-sm transition"
                />
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  희망 방문 일자
                </label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0a1a30] outline-none text-sm bg-white"
                />
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  희망 방문 시간
                </label>
                <select
                  value={visitTime}
                  onChange={(e) => setVisitTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0a1a30] outline-none text-sm bg-white"
                >
                  <option value="10:30 (오전 10시 30분)">오전 10:30</option>
                  <option value="11:30 (오전 11시 30분)">오전 11:30</option>
                  <option value="13:30 (오후 1시 30분)">오후 13:30</option>
                  <option value="14:30 (오후 2시 30분)">오후 14:30</option>
                  <option value="15:30 (오후 3시 30분)">오후 15:30</option>
                  <option value="16:30 (오후 4시 30분)">오후 16:30</option>
                  <option value="17:30 (오후 5시 30분)">오후 17:30</option>
                  <option value="협의 후 결정">상담원과 협의</option>
                </select>
              </div>

              {/* Plan Type */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  관심 평형 및 타입
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['76 Type (23평)', '84A Type (25평)', '84B Type (25평)', '211 펜트 / 전체'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPlanType(t)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        planType.startsWith(t.split(' ')[0])
                          ? 'bg-[#0a1a30] text-white border-[#0a1a30]'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Memo */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  추가 문의 사항 (선택)
                </label>
                <textarea
                  rows={3}
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="예) 로열층 분양가 및 대출 한도 문의, 00일 오후 통화 희망 등"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0a1a30] outline-none text-sm resize-none"
                />
              </div>
            </div>

            {/* Privacy Agreement */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                개인정보 수집 및 이용 동의 <span className="text-red-500">*</span>
              </label>
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-500 max-h-24 overflow-y-auto leading-relaxed mb-3">
                <strong>개인정보 수집ㆍ이용 안내</strong><br />
                1. 수집 목적: 청라 더리브 티아모 Casa 모델하우스 방문 예약 접수, 잔여호실 분양 상담 및 분양 정보 안내.<br />
                2. 수집 항목: 성함, 연락처, 희망 방문일시, 관심 평형, 상담 내용.<br />
                3. 보유 기간: 분양 완료 시 또는 고객의 개인정보 파기 요청 시까지 안전하게 보관 후 지체 없이 파기합니다.<br />
                4. 동의 거부 권리: 정보 주체는 동의를 거부할 권리가 있으나, 거부 시 방문 예약 및 상담 서비스 제공이 제한됩니다.
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-gray-700 select-none">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0a1a30] accent-[#0a1a30]"
                />
                <span className="font-medium">위 개인정보 수집 및 이용에 동의합니다.</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-[#0a1a30] hover:bg-[#16365e] text-white font-bold text-base transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-[#c2a36b]" />
              <span>{isSubmitting ? '접수 처리 중...' : '방문예약 등록 완료하기'}</span>
            </button>

            {/* Secondary Direct SMS Action */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>빠른 문자 상담을 원하시나요?</span>
              <a
                href={`sms:${PROPERTY_INFO.smsNumber}?body=${encodeURIComponent(
                  '청라 더리브 티아모 까사 분양 상담 문의드립니다.'
                )}`}
                className="text-[#16365e] font-bold hover:underline"
              >
                문자 바로 전송하기 &gt;
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
