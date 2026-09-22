import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingConsultation from './components/FloatingConsultation';
import ListingFilter from './components/ListingFilter';
import ListingCard from './components/ListingCard';
import ListingDetailModal from './components/ListingDetailModal';
import ArticleCard from './components/ArticleCard';
import ArticleDetailModal from './components/ArticleDetailModal';
import CalculatorModal from './components/CalculatorModal';
import ConsultationModal from './components/ConsultationModal';
import NotificationModal from './components/NotificationModal';
import AdminPanel from './components/AdminPanel';
import Logo from './components/Logo';

import {
  PropertyListing,
  ArticleContent,
  RealEstateNews,
  NotificationItem,
  ConsultationInquiry,
  FilterState,
  FilterConfig,
  InfoCategory
} from './types';

import {
  loadListings,
  saveListings,
  loadArticles,
  saveArticles,
  loadNews,
  saveNews,
  loadNotifications,
  saveNotifications,
  loadFilterConfig,
  saveFilterConfig,
  loadInquiries,
  saveInquiries,
  resetAllData
} from './utils/storage';

import { 
  Building2, PhoneCall, Calculator, Search, CheckCircle2, 
  HelpCircle, ArrowRight, ShieldCheck, Newspaper, Sparkles, TrendingUp,
  RefreshCw, ExternalLink
} from 'lucide-react';
import { CURRENT_YEAR } from './utils/date';

