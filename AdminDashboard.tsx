
import React from 'react';
import { Users, ShoppingBag, BarChart3, Leaf, Clock, Calendar, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatsCard from '@/components/dashboard/StatsCard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample data for charts
const foodSavedData = [
  { name: 'Jan', amount: 65 },
  { name: 'Feb', amount: 78 },
  { name: 'Mar', amount: 90 },
  { name: 'Apr', amount: 120 },
  { name: 'May', amount: 95 },
  { name: 'Jun', amount: 110 },
  { name: 'Jul', amount: 135 },
];

const donorTypesData = [
  { name: 'Restaurants', value: 45 },
  { name: 'Households', value: 20 },
  { name: 'Canteens', value: 25 },
  { name: 'Caterers', value: 10 },
];

const foodTypeData = [
  { name: 'Prepared Meals', count: 35 },
  { name: 'Bread & Baked', count: 28 },
  { name: 'Fruits & Veg', count: 22 },
  { name: 'Dairy', count: 15 },
  { name: 'Packaged Items', count: 10 },
];

const userGrowthData = [
  { name: 'Feb', donors: 20, receivers: 15 },
  { name: 'Mar', donors: 35, receivers: 25 },
  { name: 'Apr', donors: 40, receivers: 32 },
  { name: 'May', donors: 55, receivers: 40 },
  { name: 'Jun', donors: 65, receivers: 48 },
  { name: 'Jul', donors: 78, receivers: 60 },
];

// Sample data for NGO list
const ngos = [
  { id: 1, name: 'Community Food Bank', address: '123 Main St, City', status: 'verified', foodReclaimed: '235 kg' },
  { id: 2, name: 'Shelter Hope', address: '456 Park Ave, City', status: 'verified', foodReclaimed: '180 kg' },
  { id: 3, name: 'Meals for All', address: '789 Oak Rd, City', status: 'pending', foodReclaimed: '0 kg' },
  { id: 4, name: 'Urban Food Initiative', address: '567 Pine St, City', status: 'verified', foodReclaimed: '325 kg' },
  { id: 5, name: 'Helping Hands', address: '890 Cedar Dr, City', status: 'verified', foodReclaimed: '140 kg' },
];

// Sample data for volunteers
const volunteers = [
  { id: 1, name: 'John Smith', email: 'john@example.com', status: 'verified', pickups: 12 },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'verified', pickups: 8 },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', status: 'pending', pickups: 0 },
  { id: 4, name: 'Emma Wilson', email: 'emma@example.com', status: 'verified', pickups: 15 },
  { id: 5, name: 'David Lee', email: 'david@example.com', status: 'verified', pickups: 6 },
];

// Colors for pie chart
const COLORS = ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Monitor platform metrics and manage users</p>
            </div>
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0 flex items-center gap-2"
            >
              <Download size={16} />
              Export Report
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Users"
              value="362"
              icon={<Users size={18} className="text-mm-green-600" />}
              trend={{ value: 12, isPositive: true }}
            />
            
            <StatsCard
              title="Food Saved (kg)"
              value="1,245"
              icon={<ShoppingBag size={18} className="text-mm-blue-600" />}
              trend={{ value: 8, isPositive: true }}
            />
            
            <StatsCard
              title="People Served"
              value="820"
              icon={<Users size={18} className="text-mm-orange-600" />}
              trend={{ value: 5, isPositive: true }}
            />
            
            <StatsCard
              title="CO₂ Prevented"
              value="4.2T"
              icon={<Leaf size={18} className="text-green-600" />}
              trend={{ value: 3, isPositive: true }}
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="organizations">Organizations</TabsTrigger>
              <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Food Saved Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Food Saved (kg)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={foodSavedData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#22c55e"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* User Growth Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={userGrowthData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="donors" name="Donors" fill="#22c55e" />
                          <Bar dataKey="receivers" name="Recipients" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Donor Types Pie Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Donor Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={donorTypesData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {donorTypesData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Food Types Bar Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Food Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={foodTypeData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={100} />
                          <Tooltip />
                          <Bar dataKey="count" name="Count" fill="#f97316" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Platform Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-mm-green-50 p-4 rounded-lg border border-mm-green-100">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-mm-green-100 rounded-full flex items-center justify-center mr-3">
                          <Clock size={20} className="text-mm-green-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Today's Donations</div>
                          <div className="text-2xl font-bold">24</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-mm-blue-50 p-4 rounded-lg border border-mm-blue-100">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-mm-blue-100 rounded-full flex items-center justify-center mr-3">
                          <Users size={20} className="text-mm-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">New Users (7d)</div>
                          <div className="text-2xl font-bold">48</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-mm-orange-50 p-4 rounded-lg border border-mm-orange-100">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-mm-orange-100 rounded-full flex items-center justify-center mr-3">
                          <Calendar size={20} className="text-mm-orange-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Pending Verifications</div>
                          <div className="text-2xl font-bold">12</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="organizations" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Registered Organizations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Organization</th>
                          <th className="text-left py-3 px-4 font-medium">Address</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-left py-3 px-4 font-medium">Food Reclaimed</th>
                          <th className="text-left py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ngos.map((ngo) => (
                          <tr key={ngo.id} className="border-b">
                            <td className="py-3 px-4">{ngo.name}</td>
                            <td className="py-3 px-4">{ngo.address}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                ngo.status === 'verified' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {ngo.status === 'verified' ? 'Verified' : 'Pending'}
                              </span>
                            </td>
                            <td className="py-3 px-4">{ngo.foodReclaimed}</td>
                            <td className="py-3 px-4">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="volunteers" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Registered Volunteers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Name</th>
                          <th className="text-left py-3 px-4 font-medium">Email</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-left py-3 px-4 font-medium">Pickups Completed</th>
                          <th className="text-left py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {volunteers.map((volunteer) => (
                          <tr key={volunteer.id} className="border-b">
                            <td className="py-3 px-4">{volunteer.name}</td>
                            <td className="py-3 px-4">{volunteer.email}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                volunteer.status === 'verified' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {volunteer.status === 'verified' ? 'Verified' : 'Pending'}
                              </span>
                            </td>
                            <td className="py-3 px-4">{volunteer.pickups}</td>
                            <td className="py-3 px-4">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <div className="text-center py-12 bg-white rounded-lg border">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Reports</h3>
                <p className="text-gray-500 mb-6">Generate detailed reports on platform metrics and impact data.</p>
                <p className="text-gray-400 mb-6">Coming soon! This feature is under development.</p>
                <Button variant="outline">Request Early Access</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
