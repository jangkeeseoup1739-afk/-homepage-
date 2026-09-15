import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, ShieldCheck, ArrowRight, User, ChevronDown } from 'lucide-react';
import { SajuInput, Gender, CalendarType } from '../types';
import { getLeapMonth, getLunarMonthDays, LUNAR_MAX_YEAR, LUNAR_MIN_YEAR } from '../utils/lunarCalendar';
import wideHeroImage from '../assets/images/hanbok_wide_panoramic_1789361790745.jpg';

interface HeroSectionProps {
  onSubmit: (data: SajuInput) => void;
  isLoading: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSubmit, isLoading }) => {
  const currentYear = new Date().getFullYear();
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>('female');
  const [calendarType, setCalendarType] = useState<CalendarType>('solar');
  const [year, setYear] = useState<number>(1995);
  const [month, setMonth] = useState<number>(5);
  const [day, setDay] = useState<number>(18);
  const [hour, setHour] = useState<number>(14);
  const [minute, setMinute] = useState<number>(30);
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);
  const [region, setRegion] = useState('서울/경기 (127.5도)');
  const [isLeapMonth, setIsLeapMonth] = useState(false);

  const isLunar = calendarType === 'lunar';
  // 그 해에 든 윤달(없으면 0). 윤달은 해마다 드는 달이 달라서, 고른 연·월에
  // 실제로 윤달이 있을 때만 선택할 수 있게 합니다.
  const leapMonthOfYear = isLunar ? getLeapMonth(year) : 0;
  const canPickLeapMonth = leapMonthOfYear === month;
  const lunarOutOfRange = isLunar && (year < LUNAR_MIN_YEAR || year > LUNAR_MAX_YEAR);

  // 고른 달에 실제로 있는 날짜 수. 음력은 29·30일, 양력은 28~31일입니다.
  const daysInMonth = isLunar
    ? getLunarMonthDays(year, month, isLeapMonth && canPickLeapMonth) || 30
    : new Date(year, month, 0).getDate();

  // 달을 바꿨는데 윤달이 없어졌거나, 날짜가 그 달에 없는 날이면 되돌립니다.
  React.useEffect(() => {
    if (isLeapMonth && !canPickLeapMonth) setIsLeapMonth(false);
  }, [isLeapMonth, canPickLeapMonth]);
  React.useEffect(() => {
    if (day > daysInMonth) setDay(daysInMonth);
  }, [day, daysInMonth]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: name.trim() || '의뢰인',
      gender,
      calendarType,
      isLeapMonth: isLunar && canPickLeapMonth && isLeapMonth,
      year,
      month,
      day: Math.min(day, daysInMonth),
      hour,
      minute,
      isTimeUnknown,
      region,
    });
  };

  const scrollToForm = () => {
    const formEl = document.getElementById('saju-input-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Generate Year options (1930 ~ current year)
  const yearOptions = Array.from({ length: 95 }, (_, i) => currentYear - i);
  // Month options (1 ~ 12)
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  // Day options — 고른 달에 실제로 있는 날까지만
  const dayOptions = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  // Hour options (0 ~ 23)
  const hourOptions = [
    { value: 0, label: '자시 (23:30 ~ 01:29)' },
    { value: 2, label: '축시 (01:30 ~ 03:29)' },
    { value: 4, label: '인시 (03:30 ~ 05:29)' },
    { value: 6, label: '묘시 (05:30 ~ 07:29)' },
    { value: 8, label: '진시 (07:30 ~ 09:29)' },
    { value: 10, label: '사시 (09:30 ~ 11:29)' },
    { value: 12, label: '오시 (11:30 ~ 13:29)' },
    { value: 14, label: '미시 (13:30 ~ 15:29)' },
    { value: 16, label: '신시 (15:30 ~ 17:29)' },
    { value: 18, label: '유시 (17:30 ~ 19:29)' },
    { value: 20, label: '술시 (19:30 ~ 21:29)' },
    { value: 22, label: '해시 (21:30 ~ 23:29)' },
  ];

  const regionOptions = [
    '서울/경기 (127.5도)',
    '부산/울산/경남 (129도)',
    '대구/경북 (128.5도)',
    '광주/전남/전북 (126.8도)',
    '대전/세종/충청 (127.3도)',
    '강원 (128.2도)',
    '제주 (126.5도)',
  ];

  return (
    <section className="relative overflow-hidden pt-4 pb-16 lg:pb-24 bg-gradient-to-b from-[#0D0E14] via-[#12131A] to-[#0D0E14]">
      {/* Subtle traditional starry dust background */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF7C_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      {/* Ambient warm sunset halo glow */}
      <div className="absolute top-1/6 right-1/4 w-[650px] h-[450px] bg-gradient-to-br from-[#D4AF7C]/15 via-[#B86B42]/12 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[400px] bg-[#1E202C]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 lg:space-y-10">

        {/* 1. Grand Expansive Panoramic Visual Stage (넓은 시야의 한옥 풍경 & 인물 스테이지) */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D4AF7C]/35 shadow-[0_20px_60px_rgba(0,0,0,0.75)] group">
          {/* Panoramic Image Canvas */}
          <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px]">
            <img
              src={wideHeroImage}
              alt="명결 고궁 한옥과 전통 한복 비주얼 파노라마"
              className="w-full h-full object-cover object-[72%_center] sm:object-[65%_center] lg:object-right group-hover:scale-101 transition-transform duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />

            {/* Left Atmospheric Dark Vignette Overlay for Typographic Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0E14] via-[#0D0E14]/85 sm:via-[#0D0E14]/70 md:via-[#0D0E14]/50 via-45% to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E14] via-transparent to-transparent opacity-60 pointer-events-none" />

            {/* Content Overlaid onto the Expansive Scene */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:p-14 z-10">
              {/* Top Tag & Motto */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14151E]/90 border border-[#D4AF7C]/60 text-xs sm:text-sm font-semibold text-[#F5D298] backdrop-blur-md shadow-md">
                  <Sparkles className="w-4 h-4 text-[#F5D298]" />
                  <span>오늘도, 더 나은 내일을 위한</span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#14151E]/80 border border-[#D4AF7C]/40 text-xs sm:text-sm text-[#F1F5F9] font-medium backdrop-blur-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>실시간 천문 만세력 연산 가동 중</span>
                </div>
              </div>

              {/* Main Headline & Narrative */}
              <div className="max-w-2xl space-y-3 sm:space-y-4">
                <h1 className="font-serif-kr text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#FFFFFF] leading-tight drop-shadow-lg">
                  당신의 사주를, <br />
                  <span className="text-[#F5D298] relative inline-block">
                    AI가 쉽게
                    <span className="absolute bottom-1.5 left-0 w-full h-2 bg-[#D4AF7C]/40 -z-10 rounded"></span>
                  </span> 풀어드립니다.
                </h1>
                
                <p className="text-[#F1F5F9] text-sm sm:text-lg font-normal leading-relaxed max-w-lg drop-shadow-md">
                  타고난 본원의 기운부터 재물·사업·연애·10년 대운의 흐름까지.<br className="hidden sm:inline" />
                  정통 천문 만세력의 정밀함과 인공지능의 깊이 있는 통찰을 경험하세요.
                </p>

                {/* Quick Action Button to Form */}
                <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={scrollToForm}
                    id="hero-jump-to-form-btn"
                    className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#2E2419] via-[#4A3B2A] to-[#2E2419] hover:from-[#3D2F20] hover:to-[#3D2F20] text-[#FFFFFF] font-bold text-sm sm:text-base border border-[#D4AF7C] shadow-xl hover:shadow-[#D4AF7C]/20 transition-all flex items-center gap-2 group/btn"
                  >
                    <span className="font-serif-kr">내 사주 바로 보기</span>
                    <ChevronDown className="w-4 h-4 text-[#F5D298] group-hover/btn:translate-y-0.5 transition-transform" />
                  </button>

                  <div className="hidden md:flex items-center gap-2.5 text-xs sm:text-sm text-[#F1F5F9] font-medium">
                    <span className="px-3 py-1.5 rounded-lg bg-[#14151E]/80 border border-[#3B384D]">
                      ✔ 100% 무료
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-[#14151E]/80 border border-[#3B384D]">
                      ✔ 무가입 즉시 분석
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Traditional Aesthetic Badge */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs sm:text-sm text-[#E2E8F0] font-normal hidden sm:block">
                  명(命)을 풀고, 사람과 운을 연결하다
                </div>
                <div className="px-4 py-2 rounded-xl bg-[#14151E]/90 border border-[#D4AF7C]/50 text-xs sm:text-sm text-[#FFFFFF] font-serif-kr font-medium backdrop-blur-md ml-auto shadow-md">
                  &ldquo;운명은 정해진 것이 아니라, 알고 나아가는 길입니다&rdquo;
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Spacious Centered Saju Input Section (시야가 넓고 편안한 사주 입력 센터) */}
        <div id="saju-input-form" className="max-w-4xl mx-auto">
          <div className="bg-[#14151E] border border-[#333044] rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative">
            {/* Header of Form */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2D2A3D] pb-5 mb-7 gap-2">
              <div>
                <h2 className="font-serif-kr text-2xl sm:text-3xl font-bold text-[#FFFFFF] flex items-center gap-3">
                  <User className="w-6 h-6 text-[#F5D298]" />
                  사주 정보 입력
                </h2>
                <p className="text-xs sm:text-sm text-[#E2E8F0] mt-1.5 font-normal">
                  생년월일시를 입력하시면 만세력 4기둥(사주원국)과 5대 심층 AI 풀이를 즉시 확인하실 수 있습니다.
                </p>
              </div>
              <span className="self-start sm:self-auto text-xs sm:text-sm text-[#F5D298] bg-[#1E202B] px-3.5 py-1.5 rounded-full border border-[#D4AF7C]/40 font-semibold">
                정밀 만세력 100% 무료
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-sm sm:text-base">
              {/* Row 1: Name & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-[#F8FAFC] font-semibold text-sm sm:text-base mb-2">이름</label>
                  <input
                    type="text"
                    id="input-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력하세요 (예: 홍길동)"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0C10] border border-[#3B384D] text-[#FFFFFF] text-sm sm:text-base placeholder:text-[#94A3B8] focus:outline-none focus:border-[#D4AF7C] transition-colors font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[#F8FAFC] font-semibold text-sm sm:text-base mb-2">성별</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      id="gender-male-btn"
                      onClick={() => setGender('male')}
                      className={`py-3 rounded-xl font-bold transition-all text-center text-sm sm:text-base ${
                        gender === 'male'
                          ? 'bg-[#222436] text-[#FFFFFF] border border-[#D4AF7C] shadow-md'
                          : 'bg-[#0B0C10] text-[#CBD5E1] border border-[#3B384D] hover:text-[#FFFFFF]'
                      }`}
                    >
                      남성
                    </button>
                    <button
                      type="button"
                      id="gender-female-btn"
                      onClick={() => setGender('female')}
                      className={`py-3 rounded-xl font-bold transition-all text-center text-sm sm:text-base ${
                        gender === 'female'
                          ? 'bg-[#222436] text-[#FFFFFF] border border-[#D4AF7C] shadow-md'
                          : 'bg-[#0B0C10] text-[#CBD5E1] border border-[#3B384D] hover:text-[#FFFFFF]'
                      }`}
                    >
                      여성
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: Calendar Type (Solar / Lunar) */}
              <div>
                <label className="block text-[#F8FAFC] font-semibold text-sm sm:text-base mb-2">양력 / 음력 구분</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    id="calendar-solar-btn"
                    onClick={() => setCalendarType('solar')}
                    className={`py-3 rounded-xl font-bold transition-all text-center text-sm sm:text-base ${
                      calendarType === 'solar'
                        ? 'bg-[#222436] text-[#FFFFFF] border border-[#D4AF7C] shadow-md'
                        : 'bg-[#0B0C10] text-[#CBD5E1] border border-[#3B384D] hover:text-[#FFFFFF]'
                    }`}
                  >
                    양력 (Solar)
                  </button>
                  <button
                    type="button"
                    id="calendar-lunar-btn"
                    onClick={() => setCalendarType('lunar')}
                    className={`py-3 rounded-xl font-bold transition-all text-center text-sm sm:text-base ${
                      calendarType === 'lunar'
                        ? 'bg-[#222436] text-[#FFFFFF] border border-[#D4AF7C] shadow-md'
                        : 'bg-[#0B0C10] text-[#CBD5E1] border border-[#3B384D] hover:text-[#FFFFFF]'
                    }`}
                  >
                    음력 (Lunar)
                  </button>
                </div>

                {isLunar && (
                  <div className="mt-2.5 space-y-2">
                    {canPickLeapMonth && (
                      <label className="flex items-center gap-2 text-xs sm:text-sm text-[#F5D298] font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          id="leap-month-check"
                          checked={isLeapMonth}
                          onChange={(e) => setIsLeapMonth(e.target.checked)}
                          className="rounded border-[#3B384D] bg-[#0B0C10] text-[#D4AF7C] focus:ring-0 w-4 h-4"
                        />
                        <span>{year}년에는 윤{leapMonthOfYear}월이 있습니다 — 윤달로 태어나셨다면 체크해 주세요.</span>
                      </label>
                    )}
                    {lunarOutOfRange && (
                      <p className="text-xs sm:text-sm text-rose-300">
                        음력 환산은 {LUNAR_MIN_YEAR}~{LUNAR_MAX_YEAR}년만 지원합니다. 이 연도는 양력으로 입력해 주세요.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Row 3: Birth Date (Year, Month, Day) */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                <div>
                  <label className="block text-[#F8FAFC] font-semibold text-sm sm:text-base mb-2">출생 연도</label>
                  <select
                    id="select-year"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-3.5 py-3 rounded-xl bg-[#0B0C10] border border-[#3B384D] text-[#FFFFFF] text-sm sm:text-base font-medium focus:outline-none focus:border-[#D4AF7C]"
                  >
                    {yearOptions.map((y) => (
                      <option key={y} value={y}>
                        {y}년
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#F8FAFC] font-semibold text-sm sm:text-base mb-2">출생 월</label>
                  <select
                    id="select-month"
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="w-full px-3.5 py-3 rounded-xl bg-[#0B0C10] border border-[#3B384D] text-[#FFFFFF] text-sm sm:text-base font-medium focus:outline-none focus:border-[#D4AF7C]"
                  >
                    {monthOptions.map((m) => (
                      <option key={m} value={m}>
                        {m}월
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#F8FAFC] font-semibold text-sm sm:text-base mb-2">출생 일</label>
                  <select
                    id="select-day"
                    value={day}
                    onChange={(e) => setDay(Number(e.target.value))}
                    className="w-full px-3.5 py-3 rounded-xl bg-[#0B0C10] border border-[#3B384D] text-[#FFFFFF] text-sm sm:text-base font-medium focus:outline-none focus:border-[#D4AF7C]"
                  >
                    {dayOptions.map((d) => (
                      <option key={d} value={d}>
                        {d}일
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Birth Time & Region */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[#F8FAFC] font-semibold text-sm sm:text-base">출생 시간</label>
                    <label className="flex items-center gap-2 text-xs sm:text-sm text-[#E2E8F0] font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        id="time-unknown-check"
                        checked={isTimeUnknown}
                        onChange={(e) => setIsTimeUnknown(e.target.checked)}
                        className="rounded border-[#3B384D] bg-[#0B0C10] text-[#D4AF7C] focus:ring-0 w-4 h-4"
                      />
                      <span>시간 모름 (삼주만 풀이)</span>
                    </label>
                  </div>
                  <select
                    id="select-hour"
                    value={hour}
                    disabled={isTimeUnknown}
                    onChange={(e) => setHour(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0C10] border border-[#3B384D] text-[#FFFFFF] text-sm sm:text-base font-medium disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:border-[#D4AF7C]"
                  >
                    {hourOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#F8FAFC] font-semibold text-sm sm:text-base mb-2">출생 지역 (한국 표준시 시차 보정)</label>
                  <select
                    id="select-region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0C10] border border-[#3B384D] text-[#FFFFFF] text-sm sm:text-base font-medium focus:outline-none focus:border-[#D4AF7C]"
                  >
                    {regionOptions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-saju-btn"
                disabled={isLoading}
                className="w-full mt-3 py-4 px-6 rounded-xl bg-gradient-to-r from-[#2E2419] via-[#4A3B2A] to-[#2E2419] hover:from-[#3D2F20] hover:to-[#3D2F20] text-[#FFFFFF] font-bold text-base sm:text-lg border border-[#D4AF7C] shadow-xl shadow-black/60 hover:shadow-[#D4AF7C]/20 transition-all flex items-center justify-center gap-2.5 group disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2.5 text-base sm:text-lg">
                    <span className="w-5 h-5 border-2 border-[#D4AF7C] border-t-transparent rounded-full animate-spin"></span>
                    만세력 계산 및 AI 심층 풀이 진행 중...
                  </span>
                ) : (
                  <>
                    <span className="text-[#FFFFFF] font-serif-kr text-base sm:text-lg font-bold">내 사주 무료로 보기</span>
                    <ArrowRight className="w-5 h-5 text-[#F5D298] group-hover:translate-x-1.5 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#CBD5E1] pt-1.5 font-normal">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>입력하신 개인정보는 서버에 저장되지 않고 브라우저에서 안전하게 보호됩니다.</span>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
