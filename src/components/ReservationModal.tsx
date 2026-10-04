import React, { useState } from 'react';
import { X, Calendar, Phone, CheckCircle2, Send, ShieldCheck, AlertCircle } from 'lucide-react';
import { PROPERTY_INFO } from '../data/propertyData';
import { triggerPhoneCall } from '../utils/phoneUtils';

interface ReservationModalProps {
  isOpen: boolean;
  selectedPlanType?: string;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  selectedPlanType = '84A Type',
  onClose
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00 (오후 2시)');
  const [type, setType] = useState(selectedPlanType);
  const [memo, setMemo] = useState('');
  const [agree, setAgree] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationNo, setReservationNo] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

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

    const code = 'TM-' + Math.floor(100000 + Math.random() * 900000);
    setIsSubmitting(true);

    try {
      const gasUrl = localStorage.getItem('TIAMO_GAS_URL');
      if (gasUrl && gasUrl.trim()) {
        const body = new URLSearchParams({
          name: name.trim(),
          phone: phone.trim(),
          date: date || '상담 후 협의',
          time,
          type,
          memo: memo.trim(),
          reservationNo: code,
          timestamp: new Date().toISOString()
        });

        fetch(gasUrl.trim(), { method: 'POST', mode: 'no-cors', body }).catch(
          (err) => console.log('Google Sheets sync notice:', err)
        );
      }

      // save to localStorage
      const existing = JSON.parse(localStorage.getItem('TIAMO_RESERVATIONS') || '[]');
      existing.unshift({
        reservationNo: code,
        name: name.trim(),
        phone: phone.trim(),
        date: date || '협의',
        time,
        type,
        memo: memo.trim(),
        createdAt: new Date().toLocaleString('ko-KR'),
        status: '대기중'
      });
      localStorage.setItem('TIAMO_RESERVATIONS', JSON.stringify(existing));

      setReservationNo(code);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMsg('전송 중 문제가 발생했습니다. 직통 번호(010-8873-7258)로 문의해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrorMsg('');
    setName('');
    setPhone('');
    setMemo('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0a1a30] text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#c2a36b] font-bold tracking-wider uppercase">
              100% 사전 방문예약제
            </div>
            <h3 className="text-lg sm:text-xl font-bold">
              모델하우스 VIP 방문예약 신청
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                예약이 정상 접수되었습니다!
              </h4>
              <p className="text-xs text-gray-600 mb-6">
                예약번호: <strong className="text-[#0a1a30] font-mono text-sm">{reservationNo}</strong><br />
                담당 분양상담사가 빠른 시간 내에 연락드려 주차 및 위치를 안내해 드립니다.
              </p>
              <div className="space-y-2">
                <a
                  href={`tel:${PROPERTY_INFO.phone.replace(/[^0-9]/g, '')}`}
                  onClick={(e) => {
                    e.preventDefault();
                    triggerPhoneCall(e);
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] font-bold text-sm transition shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  전화로 바로 확인하기 ({PROPERTY_INFO.phoneDisplay})
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  고객 성함 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예) 홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0a1a30] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  inputMode="numeric"
                  placeholder="010-1234-5678"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0a1a30] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    희망 방문일
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    방문 시간
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                  >
                    <option value="10:30">오전 10:30</option>
                    <option value="11:30">오전 11:30</option>
                    <option value="14:00 (오후 2시)">오후 14:00</option>
                    <option value="15:30">오후 15:30</option>
                    <option value="16:30 (오후 4시 30분)">오후 16:30</option>
                    <option value="협의 후 결정">상담 후 협의</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  관심 평형
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                >
                  <option value="76 Type (23평)">76 Type (전용 23.18평 / 3-Bay)</option>
                  <option value="84A Type (25평)">84A Type (전용 25.71평 / 4-Bay 판상형)</option>
                  <option value="84B Type (25평)">84B Type (전용 25.71평 / 더블조망권)</option>
                  <option value="211 펜트하우스">211 Type 최상층 펜트하우스 (64평)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  추가 문의사항
                </label>
                <input
                  type="text"
                  placeholder="예) 잔여 로열층 확인 요청"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0a1a30] accent-[#0a1a30]"
                  />
                  <span>개인정보 수집 및 분양 상담 이용 동의 (필수)</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] font-bold text-sm transition shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? '접수 중...' : '방문예약 신청 완료'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
