
import React from 'react';
import { Leaf, AreaChart, Users, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-mm-green-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About MealMender</h1>
            <p className="text-lg md:text-xl opacity-90">
              Our mission is to eliminate food waste and fight hunger through technology and community action.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                MealMender was founded with a simple yet powerful vision: to create a world where no good food goes to waste while people go hungry. We recognized that food waste and food insecurity are two sides of the same broken system.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of technologists, food industry experts, and community organizers came together to build a solution that leverages AI, geolocation, and community engagement to rescue food efficiently and effectively.
              </p>
              <p className="text-gray-600">
                Today, MealMender is growing into a global movement, connecting thousands of donors with recipients and saving tons of food from landfills every month.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1593113616828-35ce822ecf11?q=80&w=1000&auto=format&fit=crop" 
                alt="Team of food rescue volunteers" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Food Waste Facts Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Food Waste Crisis</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Food waste is one of the most pressing environmental and social challenges of our time
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-mm-green-100 rounded-full flex items-center justify-center mr-3">
                  <Leaf className="text-mm-green-600 h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">Environmental Impact</h3>
              </div>
              <p className="text-gray-600">
                Food waste is responsible for 8-10% of global greenhouse gas emissions. If food waste were a country, it would be the third largest emitter after China and the USA.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-mm-green-100 rounded-full flex items-center justify-center mr-3">
                  <AreaChart className="text-mm-green-600 h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">Global Scale</h3>
              </div>
              <p className="text-gray-600">
                Approximately 1.3 billion tons of food is wasted globally each year – about one-third of all food produced for human consumption.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-mm-green-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="text-mm-green-600 h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">Social Contradiction</h3>
              </div>
              <p className="text-gray-600">
                While millions of tons of food are wasted, over 820 million people around the world suffer from hunger – a stark and disturbing contrast.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-mm-green-100 rounded-full flex items-center justify-center mr-3">
                  <Clock className="text-mm-green-600 h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">Time Sensitivity</h3>
              </div>
              <p className="text-gray-600">
                Rescuing food is a race against time. Most surplus food needs to be redistributed within hours to maintain safety and quality.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How We're Different */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How MealMender is Different</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our unique approach combines technology and community to solve the food waste crisis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-xl mb-4">AI-Powered Matching</h3>
              <p className="text-gray-600">
                Our artificial intelligence analyzes food type, quantity, location, and time sensitivity to match donors with the most appropriate recipients.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-xl mb-4">Real-Time Tracking</h3>
              <p className="text-gray-600">
                GPS tracking and real-time updates allow all parties to coordinate efficiently, ensuring food gets where it's needed most before it spoils.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-xl mb-4">Verified Network</h3>
              <p className="text-gray-600">
                We verify all recipients and donors, ensuring food safety standards are maintained and donations reach legitimate organizations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Us Section */}
      <section className="py-16 bg-mm-green-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Movement</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Together, we can create a more sustainable, equitable food system. Every meal saved makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/auth" 
              className="bg-white text-mm-green-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Get Started
            </a>
            <a 
              href="#" 
              className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
