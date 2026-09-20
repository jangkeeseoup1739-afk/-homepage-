import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SalonTourGallery } from './components/SalonTourGallery';
import { MenuSection } from './components/MenuSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { AboutSalon } from './components/AboutSalon';
import { ReviewSection } from './components/ReviewSection';
import { LocationParking } from './components/LocationParking';
import { Footer } from './components/Footer';
import { ConsultationBookingModal } from './components/ConsultationBookingModal';
import { AdminModal } from './components/AdminModal';
import { FloatingActionBar } from './components/FloatingActionBar';
import { 
  INITIAL_BEFORE_AFTER, 
  INITIAL_PORTFOLIO, 
  INITIAL_REVIEWS, 
  INITIAL_BOOKINGS 
} from './data/salonData';
import { BeforeAfterItem, PortfolioItem, ReviewItem, BookingRequest } from './types';

export default function App() {
  // Persistent state with localStorage
  const [beforeAfterItems, setBeforeAfterItems] = useState<BeforeAfterItem[]>(() => {
    try {
      const saved = localStorage.getItem('isumok_before_after_v2');
      if (saved) return JSON.parse(saved);
      // Reset old version cache
      localStorage.removeItem('isumok_before_after');
      return INITIAL_BEFORE_AFTER;
    } catch {
      return INITIAL_BEFORE_AFTER;
    }
  });

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem('isumok_portfolio_v2');
      if (saved) return JSON.parse(saved);
      localStorage.removeItem('isumok_portfolio');
      return INITIAL_PORTFOLIO;
    } catch {
      return INITIAL_PORTFOLIO;
    }
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('isumok_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem('isumok_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Modal controls
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('isumok_before_after_v2', JSON.stringify(beforeAfterItems));
  }, [beforeAfterItems]);

  useEffect(() => {
    localStorage.setItem('isumok_portfolio_v2', JSON.stringify(portfolioItems));
  }, [portfolioItems]);

  useEffect(() => {
    localStorage.setItem('isumok_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('isumok_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Handlers
  const handleOpenBooking = (serviceName?: string) => {
    setPreselectedService(serviceName);
    setIsBookingModalOpen(true);
  };

  const handleAddBeforeAfter = (item: BeforeAfterItem) => {
    setBeforeAfterItems(prev => [item, ...prev]);
  };

  const handleDeleteBeforeAfter = (id: string) => {
    setBeforeAfterItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddPortfolio = (item: PortfolioItem) => {
    setPortfolioItems(prev => [item, ...prev]);
  };

  const handleDeletePortfolio = (id: string) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
  };

  // 만들어진 예약 건을 그대로 돌려줍니다. 모달이 이 값을 구글 시트로 전송합니다.
  const handleAddBooking = (newBookingData: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>): BookingRequest => {
    const newBooking: BookingRequest = {
      ...newBookingData,
      id: `book-${Date.now()}`,
      createdAt: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }),
      status: '접수완료'
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const handleUpdateBookingStatus = (id: string, status: BookingRequest['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleAddReview = (newRev: Omit<ReviewItem, 'id' | 'date' | 'verifiedVisit' | 'likes'>) => {
    const item: ReviewItem = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\. /g, '.').replace('.', ''),
      verifiedVisit: true,
      likes: 1
    };
    setReviews(prev => [item, ...prev]);
  };

  const handleAddOwnerReply = (reviewId: string, replyText: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, replyFromOwner: replyText } : r));
  };

  const handleDeleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121316] text-[#e6e8ec] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#f7e7b4]">
      {/* Header */}
      <Header
        onOpenBooking={handleOpenBooking}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreMenu={() => scrollToElement('menu')}
          onExploreBeforeAfter={() => scrollToElement('before-after')}
        />

        {/* Salon Tour & Natural Care Gallery */}
        <SalonTourGallery />

        {/* ♥♥머리 이야기♥♥ Services Menu Section */}
        <MenuSection
          onSelectServiceForBooking={(serviceName) => handleOpenBooking(serviceName)}
        />

        {/* Before & After Interactive Showcase with Admin Linking */}
        <BeforeAfterSection
          items={beforeAfterItems}
          onOpenBooking={handleOpenBooking}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
        />

        {/* Portfolio Gallery Section */}
        <PortfolioGallery
          items={portfolioItems}
          onSelectStyle={(styleTitle) => handleOpenBooking(styleTitle)}
        />

        {/* About Salon & Natural Care Specialty */}
        <AboutSalon />

        {/* Customer Reviews Section */}
        <ReviewSection
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* Location & Parking Details */}
        <LocationParking />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Floating Action Bars for Mobile & Desktop */}
      <FloatingActionBar
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Naver Booking & 1:1 Consultation Modal */}
      <ConsultationBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedService={preselectedService}
        onAddBooking={handleAddBooking}
      />

      {/* Admin Panel Modal (Before & After Photo Uploads + Management) */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        beforeAfterItems={beforeAfterItems}
        onAddBeforeAfter={handleAddBeforeAfter}
        onDeleteBeforeAfter={handleDeleteBeforeAfter}
        portfolioItems={portfolioItems}
        onAddPortfolio={handleAddPortfolio}
        onDeletePortfolio={handleDeletePortfolio}
        bookings={bookings}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        reviews={reviews}
        onAddOwnerReply={handleAddOwnerReply}
        onDeleteReview={handleDeleteReview}
      />
    </div>
  );
}
