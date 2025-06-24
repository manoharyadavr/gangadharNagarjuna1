import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SocialProofSection from '@/components/SocialProofSection';
import CourseHighlightsSection from '@/components/CourseHighlightsSection';
import WhatYouUnlockSection from '@/components/WhatYouUnlockSection'; 
import BusinessBreakthroughsSection from '@/components/BusinessBreakthroughsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import MeetYourCoachSection from '@/components/MeetYourCoachSection';
import PromiseNoteSection from '@/components/PromiseNoteSection';
import FAQSection from '@/components/FAQSection';
import FinalCTASection from '@/components/FinalCTASection';
import WorkshopAnnouncementSection from '@/components/WorkshopAnnouncementSection';
import StickyFooterBar from '@/components/StickyFooterBar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <WorkshopAnnouncementSection />
      <HeroSection />
      <SocialProofSection />
      <CourseHighlightsSection />
      <WhatYouUnlockSection />
      <BusinessBreakthroughsSection />
      <TestimonialsSection />
      <MeetYourCoachSection />
      <PromiseNoteSection />
      <FinalCTASection />
      <FAQSection />
      <Footer />
      <StickyFooterBar />
    </div>
  );
};

export default Index;
