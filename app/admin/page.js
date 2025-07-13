'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Settings,
  Bell,
  Calendar,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserPlus,
  FolderPlus,
  Tag,
  Image,
  Save,
  X
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Sample data
  const stats = [
    { title: 'Total Revenue', value: '$124,563', change: '+12.5%', icon: DollarSign, color: '#669999' },
    { title: 'Total Orders', value: '1,234', change: '+8.2%', icon: ShoppingCart, color: '#10b981' },
    { title: 'Total Products', value: '456', change: '+3.1%', icon: Package, color: '#f59e0b' },
    { title: 'Total Users', value: '2,891', change: '+15.3%', icon: Users, color: '#ef4444' }
  ];

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', product: 'Gaming PC RTX 4080', amount: '$2,499', status: 'Completed', date: '2024-01-15' },
    { id: '#12346', customer: 'Jane Smith', product: 'MacBook Pro M3', amount: '$2,499', status: 'Processing', date: '2024-01-15' },
    { id: '#12347', customer: 'Mike Johnson', product: 'RTX 4090', amount: '$1,599', status: 'Shipped', date: '2024-01-14' },
    { id: '#12348', customer: 'Sarah Wilson', product: 'Gaming Monitor', amount: '$599', status: 'Pending', date: '2024-01-14' }
  ];

  const products = [
    { id: 1, name: 'Gaming PC RTX 4080', category: 'Gaming PCs', price: '$2,499', stock: 12, status: 'Active', sales: 156 },
    { id: 2, name: 'MacBook Pro M3', category: 'Laptops', price: '$2,499', stock: 8, status: 'Active', sales: 203 },
    { id: 3, name: 'RTX 4090', category: 'Components', price: '$1,599', stock: 5, status: 'Low Stock', sales: 89 },
    { id: 4, name: 'Gaming Monitor', category: 'Monitors', price: '$599', stock: 0, status: 'Out of Stock', sales: 67 }
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', orders: 5, joined: '2023-12-01', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', orders: 12, joined: '2023-11-15', status: 'Active' },
    { id: 3, name: 'Mike Admin', email: 'mike@techhub.com', role: 'Admin', orders: 0, joined: '2023-01-01', status: 'Active' },
    { id: 4, name: 'Sarah Manager', email: 'sarah@techhub.com', role: 'Manager', orders: 0, joined: '2023-06-01', status: 'Active' }
  ];

  const categories = [
    { id: 1, name: 'Gaming PCs', products: 24, description: 'High-performance gaming computers' },
    { id: 2, name: 'Laptops', products: 32, description: 'Portable computing solutions' },
    { id: 3, name: 'Components', products: 45, description: 'PC parts and components' },
    { id: 4, name: 'Peripherals', products: 28, description: 'Gaming and office peripherals' }
  ];

  const adminSections = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'orders', name: 'Orders', icon: ShoppingCart },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'categories', name: 'Categories', icon: Tag },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': case 'active': return 'text-green-600 bg-green-100';
      case 'processing': case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'pending': case 'low stock': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': case 'out of stock': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const DashboardSection = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1" style={{ color: '#2e2e2e' }}>
                    {stat.value}
                  </p>
                  <p className="text-sm mt-1" style={{ color: stat.color }}>
                    {stat.change} from last month
                  </p>
                </div>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <IconComponent className="h-6 w-6" style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#2e2e2e' }}>
            Sales Overview
          </h3>
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 mx-auto mb-4" style={{ color: '#669999' }} />
              <p className="text-gray-600">Sales Chart Placeholder</p>
              <p className="text-sm text-gray-500">Revenue: $124,563 this month</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold" style={{ color: '#2e2e2e' }}>
              Recent Orders
            </h3>
            <button 
              className="text-sm font-medium hover:underline"
              style={{ color: '#669999' }}
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium" style={{ color: '#2e2e2e' }}>
                    {order.customer}
                  </p>
                  <p className="text-sm text-gray-600">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold" style={{ color: '#669999' }}>
                    {order.amount}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: '#2e2e2e' }}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => openModal('product')}
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            <Plus className="h-6 w-6" style={{ color: '#669999' }} />
            <span className="font-medium" style={{ color: '#2e2e2e' }}>Add New Product</span>
          </button>
          <button 
            onClick={() => openModal('category')}
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            <FolderPlus className="h-6 w-6" style={{ color: '#669999' }} />
            <span className="font-medium" style={{ color: '#2e2e2e' }}>Add Category</span>
          </button>
          <button 
            onClick={() => openModal('admin')}
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            <UserPlus className="h-6 w-6" style={{ color: '#669999' }} />
            <span className="font-medium" style={{ color: '#2e2e2e' }}>Add Admin</span>
          </button>
        </div>
      </div>
    </div>
  );

  const ProductsSection = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold" style={{ color: '#2e2e2e' }}>
          Products Management
        </h2>
        <button 
          onClick={() => openModal('product')}
          className="px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center space-x-2"
          style={{ backgroundColor: '#669999' }}
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Product</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Category</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Price</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Stock</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Status</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Sales</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium" style={{ color: '#2e2e2e' }}>
                      {product.name}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{product.category}</td>
                  <td className="py-3 px-4 font-semibold" style={{ color: '#669999' }}>
                    {product.price}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{product.stock}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{product.sales}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const UsersSection = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold" style={{ color: '#2e2e2e' }}>
          Users Management
        </h2>
        <button 
          onClick={() => openModal('admin')}
          className="px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center space-x-2"
          style={{ backgroundColor: '#669999' }}
        >
          <UserPlus className="h-4 w-4" />
          <span>Add Admin</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>User</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Email</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Role</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Orders</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Joined</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Status</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium" style={{ color: '#2e2e2e' }}>
                      {user.name}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.role === 'Admin' ? 'text-purple-600 bg-purple-100' :
                      user.role === 'Manager' ? 'text-blue-600 bg-blue-100' :
                      'text-gray-600 bg-gray-100'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.orders}</td>
                  <td className="py-3 px-4 text-gray-600">{user.joined}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const CategoriesSection = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold" style={{ color: '#2e2e2e' }}>
          Categories Management
        </h2>
        <button 
          onClick={() => openModal('category')}
          className="px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center space-x-2"
          style={{ backgroundColor: '#669999' }}
        >
          <FolderPlus className="h-4 w-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: '#2e2e2e' }}>
                {category.name}
              </h3>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {category.products} products
              </span>
              <span className="text-sm font-medium" style={{ color: '#669999' }}>
                View Products
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AnalyticsSection = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold" style={{ color: '#2e2e2e' }}>
        Analytics & Reports
      </h2>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
            Top Selling Products
          </h3>
          <div className="space-y-3">
            {products.slice(0, 3).map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: '#669999' }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium" style={{ color: '#2e2e2e' }}>
                    {product.name}
                  </span>
                </div>
                <span className="text-sm font-semibold" style={{ color: '#669999' }}>
                  {product.sales}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
            Revenue by Category
          </h3>
          <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2" style={{ color: '#669999' }} />
              <p className="text-sm text-gray-600">Chart Placeholder</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
            Customer Growth
          </h3>
          <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" style={{ color: '#669999' }} />
              <p className="text-sm text-gray-600">Growth Chart</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: '#2e2e2e' }}>
          Detailed Analytics
        </h3>
        <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-16 w-16 mx-auto mb-4" style={{ color: '#669999' }} />
            <p className="text-gray-600 font-medium">Advanced Analytics Dashboard</p>
            <p className="text-sm text-gray-500">Revenue, Orders, and Performance Metrics</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Modal = () => {
    if (!showModal) return null;

    const getModalContent = () => {
      switch (modalType) {
        case 'product':
          return (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#2e2e2e' }}>
                Add New Product
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                      Category
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent">
                      <option>Select category</option>
                      <option>Gaming PCs</option>
                      <option>Laptops</option>
                      <option>Components</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                      Price
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    Description
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Product description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    Product Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-600">Click to upload images</p>
                  </div>
                </div>
              </form>
            </div>
          );
        case 'category':
          return (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#2e2e2e' }}>
                Add New Category
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    Description
                  </label>
                  <textarea
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Category description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    Category Icon
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-600">Upload category icon</p>
                  </div>
                </div>
              </form>
            </div>
          );
        case 'admin':
          return (
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#2e2e2e' }}>
                Add New Admin
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="admin@techhub.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    Role
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent">
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    Permissions
                  </label>
                  <div className="space-y-2">
                    {['Manage Products', 'Manage Orders', 'Manage Users', 'View Analytics'].map((permission) => (
                      <label key={permission} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div></div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {getModalContent()}
            
            <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                style={{ backgroundColor: '#669999' }}
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardSection />;
      case 'products': return <ProductsSection />;
      case 'users': return <UsersSection />;
      case 'categories': return <CategoriesSection />;
      case 'analytics': return <AnalyticsSection />;
      case 'orders': return <ProductsSection />; // Placeholder
      case 'settings': return <AnalyticsSection />; // Placeholder
      default: return <DashboardSection />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f2' }}>
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#2e2e2e' }}>
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage your store, products, and customers from one central location
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <nav className="space-y-2">
                {adminSections.map((section) => {
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
          <div className="lg:col-span-4">
            {renderSection()}
          </div>
        </div>
      </main>

      <Footer />
      <Modal />
    </div>
  );
}