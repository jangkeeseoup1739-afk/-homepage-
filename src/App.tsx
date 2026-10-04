import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CallBand } from './components/CallBand';
import { Overview } from './components/Overview';
import { LocationSection } from './components/LocationSection';
import { PremiumSection } from './components/PremiumSection';
import { FloorPlanSection } from './components/FloorPlanSection';
import { ComplexDesignSection } from './components/ComplexDesignSection';
import { DevelopmentSection } from './components/DevelopmentSection';
import { FinanceCalculator } from './components/FinanceCalculator';
import { GallerySection } from './components/GallerySection';
import { ModelhouseNotice } from './components/ModelhouseNotice';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileFixedBar } from './components/MobileFixedBar';
import { LightboxModal } from './components/LightboxModal';
import { ReservationModal } from './components/ReservationModal';
import { AdminReservationModal } from './components/AdminReservationModal';
import { PhoneCallModal } from './components/PhoneCallModal';

export default function App() {
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    imageUrl: string;
    altText: string;
    caption?: string;
  }>({
    isOpen: false,
    imageUrl: '',
    altText: '',
    caption: '',
  });

  const [reservationModal, setReservationModal] = useState<{
    isOpen: boolean;
    planType: string;
  }>({
    isOpen: false,
    planType: '84A Type (25평)',
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  // Hidden admin access via ?admin=true parameter only (never exposed to public visitors)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('admin=true')) {
      setIsAdminModalOpen(true);
    }

    const handleOpenPhone = () => {
      setIsPhoneModalOpen(true);
    };

    window.addEventListener('open-phone-modal', handleOpenPhone);
    return () => {
      window.removeEventListener('open-phone-modal', handleOpenPhone);
    };
  }, []);

  const handleOpenLightbox = (imageUrl: string, altText: string, caption?: string) => {
    setLightbox({
      isOpen: true,
      imageUrl,
      altText,
      caption,
    });
  };

  const handleCloseLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const handleOpenReservation = (planType: string = '84A Type (25평)') => {
    setReservationModal({
      isOpen: true,
      planType,
    });
  };

  const handleCloseReservation = () => {
    setReservationModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-[#07121f] text-[#1d2430] flex flex-col font-sans selection:bg-[#c2a36b] selection:text-[#0a1a30]">
      {/* Top Fixed Header - Clean public luxury header */}
      <Header onOpenReservation={() => handleOpenReservation()} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenReservation={() => handleOpenReservation()}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Quick Direct Call Band */}
        <CallBand
          title="청라 더리브 티아모 Casa 분양상담실"
          subtitle="로열층 선착순 호실 지정 및 특별 금융 혜택 상담"
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* 1. Overview */}
        <Overview onOpenLightbox={handleOpenLightbox} />

        {/* 2. Location */}
        <LocationSection onOpenLightbox={handleOpenLightbox} />

        {/* 3. Premium & Dada Kitchen */}
        <PremiumSection
          onOpenLightbox={handleOpenLightbox}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* 4. Floor Plans */}
        <FloorPlanSection
          onOpenLightbox={handleOpenLightbox}
          onOpenReservation={(type) => handleOpenReservation(type || '84A Type (25평)')}
        />

        {/* 5. Complex & Special Design */}
        <ComplexDesignSection onOpenLightbox={handleOpenLightbox} />

        {/* 6. Development Milestones */}
        <DevelopmentSection onOpenLightbox={handleOpenLightbox} />

        {/* 7. Finance & Payment Simulation */}
        <FinanceCalculator onOpenReservation={() => handleOpenReservation()} />

        {/* 8. Photo Gallery */}
        <GallerySection onOpenLightbox={handleOpenLightbox} />

        {/* 9. Modelhouse Notice */}
        <ModelhouseNotice onOpenReservation={() => handleOpenReservation()} />

        {/* 10. Contact & RSVP Form - 100% clean for customers */}
        <ContactSection />

        {/* Final Direct Call Band */}
        <CallBand
          title="모델하우스 방문예약 및 로열층 잔여호실 문의"
          subtitle="당일 방문 예약도 가능하오니 출발 전 반드시 유선으로 연락 주시기 바랍니다."
          onOpenReservation={() => handleOpenReservation()}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Sticky Bar */}
      <MobileFixedBar onOpenReservation={() => handleOpenReservation()} />

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightbox.isOpen}
        imageUrl={lightbox.imageUrl}
        altText={lightbox.altText}
        caption={lightbox.caption}
        onClose={handleCloseLightbox}
      />

      {/* Fast Reservation Modal */}
      <ReservationModal
        isOpen={reservationModal.isOpen}
        selectedPlanType={reservationModal.planType}
        onClose={handleCloseReservation}
      />

      {/* Private Admin Modal - only opens if accessed via ?admin=true */}
      <AdminReservationModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* Universal Phone Call & Contact Modal */}
      <PhoneCallModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
      />
    </div>
  );
}
