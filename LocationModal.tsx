
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const LocationModal: React.FC = () => {
  const { currentStep, setCurrentStep, setLocationPermission, userType } = useAppContext();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAllowLocation = () => {
    setIsLoading(true);
    
    // Simulate requesting location
    setTimeout(() => {
      setLocationPermission(true);
      
      toast({
        title: "Location access granted",
        description: "Thank you for allowing location access.",
      });
      
      // Navigate to the appropriate dashboard based on user type
      if (userType === 'donor') {
        setCurrentStep(4); // Donor dashboard
      } else if (userType === 'receiver') {
        setCurrentStep(5); // Receiver dashboard
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleSkipLocation = () => {
    toast({
      title: "Location access skipped",
      description: "You can enable location access later in settings.",
      variant: "destructive",
    });
    
    // Navigate to the appropriate dashboard based on user type
    if (userType === 'donor') {
      setCurrentStep(4); // Donor dashboard
    } else if (userType === 'receiver') {
      setCurrentStep(5); // Receiver dashboard
    }
  };

  const handleBack = () => {
    if (userType === 'donor') {
      setCurrentStep(2); // Back to donor type
    } else {
      setCurrentStep(1); // Back to login
    }
  };

  return (
    <Dialog open={currentStep === 3} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Location Access</DialogTitle>
        </DialogHeader>
        <div className="py-6 text-center">
          <div className="w-20 h-20 mx-auto bg-mm-green-100 rounded-full flex items-center justify-center mb-6">
            <MapPin size={32} className="text-mm-green-600" />
          </div>
          
          <h3 className="text-xl font-medium mb-2">Allow location access</h3>
          <p className="text-gray-600 mb-6">
            MealMender uses your location to connect donors and recipients in your area.
            This helps us efficiently match surplus food with those who need it.
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={handleAllowLocation} 
              className="w-full bg-mm-green-600 hover:bg-mm-green-700"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Allow Location Access'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSkipLocation} 
              className="w-full"
            >
              Skip for Now
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleBack} 
              className="w-full"
            >
              Back
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;
