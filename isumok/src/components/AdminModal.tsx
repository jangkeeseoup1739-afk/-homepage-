import React, { useState } from 'react';
import { 
  X, Plus, Trash2, Edit3, Image, Calendar, MessageSquare, 
  CheckCircle, Sliders, Shield, Key, Eye, Upload, RefreshCw, Phone
} from 'lucide-react';
import { BeforeAfterItem, PortfolioItem, BookingRequest, ReviewItem, ServiceCategory } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  beforeAfterItems: BeforeAfterItem[];
  onAddBeforeAfter: (item: BeforeAfterItem) => void;
  onDeleteBeforeAfter: (id: string) => void;
  portfolioItems: PortfolioItem[];
  onAddPortfolio: (item: PortfolioItem) => void;
  onDeletePortfolio: (id: string) => void;
  bookings: BookingRequest[];
  onUpdateBookingStatus: (id: string, status: BookingRequest['status']) => void;
  reviews: ReviewItem[];
  onAddOwnerReply: (reviewId: string, replyText: string) => void;
  onDeleteReview: (id: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  beforeAfterItems,
  onAddBeforeAfter,
  onDeleteBeforeAfter,
  portfolioItems,
  onAddPortfolio,
  onDeletePortfolio,
  bookings,
  onUpdateBookingStatus,
  reviews,
  onAddOwnerReply,
  onDeleteReview
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // default open or quick auth
  const [activeTab, setActiveTab] = useState<'before-after' | 'portfolio' | 'bookings' | 'reviews'>('before-after');
  
  // Before & After Form State
  const [baTitle, setBaTitle] = useState('');
  const [baCategory, setBaCategory] = useState<ServiceCategory>('열펌');
  const [baBeforeImage, setBaBeforeImage] = useState('');
  const [baAfterImage, setBaAfterImage] = useState('');
  const [baClientProblem, setBaClientProblem] = useState('');
  const [baSolutionKey, setBaSolutionKey] = useState('');
  const [baNaturalCareUsed, setBaNaturalCareUsed] = useState('천연 유기농 단백질 팩 & 저자극 아르간 에센스');
  const [baProcedureTime, setBaProcedureTime] = useState('2시간 30분');
  const [baSuccessAlert, setBaSuccessAlert] = useState(false);

  // Portfolio Form State
  const [portTitle, setPortTitle] = useState('');
  const [portCategory, setPortCategory] = useState<ServiceCategory>('열펌');
  const [portImage, setPortImage] = useState('');
  const [portTags, setPortTags] = useState('#열펌 #천연케어 #송파미용실');
  const [portDescription, setPortDescription] = useState('');
  const [portDesignerNote, setPortDesignerNote] = useState('');

  // Review reply state
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  // File upload helper to base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'ba-before' | 'ba-after' | 'portfolio') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (target === 'ba-before') setBaBeforeImage(result);
      if (target === 'ba-after') setBaAfterImage(result);
      if (target === 'portfolio') setPortImage(result);
    };
    reader.readAsDataURL(file);
  };

  // Submit Before & After
  const handleSaveBeforeAfter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baTitle.trim() || !baBeforeImage || !baAfterImage) {
      alert('제목과 전/후 이미지는 필수 입력 항목입니다.');
      return;
    }

    const newItem: BeforeAfterItem = {
      id: `ba-${Date.now()}`,
      title: baTitle,
      category: baCategory,
      beforeImage: baBeforeImage,
      afterImage: baAfterImage,
      clientProblem: baClientProblem || '모발 손상 및 볼륨 꺼짐으로 인한 고민',
      solutionKey: baSolutionKey || '이수목 원장의 1:1 맞춤 천연 연화 및 정밀 테크닉',
      naturalCareUsed: baNaturalCareUsed,
      procedureTime: baProcedureTime,
      date: new Date().toISOString().slice(0, 7).replace('-', '.')
    };

    onAddBeforeAfter(newItem);
    setBaSuccessAlert(true);
    setTimeout(() => setBaSuccessAlert(false), 2000);

    // reset fields
    setBaTitle('');
    setBaBeforeImage('');
    setBaAfterImage('');
    setBaClientProblem('');
    setBaSolutionKey('');
  };

  // Submit Portfolio
  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portTitle.trim() || !portImage) {
      alert('스타일명과 이미지는 필수 항목입니다.');
      return;
    }

    const tagsArray = portTags
      .split(' ')
      .map(t => t.trim())
      .filter(t => t.length > 0)
      .map(t => t.startsWith('#') ? t : `#${t}`);

    const newPort: PortfolioItem = {
      id: `p-${Date.now()}`,
      title: portTitle,
      category: portCategory,
      imageUrl: portImage,
      tags: tagsArray.length > 0 ? tagsArray : ['#이수목헤어스토리', '#맞춤스타일'],
      description: portDescription || '원장 1인 맞춤 케어로 완성된 감각적인 헤어스타일입니다.',
      designerNote: portDesignerNote
    };

    onAddPortfolio(newPort);
    setPortTitle('');
    setPortImage('');
    setPortDescription('');
    setPortDesignerNote('');
    alert('새 포트폴리오 스타일이 등록되었습니다!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#161821] rounded-2xl border border-[#d4af37]/50 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#292c38] flex items-center justify-between bg-[#13141c]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif-luxury font-bold text-white flex items-center gap-2">
                이수목헤어스토리 관리자 모드
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#252834] text-[#f7e7b4] border border-[#343847]">
                  ADMIN
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#cbd2e1]">
                스타일별 시술 전후 비교 사진 등록, 포트폴리오 및 예약 접수 관리
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

        {/* Tab Navigation */}
        <div className="flex border-b border-[#292c38] bg-[#121319] overflow-x-auto text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('before-after')}
            className={`px-4 sm:px-6 py-3.5 shrink-0 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'before-after'
                ? 'border-[#d4af37] text-[#f7e7b4] bg-[#191b24]'
                : 'border-transparent text-[#cbd2e1] hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4 text-[#d4af37]" />
            <span>시술 전후(Before & After) 등록·관리</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-[#272b38] text-white font-bold">
              {beforeAfterItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 sm:px-6 py-3.5 shrink-0 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'portfolio'
                ? 'border-[#d4af37] text-[#f7e7b4] bg-[#191b24]'
                : 'border-transparent text-[#cbd2e1] hover:text-white'
            }`}
          >
            <Image className="w-4 h-4 text-[#d4af37]" />
            <span>포트폴리오 갤러리 관리</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-[#272b38] text-white font-bold">
              {portfolioItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 sm:px-6 py-3.5 shrink-0 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'bookings'
                ? 'border-[#d4af37] text-[#f7e7b4] bg-[#191b24]'
                : 'border-transparent text-[#cbd2e1] hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>예약 & 상담 접수 목록</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-[#e6ca65] text-[#121316] font-bold">
              {bookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 sm:px-6 py-3 shrink-0 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'reviews'
                ? 'border-[#d4af37] text-[#d4af37] bg-[#191b24]'
                : 'border-transparent text-[#9da2b2] hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>고객 리뷰 관리</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#272b38] text-white">
              {reviews.length}
            </span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">

          {/* TAB 1: BEFORE & AFTER MANAGEMENT (Primary requested feature) */}
          {activeTab === 'before-after' && (
            <div className="space-y-8">
              
              {/* Form to Add New Case */}
              <div className="rounded-xl p-5 sm:p-6 bg-[#1b1d28] border border-[#d4af37]/40 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#d4af37]" />
                    새로운 시술 전·후 비교 케이스 등록
                  </h3>
                  <span className="text-xs text-[#a0a5b4]">등록 즉시 메인 페이지 슬라이더에 반영됩니다</span>
                </div>

                {baSuccessAlert && (
                  <div className="p-3 rounded-lg bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>성공적으로 전·후 비교 케이스가 등록되었습니다!</span>
                  </div>
                )}

                <form onSubmit={handleSaveBeforeAfter} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#b8bcc8] mb-1">
                        시술 제목 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={baTitle}
                        onChange={(e) => setBaTitle(e.target.value)}
                        placeholder="예: 극손상 탈색모 → 천연 매직셋팅 윤기 복구"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#222532] border border-[#343848] text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#b8bcc8] mb-1">
                        카테고리 분류
                      </label>
                      <select
                        value={baCategory}
                        onChange={(e) => setBaCategory(e.target.value as ServiceCategory)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#222532] border border-[#343848] text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="열펌">열펌 (디지털, 셋팅, 매직셋팅)</option>
                        <option value="링거펌">링거펌 (모류교정, 뿌리볼륨)</option>
                        <option value="매직/볼륨매직">매직/볼륨매직</option>
                        <option value="일반펌">일반펌</option>
                        <option value="커트">커트</option>
                        <option value="스타일링">스타일링</option>
                      </select>
                    </div>
                  </div>

                  {/* Images Upload / URL Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Before Image Box */}
                    <div className="p-4 rounded-xl bg-[#222531] border border-red-500/30 space-y-2">
                      <span className="text-xs font-bold text-red-400 flex items-center justify-between">
                        <span>BEFORE (시술 전 사진) *</span>
                        {baBeforeImage && <span className="text-[10px] text-emerald-400">선택 완료</span>}
                      </span>
                      <input
                        type="text"
                        value={baBeforeImage}
                        onChange={(e) => setBaBeforeImage(e.target.value)}
                        placeholder="이미지 URL을 입력하거나 아래 파일 선택"
                        className="w-full px-3 py-2 rounded-lg bg-[#191b24] border border-[#323646] text-xs text-white focus:outline-none focus:border-red-400"
                      />
                      <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#2c3040] hover:bg-[#34394d] text-xs text-[#dcdfe6] cursor-pointer border border-[#3e4458] transition-colors">
                        <Upload className="w-3.5 h-3.5 text-red-400" />
                        <span>내 PC에서 Before 사진 파일 업로드</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'ba-before')}
                          className="hidden"
                        />
                      </label>
                      {baBeforeImage && (
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-[#3a3f52]">
                          <img src={baBeforeImage} alt="Before preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    {/* After Image Box */}
                    <div className="p-4 rounded-xl bg-[#222531] border border-[#d4af37]/40 space-y-2">
                      <span className="text-xs font-bold text-[#d4af37] flex items-center justify-between">
                        <span>AFTER (시술 후 사진) *</span>
                        {baAfterImage && <span className="text-[10px] text-emerald-400">선택 완료</span>}
                      </span>
                      <input
                        type="text"
                        value={baAfterImage}
                        onChange={(e) => setBaAfterImage(e.target.value)}
                        placeholder="이미지 URL을 입력하거나 아래 파일 선택"
                        className="w-full px-3 py-2 rounded-lg bg-[#191b24] border border-[#323646] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                      <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#2c3040] hover:bg-[#34394d] text-xs text-[#dcdfe6] cursor-pointer border border-[#3e4458] transition-colors">
                        <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>내 PC에서 After 사진 파일 업로드</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'ba-after')}
                          className="hidden"
                        />
                      </label>
                      {baAfterImage && (
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-[#3a3f52]">
                          <img src={baAfterImage} alt="After preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#b8bcc8] mb-1">
                        고객의 문제점 & 상태
                      </label>
                      <input
                        type="text"
                        value={baClientProblem}
                        onChange={(e) => setBaClientProblem(e.target.value)}
                        placeholder="예: 잦은 염색으로 빗질이 안 되고 정수리가 가라앉음"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#222532] border border-[#343848] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#b8bcc8] mb-1">
                        원장의 맞춤 처방 솔루션
                      </label>
                      <input
                        type="text"
                        value={baSolutionKey}
                        onChange={(e) => setBaSolutionKey(e.target.value)}
                        placeholder="예: 천연 식물성 단백질 복구 전처리 후 특허 링거 로트 시술"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#222532] border border-[#343848] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#b8bcc8] mb-1">
                        사용된 천연 유기농 케어 제품
                      </label>
                      <input
                        type="text"
                        value={baNaturalCareUsed}
                        onChange={(e) => setBaNaturalCareUsed(e.target.value)}
                        placeholder="예: 유기농 아르간 모발 영양팩 & 천연 두피 진정수"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#222532] border border-[#343848] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#b8bcc8] mb-1">
                        시술 소요 시간
                      </label>
                      <input
                        type="text"
                        value={baProcedureTime}
                        onChange={(e) => setBaProcedureTime(e.target.value)}
                        placeholder="예: 2시간 30분"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#222532] border border-[#343848] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89225] text-[#121316] font-bold text-sm shadow hover:brightness-105 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>시술 전·후 비교 케이스 저장 및 사이트 반영</span>
                  </button>
                </form>
              </div>

              {/* List of Existing Before & After Cases */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center justify-between">
                  <span>현재 등록된 시술 전·후 비교 목록 ({beforeAfterItems.length}개)</span>
                  <span className="text-xs text-[#8e93a0]">슬라이더와 사이트에 즉시 노출 중</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {beforeAfterItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[#191b25] border border-[#2b2e3c] flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#272a38] text-[#d4af37]">
                            {item.category}
                          </span>
                          <button
                            onClick={() => onDeleteBeforeAfter(item.id)}
                            className="p-1 rounded text-red-400 hover:bg-red-950/40 transition-colors"
                            title="삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                          {item.title}
                        </h4>

                        {/* Dual Thumbnail */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div className="relative aspect-[4/3] rounded overflow-hidden border border-red-500/30">
                            <img src={item.beforeImage} alt="before" className="w-full h-full object-cover" />
                            <span className="absolute bottom-1 left-1 bg-black/70 text-[9px] text-red-300 px-1 rounded">BEFORE</span>
                          </div>
                          <div className="relative aspect-[4/3] rounded overflow-hidden border border-[#d4af37]/40">
                            <img src={item.afterImage} alt="after" className="w-full h-full object-cover" />
                            <span className="absolute bottom-1 left-1 bg-black/70 text-[9px] text-[#f7e7b4] px-1 rounded">AFTER</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-[#9095a5] line-clamp-2">
                          <strong>처방:</strong> {item.solutionKey}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PORTFOLIO MANAGEMENT */}
          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              {/* Form to Add New Portfolio */}
              <div className="rounded-xl p-5 sm:p-6 bg-[#1b1d28] border border-[#2e3240] space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#d4af37]" />
                  새 포트폴리오 스타일 사진 등록
                </h3>

                <form onSubmit={handleSavePortfolio} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#b8bcc8] mb-1">
                        스타일명 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={portTitle}
                        onChange={(e) => setPortTitle(e.target.value)}
                        placeholder="예: 굵은 웨이브 내추럴 디지털 열펌"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#222532] border border-[#343848] text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#b8bcc8] mb-1">
                        시술 카테고리
                      </label>
                      <select
                        value={portCategory}
                        onChange={(e) => setPortCategory(e.target.value as ServiceCategory)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#222532] border border-[#343848] text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="열펌">열펌</option>
                        <option value="링거펌">링거펌</option>
                        <option value="매직/볼륨매직">매직/볼륨매직</option>
                        <option value="일반펌">일반펌</option>
                        <option value="커트">커트</option>
                        <option value="스타일링">스타일링</option>
                      </select>
                    </div>
                  </div>

                  {/* Portfolio Image */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#b8bcc8] mb-1">
                        이미지 URL 또는 업로드 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={portImage}
                        onChange={(e) => setPortImage(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#222532] border border-[#343848] text-xs text-white focus:outline-none focus:border-[#d4af37] mb-2"
                      />
                      <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#2c3040] hover:bg-[#34394d] text-xs text-[#dcdfe6] cursor-pointer border border-[#3e4458]">
                        <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>사진 파일 업로드</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'portfolio')}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#b8bcc8] mb-1">
                        해시태그 (공백으로 구분)
                      </label>
                      <input
                        type="text"
                        value={portTags}
                        onChange={(e) => setPortTags(e.target.value)}
                        placeholder="#열펌 #모류교정 #천연살롱"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#222532] border border-[#343848] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#b8bcc8] mb-1">
                      스타일 설명 및 원장 추천 팁
                    </label>
                    <textarea
                      rows={2}
                      value={portDescription}
                      onChange={(e) => setPortDescription(e.target.value)}
                      placeholder="스타일의 특징 및 손질법을 적어주세요."
                      className="w-full px-3.5 py-2 rounded-lg bg-[#222532] border border-[#343848] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#d4af37] text-[#121316] font-bold text-xs sm:text-sm hover:brightness-105 transition-all"
                  >
                    포트폴리오 사진 등록
                  </button>
                </form>
              </div>

              {/* Existing Portfolio Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {portfolioItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[#191b25] border border-[#2b2e3c] space-y-2 relative group"
                  >
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => onDeletePortfolio(item.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-md bg-red-600/80 text-white hover:bg-red-600 transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                    <span className="text-[10px] text-[#d4af37]">{item.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BOOKINGS & CONSULTATIONS */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">
                  온라인 상담 및 예약 접수 현황 ({bookings.length}건)
                </h3>
                <span className="text-xs text-[#a0a5b4]">클릭 시 상태 변경 가능</span>
              </div>

              {bookings.length === 0 ? (
                <div className="p-8 text-center bg-[#191b24] rounded-xl border border-[#272a37] text-xs text-[#8c91a0]">
                  접수된 예약 상담이 없습니다.
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-xl bg-[#191b25] border border-[#2c2f3d] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{b.customerName} 고객님</h4>
                          <a
                            href={`tel:${b.phone}`}
                            className="text-xs text-[#d4af37] hover:underline flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            {b.phone}
                          </a>
                          <span className="text-[11px] text-[#7d8291]">({b.createdAt})</span>
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs text-[#b8bcc8]">
                          <span className="text-[#f7e7b4]">희망일시: <strong>{b.preferredDate} {b.preferredTime}</strong></span>
                          <span>|</span>
                          <span className="text-[#d4af37]">시술: {b.serviceCategory}</span>
                        </div>

                        {b.hairConcerns && b.hairConcerns.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {b.hairConcerns.map((c, i) => (
                              <span key={i} className="px-1.5 py-0.5 rounded text-[10px] bg-[#222532] text-[#9ea3b2]">
                                {c}
                              </span>
                            ))}
                          </div>
                        )}

                        {b.notes && (
                          <p className="text-xs text-[#9095a5] italic mt-1">
                            "요청: {b.notes}"
                          </p>
                        )}
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <select
                          value={b.status}
                          onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as BookingRequest['status'])}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none ${
                            b.status === '접수완료'
                              ? 'bg-amber-950/60 border-amber-600/50 text-amber-300'
                              : b.status === '예약확정'
                              ? 'bg-emerald-950/60 border-emerald-600/50 text-emerald-300'
                              : b.status === '시술완료'
                              ? 'bg-blue-950/60 border-blue-600/50 text-blue-300'
                              : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                          }`}
                        >
                          <option value="접수완료">접수완료</option>
                          <option value="예약확정">예약확정 (연락완료)</option>
                          <option value="시술완료">시술완료</option>
                          <option value="취소됨">취소됨</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: REVIEWS MANAGEMENT */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">
                고객 리뷰 & 원장 답글 관리 ({reviews.length}개)
              </h3>

              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="p-4 rounded-xl bg-[#191b25] border border-[#2b2e3c] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{r.author}</span>
                        <span className="text-xs text-[#d4af37]">★ {r.rating}.0</span>
                        <span className="text-xs text-[#787d8d]">{r.date}</span>
                      </div>
                      <button
                        onClick={() => onDeleteReview(r.id)}
                        className="text-red-400 hover:text-red-300 p-1 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> 삭제
                      </button>
                    </div>

                    <p className="text-xs text-[#c4c9d6]">{r.comment}</p>

                    {/* Owner reply section */}
                    <div className="pt-2 border-t border-[#262835]">
                      {r.replyFromOwner ? (
                        <div className="p-2.5 rounded bg-[#20222e] text-xs text-[#9da2b2]">
                          <strong className="text-[#f7e7b4] block mb-0.5">등록된 원장 답글:</strong>
                          {r.replyFromOwner}
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="고객님께 감사 답글을 입력해주세요..."
                            value={replyInputs[r.id] || ''}
                            onChange={(e) => setReplyInputs({ ...replyInputs, [r.id]: e.target.value })}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-[#222533] border border-[#323646] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                          />
                          <button
                            onClick={() => {
                              if (replyInputs[r.id]) {
                                onAddOwnerReply(r.id, replyInputs[r.id]);
                                setReplyInputs({ ...replyInputs, [r.id]: '' });
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#d4af37] text-[#121316] font-bold text-xs hover:brightness-105"
                          >
                            답글 달기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
