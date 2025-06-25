import React from 'react';
import { Users, Calendar, Clock, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaymentPopup } from '@/components/PaymentPopup';
import { usePaymentPopup } from '@/hooks/usePaymentPopup';
import CountdownTimer from '@/components/CountdownTimer';

const HeroSection: React.FC = () => {
  const coachImage = '/lovable-uploads/d9f7fe37-ebfc-471b-a2b9-8268a2ffd8b4.png';
  const { isPopupOpen, selectedCourse, openPopup, closePopup, proceedToBooking } = usePaymentPopup();

  const handleProceed = () => {
    proceedToBooking();
    // You can add additional logic here if needed before redirecting
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center text-foreground section-padding overflow-hidden bg-background"
    >
      {/* Background Image - adjusted for dark theme */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
          alt="Inspiring background" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-background opacity-80"></div> 
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid layout: 1 column on mobile, 2 columns on md screens and up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Side - Image Placeholder */}
          <div className="text-center md:text-left opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <div className="relative mx-auto md:mx-0 w-full max-w-[280px] sm:max-w-xs md:max-w-sm">
              <img 
                  src={coachImage} 
                  alt="Gangadhar Nagarjuna"
                  className="w-full drop-shadow-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-background to-transparent"></div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-center md:text-left opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gradient-theme">
              I will be your coach for 2 hours
            </h1>

            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-foreground/90">
              - Gangadhar Nagarjuna
            </h2>
            
            <div className="mt-8 space-y-4 text-lg text-muted-foreground">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Users className="w-6 h-6 text-primary" />
                <span>Trained over <strong>400,000+</strong> Students</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Calendar className="w-6 h-6 text-primary" />
                <span>Starts: <strong>29th June 2025</strong></span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Clock className="w-6 h-6 text-primary" />
                <span>Time: <strong>9:00 AM - 11:00 AM</strong> IST</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Languages className="w-6 h-6 text-primary" />
                <span>Language: <strong>Basic English</strong></span>
              </div>
            </div>

            <div className="mt-8 bg-card/50 border border-border/50 rounded-lg p-4 max-w-sm mx-auto md:mx-0">
                <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">Register In Next:</p>
                <div className="mt-2">
                    <CountdownTimer />
                </div>
            </div>

            <div className="mt-8 space-y-3 flex flex-col items-center md:items-start">
                <Button 
                  size="lg"
                  className="font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 px-8 py-6 text-lg"
                  onClick={() => openPopup('live-workshops')}
                >
                  Register Now for ₹299
                </Button>
                
                {/* Few Seats Left Indicator */}
                <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-full border border-blue-200">
                  <div className="relative">
                    <div className="h-2 w-2 bg-blue-600 rounded-full animate-ping absolute"></div>
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">Only few seats left at this price!</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onProceed={handleProceed}
        courseName={selectedCourse?.name || '2-Hour Coaching Session with Gangadhar Nagarjuna'}
        price={299} // Changed from 99 to 299 to match the button
      />
    </section>
  );
};

export default HeroSection;