export default function App() {
  // --- Persistent State ---
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [articles, setArticles] = useState<ArticleContent[]>([]);
  const [news, setNews] = useState<RealEstateNews[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    regions: ['전체'],
    propertyTypes: ['전체'],
    pyeongOptions: ['전체'],
    priceOptions: ['전체'],
    statusOptions: ['전체']
  });
  const [inquiries, setInquiries] = useState<ConsultationInquiry[]>([]);

  // Load Initial Data once
  useEffect(() => {
    setListings(loadListings());
    setArticles(loadArticles());
    const initialNews = loadNews();
    setNews(initialNews);
    setNotifications(loadNotifications());
    setFilterConfig(loadFilterConfig());
    setInquiries(loadInquiries());

    // Auto-fetch latest real estate news via RSS on initial load
    fetch('/api/news/rss-feed')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.news) && data.news.length > 0) {
          const existingTitles = new Set(initialNews.map((n) => n.title));
          const newItems = data.news.filter((n: any) => !existingTitles.has(n.title));
          if (newItems.length > 0) {
            const merged = [...newItems, ...initialNews];
            setNews(merged);
            saveNews(merged);
          }
        }
      })
      .catch((err) => {
        console.warn('Silent RSS auto-fetch warning:', err);
      });
  }, []);

  // Save changes to localStorage
  const updateListings = (newListings: PropertyListing[]) => {
    setListings(newListings);
    saveListings(newListings);
  };

  const updateArticles = (newArticles: ArticleContent[]) => {
    setArticles(newArticles);
    saveArticles(newArticles);
  };

  const updateNews = (newNews: RealEstateNews[]) => {
    setNews(newNews);
    saveNews(newNews);
  };

  const updateFilterConfig = (newConfig: FilterConfig) => {
    setFilterConfig(newConfig);
    saveFilterConfig(newConfig);
  };

  const updateInquiries = (newInquiries: ConsultationInquiry[]) => {
    setInquiries(newInquiries);
    saveInquiries(newInquiries);
  };

  const handleResetData = () => {
    resetAllData();
    setListings(loadListings());
    setArticles(loadArticles());
    setNews(loadNews());
    setNotifications(loadNotifications());
    setFilterConfig(loadFilterConfig());
    setInquiries(loadInquiries());
  };

  // --- Navigation & Filter State ---
  const [currentTab, setCurrentTab] = useState<'home' | 'info' | 'presale' | 'news' | 'consultation'>('home');
  const [selectedInfoCategory, setSelectedInfoCategory] = useState<InfoCategory>('전체');
  const [isSyncingNews, setIsSyncingNews] = useState(false);
  const [isGeneratingInfo, setIsGeneratingInfo] = useState(false);

  const handleManualSyncNews = async () => {
    try {
      setIsSyncingNews(true);
      const res = await fetch('/api/news/rss-feed');
      const data = await res.json();
      if (data && Array.isArray(data.news) && data.news.length > 0) {
        const existingTitles = new Set(news.map((n) => n.title));
        const newItems = data.news.filter((n: any) => !existingTitles.has(n.title));
        if (newItems.length > 0) {
          const merged = [...newItems, ...news];
          updateNews(merged);
          showToast(`실시간 주요 언론사 속보 ${newItems.length}건이 자동 동기화되었습니다.`);
        } else {
          showToast('이미 최신 실시간 뉴스가 모두 반영되어 있습니다.');
        }
      } else {
        showToast('실시간 뉴스를 불러왔습니다.');
      }
    } catch (err) {
      console.error('Manual RSS sync error:', err);
      showToast('뉴스 피드 수신 중 일시적 오류가 발생했습니다.');
    } finally {
      setIsSyncingNews(false);
    }
  };

  const handleQuickGenerateAIArticle = async () => {
    try {
      setIsGeneratingInfo(true);
      const targetCategory = selectedInfoCategory === '전체' ? '대출·금융' : selectedInfoCategory;
      const res = await fetch('/api/ai/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: targetCategory,
          topic: `${CURRENT_YEAR}년 ${targetCategory} 시장 환경 변화 및 실전 자금 조달 가이드`
        })
      });

      const data = await res.json();
      if (data.status === 'ok' && data.article) {
        const updated = [data.article, ...articles];
        updateArticles(updated);
        showToast(`✨ 새로운 AI [${targetCategory}] 전문 리포트가 자동 업로드되었습니다.`);
      } else {
        showToast('AI 리포트 생성 중 오류가 발생했습니다.');
      }
    } catch (err) {
      console.error('AI quick generate error:', err);
      showToast('리포트 생성 서버 통신 오류가 발생했습니다.');
    } finally {
      setIsGeneratingInfo(false);
    }
  };

  const [filterState, setFilterState] = useState<FilterState>({
    keyword: '',
    propertyType: '전체',
    region: '전체',
    pyeongGroup: '전체',
    priceGroup: '전체',
    status: '전체'
  });

  // --- Modals State ---
  const [selectedListing, setSelectedListing] = useState<PropertyListing | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleContent | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorTab, setCalculatorTab] = useState<'tax' | 'brokerage'>('tax');
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationPreload, setConsultationPreload] = useState<{ title?: string; category?: string }>({});
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // In-page Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Handle Consultation Submit ---
  const handleConsultationSubmit = (inquiryData: Omit<ConsultationInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: ConsultationInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: '접수대기',
      createdAt: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    const updated = [newInquiry, ...inquiries];
    updateInquiries(updated);
    showToast('상담 문의가 성공적으로 접수되었습니다. (010-8873-7258 담당자 배정)');
  };

  // --- Handle Custom Alert Subscription ---
  const handleSubscribeAlert = (phone: string, region: string) => {
    const newNoti: NotificationItem = {
      id: `noti-${Date.now()}`,
      title: `[알림 신청 완료] ${region} 맞춤 알림`,
      message: `${phone} 번호로 ${region} 신규 분양 오픈 시 우선 알림이 발송됩니다.`,
      category: '공지',
      date: '방금 전',
      isRead: false
    };
    const updated = [newNoti, ...notifications];
    setNotifications(updated);
    saveNotifications(updated);
    showToast(`${region} 맞춤 매물 알림 신청이 완료되었습니다.`);
  };

  const handleMarkNotificationRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    setNotifications(updated);
    saveNotifications(updated);
  };

  const handleNotificationSelectTarget = (targetId: string, category: string) => {
    if (category === '분양') {
      const found = listings.find((l) => l.id === targetId);
      if (found) {
        setSelectedListing(found);
      } else {
        setCurrentTab('presale');
      }
    } else {
      const foundArt = articles.find((a) => a.id === targetId);
      if (foundArt) {
        setSelectedArticle(foundArt);
      } else {
        setCurrentTab('info');
      }
    }
  };

  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  // --- Filtered Listings ---
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Keyword
      if (filterState.keyword.trim()) {
        const kw = filterState.keyword.toLowerCase();
        const matches =
          item.title.toLowerCase().includes(kw) ||
          item.subtitle.toLowerCase().includes(kw) ||
          item.region.toLowerCase().includes(kw) ||
          item.constructorCompany.toLowerCase().includes(kw) ||
          item.address.toLowerCase().includes(kw);
        if (!matches) return false;
      }
      // Property Type
      if (filterState.propertyType !== '전체' && item.propertyType !== filterState.propertyType) {
        return false;
      }
      // Region
      if (filterState.region !== '전체' && item.region !== filterState.region) {
        return false;
      }
      // Pyeong
      if (filterState.pyeongGroup !== '전체' && item.pyeongGroup !== filterState.pyeongGroup) {
        return false;
      }
      // Price
      if (filterState.priceGroup !== '전체' && item.priceGroup !== filterState.priceGroup) {
        return false;
      }
      // Status
      if (filterState.status !== '전체' && item.status !== filterState.status) {
        return false;
      }
      return true;
    });
  }, [listings, filterState]);

  // --- Filtered Articles ---
  const filteredArticles = useMemo(() => {
    if (selectedInfoCategory === '전체') return articles;
    return articles.filter((a) => a.category === selectedInfoCategory);
  }, [articles, selectedInfoCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedInfoCategory={selectedInfoCategory}
        onSelectInfoCategory={(cat) => setSelectedInfoCategory(cat)}
        unreadNotificationCount={unreadNotificationCount}
        onOpenNotifications={() => setIsNotificationModalOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenConsultation={() => {
          setConsultationPreload({ category: '신규분양' });
          setIsConsultationModalOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Body Switcher */}
      <main className="flex-1">
        {/* ===================== VIEW 1: HOME ===================== */}
        {currentTab === 'home' && (
          <div className="space-y-12 sm:space-y-16 pb-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-8 sm:pt-12 pb-12 sm:pb-20 px-3.5 sm:px-8">
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
              
              <div className="max-w-5xl lg:max-w-6xl mx-auto text-center relative z-10 space-y-6 sm:space-y-8">
                {/* Year Announcement Badge */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-200 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                  <span className="truncate">{CURRENT_YEAR} 부동산 금융 규제 완화 & 수도권 신규 분양 오픈</span>
                </div>

                {/* Brand Logo Presentation Box - Expanded to fit screen prominently */}
                <div className="w-full max-w-4xl lg:max-w-5xl mx-auto bg-white text-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16 border border-slate-100 shadow-2xl shadow-slate-950/40 relative overflow-hidden transition-all duration-300">
                  {/* Subtle decorative inner ambient glow */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
                  <Logo variant="full" size="hero" theme="light" className="w-full relative z-10" />
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-snug sm:leading-tight">
                  부동산 정보부터 신규 분양까지<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                    한눈에 비교하고 바로 상담받으세요
                  </span>
                </h1>

                <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed px-1">
                  {CURRENT_YEAR}년 청약 1순위 인정액 개편, 사업자 시설·운전자금 한도 심사 기준, 아파트·오피스텔 취득세 계산 및 수도권 랜드마크 분양정보를 실시간 제공합니다.
                </p>

                {/* Hero Quick Search Box */}
                <div className="max-w-2xl mx-auto bg-white rounded-2xl p-1.5 sm:p-2 shadow-2xl flex flex-col sm:flex-row items-center gap-2 text-slate-900">
                  <div className="flex items-center gap-2.5 px-3 flex-1 w-full min-h-[44px]">
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="지역명(동탄, 강남 등) 또는 단지명을 검색해보세요"
                      value={filterState.keyword}
                      onChange={(e) => setFilterState({ ...filterState, keyword: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setCurrentTab('presale');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="w-full py-2 text-xs sm:text-sm focus:outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setCurrentTab('presale');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5 min-h-[44px]"
                  >
                    <span>매물 검색</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Hero Call Direct Banner */}
                <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs">
                  <a
                    href="tel:010-8873-7258"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black transition-all shadow-lg hover:scale-105 min-h-[42px]"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>신속 상담 직통: 010-8873-7258</span>
                  </a>
                  <button
                    onClick={() => {
                      setCalculatorTab('tax');
                      setIsCalculatorOpen(true);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all border border-white/20 min-h-[42px]"
                  >
                    <Calculator className="w-4 h-4 text-blue-400" />
                    <span>취득세 실시간 계산</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Quick Category Navigation Cards */}
            <section className="max-w-7xl mx-auto px-3.5 sm:px-8 -mt-6 sm:-mt-10 relative z-20">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {[
                  {
                    name: '대출·금융',
                    desc: `${CURRENT_YEAR} 사업자대출 조건`,
                    cat: '대출·금융',
                    bg: 'bg-blue-50/90 hover:bg-blue-100/90 border-blue-200 text-blue-950',
                    badge: 'bg-blue-600 text-white',
                    descColor: 'text-blue-700'
                  },
                  {
                    name: '청약',
                    desc: '1순위 조건·통장 가입',
                    cat: '청약',
                    bg: 'bg-indigo-50/90 hover:bg-indigo-100/90 border-indigo-200 text-indigo-950',
                    badge: 'bg-indigo-600 text-white',
                    descColor: 'text-indigo-700'
                  },
                  {
                    name: '세금',
                    desc: '아파트·오피스텔 취득세',
                    cat: '세금',
                    bg: 'bg-amber-50/90 hover:bg-amber-100/90 border-amber-200 text-amber-950',
                    badge: 'bg-amber-600 text-white',
                    descColor: 'text-amber-800'
                  },
                  {
                    name: '부동산 상식',
                    desc: '중개보수·계약금 플로우',
                    cat: '부동산 상식',
                    bg: 'bg-emerald-50/90 hover:bg-emerald-100/90 border-emerald-200 text-emerald-950',
                    badge: 'bg-emerald-600 text-white',
                    descColor: 'text-emerald-700'
                  },
                  {
                    name: '오피스텔',
                    desc: '주택수 포함 여부 총정리',
                    cat: '오피스텔',
                    bg: 'bg-sky-50/90 hover:bg-sky-100/90 border-sky-200 text-sky-950',
                    badge: 'bg-sky-600 text-white',
                    descColor: 'text-sky-700'
                  },
                  {
                    name: '지식산업센터',
                    desc: '세제감면·시설자금 80%',
                    cat: '지식산업센터',
                    bg: 'bg-violet-50/90 hover:bg-violet-100/90 border-violet-200 text-violet-950',
                    badge: 'bg-violet-600 text-white',
                    descColor: 'text-violet-700'
                  }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setSelectedInfoCategory(item.cat as InfoCategory);
                      setCurrentTab('info');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border-2 ${item.bg} shadow-md hover:shadow-lg hover:-translate-y-1 transition-all text-left flex flex-col justify-between min-h-[96px] sm:min-h-[110px] group cursor-pointer`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm sm:text-base font-extrabold tracking-tight">
                        {item.name}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${item.badge}`}>
                        바로가기
                      </span>
                    </div>
                    <span className={`text-xs sm:text-sm font-semibold mt-2 line-clamp-1 ${item.descColor}`}>
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Curated Hot Articles: User Requested Guides */}
            <section className="max-w-7xl mx-auto px-3.5 sm:px-8 space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3 sm:pb-4">
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wide">Essential Guides</div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">{CURRENT_YEAR} 부동산 핵심 정보 & 실전 가이드</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedInfoCategory('전체');
                    setCurrentTab('info');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs sm:text-sm font-bold text-blue-600 hover:underline flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>가이드 전체보기 ({articles.length}건)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {articles.slice(0, 6).map((art) => (
                  <ArticleCard
                    key={art.id}
                    article={art}
                    onSelect={(a) => setSelectedArticle(a)}
                  />
                ))}
              </div>
            </section>

            {/* Presale Properties Highlight Section */}
            <section className="max-w-7xl mx-auto px-3.5 sm:px-8 space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3 sm:pb-4">
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wide">New Presale Listings</div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">신규 분양정보 추천 매물</h2>
                </div>
                <button
                  onClick={() => {
                    setCurrentTab('presale');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs sm:text-sm font-bold text-blue-600 hover:underline flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>정밀 필터 매물 검색 바로가기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {listings.slice(0, 3).map((item) => (
                  <ListingCard
                    key={item.id}
                    listing={item}
                    onSelect={(l) => setSelectedListing(l)}
                    onQuickInquire={(l) => {
                      setConsultationPreload({ title: l.title, category: '신규분양' });
                      setIsConsultationModalOpen(true);
                    }}
                  />
                ))}
              </div>
            </section>

            {/* Calculator CTA Section */}
            <section className="max-w-7xl mx-auto px-3.5 sm:px-8">
              <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-5 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
                <div className="space-y-2 sm:space-y-3 text-center lg:text-left">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    {CURRENT_YEAR} 최신 세법 반영
                  </span>
                  <h3 className="text-xl sm:text-3xl font-extrabold leading-snug">
                    아파트·오피스텔 취득세와<br className="hidden sm:inline" />
                    부동산 중개수수료를 3초 만에 산출하세요
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                    생애최초 200만원 감면, 다주택자 중과세율, 85㎡ 초과 농특세 및 매매·전세·월세별 법정 상한 복비까지 정확하게 계산해드립니다.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setCalculatorTab('tax');
                      setIsCalculatorOpen(true);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-md min-h-[44px]"
                  >
                    취득세 계산기 실행
                  </button>
                  <button
                    onClick={() => {
                      setCalculatorTab('brokerage');
                      setIsCalculatorOpen(true);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition-all min-h-[44px]"
                  >
                    중개수수료 계산기
                  </button>
                </div>
              </div>
            </section>

            {/* Latest Real Estate News Section */}
            <section className="max-w-7xl mx-auto px-3.5 sm:px-8 space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 sm:pb-4">
                <div className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">실시간 부동산 뉴스 & 시장 브리핑</h2>
                </div>
                <button
                  onClick={() => {
                    setCurrentTab('news');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs sm:text-sm font-bold text-blue-600 hover:underline"
                >
                  더보기
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {news.map((n) => (
                  <div
                    key={n.id}
                    className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {n.category}
                        </span>
                        {n.badge && (
                          <span className="font-extrabold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                            {n.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                        {n.title}
                      </h4>
                      <p className="text-xs sm:text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                        {n.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{n.publisher}</span>
                      <span>{n.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ===================== VIEW 2: REAL ESTATE INFO ===================== */}
        {currentTab === 'info' && (
          <div className="max-w-7xl mx-auto px-3.5 sm:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
            {/* Title Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div>
                <span className="text-xs font-bold text-amber-400">{CURRENT_YEAR} REAL ESTATE KNOWLEDGE CENTER</span>
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-black mt-2">부동산 종합 정보 및 실전 가이드</h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  {CURRENT_YEAR}년 최신 사업자대출 조건, 한도 산정 기준, 청약 1순위 및 통장 관리 요령, 아파트·오피스텔 취득세와 중개보수 계산법을 전문가 해설로 만나보세요.
                </p>
              </div>

              <button
                onClick={handleQuickGenerateAIArticle}
                disabled={isGeneratingInfo}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-102 active:scale-98 transition-all shrink-0 min-h-[44px] disabled:opacity-60 cursor-pointer"
              >
                {isGeneratingInfo ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>AI 정보 칼럼 자동 생성 중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>AI 리포트 즉시 자동생성·업로드</span>
                  </>
                )}
              </button>
            </div>

            {/* Category Filter Chips - Horizontal Scroll on Mobile */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 pb-2 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 sm:flex-wrap border-b border-slate-200">
              {(['전체', '부동산 상식', '청약', '대출·금융', '세금', '오피스텔', '지식산업센터'] as InfoCategory[]).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedInfoCategory(cat)}
                    className={`shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold min-h-[38px] flex items-center transition-all ${
                      selectedInfoCategory === cat
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredArticles.map((art) => (
                <ArticleCard
                  key={art.id}
                  article={art}
                  onSelect={(a) => setSelectedArticle(a)}
                />
              ))}
            </div>

            {/* Direct Consultation Teaser at bottom */}
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-blue-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="p-3 rounded-xl bg-blue-600 text-white shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    원하는 정보를 찾기 어려우신가요? 1:1 유선 상담으로 바로 해결하세요
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    사업자대출 조건 검토 및 청약 자격 진단 직통: <strong className="text-blue-700 font-bold">010-8873-7258</strong>
                  </p>
                </div>
              </div>
              <a
                href="tel:010-8873-7258"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all text-center whitespace-nowrap min-h-[42px] flex items-center justify-center"
              >
                010-8873-7258 바로통화
              </a>
            </div>
          </div>
        )}

        {/* ===================== VIEW 3: PRESALE LISTINGS ===================== */}
        {currentTab === 'presale' && (
          <div className="max-w-7xl mx-auto px-3.5 sm:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
            {/* Header Title */}
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Verified Property Listings</span>
              <h1 className="text-xl sm:text-3xl font-black text-slate-900 mt-1">
                신규 분양정보 정밀 검색
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                지역, 평수, 분양 가격대, 매물 유형 및 분양 상태별로 조건에 꼭 맞는 매물을 찾아보세요.
              </p>
            </div>

            {/* The Detailed Filter UI */}
            <ListingFilter
              filter={filterState}
              onChange={(f) => setFilterState(f)}
              config={filterConfig}
              onUpdateConfig={updateFilterConfig}
              totalCount={filteredListings.length}
            />

            {/* Results Grid */}
            {filteredListings.length === 0 ? (
              <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-slate-200 space-y-3 px-4">
                <p className="text-sm font-semibold text-slate-600">선택하신 조건에 해당하는 분양 매물이 없습니다.</p>
                <p className="text-xs text-slate-400">필터 조건을 재설정하거나 키워드를 변경해 보세요.</p>
                <button
                  onClick={() =>
                    setFilterState({
                      keyword: '',
                      propertyType: '전체',
                      region: '전체',
                      pyeongGroup: '전체',
                      priceGroup: '전체',
                      status: '전체'
                    })
                  }
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-sm min-h-[42px]"
                >
                  필터 전체 초기화
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredListings.map((item) => (
                  <ListingCard
                    key={item.id}
                    listing={item}
                    onSelect={(l) => setSelectedListing(l)}
                    onQuickInquire={(l) => {
                      setConsultationPreload({ title: l.title, category: '신규분양' });
                      setIsConsultationModalOpen(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================== VIEW 4: NEWS ===================== */}
        {currentTab === 'news' && (
          <div className="max-w-7xl mx-auto px-3.5 sm:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4 sm:pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Market News & Policy</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    실시간 자동 수신 중
                  </span>
                </div>
                <h1 className="text-xl sm:text-3xl font-black text-slate-900 mt-1">{CURRENT_YEAR} 부동산 뉴스 & 시장 분석</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  매일경제, 한국경제 등 주요 포털/경제지 실시간 RSS 및 청약 정책·금융 규제 속보를 전달합니다.
                </p>
              </div>

              <button
                onClick={handleManualSyncNews}
                disabled={isSyncingNews}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 transition-all shrink-0 min-h-[40px]"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingNews ? 'animate-spin' : ''}`} />
                <span>{isSyncingNews ? '속보 동기화 중...' : '최신 뉴스 새로고침'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3 sm:space-y-4 group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                          {item.category}
                        </span>
                        {item.badge && (
                          <span className="font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-semibold text-slate-400 group-hover:text-blue-600 flex items-center gap-1 transition-colors"
                        >
                          <span>기사 원문</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{item.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-600">{item.publisher}</span>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span>{item.date}</span>
                      <span>·</span>
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== VIEW 5: CONSULTATION (상담문의) ===================== */}
        {currentTab === 'consultation' && (
          <div className="max-w-5xl mx-auto px-3.5 sm:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
            {/* Headline */}
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Fast VIP Consultation</span>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900">전문가 1:1 맞춤 상담 문의</h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed px-2">
                신규 분양정보, {CURRENT_YEAR} 사업자대출 조건 및 한도, 청약 가점 및 세무 상담까지 전문 자문위원이 가장 빠르고 정확하게 안내해드립니다.
              </p>
            </div>

            {/* Direct Call Big Box */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2 text-center sm:text-left">
                <span className="text-xs font-bold text-amber-300">신속 유선 직통 연결</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">010-8873-7258</h2>
                <p className="text-xs text-slate-300">
                  평일 / 주말 연중무휴 09:00 ~ 21:00 친절 무료 상담
                </p>
              </div>
              <a
                href="tel:010-8873-7258"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 shrink-0 min-h-[44px]"
              >
                <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                <span>지금 바로 전화걸기</span>
              </a>
            </div>

            {/* Online Consultation Form Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-8 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>온라인 빠른 상담 신청서 접수</span>
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  const name = (formData.get('name') as string) || '';
                  const phone = (formData.get('phone') as string) || '';
                  const category = (formData.get('category') as string) || '신규분양';
                  const interestRegion = (formData.get('region') as string) || '수도권 전체';
                  const preferredTime = (formData.get('time') as string) || '언제나 가능';
                  const message = (formData.get('message') as string) || '';

                  handleConsultationSubmit({
                    name,
                    phone,
                    category,
                    interestRegion,
                    preferredTime,
                    message
                  });
                  form.reset();
                }}
                className="space-y-5 text-xs sm:text-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1.5">고객 성함 *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="성함을 입력해주세요"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1.5">연락처 *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="010-0000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1.5">상담 희망 분야</label>
                    <select
                      name="category"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="신규분양">신규 분양정보 안내</option>
                      <option value="사업자대출">{CURRENT_YEAR} 사업자대출·시설자금</option>
                      <option value="청약전략">청약 1순위 조건 및 가점전략</option>
                      <option value="세금상담">아파트·오피스텔 취득세 및 세무</option>
                      <option value="지식산업센터">지식산업센터 분양·입주</option>
                      <option value="기타상담">기타 부동산 일반 문의</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1.5">관심 지역</label>
                    <select
                      name="region"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      {filterConfig.regions.map((reg) => (
                        <option key={reg} value={reg}>
                          {reg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1.5">희망 통화 시간대</label>
                    <select
                      name="time"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="언제나 통화 가능">언제나 통화 가능</option>
                      <option value="오전 (09:00 ~ 12:00)">오전 (09:00 ~ 12:00)</option>
                      <option value="오후 (12:00 ~ 18:00)">오후 (12:00 ~ 18:00)</option>
                      <option value="야간 (18:00 ~ 21:00)">야간 (18:00 ~ 21:00)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">문의 및 요청사항 (선택)</label>
                  <textarea
                    rows={4}
                    name="message"
                    placeholder="관심 단지명, 대출 희망 금액, 입주 시기 등을 자유롭게 적어주시면 사전 분석 후 더욱 상세히 안내해 드립니다."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  무료 1:1 맞춤 상담 신청하기
                </button>
              </form>
            </div>

            {/* Frequently Asked Questions FAQ */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">자주 묻는 질문 (FAQ)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900">Q. {CURRENT_YEAR}년 사업자대출은 DSR 적용을 받지 않나요?</div>
                  <p className="text-slate-500 leading-relaxed">
                    네, 실질적인 사업 영위 목적으로 자금을 조달하는 개인/법인 사업자대출은 가계 주택담보대출 규제인 DSR 산정에서 원칙적으로 제외됩니다.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900">Q. 청약통장 월 인정액 25만원 상향의 효과는?</div>
                  <p className="text-slate-500 leading-relaxed">
                    공공분양 일반공급 당첨선은 총 인정 납입액 순으로 결정되므로 매월 25만원씩 불입 시 당첨 도달 기간을 2배 이상 단축할 수 있습니다.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900">Q. 오피스텔 취득세는 왜 4.6% 단일세율인가요?</div>
                  <p className="text-slate-500 leading-relaxed">
                    건축법상 업무시설로 분류되어 다주택자라 하더라도 취득 시점에는 중과세(8~12%) 없이 4.6% 단일세율이 적용됩니다.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900">Q. 전화 상담은 주말에도 가능한가요?</div>
                  <p className="text-slate-500 leading-relaxed">
                    네, 고객센터 직통 전화 <strong>010-8873-7258</strong>은 주말 및 공휴일에도 오전 9시부터 오후 9시까지 연중무휴로 운영됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Call & Action Widget */}
      <FloatingConsultation
        onOpenConsultation={() => {
          setConsultationPreload({ category: '신규분양' });
          setIsConsultationModalOpen(true);
        }}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenNotifications={() => setIsNotificationModalOpen(true)}
        unreadCount={unreadNotificationCount}
      />

      {/* Global Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectInfoCategory={(cat) => setSelectedInfoCategory(cat)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* ===================== MODALS ===================== */}

      {/* 1. Property Listing Detail Modal */}
      <ListingDetailModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        onOpenConsultation={(l) => {
          setSelectedListing(null);
          setConsultationPreload({ title: l.title, category: '신규분양' });
          setIsConsultationModalOpen(true);
        }}
      />

      {/* 2. Article Detail Reader Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenConsultation={(cat) => {
          setSelectedArticle(null);
          setConsultationPreload({ category: cat });
          setIsConsultationModalOpen(true);
        }}
        onOpenCalculator={() => {
          setSelectedArticle(null);
          setIsCalculatorOpen(true);
        }}
      />

      {/* 3. Real Estate Calculators (Tax & Brokerage) Modal */}
      <CalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        defaultTab={calculatorTab}
      />

      {/* 4. Consultation Request Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        onSubmit={handleConsultationSubmit}
        initialPropertyTitle={consultationPreload.title}
        initialCategory={consultationPreload.category}
      />

      {/* 5. Real-time Notifications & Alert Center Modal */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkNotificationRead}
        onSelectTarget={handleNotificationSelectTarget}
        onSubscribeAlert={handleSubscribeAlert}
      />

      {/* 6. Admin CMS Modal */}
      {isAdminOpen && (
        <AdminPanel
          listings={listings}
          onUpdateListings={updateListings}
          articles={articles}
          onUpdateArticles={updateArticles}
          news={news}
          onUpdateNews={updateNews}
          filterConfig={filterConfig}
          onUpdateFilterConfig={updateFilterConfig}
          inquiries={inquiries}
          onUpdateInquiries={updateInquiries}
          onResetData={handleResetData}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
}
