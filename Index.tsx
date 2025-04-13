
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, HeartHandshake, MapPin, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Rescue Food. Save Lives. Protect Our Planet.
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              MealMender connects surplus food from restaurants, households, and caterers with people and organizations in need - all powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-white text-mm-green-700 hover:bg-gray-100"
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/about')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How MealMender Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform uses AI and real-time location data to efficiently connect food donors with recipients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-mm-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-mm-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">List Surplus Food</h3>
              <p className="text-gray-600 mb-4">
                Take a photo of surplus food—our AI instantly estimates quantity and freshness to create a listing.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-mm-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-mm-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect With Recipients</h3>
              <p className="text-gray-600 mb-4">
                Nearby shelters, food banks, and verified volunteers are instantly notified of available donations.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-mm-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-mm-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Coordinate Pickup</h3>
              <p className="text-gray-600 mb-4">
                Recipients claim donations and arrange pickup through our streamlined logistics system.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">AI-Powered Food Rescue</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-mm-green-100 rounded-full flex-shrink-0 flex items-center justify-center">
                    <HeartHandshake size={20} className="text-mm-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
                    <p className="text-gray-600">
                      Our AI matches donors with recipients based on location, food type, quantity, and time sensitivity.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-mm-green-100 rounded-full flex-shrink-0 flex items-center justify-center">
                    <MapPin size={20} className="text-mm-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Geo-Smart Distribution</h3>
                    <p className="text-gray-600">
                      Real-time maps show nearby food availability, optimizing routes and reducing transportation emissions.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-mm-green-100 rounded-full flex-shrink-0 flex items-center justify-center">
                    <ShieldCheck size={20} className="text-mm-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Verified Recipients</h3>
                    <p className="text-gray-600">
                      We verify all food recipients with government licenses and proper credentials for safe distribution.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleGetStarted}
                className="mt-8 bg-mm-green-600 hover:bg-mm-green-700"
              >
                Join the Movement <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd59a93c2420?q=80&w=1000&auto=format&fit=crop" 
                alt="Food donation" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Together, we're making a difference in reducing food waste and fighting hunger
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-mm-green-600 mb-2">10.5K</div>
              <p className="text-gray-600">Meals Saved</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-mm-green-600 mb-2">2.8K</div>
              <p className="text-gray-600">People Nourished</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-mm-green-600 mb-2">4.2T</div>
              <p className="text-gray-600">CO₂ Emissions Prevented</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-mm-green-600 mb-2">125</div>
              <p className="text-gray-600">Verified Partners</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-mm-green-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Food Rescue Revolution</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Whether you're a restaurant with surplus food or an organization helping those in need, MealMender connects you to make a difference.
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="bg-white text-mm-green-700 hover:bg-gray-100"
          >
            Get Started Now
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
