
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

const UserTypeModal: React.FC = () => {
  const { currentStep, setCurrentStep, setUserType } = useAppContext();

  const handleSelectUserType = (type: 'donor' | 'receiver' | 'admin') => {
    setUserType(type);
    setCurrentStep(1); // Move to the next step (email login)
  };

  return (
    <Dialog open={currentStep === 0} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Welcome to MealMender</DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <p className="text-center text-gray-600 mb-6">Please select your role to continue:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className="border border-gray-200 rounded-lg p-6 text-center hover:border-mm-green-500 hover:bg-mm-green-50 cursor-pointer transition-all"
              onClick={() => handleSelectUserType('donor')}
            >
              <div className="w-16 h-16 mx-auto bg-mm-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mm-green-600"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Donor</h3>
              <p className="text-gray-500 text-sm">I want to donate surplus food</p>
            </div>
            
            <div 
              className="border border-gray-200 rounded-lg p-6 text-center hover:border-mm-green-500 hover:bg-mm-green-50 cursor-pointer transition-all"
              onClick={() => handleSelectUserType('receiver')}
            >
              <div className="w-16 h-16 mx-auto bg-mm-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mm-green-600"><path d="M20 15c0-3 2-3 2-8a5 5 0 0 0-10 0c0 2 2 8 2 8"></path><path d="M18 15.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path><path d="M12 15c0-3-2-3-2-8a5 5 0 0 1 10 0c0 2-2 8-2 8"></path><path d="M12 15.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0z"></path></svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Recipient</h3>
              <p className="text-gray-500 text-sm">I'm looking for food donations</p>
            </div>
            
            <div 
              className="border border-gray-200 rounded-lg p-6 text-center hover:border-mm-green-500 hover:bg-mm-green-50 cursor-pointer transition-all"
              onClick={() => handleSelectUserType('admin')}
            >
              <div className="w-16 h-16 mx-auto bg-mm-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mm-green-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Admin</h3>
              <p className="text-gray-500 text-sm">I manage the platform</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserTypeModal;
