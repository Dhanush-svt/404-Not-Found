import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, Clock, CheckCircle, FileCheck, Package } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DonateForm from '@/components/DonateForm';
import FoodCard, { FoodItem } from '@/components/FoodCard';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';

// Sample data for donor's food listings
const sampleDonations: FoodItem[] = [
  {
    id: '1',
    title: 'Fresh Bread and Pastries',
    description: 'Assorted bread, croissants, and pastries from this morning. Still fresh and ready to eat.',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1000&auto=format&fit=crop',
    donor: {
      name: 'Your Restaurant',
      type: 'Restaurant',
    },
    location: '123 Main St',
    distance: '0 km',
    expiresIn: '8 hours',
    quantity: '5 kg',
    quality: 5,
  },
  {
    id: '2',
    title: 'Prepared Meals - Vegetarian',
    description: 'Vegetarian pasta dishes and salads prepared today. Great condition, refrigerated properly.',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=1000&auto=format&fit=crop',
    donor: {
      name: 'Your Restaurant',
      type: 'Restaurant',
    },
    location: '123 Main St',
    distance: '0 km',
    expiresIn: '12 hours',
    quantity: '8 servings',
    quality: 4,
  },
];

// Sample data for donation requests
const sampleRequests = [
  {
    id: '101',
    foodId: '1',
    requester: 'Community Food Bank',
    requestedAt: '2 hours ago',
    status: 'pending',
    quantity: '5 kg',
    message: 'We would love to collect your bread donation today to distribute to our community members in need.',
  },
  {
    id: '102',
    foodId: '2',
    requester: 'Shelter Hope',
    requestedAt: '30 minutes ago',
    status: 'pending',
    quantity: '6 servings',
    message: 'We are interested in your vegetarian meals for dinner service tonight. Can provide pickup within an hour.',
  },
];

// New history type for completed donations
interface DonationHistoryItem {
  id: string;
  foodId: string;
  foodTitle: string;
  recipientName: string;
  completedAt: string;
  quantity: string;
  image?: string;
}

const DonorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { email } = useAppContext();
  const [activeTab, setActiveTab] = useState('donations');
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [donations, setDonations] = useState(sampleDonations);
  const [requests, setRequests] = useState(sampleRequests);
  const [donationHistory, setDonationHistory] = useState<DonationHistoryItem[]>([]);
  
  // Load history from localStorage on component mount
  useEffect(() => {
    if (email) {
      const savedDonationHistory = localStorage.getItem(`${email}_donor_history`);
      if (savedDonationHistory) {
        setDonationHistory(JSON.parse(savedDonationHistory));
      }
      
      const savedRequests = localStorage.getItem(`${email}_donor_requests`);
      if (savedRequests) {
        setRequests(JSON.parse(savedRequests));
      }
    }
  }, [email]);

  // Save to localStorage whenever history changes
  useEffect(() => {
    if (email && donationHistory.length > 0) {
      localStorage.setItem(`${email}_donor_history`, JSON.stringify(donationHistory));
    }
  }, [donationHistory, email]);
  
  // Save to localStorage whenever requests change
  useEffect(() => {
    if (email && requests.length > 0) {
      localStorage.setItem(`${email}_donor_requests`, JSON.stringify(requests));
    }
  }, [requests, email]);

  const handleNewDonation = () => {
    setShowDonateForm(true);
    setActiveTab('new');
  };

  const handleAcceptRequest = (requestId: string) => {
    // Find the request and related donation
    const request = requests.find(r => r.id === requestId);
    if (!request) return;
    
    const relatedDonation = donations.find(d => d.id === request.foodId);
    if (!relatedDonation) return;
    
    // Update request status
    setRequests(prev => 
      prev.map(r => 
        r.id === requestId 
          ? { ...r, status: 'accepted' } 
          : r
      )
    );
    
    // Add to donation history
    const historyItem: DonationHistoryItem = {
      id: `hist-${Date.now()}`,
      foodId: request.foodId,
      foodTitle: relatedDonation.title,
      recipientName: request.requester,
      completedAt: new Date().toLocaleString(),
      quantity: request.quantity,
      image: relatedDonation.image
    };
    
    setDonationHistory(prev => [historyItem, ...prev]);
    
    toast({
      title: "Request accepted!",
      description: "The recipient has been notified and will arrange pickup.",
    });
  };

  const handleDeclineRequest = (requestId: string) => {
    // Update request status
    setRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'declined' } 
          : request
      )
    );
    
    toast({
      title: "Request declined",
      description: "The recipient has been notified of your decision.",
    });
  };

  const handleEditDonation = (item: FoodItem) => {
    // Implementation for editing a donation
    console.log('Edit donation:', item);
    toast({
      title: "Edit feature",
      description: "Editing functionality will be available soon.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Donor Dashboard</h1>
              <p className="text-gray-600">Manage your food donations and recipient requests</p>
            </div>
            <Button 
              onClick={handleNewDonation}
              className="mt-4 md:mt-0 bg-mm-green-600 hover:bg-mm-green-700"
            >
              <PlusCircle size={18} className="mr-2" />
              New Donation
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-mm-green-50 p-4 rounded-lg border border-mm-green-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-mm-green-100 rounded-full flex items-center justify-center mr-3">
                    <Package size={20} className="text-mm-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Active Donations</div>
                    <div className="text-2xl font-bold">{donations.length}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-mm-orange-50 p-4 rounded-lg border border-mm-orange-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-mm-orange-100 rounded-full flex items-center justify-center mr-3">
                    <Clock size={20} className="text-mm-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Pending Requests</div>
                    <div className="text-2xl font-bold">{requests.filter(r => r.status === 'pending').length}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Completed Donations</div>
                    <div className="text-2xl font-bold">{donationHistory.length}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <FileCheck size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Impact Rating</div>
                    <div className="text-2xl font-bold">4.8/5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="donations">My Donations</TabsTrigger>
              <TabsTrigger value="requests">Recipient Requests</TabsTrigger>
              <TabsTrigger value="history">Donation History</TabsTrigger>
              <TabsTrigger value="new">New Donation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="donations" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donations.map(item => (
                  <FoodCard 
                    key={item.id} 
                    item={item} 
                    onAction={handleEditDonation}
                    actionText="Edit Listing"
                  />
                ))}
              </div>
              
              {donations.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Package size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Donations</h3>
                  <p className="text-gray-500 mb-6">You don't have any active food donation listings.</p>
                  <Button 
                    onClick={handleNewDonation}
                    className="bg-mm-green-600 hover:bg-mm-green-700"
                  >
                    Create Your First Donation
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="requests" className="space-y-4">
              {requests.length > 0 ? (
                <div className="space-y-4">
                  {requests.map(request => {
                    const relatedDonation = donations.find(d => d.id === request.foodId);
                    
                    return (
                      <div key={request.id} className="bg-white rounded-lg border p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="w-full md:w-auto">
                          <img 
                            src={relatedDonation?.image} 
                            alt={relatedDonation?.title} 
                            className="w-full md:w-24 h-24 object-cover rounded-md"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                            <h3 className="font-medium">{relatedDonation?.title}</h3>
                            <span className="text-sm text-gray-500">Requested {request.requestedAt}</span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">From:</span> {request.requester}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Quantity:</span> {request.quantity}
                          </p>
                          <p className="text-sm text-gray-600 mb-3">
                            <span className="font-medium">Message:</span> "{request.message}"
                          </p>
                          
                          {request.status === 'pending' ? (
                            <div className="flex flex-col sm:flex-row gap-2 mt-2">
                              <Button 
                                onClick={() => handleAcceptRequest(request.id)}
                                className="bg-mm-green-600 hover:bg-mm-green-700"
                                size="sm"
                              >
                                Accept Request
                              </Button>
                              <Button 
                                onClick={() => handleDeclineRequest(request.id)}
                                variant="outline"
                                size="sm"
                              >
                                Decline
                              </Button>
                            </div>
                          ) : (
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              request.status === 'accepted' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {request.status === 'accepted' ? 'Accepted' : 'Declined'}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Clock size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Requests</h3>
                  <p className="text-gray-500">You don't have any pending requests from recipients.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history">
              {donationHistory.length > 0 ? (
                <div className="space-y-4">
                  {donationHistory.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg border p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="w-full md:w-auto">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.foodTitle} 
                            className="w-full md:w-24 h-24 object-cover rounded-md"
                          />
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                          <h3 className="font-medium">{item.foodTitle}</h3>
                          <span className="text-sm text-gray-500">Completed on {item.completedAt}</span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Recipient:</span> {item.recipientName}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Quantity:</span> {item.quantity}
                        </p>
                        
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FileCheck size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Donation History</h3>
                  <p className="text-gray-500 mb-6">Track your past donations and their impact.</p>
                  <p className="text-gray-400">No completed donations yet. Accept a request to see it here!</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="new">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-bold mb-6">Create New Food Donation</h2>
                <DonateForm />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonorDashboard;
