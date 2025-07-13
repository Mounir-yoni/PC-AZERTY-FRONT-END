'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Package, Truck, CheckCircle, Clock, Eye, Download, Edit, Save, X, Camera, Shield, CreditCard, Bell } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getUser } from '@/lib/storage';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    joinDate: '2023-01-15',
    totalOrders: 12,
    totalSpent: 15847
  });

  const [editData, setEditData] = useState({ ...userData });

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const currentUser = getUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    setUser(currentUser);
    
    // Initialize userData with actual user data
    const initialUserData = {
      firstName: currentUser.name || currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      email: currentUser.email || '',
      phone: currentUser.number || currentUser.phone || '',
      dateOfBirth: currentUser.dateOfBirth || '',
      address: {
        street: currentUser.address || '',
        city: currentUser.address || '',
        state: currentUser.address || '',
        zipCode: currentUser.address || '',
      },
      joinDate: '2023-01-15',
      totalOrders: 12,
      totalSpent: 15847
    };
    
    setUserData(initialUserData);
    setEditData(initialUserData);
    setIsLoading(false);
  }, [router]);

  // Show loading state while checking user
  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f5f5f2' }}>
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7a9e9f] mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Don't render anything if user is not loaded yet
  if (!user) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f5f5f2' }}>
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7a9e9f] mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Redirecting to login...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const orders = [
    {
      id: '#ORD-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 2499,
      items: [
        { name: 'Gaming PC RTX 4080', quantity: 1, price: 2499 }
      ],
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-01-18'
    },
    {
      id: '#ORD-2024-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 758,
      items: [
        { name: 'Gaming Monitor 27" 4K', quantity: 1, price: 599 },
        { name: 'Mechanical Gaming Keyboard', quantity: 1, price: 159 }
      ],
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-01-16'
    },
    {
      id: '#ORD-2024-003',
      date: '2024-01-05',
      status: 'Processing',
      total: 1899,
      items: [
        { name: 'ASUS ROG Gaming Laptop', quantity: 1, price: 1899 }
      ],
      trackingNumber: null,
      estimatedDelivery: '2024-01-20'
    },
    {
      id: '#ORD-2023-045',
      date: '2023-12-20',
      status: 'Delivered',
      total: 348,
      items: [
        { name: 'Gaming Mouse Pro', quantity: 1, price: 89 },
        { name: 'Gaming Headset Wireless', quantity: 1, price: 199 },
        { name: 'Mouse Pad RGB', quantity: 1, price: 29 },
        { name: 'USB Cable', quantity: 1, price: 15 }
      ],
      trackingNumber: 'TRK456789123',
      estimatedDelivery: '2023-12-23'
    },
    {
      id: '#ORD-2023-044',
      date: '2023-12-15',
      status: 'Cancelled',
      total: 299,
      items: [
        { name: 'Corsair RGB RAM 32GB', quantity: 1, price: 299 }
      ],
      trackingNumber: null,
      estimatedDelivery: null
    }
  ];

  const profileSections = [
    { id: 'profile', name: 'Profile Info', icon: User },
    { id: 'orders', name: 'Order History', icon: Package },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ];

  const handleSave = () => {
    setUserData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setEditData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return CheckCircle;
      case 'shipped': return Truck;
      case 'processing': return Clock;
      case 'cancelled': return X;
      default: return Package;
    }
  };

  const ProfileSection = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold" style={{ color: '#2e2e2e' }}>
            Profile Information
          </h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#669999', color: 'white' }}
            >
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#669999', color: 'white' }}
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold"
              style={{ backgroundColor: '#669999' }}
            >
              {userData.firstName[0]}{userData.lastName[0]}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border-2 border-gray-200">
                <Camera className="h-4 w-4" style={{ color: '#669999' }} />
              </button>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold" style={{ color: '#2e2e2e' }}>
              {userData.firstName} {userData.lastName}
            </h3>
            <p className="text-gray-600">Member since {new Date(userData.joinDate).toLocaleDateString()}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm">
              <span style={{ color: '#669999' }}>{userData.totalOrders} Orders</span>
              <span style={{ color: '#669999' }}>${userData.totalSpent.toLocaleString()} Total Spent</span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
              First Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-gray-400" />
                <span>{userData.firstName}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
              Last Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-gray-400" />
                <span>{userData.lastName}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={editData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>{userData.email}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-gray-400" />
                <span>{userData.phone}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
              Date of Birth
            </label>
            {isEditing ? (
              <input
                type="date"
                value={editData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span>{new Date(userData.dateOfBirth).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Address Information */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
            Address Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                Street Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.address.street}
                  onChange={(e) => handleInputChange('address.street', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span>{userData.address.street}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                City
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.address.city}
                  onChange={(e) => handleInputChange('address.city', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span>{userData.address.city}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                State
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.address.state}
                  onChange={(e) => handleInputChange('address.state', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span>{userData.address.state}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                ZIP Code
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.address.zipCode}
                  onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span>{userData.address.zipCode}</span>
                </div>
              )}
            </div>


          </div>
        </div>
      </div>
    </div>
  );

  const OrdersSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#2e2e2e' }}>
          Order History
        </h2>
        
        {/* Order Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: '#669999' }}>
              {orders.length}
            </div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: '#669999' }}>
              {orders.filter(o => o.status === 'Delivered').length}
            </div>
            <div className="text-sm text-gray-600">Delivered</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: '#669999' }}>
              ${orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: '#669999' }}>
              {orders.filter(o => o.status === 'Processing' || o.status === 'Shipped').length}
            </div>
            <div className="text-sm text-gray-600">Active Orders</div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => {
            const StatusIcon = getStatusIcon(order.status);
            return (
              <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#669999' }}
                    >
                      <StatusIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg" style={{ color: '#2e2e2e' }}>
                        {order.id}
                      </h3>
                      <p className="text-gray-600">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-xl font-bold" style={{ color: '#2e2e2e' }}>
                      ${order.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2" style={{ color: '#2e2e2e' }}>Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">{item.name} (x{item.quantity})</span>
                        <span className="font-medium">${item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Details */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-gray-200">
                  <div className="mb-4 sm:mb-0">
                    {order.trackingNumber && (
                      <p className="text-sm text-gray-600">
                        Tracking: <span className="font-medium">{order.trackingNumber}</span>
                      </p>
                    )}
                    {order.estimatedDelivery && (
                      <p className="text-sm text-gray-600">
                        Estimated Delivery: <span className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                      </p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                    {order.status === 'Delivered' && (
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="h-4 w-4" />
                        <span>Invoice</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const SecuritySection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#2e2e2e' }}>
          Security Settings
        </h2>
        
        <div className="space-y-6">
          {/* Change Password */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
              Change Password
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  placeholder="Enter new password"
                />
              </div>
            </div>
            <button 
              className="mt-4 px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#669999', color: 'white' }}
            >
              Update Password
            </button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
              Two-Factor Authentication
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700">Add an extra layer of security to your account</p>
                <p className="text-sm text-gray-500">Status: Not enabled</p>
              </div>
              <button 
                className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#669999', color: 'white' }}
              >
                Enable 2FA
              </button>
            </div>
          </div>

          {/* Login Sessions */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
              Active Sessions
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Current Session</p>
                  <p className="text-sm text-gray-600">Chrome on Windows • San Francisco, CA</p>
                  <p className="text-sm text-gray-500">Last active: Now</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Active</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Mobile App</p>
                  <p className="text-sm text-gray-600">iPhone • San Francisco, CA</p>
                  <p className="text-sm text-gray-500">Last active: 2 hours ago</p>
                </div>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                  Revoke
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationsSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#2e2e2e' }}>
          Notification Preferences
        </h2>
        
        <div className="space-y-6">
          {/* Email Notifications */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
              Email Notifications
            </h3>
            <div className="space-y-4">
              {[
                { id: 'order-updates', label: 'Order Updates', description: 'Get notified about order status changes' },
                { id: 'promotions', label: 'Promotions & Deals', description: 'Receive emails about special offers and discounts' },
                { id: 'newsletter', label: 'Newsletter', description: 'Weekly newsletter with tech news and product updates' },
                { id: 'security', label: 'Security Alerts', description: 'Important security notifications for your account' }
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                      style={{ '--tw-bg-opacity': 1, backgroundColor: '#669999' }}
                    ></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* SMS Notifications */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
              SMS Notifications
            </h3>
            <div className="space-y-4">
              {[
                { id: 'sms-delivery', label: 'Delivery Updates', description: 'SMS alerts for package delivery status' },
                { id: 'sms-security', label: 'Security Codes', description: 'Two-factor authentication codes via SMS' }
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                      style={{ '--tw-bg-opacity': 1, backgroundColor: '#669999' }}
                    ></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return <ProfileSection />;
      case 'orders': return <OrdersSection />;
      case 'security': return <SecuritySection />;
      case 'notifications': return <NotificationsSection />;
      default: return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f2' }}>
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#2e2e2e' }}>
            My Profile
          </h1>
          <p className="text-lg text-gray-600">
            Manage your account settings and view your order history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <nav className="space-y-2">
                {profileSections.map((section) => {
                  const IconComponent = section.icon;
                  const isActive = activeSection === section.id;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      style={{ backgroundColor: isActive ? '#669999' : 'transparent' }}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{section.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderSection()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}