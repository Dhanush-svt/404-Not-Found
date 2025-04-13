
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type UserType = 'donor' | 'receiver' | 'admin' | null;
type DonorType = 'restaurant' | 'household' | 'canteen' | 'caterer' | null;

interface UserProfile {
  name?: string;
  phoneNumber?: string;
  address?: string;
  organization?: string;
  profilePicture?: string;
}

interface AuthContextState {
  isAuthenticated: boolean;
  userType: UserType;
  donorType: DonorType;
  email: string | null;
  locationPermission: boolean;
  isLocationModalOpen: boolean;
  currentStep: number;
  userProfile: UserProfile;
  setAuthenticated: (status: boolean) => void;
  setUserType: (type: UserType) => void;
  setDonorType: (type: DonorType) => void;
  setEmail: (email: string | null) => void;
  setLocationPermission: (permission: boolean) => void;
  setLocationModalOpen: (isOpen: boolean) => void;
  setCurrentStep: (step: number) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  resetUserFlow: () => void;
}

const defaultState: AuthContextState = {
  isAuthenticated: false,
  userType: null,
  donorType: null,
  email: null,
  locationPermission: false,
  isLocationModalOpen: false,
  currentStep: 0,
  userProfile: {},
  setAuthenticated: () => {},
  setUserType: () => {},
  setDonorType: () => {},
  setEmail: () => {},
  setLocationPermission: () => {},
  setLocationModalOpen: () => {},
  setCurrentStep: () => {},
  updateUserProfile: () => {},
  resetUserFlow: () => {},
};

const AppContext = createContext<AuthContextState>(defaultState);

export const useAppContext = () => useContext(AppContext);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  // Try to load saved user data from localStorage
  const loadSavedState = () => {
    try {
      const savedState = localStorage.getItem('mealmender_user_state');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        return {
          isAuthenticated: parsedState.isAuthenticated || false,
          userType: parsedState.userType || null,
          donorType: parsedState.donorType || null,
          email: parsedState.email || null,
          locationPermission: parsedState.locationPermission || false,
          userProfile: parsedState.userProfile || {},
        };
      }
    } catch (error) {
      console.error("Error loading saved state:", error);
    }
    return null;
  };

  const initialState = loadSavedState();

  const [isAuthenticated, setIsAuthenticated] = useState(initialState?.isAuthenticated || false);
  const [userType, setUserType] = useState<UserType>(initialState?.userType || null);
  const [donorType, setDonorType] = useState<DonorType>(initialState?.donorType || null);
  const [email, setEmail] = useState<string | null>(initialState?.email || null);
  const [locationPermission, setLocationPermission] = useState(initialState?.locationPermission || false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialState?.userProfile || {});

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated) {
      const stateToSave = {
        isAuthenticated,
        userType,
        donorType,
        email,
        locationPermission,
        userProfile,
      };
      localStorage.setItem('mealmender_user_state', JSON.stringify(stateToSave));
    }
  }, [isAuthenticated, userType, donorType, email, locationPermission, userProfile]);

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  };

  const resetUserFlow = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setDonorType(null);
    setEmail(null);
    setLocationPermission(false);
    setIsLocationModalOpen(false);
    setCurrentStep(0);
    setUserProfile({});
    // Clear localStorage
    localStorage.removeItem('mealmender_user_state');
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        userType,
        donorType,
        email,
        locationPermission,
        isLocationModalOpen,
        currentStep,
        userProfile,
        setAuthenticated: setIsAuthenticated,
        setUserType,
        setDonorType,
        setEmail,
        setLocationPermission,
        setLocationModalOpen: setIsLocationModalOpen,
        setCurrentStep,
        updateUserProfile,
        resetUserFlow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
