
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

interface DonorOption {
  id: string;
  type: 'restaurant' | 'household' | 'canteen' | 'caterer';
  title: string;
  description: string;
  icon: React.ReactNode;
}

const DonorTypeModal: React.FC = () => {
  const { currentStep, setCurrentStep, setDonorType } = useAppContext();

  const donorOptions: DonorOption[] = [
    {
      id: 'restaurant',
      type: 'restaurant',
      title: 'Restaurant',
      description: 'I own or represent a restaurant with surplus food',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mm-green-600">
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
          <path d="M7 2v20"></path>
          <path d="M21 15V2"></path>
          <path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
          <path d="M18 8v1"></path>
        </svg>
      )
    },
    {
      id: 'household',
      type: 'household',
      title: 'Household',
      description: 'I have surplus food from my home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mm-green-600">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    {
      id: 'canteen',
      type: 'canteen',
      title: 'Canteen',
      description: 'I manage a canteen with excess food',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mm-green-600">
          <path d="M18 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"></path>
          <path d="m15 3-2 3h-2L9 3"></path>
          <path d="M7 9h.01"></path>
          <path d="M11 9h2"></path>
        </svg>
      )
    },
    {
      id: 'caterer',
      type: 'caterer',
      title: 'Caterer',
      description: 'I work with a catering service with leftover food',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mm-green-600">
          <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
          <line x1="6" x2="18" y1="17" y2="17"></line>
        </svg>
      )
    }
  ];

  const handleSelectDonorType = (type: 'restaurant' | 'household' | 'canteen' | 'caterer') => {
    setDonorType(type);
    setCurrentStep(3); // Move to location permission
  };

  const handleBack = () => {
    setCurrentStep(1); // Go back to login
  };

  return (
    <Dialog open={currentStep === 2} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Select Donor Type</DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <p className="text-center text-gray-600 mb-6">What type of donor are you?</p>
          
          <div className="grid grid-cols-1 gap-4">
            {donorOptions.map((option) => (
              <div 
                key={option.id}
                className="border border-gray-200 rounded-lg p-4 flex items-center hover:border-mm-green-500 hover:bg-mm-green-50 cursor-pointer transition-all"
                onClick={() => handleSelectDonorType(option.type)}
              >
                <div className="w-12 h-12 bg-mm-green-100 rounded-full flex items-center justify-center mr-4">
                  {option.icon}
                </div>
                <div>
                  <h3 className="font-medium text-lg">{option.title}</h3>
                  <p className="text-gray-500 text-sm">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Button variant="outline" onClick={handleBack} className="w-full">
              Back
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonorTypeModal;
