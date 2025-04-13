
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-mm-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-xl font-bold text-mm-green-700">MealMender</span>
            </div>
            <p className="text-gray-600 mb-4">
              Eliminating food waste by connecting donors with those in need.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-mm-green-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-mm-green-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-mm-green-600">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-mm-green-600">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-mm-green-600">About Us</Link>
              </li>
              <li>
                <Link to="/auth" className="text-gray-600 hover:text-mm-green-600">Get Started</Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">For Donors</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/auth" className="text-gray-600 hover:text-mm-green-600">Register as Donor</Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-mm-green-600">How It Works</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-mm-green-600">Guidelines</a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">For Recipients</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/auth" className="text-gray-600 hover:text-mm-green-600">Register as Recipient</Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-mm-green-600">Find Food</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-mm-green-600">Verification Process</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} MealMender. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
