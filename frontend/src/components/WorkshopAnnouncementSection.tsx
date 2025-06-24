import React from 'react';

const WorkshopAnnouncementSection: React.FC = () => {
  const logoUrl = "/lovable-uploads/dc0e5719-5379-4a0c-a9cc-7d2ab8874bad.png";
  const gangadharLogoUrl = "https://res.cloudinary.com/dnbqgzh4t/image/upload/v1750154676/zd8qkexpsabjzo1mgm5o.png";

  return (
    <section id="announcement" className="bg-background pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center animate-fall-in">
          <div className="relative w-full max-w-4xl mt-12">
            
            {/* Main Academy Logo */}
            <div className="flex justify-center mb-8">
              <img 
                src={logoUrl} 
                alt="Gangadhar Nagarjuna Academy logo" 
                className="h-16 md:h-20 object-contain dark:invert"
              />
            </div>

            {/* Banner with Gangadhar Logo */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-sm md:max-w-md px-4">
              <div className="bg-primary text-primary-foreground font-extrabold py-4 px-6 rounded-xl shadow-lg z-10 text-center">
                <div className="flex justify-center mb-2">
                  <img 
                    src={gangadharLogoUrl} 
                    alt="Gangadhar Nagarjuna" 
                    className="h-12 object-contain"
                  />
                </div>
                <p className="text-base md:text-lg leading-tight uppercase">2 Hour Online Workshop</p>
                <p className="text-base md:text-lg leading-tight uppercase">On 29th June 2025</p>
                <p className="text-sm md:text-base font-semibold mt-1">(9:00 AM - 11:00 AM IST)</p>
              </div>
            </div>

            {/* Card */}
            <div className="bg-secondary rounded-2xl shadow-2xl pt-32 pb-12 px-6 text-center border border-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-gradient-theme">
                Achieve Success Like the Top 1%
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto my-6 rounded-full"></div>
              <p className="text-lg md:text-xl text-muted-foreground italic">
                Your Time Starts Here....
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopAnnouncementSection;