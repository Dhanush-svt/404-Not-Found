
import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, ShoppingBag, FilterX } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FoodCard, { FoodItem } from '@/components/FoodCard';
import FoodFilter from '@/components/FoodFilter';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';

// Sample data for available food donations
const sampleAvailableFoods: FoodItem[] = [
  {
    id: '1',
    title: 'Fresh Bread and Pastries',
    description: 'Assorted bread, croissants, and pastries from this morning. Still fresh and ready to eat.',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1000&auto=format&fit=crop',
    donor: {
      name: 'Sunrise Bakery',
      type: 'Restaurant',
    },
    location: '123 Baker St',
    distance: '1.2 km',
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
      name: 'Green Garden Restaurant',
      type: 'Restaurant',
    },
    location: '456 Veggie Ave',
    distance: '0.8 km',
    expiresIn: '12 hours',
    quantity: '8 servings',
    quality: 4,
  },
  {
    id: '3',
    title: 'Catering Leftovers - Mixed Items',
    description: 'Various food items from a corporate event. Includes sandwiches, fruit platters, and desserts.',
    image: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?q=80&w=1000&auto=format&fit=crop',
    donor: {
      name: 'Elite Catering',
      type: 'Caterer',
    },
    location: '789 Event Blvd',
    distance: '3.5 km',
    expiresIn: '6 hours',
    quantity: '10 kg',
    quality: 4,
  },
  {
    id: '4',
    title: 'Rice and Curry',
    description: 'Homemade vegetable curry and rice. Made this afternoon, excellent condition.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356c36?q=80&w=1000&auto=format&fit=crop',
    donor: {
      name: 'Smith Family',
      type: 'Household',
    },
    location: '321 Home Lane',
    distance: '2.3 km',
    expiresIn: '10 hours',
    quantity: '4 servings',
    quality: 5,
  },
  {
    id: '5',
    title: 'Packaged Snacks & Drinks',
    description: 'Unopened packages of snacks, cookies, and juice boxes from a school event.',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=1000&auto=format&fit=crop',
    donor: {
      name: 'Central School Canteen',
      type: 'Canteen',
    },
    location: '222 Education St',
    distance: '1.7 km',
    expiresIn: '3 days',
    quantity: '25 items',
    quality: 5,
  },
];

// Sample data for pending and past requests
const samplePendingRequests = [
  {
    id: '101',
    foodId: '2',
    donor: 'Green Garden Restaurant',
    status: 'pending',
    requestedAt: '2 hours ago',
    scheduledPickup: 'Today, 6:00 PM',
    quantity: '8 servings',
    message: 'We would like to collect these meals for our community dinner tonight.',
  },
];

const samplePastRequests = [
  {
    id: '201',
    foodId: '1',
    donor: 'Sunrise Bakery',
    status: 'completed',
    requestedAt: '2 days ago',
    completedAt: 'Yesterday, 4:30 PM',
    quantity: '4 kg',
    message: 'Thank you for the donation!',
  },
];

const ReceiverDashboard = () => {
  const { toast } = useToast();
  const { email } = useAppContext();
  const [activeTab, setActiveTab] = useState('available');
  const [availableFoods, setAvailableFoods] = useState(sampleAvailableFoods);
  const [pendingRequests, setPendingRequests] = useState(samplePendingRequests);
  const [pastRequests, setPastRequests] = useState(samplePastRequests);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load history from localStorage on component mount
  useEffect(() => {
    if (email) {
      const savedPendingRequests = localStorage.getItem(`${email}_receiver_pending`);
      if (savedPendingRequests) {
        setPendingRequests(JSON.parse(savedPendingRequests));
      }
      
      const savedPastRequests = localStorage.getItem(`${email}_receiver_history`);
      if (savedPastRequests) {
        setPastRequests(JSON.parse(savedPastRequests));
      }
    }
  }, [email]);

  // Save to localStorage whenever pending requests change
  useEffect(() => {
    if (email && pendingRequests.length > 0) {
      localStorage.setItem(`${email}_receiver_pending`, JSON.stringify(pendingRequests));
    }
  }, [pendingRequests, email]);
  
  // Save to localStorage whenever past requests change
  useEffect(() => {
    if (email && pastRequests.length > 0) {
      localStorage.setItem(`${email}_receiver_history`, JSON.stringify(pastRequests));
    }
  }, [pastRequests, email]);

  const handleRequestFood = (food: FoodItem) => {
    setSelectedFood(food);
    setIsRequestModalOpen(true);
    setRequestMessage(`Hello, we're interested in your ${food.title} donation. We can pick up at your convenience.`);
  };

  const handleSubmitRequest = () => {
    if (!selectedFood) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create a new request
      const newRequest = {
        id: `req-${Date.now()}`,
        foodId: selectedFood.id,
        donor: selectedFood.donor.name,
        status: 'pending',
        requestedAt: 'Just now',
        scheduledPickup: 'To be confirmed',
        quantity: selectedFood.quantity,
        message: requestMessage,
      };
      
      // Add to pending requests
      setPendingRequests(prev => [newRequest, ...prev]);
      
      toast({
        title: "Request submitted!",
        description: `Your request has been sent to ${selectedFood.donor.name}.`,
      });
      
      setIsRequestModalOpen(false);
      setSelectedFood(null);
      setRequestMessage('');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleCancelRequest = (requestId: string) => {
    const request = pendingRequests.find(req => req.id === requestId);
    if (!request) return;
    
    // Remove from pending
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    
    // Add to history as cancelled
    setPastRequests(prev => [{
      id: requestId,
      foodId: request.foodId,
      donor: request.donor,
      status: 'cancelled',
      requestedAt: request.requestedAt,
      completedAt: new Date().toLocaleString(),
      quantity: request.quantity,
      message: 'Request cancelled by recipient'
    }, ...prev]);
    
    toast({
      title: "Request cancelled",
      description: "Your food request has been cancelled.",
    });
  };

  const handleFilterChange = (filters: any) => {
    toast({
      title: "Filters applied",
      description: `Showing donations within ${filters.distance}km and minimum quality of ${filters.quality}/5.`,
    });
    
    // In a real app, you would filter the actual data
    console.log('Applied filters:', filters);
  };

  // Check for completed requests
  useEffect(() => {
    // In a real app, this would be handled by the backend
    // Here we simulate checking for status changes from the donor side
    
    // Move accepted/declined requests to history after 5 seconds for demo
    const requestsToMove = pendingRequests.filter(req => req.status === 'accepted' || req.status === 'declined');
    
    if (requestsToMove.length > 0) {
      const timer = setTimeout(() => {
        // Remove from pending
        setPendingRequests(prev => 
          prev.filter(req => req.status === 'pending')
        );
        
        // Add to history
        setPastRequests(prev => [
          ...requestsToMove.map(req => ({
            ...req,
            completedAt: new Date().toLocaleString(),
          })),
          ...prev
        ]);
        
        toast({
          title: "Request updates",
          description: `${requestsToMove.length} request(s) have been moved to history.`,
        });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [pendingRequests]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Recipient Dashboard</h1>
              <p className="text-gray-600">Find and request food donations in your area</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-mm-green-50 p-4 rounded-lg border border-mm-green-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-mm-green-100 rounded-full flex items-center justify-center mr-3">
                    <MapPin size={20} className="text-mm-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Nearby Donations</div>
                    <div className="text-2xl font-bold">{availableFoods.length}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-mm-orange-50 p-4 rounded-lg border border-mm-orange-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-mm-orange-100 rounded-full flex items-center justify-center mr-3">
                    <Calendar size={20} className="text-mm-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Pending Pickups</div>
                    <div className="text-2xl font-bold">{pendingRequests.length}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <ShoppingBag size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Completed Pickups</div>
                    <div className="text-2xl font-bold">{pastRequests.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="available">Available Food</TabsTrigger>
              <TabsTrigger value="pending">Pending Requests</TabsTrigger>
              <TabsTrigger value="history">Request History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="available" className="space-y-4">
              <FoodFilter onFilterChange={handleFilterChange} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableFoods.map(item => (
                  <FoodCard 
                    key={item.id} 
                    item={item} 
                    isReceiver={true}
                    onAction={handleRequestFood}
                    actionText="Request Food"
                  />
                ))}
              </div>
              
              {availableFoods.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FilterX size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Matching Donations</h3>
                  <p className="text-gray-500 mb-6">There are no food donations that match your current filters.</p>
                  <Button 
                    onClick={() => setAvailableFoods(sampleAvailableFoods)}
                    variant="outline"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              {pendingRequests.length > 0 ? (
                <div className="space-y-4">
                  {pendingRequests.map(request => {
                    const relatedDonation = sampleAvailableFoods.find(d => d.id === request.foodId);
                    
                    return (
                      <div key={request.id} className="bg-white rounded-lg border p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="w-full md:w-auto">
                          <img 
                            src={relatedDonation?.image} 
                            alt={relatedDonation?.title || "Food item"} 
                            className="w-full md:w-24 h-24 object-cover rounded-md"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                            <h3 className="font-medium">{relatedDonation?.title || "Food item"}</h3>
                            <span className="text-sm text-gray-500">Requested {request.requestedAt}</span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">From:</span> {request.donor}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Quantity:</span> {request.quantity}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Pickup:</span> {request.scheduledPickup}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Status:</span> <span className="capitalize">{request.status}</span>
                          </p>
                          
                          <div className="flex flex-col sm:flex-row gap-2 mt-2">
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelRequest(request.id)}
                            >
                              Cancel Request
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Calendar size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Requests</h3>
                  <p className="text-gray-500">You don't have any pending food requests.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history">
              {pastRequests.length > 0 ? (
                <div className="space-y-4">
                  {pastRequests.map(request => {
                    const statusClass = 
                      request.status === 'completed' || request.status === 'accepted' 
                        ? 'bg-green-100 text-green-800'
                        : request.status === 'cancelled' 
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-red-100 text-red-800';
                          
                    const statusLabel = 
                      request.status === 'completed' || request.status === 'accepted' 
                        ? 'Completed'
                        : request.status === 'cancelled'
                          ? 'Cancelled'
                          : 'Declined';
                    
                    return (
                      <div key={request.id} className="bg-white rounded-lg border p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                            <h3 className="font-medium">Food Request #{request.id}</h3>
                            <span className="text-sm text-gray-500">
                              {request.completedAt ? `Completed ${request.completedAt}` : `Requested ${request.requestedAt}`}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">From:</span> {request.donor}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Quantity:</span> {request.quantity}
                          </p>
                          
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                            {statusLabel}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Request History</h3>
                  <p className="text-gray-500">You haven't completed any food pickups yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Request Food Modal */}
      <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Food Donation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedFood && (
              <div className="flex items-start gap-4">
                <img 
                  src={selectedFood.image} 
                  alt={selectedFood.title} 
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-medium">{selectedFood.title}</h3>
                  <p className="text-sm text-gray-600">
                    From: {selectedFood.donor.name} • {selectedFood.distance} away
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {selectedFood.quantity}
                  </p>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="request-message" className="text-sm font-medium">
                Message to Donor
              </label>
              <Textarea
                id="request-message"
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                placeholder="Let the donor know when you can pick up, any special requirements, etc."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRequestModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-mm-green-600 hover:bg-mm-green-700"
              onClick={handleSubmitRequest}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ReceiverDashboard;
