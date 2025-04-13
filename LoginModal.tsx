
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const LoginModal: React.FC = () => {
  const { currentStep, setCurrentStep, setEmail, setAuthenticated, userType } = useAppContext();
  const { toast } = useToast();
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (!emailInput.includes('@')) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        toast({
          title: "Invalid password",
          description: "Password must be at least 6 characters",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      setEmail(emailInput);
      setAuthenticated(true);
      
      toast({
        title: isLogin ? "Logged in successfully" : "Account created successfully",
        description: `Welcome to MealMender!`,
      });
      
      // Advance to the next step based on user type
      if (userType === 'donor') {
        setCurrentStep(2); // Donor type selection
      } else if (userType === 'receiver') {
        setCurrentStep(3); // Location permission
      } else if (userType === 'admin') {
        setCurrentStep(10); // Skip to admin dashboard
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleBack = () => {
    setCurrentStep(0);
  };

  return (
    <Dialog open={currentStep === 1} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {isLogin ? 'Login to Your Account' : 'Create Your Account'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between pt-2">
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" className="bg-mm-green-600 hover:bg-mm-green-700" disabled={isLoading}>
              {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </div>
        </form>
        <div className="text-center text-sm">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Button variant="link" className="text-mm-green-600 p-0 ml-1" onClick={toggleAuthMode}>
              {isLogin ? 'Sign Up' : 'Login'}
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
