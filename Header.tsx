import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, X, User, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import ProfileModal from '@/components/ProfileModal';

const Header = () => {
  const { isAuthenticated, userType, resetUserFlow } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    resetUserFlow();
  };

  return (
    <header className="w-full bg-white shadow-sm py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-mm-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">M</span>
          </div>
          <span className="text-xl font-bold text-mm-green-700">MealMender</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-mm-green-600 transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-mm-green-600 transition-colors">
            About
          </Link>
          {isAuthenticated && userType === 'donor' && (
            <Link to="/donor-dashboard" className="text-gray-600 hover:text-mm-green-600 transition-colors">
              Dashboard
            </Link>
          )}
          {isAuthenticated && userType === 'receiver' && (
            <Link to="/receiver-dashboard" className="text-gray-600 hover:text-mm-green-600 transition-colors">
              Dashboard
            </Link>
          )}
          {isAuthenticated && userType === 'admin' && (
            <Link to="/admin-dashboard" className="text-gray-600 hover:text-mm-green-600 transition-colors">
              Admin Panel
            </Link>
          )}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-full"
                onClick={() => setIsProfileOpen(true)}
              >
                <User size={18} />
              </Button>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/auth?mode=login">
                <Button variant="outline" className="flex items-center gap-2">
                  <LogIn size={16} />
                  Log In
                </Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button className="bg-mm-green-600 hover:bg-mm-green-700 text-white flex items-center gap-2">
                  <UserPlus size={16} />
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-50 py-4 px-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-gray-600 hover:text-mm-green-600 py-2 border-b border-gray-100">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-mm-green-600 py-2 border-b border-gray-100">
              About
            </Link>
            {isAuthenticated && userType === 'donor' && (
              <Link to="/donor-dashboard" className="text-gray-600 hover:text-mm-green-600 py-2 border-b border-gray-100">
                Dashboard
              </Link>
            )}
            {isAuthenticated && userType === 'receiver' && (
              <Link to="/receiver-dashboard" className="text-gray-600 hover:text-mm-green-600 py-2 border-b border-gray-100">
                Dashboard
              </Link>
            )}
            {isAuthenticated && userType === 'admin' && (
              <Link to="/admin-dashboard" className="text-gray-600 hover:text-mm-green-600 py-2 border-b border-gray-100">
                Admin Panel
              </Link>
            )}
            {isAuthenticated ? (
              <div className="flex flex-col gap-3 mt-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 justify-center"
                  onClick={() => {
                    setIsProfileOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <User size={16} />
                  <span>Profile</span>
                </Button>
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button className="bg-mm-green-600 hover:bg-mm-green-700 text-white w-full mt-2">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
      
      {/* Profile Modal */}
      <ProfileModal 
        open={isProfileOpen} 
        onOpenChange={setIsProfileOpen}
      />
    </header>
  );
};

export default Header;
