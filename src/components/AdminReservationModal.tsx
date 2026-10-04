import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Phone,
  MessageSquare,
  Download,
  Trash2,
  Search,
  CheckCircle2,
  Clock,
  UserCheck,
  FileSpreadsheet,
  Copy,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { PROPERTY_INFO } from '../data/propertyData';

export interface ReservationRecord {
  reservationNo: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  type: string;
  memo: string;
  createdAt: string;
  status?: '대기중' | '통화완료' | '방문확정' | '취소';
}

interface AdminReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminReservationModal: React.FC<AdminReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'list' | 'google-sheet'>('list');
  const [gasUrl, setGasUrl] = useState<string>(() => {
    return localStorage.getItem('TIAMO_GAS_URL') || '';
  });
  const [sheetDirectUrl, setSheetDirectUrl] = useState<string>(() => {
    return localStorage.getItem('TIAMO_SHEET_DIRECT_URL') || '';
  });
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [savedSheetUrl, setSavedSheetUrl] = useState(false);

  // Load reservations
  const loadReservations = () => {
    try {
      const data = localStorage.getItem('TIAMO_RESERVATIONS');
      if (data) {
        setReservations(JSON.parse(data));
      } else {
        setReservations([]);
      }
    } catch (e) {
      console.error(e);
      setReservations([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadReservations();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Change Status
  const handleStatusChange = (index: number, newStatus: '대기중' | '통화완료' | '방문확정' | '취소') => {
    const updated = [...reservations];
    updated[index].status = newStatus;
    setReservations(updated);
    localStorage.setItem('TIAMO_RESERVATIONS', JSON.stringify(updated));
  };

  // Delete Record
  const handleDelete = (index: number) => {
    if (window.confirm('해당 예약 접수 건을 삭제하시겠습니까?')) {
      const updated = reservations.filter((_, i) => i !== index);
      setReservations(updated);
      localStorage.setItem('TIAMO_RESERVATIONS', JSON.stringify(updated));
    }
  };

  // Clear All
  const handleClearAll = () => {
    if (window.confirm('모든 예약 내역을 초기화하시겠습니까?')) {
      setReservations([]);
      localStorage.removeItem('TIAMO_RESERVATIONS');
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (reservations.length === 0) {
      alert('내보낼 예약 데이터가 없습니다.');
      return;
    }
    const headers = ['접수일시', '예약번호', '성함', '연락처', '희망방문일', '희망시간', '관심평형', '상담상태', '추가문의'];
    const rows = reservations.map((r) => [
      `"${r.createdAt || ''}"`,
      `"${r.reservationNo || ''}"`,
      `"${r.name || ''}"`,
      `"${r.phone || ''}"`,
      `"${r.date || ''}"`,
      `"${r.time || ''}"`,
      `"${r.type || ''}"`,
      `"${r.status || '대기중'}"`,
      `"${(r.memo || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `청라더리브티아모_방문예약명단_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered reservations
  const filtered = reservations.filter((r) => {
    const matchesSearch =
      r.name.includes(searchQuery) ||
      r.phone.includes(searchQuery) ||
      r.reservationNo.includes(searchQuery) ||
      r.type.includes(searchQuery);
    const matchesStatus =
      statusFilter === 'all' || (r.status || '대기중') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const googleAppsScriptCode = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var d = e.parameter;
  // 컬럼 순서: 접수일시, 예약번호, 성함, 연락처, 희망일, 희망시간, 관심평형, 추가메모
  sheet.appendRow([
    new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"}),
    d.reservationNo || "",
    d.name || "",
    d.phone || "",
    d.date || "",
    d.time || "",
    d.type || "",
    d.memo || ""
  ]);
  return ContentService.createTextOutput("ok");
}`;

  const copyAppsScript = () => {
    navigator.clipboard.writeText(googleAppsScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveGasUrl = () => {
    localStorage.setItem('TIAMO_GAS_URL', gasUrl.trim());
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-[#0a1a30] text-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#c2a36b]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c2a36b]/20 border border-[#c2a36b] text-[#c2a36b] flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#c2a36b] font-bold tracking-wider uppercase">
                  MANAGEMENT DASHBOARD
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#c2a36b] text-[#0a1a30] text-[11px] font-black">
                  총 {reservations.length}건 접수됨
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">
                방문예약 및 관심고객 접수 내역 확인
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {sheetDirectUrl ? (
              <a
                href={sheetDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>내 구글 시트 열기</span>
              </a>
            ) : (
              <a
                href="https://sheets.new"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white text-xs font-bold transition border border-emerald-500/50"
                title="Google 계정으로 새 구글 시트 1초 생성"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>새 구글시트 만들기 (1초)</span>
              </a>
            )}
            <a
              href="https://form.naver.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#03C75A] hover:bg-[#02b351] text-white text-xs font-bold transition shadow"
              title="네이버 폼 응답결과 관리 페이지 열기"
            >
              <span className="font-black text-sm">N</span>
              <span>네이버 폼 응답확인</span>
            </a>
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] text-xs font-bold transition shadow cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>엑셀(CSV) 다운로드</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-gray-200 bg-gray-50 text-xs sm:text-sm font-bold text-gray-600 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setActiveTab('list')}
            className={`py-3.5 px-4 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'list'
                ? 'border-[#0a1a30] text-[#0a1a30] font-extrabold bg-white'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            <Clock className="w-4 h-4 text-[#c2a36b]" />
            <span>실시간 접수 목록 ({reservations.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('google-sheet')}
            className={`py-3.5 px-4 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'google-sheet'
                ? 'border-[#0a1a30] text-[#0a1a30] font-extrabold bg-white'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>스마트폰/구글 스프레드시트 실시간 자동 연동 방법</span>
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#f8fafc]">
          {activeTab === 'list' ? (
            <div>
              {/* Naver Form Linked Banner */}
              <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-white border border-[#03C75A]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#03C75A] text-white flex items-center justify-center font-black text-sm shrink-0">
                    N
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">
                      공식 네이버 폼 (https://naver.me/GnRoDpAC) 연동 완료
                    </span>
                    <span className="text-gray-500 text-[11px]">
                      홈페이지의 모든 방문예약 신청 버튼이 대표님의 네이버 폼으로 바로 연결됩니다.
                    </span>
                  </div>
                </div>
                <a
                  href="https://form.naver.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[#03C75A] text-white font-bold text-xs hover:bg-[#02b351] transition shrink-0 shadow-xs"
                >
                  네이버 폼 응답결과 확인 &gt;
                </a>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-xs">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="성함, 연락처, 예약번호 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-[#0a1a30] outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-700 outline-none"
                  >
                    <option value="all">전체 상태 보기</option>
                    <option value="대기중">대기중</option>
                    <option value="통화완료">통화완료</option>
                    <option value="방문확정">방문확정</option>
                    <option value="취소">취소/보류</option>
                  </select>

                  <button
                    type="button"
                    onClick={loadReservations}
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-600 transition"
                    title="새로고침"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  {reservations.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="px-2.5 py-2 rounded-xl text-xs text-red-600 hover:bg-red-50 transition"
                    >
                      전체 삭제
                    </button>
                  )}
                </div>
              </div>

              {/* Reservation List Table */}
              {filtered.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-gray-700 mb-1">
                    접수된 예약 내역이 없습니다.
                  </h4>
                  <p className="text-xs text-gray-500">
                    홈페이지의 [방문예약 신청] 폼을 통해 접수되면 여기에 실시간으로 기록됩니다.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs hover:border-[#c2a36b] transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      {/* Left: Info */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#16365e] bg-gray-100 px-2 py-0.5 rounded">
                            {item.reservationNo}
                          </span>
                          <span className="font-bold text-base text-[#0a1a30]">
                            {item.name} 님
                          </span>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#c2a36b]/15 text-[#16365e]">
                            {item.type}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            (접수: {item.createdAt})
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pt-1">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#c2a36b]" />
                            <span>
                              희망 방문일시: <strong>{item.date} {item.time}</strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 font-bold text-gray-800">
                            <Phone className="w-3.5 h-3.5 text-[#c2a36b]" />
                            <span>{item.phone}</span>
                          </div>
                        </div>

                        {item.memo && (
                          <div className="mt-2 text-xs bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-gray-700">
                            <strong className="text-gray-900">고객 메모:</strong> {item.memo}
                          </div>
                        )}
                      </div>

                      {/* Right: Status selector & Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                        {/* Status Select */}
                        <select
                          value={item.status || '대기중'}
                          onChange={(e) =>
                            handleStatusChange(idx, e.target.value as '대기중' | '통화완료' | '방문확정' | '취소')
                          }
                          className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border outline-none cursor-pointer ${
                            item.status === '방문확정'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : item.status === '통화완료'
                              ? 'bg-blue-50 text-blue-700 border-blue-300'
                              : item.status === '취소'
                              ? 'bg-gray-100 text-gray-600 border-gray-300'
                              : 'bg-amber-50 text-amber-700 border-amber-300'
                          }`}
                        >
                          <option value="대기중">대기중 (미상담)</option>
                          <option value="통화완료">통화완료</option>
                          <option value="방문확정">방문확정</option>
                          <option value="취소">취소/보류</option>
                        </select>

                        {/* Direct Call Link */}
                        <a
                          href={`tel:${item.phone.replace(/[^0-9]/g, '')}`}
                          className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition"
                          title="고객에게 전화 걸기"
                        >
                          <Phone className="w-4 h-4" />
                        </a>

                        {/* Direct SMS Link */}
                        <a
                          href={`sms:${item.phone.replace(/[^0-9]/g, '')}?body=${encodeURIComponent(
                            `안녕하세요 ${item.name} 고객님, 청라 더리브 티아모 Casa 분양상담실입니다. 남겨주신 방문예약 신청 건으로 연락드렸습니다.`
                          )}`}
                          className="p-2 rounded-xl bg-[#16365e] hover:bg-[#1f4a80] text-white transition"
                          title="안내 문자 발송"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDelete(idx)}
                          className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-600 transition cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Google Sheets Integration Guide Tab */
            <div className="space-y-6 max-w-3xl mx-auto py-2">
              {/* Top Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-emerald-900">
                <div className="flex items-center gap-2 font-bold text-base mb-1">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
                  <span>구글 스프레드시트 실시간 연동 (스마트폰 알림 &amp; 엑셀 자동 기록)</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  구글 스프레드시트를 연동하시면 고객이 방문예약을 신청하는 즉시 대표님의 구글 시트에 1행씩 실시간으로 자동 입력되어, 스마트폰 구글 시트 앱에서 실시간으로 확인하실 수 있습니다.
                </p>
              </div>

              {/* Direct Links Card */}
              <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h4 className="font-bold text-sm text-[#0a1a30] flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-emerald-600" />
                    <span>구글 스프레드시트 원클릭 바로가기 링크</span>
                  </h4>
                  <span className="text-[11px] text-gray-400">Google 계정 로그인 필요</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="https://sheets.new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-between transition shadow group"
                  >
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>새 구글 시트 1초 생성하기</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href="https://docs.google.com/spreadsheets/u/0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-[#0a1a30] hover:bg-[#16365e] text-white font-bold text-xs flex items-center justify-between transition shadow group"
                  >
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-[#c2a36b]" />
                      <span>내 구글 드라이브 시트 목록 열기</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>

                {/* Custom Sheet URL Register */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    내가 만든 구글 시트 주소(URL) 저장하기
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="예) https://docs.google.com/spreadsheets/d/1abc.../edit"
                      value={sheetDirectUrl}
                      onChange={(e) => setSheetDirectUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:border-[#0a1a30] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem('TIAMO_SHEET_DIRECT_URL', sheetDirectUrl.trim());
                        setSavedSheetUrl(true);
                        setTimeout(() => setSavedSheetUrl(false), 2000);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#0a1a30] hover:bg-[#16365e] text-white text-xs font-bold transition cursor-pointer"
                    >
                      {savedSheetUrl ? '저장됨!' : '링크 저장'}
                    </button>
                    {sheetDirectUrl && (
                      <a
                        href={sheetDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1 shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>열기</span>
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    * 대표님의 구글 시트 주소를 저장해두시면 상단 버튼을 눌러 언제든 즉시 시트로 이동할 수 있습니다.
                  </p>
                </div>
              </div>

              {/* Step by step */}
              <div className="space-y-4 text-xs text-gray-700">
                <div className="p-4 bg-white rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-sm text-[#0a1a30] mb-2">
                    1단계: 구글 드라이브에서 새 스프레드시트 생성
                  </h4>
                  <p className="text-gray-500 mb-2">
                    <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold underline">https://sheets.new</a> 로 새 시트를 열고, 1행(머리글)에 다음 순서로 입력합니다:
                  </p>
                  <div className="bg-gray-100 p-2.5 rounded-lg font-mono text-[11px] text-gray-800">
                    접수일시 ｜ 예약번호 ｜ 성함 ｜ 연락처 ｜ 희망일 ｜ 희망시간 ｜ 관심평형 ｜ 추가메모
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm text-[#0a1a30]">
                      2단계: [확장 프로그램] → [Apps Script] 에 코드 붙여넣기
                    </h4>
                    <button
                      type="button"
                      onClick={copyAppsScript}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#0a1a30] text-white text-[11px] font-bold hover:bg-[#16365e] transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedCode ? '복사됨!' : '스크립트 코드 복사'}</span>
                    </button>
                  </div>
                  <pre className="bg-[#0a1a30] text-[#e0cba3] p-3 rounded-xl overflow-x-auto font-mono text-[11px] leading-relaxed">
                    {googleAppsScriptCode}
                  </pre>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-sm text-[#0a1a30] mb-2">
                    3단계: [배포] → [새 배포] → 웹 앱 배포 후 URL 입력
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
                    <li>유형: <strong>웹 앱 (Web App)</strong></li>
                    <li>실행 계정: <strong>나(내 계정)</strong></li>
                    <li>액세스 권한: <strong>모든 사용자 (Anyone)</strong> 로 설정 후 배포</li>
                  </ul>

                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://script.google.com/macros/s/.../exec"
                      value={gasUrl}
                      onChange={(e) => setGasUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:border-[#0a1a30] outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleSaveGasUrl}
                      className="px-4 py-2.5 rounded-xl bg-[#c2a36b] hover:bg-[#e0cba3] text-[#0a1a30] font-bold text-xs transition cursor-pointer"
                    >
                      {copiedUrl ? '저장 완료!' : 'URL 저장하기'}
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    * 배포 URL을 저장하시면 이후 모든 고객 접수 내용이 구글 시트로 즉시 자동 전송됩니다.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-200 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
          <span>
            * 분양상담실 직통: <strong className="text-[#0a1a30]">{PROPERTY_INFO.phoneDisplay}</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
