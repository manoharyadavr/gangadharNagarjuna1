
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { BookingForm } from '@/components/booking/BookingForm';

const courseDetails: { [key: string]: { price: number; name: string } } = {
  'workshop-registration': { price: 299, name: 'Online Workshop Registration' },
  'live-workshops': { price: 299, name: 'Sunday Live Workshops' },
  'startup-mastery': { price: 25000, name: 'Startup Business Mastery Course' },
  'digital-growth': { price: 4999, name: 'Digital Business Growth Course' },
  'premium-combo': { price: 25000, name: 'Premium Combo Course' },
};
const defaultCourse = { price: 299, name: 'Business Foundation Course' };

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course') || '';

  const selectedCourse = courseDetails[courseId] || defaultCourse;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-md w-full space-y-8 p-10 bg-card shadow-xl rounded-2xl">
        <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" onClick={() => navigate('/')}>
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Secure Your Spot
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            You are enrolling in: <strong className="text-primary">{selectedCourse.name}</strong>
          </p>
        </div>
        <BookingForm price={selectedCourse.price} />
         <p className="mt-4 text-center text-xs text-muted-foreground">
            By clicking "Pay Now", you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default BookingPage;
