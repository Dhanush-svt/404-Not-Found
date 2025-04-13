
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Navigation, Map, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocationMap from '@/components/LocationMap';
import { useToast } from '@/hooks/use-toast';

const MapRoutePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Extract pickup details from location state
  const pickupDetails = location.state?.pickupDetails || {
    title: 'Food Pickup',
    address: 'No address provided',
    donor: 'Unknown donor',
    time: 'Not specified'
  };

  const handleStartNavigation = () => {
    setIsNavigating(true);
    toast({
      title: "Navigation Started",
      description: "Turn-by-turn directions would start here in a full implementation."
    });
    // This would integrate with actual navigation API in a full implementation
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold">Pickup Navigation</h1>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
            <LocationMap height="400px" />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-mm-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Map size={24} className="text-mm-green-600" />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-1">{pickupDetails.title}</h2>
                <p className="text-gray-600 mb-3">{pickupDetails.donor}</p>
                
                <div className="flex items-center gap-2 mb-2">
                  <Navigation size={16} className="text-gray-500" />
                  <span className="text-gray-700">{pickupDetails.address}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <span className="text-gray-700">Pickup time: {pickupDetails.time}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate(-1)}
            >
              Back to Dashboard
            </Button>
            
            <Button
              className="flex-1 bg-mm-green-600 hover:bg-mm-green-700"
              onClick={handleStartNavigation}
              disabled={isNavigating}
            >
              {isNavigating ? "Navigating..." : "Start Navigation"}
            </Button>
          </div>
          
          <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-100">
            <p className="text-amber-700 text-sm">
              <strong>Note:</strong> For full navigation functionality, the app needs to be connected to Google Maps Directions API. 
              This is a placeholder for demonstration purposes.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MapRoutePage;
