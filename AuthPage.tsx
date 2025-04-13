
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UserTypeModal from '@/components/modals/UserTypeModal';
import LoginModal from '@/components/modals/LoginModal';
import DonorTypeModal from '@/components/modals/DonorTypeModal';
import LocationModal from '@/components/modals/LocationModal';
import { useAppContext } from '@/contexts/AppContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { 
    currentStep, 
    userType, 
  } = useAppContext();

  // Redirect to appropriate dashboard based on step and user type
  React.useEffect(() => {
    if (currentStep === 4 && userType === 'donor') {
      navigate('/donor-dashboard');
    } else if (currentStep === 5 && userType === 'receiver') {
      navigate('/receiver-dashboard');
    } else if (currentStep === 10 && userType === 'admin') {
      navigate('/admin-dashboard');
    }
  }, [currentStep, userType, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="container px-6">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Join MealMender</h1>
            <p className="text-gray-600 text-center mb-8">
              Please follow the steps to create your account and get started with MealMender.
            </p>
            
            <div className="flex justify-between mb-8">
              <div className={`flex-1 text-center ${currentStep >= 0 ? 'text-mm-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${currentStep >= 0 ? 'bg-mm-green-100' : 'bg-gray-100'}`}>
                  <span className={currentStep >= 0 ? 'text-mm-green-600' : 'text-gray-400'}>1</span>
                </div>
                <span className="text-xs">Role</span>
              </div>
              
              <div className={`w-full max-w-[60px] mt-4 border-t ${currentStep >= 1 ? 'border-mm-green-300' : 'border-gray-200'}`} />
              
              <div className={`flex-1 text-center ${currentStep >= 1 ? 'text-mm-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${currentStep >= 1 ? 'bg-mm-green-100' : 'bg-gray-100'}`}>
                  <span className={currentStep >= 1 ? 'text-mm-green-600' : 'text-gray-400'}>2</span>
                </div>
                <span className="text-xs">Account</span>
              </div>
              
              <div className={`w-full max-w-[60px] mt-4 border-t ${currentStep >= 2 ? 'border-mm-green-300' : 'border-gray-200'}`} />
              
              <div className={`flex-1 text-center ${currentStep >= 2 ? 'text-mm-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${currentStep >= 2 ? 'bg-mm-green-100' : 'bg-gray-100'}`}>
                  <span className={currentStep >= 2 ? 'text-mm-green-600' : 'text-gray-400'}>3</span>
                </div>
                <span className="text-xs">Details</span>
              </div>
              
              <div className={`w-full max-w-[60px] mt-4 border-t ${currentStep >= 3 ? 'border-mm-green-300' : 'border-gray-200'}`} />
              
              <div className={`flex-1 text-center ${currentStep >= 3 ? 'text-mm-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${currentStep >= 3 ? 'bg-mm-green-100' : 'bg-gray-100'}`}>
                  <span className={currentStep >= 3 ? 'text-mm-green-600' : 'text-gray-400'}>4</span>
                </div>
                <span className="text-xs">Location</span>
              </div>
            </div>
            
            <p className="text-center text-gray-500">
              {currentStep === 0 && "Select your role to get started with MealMender."}
              {currentStep === 1 && "Create or login to your account."}
              {currentStep === 2 && "Tell us more about your organization."}
              {currentStep === 3 && "Enable location services for better matching."}
            </p>
          </div>
        </div>
      </main>
      
      {/* Modals */}
      <UserTypeModal />
      <LoginModal />
      <DonorTypeModal />
      <LocationModal />
      
      <Footer />
    </div>
  );
};

export default AuthPage;
