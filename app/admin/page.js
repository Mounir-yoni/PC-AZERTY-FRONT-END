'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
import { gethomepagestatistic, getlast4order, getOrdersDailyStats, getProducts, updateproduct, deleteproduct, createproducts, getCategory, addcategory, updatecategory, deletecategory, getusers, createadmin, getallorders, getorderdetails, updateorder, gettopproduct, getlastcategory, getlastusers, getlastorderin15day } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { showNotification } from '@/components/NotificationSystem';

function ProductsSection({ products, productsLoading, productsError, searchTerm, setSearchTerm, openModal, getStatusColor }) {
  const router = useRouter();
  const [editProduct, setEditProduct] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addProductLoading, setAddProductLoading] = useState(false);
  const [addProductError, setAddProductError] = useState('');

  const filteredProducts = products.filter(product =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Refresh products after edit/delete
  useEffect(() => {
    // This effect is just to trigger a parent refresh if needed
  }, [refreshFlag]);

  const handleView = (product) => {
    router.push(`/product/${product._id || product.id}`);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setEditModalOpen(true);
    setEditError('');
  };

  const handleEditSave = async (updatedProduct) => {
    setEditLoading(true);
    setEditError('');
    try {
      // Only send the fields you want to update
      const updateFields = {
        title: updatedProduct.title,
        price: updatedProduct.price,
        quantity: updatedProduct.quantity
      };
      await updateproduct(updatedProduct._id || updatedProduct.id, updateFields);
      setEditModalOpen(false);
      setEditProduct(null);
      setRefreshFlag(f => !f); // trigger refresh
    } catch (err) {
      setEditError(err.message || 'Failed to update product');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setDeleteLoading(true);
    try {
      await deleteproduct(product._id || product.id);
      setRefreshFlag(f => !f); // trigger refresh
    } catch (err) {
      alert(err.message || 'Failed to delete product');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleAddProduct = () => {
    setAddModalOpen(true);
    setAddProductError('');
  };

  const handleAddProductSave = async (newProduct) => {
    setAddProductLoading(true);
    setAddProductError('');
    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      await createproducts(formData);
      setAddModalOpen(false);
      setRefreshFlag(f => !f); // trigger refresh
      showNotification({
        title: 'Product Created',
        description: 'The product was created successfully.',
        variant: 'default',
      });
    } catch (err) {
      setAddProductError(err.message || 'Failed to create product');
      showNotification({
        title: 'Error',
        description: err.message || 'Failed to create product',
        variant: 'destructive',
      });
    } finally {
      setAddProductLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold" style={{ color: '#2e2e2e' }}>
          Products Management
        </h2>
        <button 
          onClick={handleAddProduct}
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
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
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
          {productsLoading ? (
            <div className="text-center py-8 text-lg text-gray-500">Loading products...</div>
          ) : productsError ? (
            <div className="text-center py-8 text-lg text-red-500">{productsError}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-lg text-gray-400">No products found.</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Product</th>
                  <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Category</th>
                  <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Price</th>
                  <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>quantity</th>
                  <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Status</th>
                  <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Sales</th>
                  <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id || product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium" style={{ color: '#2e2e2e' }}>
                        {product.title}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{product.category?.name || product.category || '-'}</td>
                    <td className="py-3 px-4 font-semibold" style={{ color: '#669999' }}>
                      {product.price ? `${product.price} DA` : '-'}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{product.quantity || product.quantity || '-'}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(product.status || 'Active')}`}>
                        {product.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span>{product.sold ?? '-'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded" onClick={() => handleView(product)}>
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded" onClick={() => handleEdit(product)}>
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded" onClick={() => handleDelete(product)} disabled={deleteLoading}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {editModalOpen && (
          <EditProductModal 
            product={editProduct} 
            onClose={() => setEditModalOpen(false)} 
            onSave={handleEditSave} 
            loading={editLoading}
            error={editError}
          />
        )}
        {addModalOpen && (
          <AddProductModal
            onClose={() => setAddModalOpen(false)}
            onSave={handleAddProductSave}
            loading={addProductLoading}
            error={addProductError}
          />
        )}
      </div>
    </div>
  );
}

function EditProductModal({ product, onClose, onSave, loading, error }) {
  const [form, setForm] = useState({ ...product });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
        <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title || ''} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Title" />
          <input name="price" value={form.price || ''} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Price" type="number" />
          <input name="quantity" value={form.quantity || ''} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="quantity" type="number" />
          {/* Add more fields as needed */}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddProductModal({ onClose, onSave, loading, error }) {
  const [form, setForm] = useState({
    title: '',
    quantity: '',
    price: '',
    priceAfterDiscount: '',
    description: '',
    category: '',
    imagecover: null, // will hold the File object
    Partname: ''
  });
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    async function fetchCategories() {
      setCategoriesLoading(true);
      setCategoriesError('');
      try {
        const data = await getCategory();
        setCategories(data.data || []);
      } catch (err) {
        setCategoriesError('Failed to load categories');
      } finally {
        setCategoriesLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm(f => ({ ...f, [name]: files && files.length > 0 ? files[0] : null }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    // Clear file input after submit
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
        <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Title" required />
          <input name="quantity" value={form.quantity} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Quantity" type="number" required />
          <input name="price" value={form.price} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Price" type="number" required />
          <input name="priceAfterDiscount" value={form.priceAfterDiscount} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Price After Discount" type="number" />
          <input name="description" value={form.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Description" />
          {/* Category select */}
          <select name="category" value={form.category} onChange={handleChange} className="w-full border px-3 py-2 rounded" required>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id || cat.id} value={cat._id || cat.id}>{cat.name}</option>
            ))}
          </select>
          {categoriesLoading && <div className="text-gray-500 text-sm">Loading categories...</div>}
          {categoriesError && <div className="text-red-500 text-sm">{categoriesError}</div>}
          <input
            name="imagecover"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            ref={fileInputRef}
          />
          <input name="Partname" value={form.Partname} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Part Name" />
          {/* Add more fields as needed */}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [stats, setStats] = useState([
    { title: 'Total Revenue', value: '...', change: '', icon: DollarSign, color: '#669999' },
    { title: 'Total Orders', value: '...', change: '', icon: ShoppingCart, color: '#10b981' },
    { title: 'Total Products', value: '...', change: '', icon: Package, color: '#f59e0b' },
    { title: 'Total Users', value: '...', change: '', icon: Users, color: '#ef4444' }
  ]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState('');
  const [recentOrders, setRecentOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState('');
  const [ordersChartData, setOrdersChartData] = useState([]);
  const [ordersChartLoading, setOrdersChartLoading] = useState(true);
  const [ordersChartError, setOrdersChartError] = useState('');
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchStats() {
      setStatsLoading(true);
      setStatsError('');
      try {
        const data = await gethomepagestatistic();
        // Assume data has: totalRevenue, totalOrders, totalProducts, totalUsers, and optionally change fields
        console.log(data.data.revenue.thisMonth)
        setStats([
          { title: 'Total Revenue', value: data.data.revenue.thisMonth? `${data.data.revenue.thisMonth} DA` : '0', change: data.data.revenue.percentChange || 0, icon: DollarSign, color: '#669999' },
          { title: 'Total Orders', value: data.data.orders.thisMonth ? data.data.orders.thisMonth.toLocaleString() : '0', change: data.data.orders.percentChange || 0, icon: ShoppingCart, color: '#10b981' },
          { title: 'Total Products', value: data.data.products.thisMonth ? data.data.products.thisMonth.toLocaleString() : '0', change: data.data.products.percentChange || 0, icon: Package, color: '#f59e0b' },
          { title: 'Total Users', value: data.data.users.thisMonth ? data.data.users.thisMonth.toLocaleString() : '0', change: data.data.users.percentChange || 0, icon: Users, color: '#ef4444' }
        ]);
      } catch (err) {
        setStatsError('Failed to load statistics');
      } finally {
        setStatsLoading(false);
      }
    }
    fetchStats();
  }, []);

  useEffect(() => {
    async function fetchOrders() {
      setOrdersLoading(true);
      setOrdersError('');
      try {
        const data = await getlast4order();
        setRecentOrders(data.data || []);
      } catch (err) {
        setOrdersError('Failed to load recent orders');
      } finally {
        setOrdersLoading(false);
      }
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    async function fetchOrdersChart() {
      setOrdersChartLoading(true);
      setOrdersChartError('');
      try {
        const data = await getOrdersDailyStats();
        // Assume data.data is an array: [{ date: '2024-06-01', count: 5 }, ...]
        setOrdersChartData(data.data || []);
      } catch (err) {
        setOrdersChartError('Failed to load orders chart');
      } finally {
        setOrdersChartLoading(false);
      }
    }
    fetchOrdersChart();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setProductsLoading(true);
      setProductsError('');
      try {
        const data = await getProducts();
        setProducts(data.data || []);
      } catch (err) {
        setProductsError('Failed to load products');
      } finally {
        setProductsLoading(false);
      }
    }
    fetchProducts();
  }, []);

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
    switch (status?.toLowerCase()) {
      case 'delivered': case 'active': return 'text-green-600 bg-green-100';
      case 'processing': case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'pending': case 'low quantity': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': case 'out of quantity': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'refunded': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const DashboardSection = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsLoading ? (
          <div className="col-span-4 text-center py-8 text-lg text-gray-500">Loading statistics...</div>
        ) : statsError ? (
          <div className="col-span-4 text-center py-8 text-lg text-red-500">{statsError}</div>
        ) : (
          stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                    <p className="text-xl font-bold mt-1" style={{ color: '#4E8786' }}>
                      {stat.value}
                    </p>
                    <p className={`text-sm mt-1 font-semibold ${stat.change > 0 ? 'text-green-600' : stat.change < 0 ? 'text-red-600' : 'text-gray-500'}`}
                      >
                      {stat.change > 0 && '+'}{stat.change}% from last month
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
          })
        )}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Orders Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#2e2e2e' }}>
            Orders in the Last 7 Days
          </h3>
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
            {ordersChartLoading ? (
              <div className="text-gray-500">Loading chart...</div>
            ) : ordersChartError ? (
              <div className="text-red-500">{ordersChartError}</div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={ordersChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#669999" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
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
            {ordersLoading ? (
              <div className="text-center py-8 text-lg text-gray-500">Loading recent orders...</div>
            ) : ordersError ? (
              <div className="text-center py-8 text-lg text-red-500">{ordersError}</div>
            ) : recentOrders.length === 0 ? (
              <div className="text-center py-8 text-lg text-gray-400">No recent orders found.</div>
            ) : (
              recentOrders.map((order) => (
                <div key={order._id || order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium" style={{ color: '#2e2e2e' }}>
                      {order.customer?.name || order.customerName || order.user?.name || 'Unknown Customer'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold" style={{ color: '#669999' }}>
                      {order.amount ? `${order.amount} DA` : (order.totalValue ? `${order.totalValue} DA` : '')}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {order.date ? new Date(order.date).toLocaleDateString() : (order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '')}
                    </div>
                  </div>
                </div>
              ))
            )}
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

  function UsersSection() {
    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(true);
    const [usersError, setUsersError] = useState('');
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalError, setModalError] = useState('');
    const [refreshFlag, setRefreshFlag] = useState(false);

    useEffect(() => {
      async function fetchUsers() {
        setUsersLoading(true);
        setUsersError('');
        try {
          const data = await getusers();
          setUsers(data.data || []);
        } catch (err) {
          setUsersError('Failed to load users');
        } finally {
          setUsersLoading(false);
        }
      }
      fetchUsers();
    }, [refreshFlag]);

    const handleAdd = () => {
      setAddModalOpen(true);
      setModalError('');
    };

    const handleAddSave = async (form) => {
      setModalLoading(true);
      setModalError('');
      try {
        await createadmin(form);
        setAddModalOpen(false);
        setRefreshFlag(f => !f);
        showNotification({
          title: 'Admin Created',
          description: 'The admin user was created successfully.',
          variant: 'default',
        });
      } catch (err) {
        setModalError(err.message || 'Failed to add admin');
        showNotification({
          title: 'Error',
          description: err.message || 'Failed to add admin',
          variant: 'destructive',
        });
      } finally {
        setModalLoading(false);
      }
    };

    return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold" style={{ color: '#2e2e2e' }}>
            Users Management
        </h2>
        <button 
            onClick={handleAdd}
          className="px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center space-x-2"
          style={{ backgroundColor: '#669999' }}
        >
            <UserPlus className="h-4 w-4" />
            <span>Add Admin</span>
        </button>
      </div>
        {usersLoading ? (
          <div className="text-center py-8 text-lg text-gray-500">Loading users...</div>
        ) : usersError ? (
          <div className="text-center py-8 text-lg text-red-500">{usersError}</div>
        ) : (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>User</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Email</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Role</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Status</th>
              </tr>
            </thead>
            <tbody>
                  {users.map((user) => (
                    <tr key={user._id || user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium" style={{ color: '#2e2e2e' }}>
                          {user.name}
                    </div>
                  </td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${user.role === 'Admin' ? 'text-purple-600 bg-purple-100' : user.role === 'Manager' ? 'text-blue-600 bg-blue-100' : 'text-gray-600 bg-gray-100'}`}>
                          {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${user.status === 'Active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'}`}>
                          {user.status}
                        </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        )}
        {addModalOpen && (
          <AddAdminModal
            onClose={() => setAddModalOpen(false)}
            onSave={handleAddSave}
            loading={modalLoading}
            error={modalError}
          />
        )}
    </div>
  );
  }

  function CategoriesSection() {
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState('');
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalError, setModalError] = useState('');
    const [refreshFlag, setRefreshFlag] = useState(false);

    useEffect(() => {
      async function fetchCategories() {
        setCategoriesLoading(true);
        setCategoriesError('');
        try {
          const data = await getCategory();
          setCategories(data.data || []);
        } catch (err) {
          setCategoriesError('Failed to load categories');
        } finally {
          setCategoriesLoading(false);
        }
      }
      fetchCategories();
    }, [refreshFlag]);

    const handleAdd = () => {
      setEditCategory(null);
      setAddModalOpen(true);
      setModalError('');
    };

    const handleEdit = (category) => {
      setEditCategory(category);
      setEditModalOpen(true);
      setModalError('');
    };

    const handleDelete = async (category) => {
      if (!window.confirm('Are you sure you want to delete this category?')) return;
      setModalLoading(true);
      try {
        await deletecategory(category._id || category.id);
        setRefreshFlag(f => !f);
      } catch (err) {
        alert(err.message || 'Failed to delete category');
      } finally {
        setModalLoading(false);
      }
    };

    const handleAddSave = async (form) => {
      setModalLoading(true);
      setModalError('');
      try {
        await addcategory(form);
        setAddModalOpen(false);
        setRefreshFlag(f => !f);
        showNotification({
          title: 'Category Created',
          description: 'The category was created successfully.',
          variant: 'default',
        });
      } catch (err) {
        setModalError(err.message || 'Failed to add category');
        showNotification({
          title: 'Error',
          description: err.message || 'Failed to add category',
          variant: 'destructive',
        });
      } finally {
        setModalLoading(false);
      }
    };

    const handleEditSave = async (form) => {
      setModalLoading(true);
      setModalError('');
      try {
        await updatecategory(form, editCategory._id || editCategory.id);
        setEditModalOpen(false);
        setEditCategory(null);
        setRefreshFlag(f => !f);
      } catch (err) {
        setModalError(err.message || 'Failed to update category');
      } finally {
        setModalLoading(false);
      }
    };

    return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold" style={{ color: '#2e2e2e' }}>
            Categories Management
        </h2>
        <button 
            onClick={handleAdd}
          className="px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center space-x-2"
          style={{ backgroundColor: '#669999' }}
        >
            <FolderPlus className="h-4 w-4" />
            <span>Add Category</span>
        </button>
      </div>
        {categoriesLoading ? (
          <div className="text-center py-8 text-lg text-gray-500">Loading categories...</div>
        ) : categoriesError ? (
          <div className="text-center py-8 text-lg text-red-500">{categoriesError}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category._id || category.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold" style={{ color: '#2e2e2e' }}>
                    {category.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-green-600 hover:bg-green-50 rounded" onClick={() => handleEdit(category)}>
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded" onClick={() => handleDelete(category)} disabled={modalLoading}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.products?.length || category.products || 0} products
                  </span>
                  <span className="text-sm font-medium" style={{ color: '#669999' }}>
                    View Products
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        {addModalOpen && (
          <CategoryModal
            onClose={() => setAddModalOpen(false)}
            onSave={handleAddSave}
            loading={modalLoading}
            error={modalError}
            initialData={null}
          />
        )}
        {editModalOpen && (
          <CategoryModal
            onClose={() => setEditModalOpen(false)}
            onSave={handleEditSave}
            loading={modalLoading}
            error={modalError}
            initialData={editCategory}
          />
        )}
      </div>
    );
  }

  function CategoryModal({ onClose, onSave, loading, error, initialData }) {
    const [form, setForm] = useState({
      name: initialData?.name || '',
      description: initialData?.description || ''
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm(f => ({ ...f, [name]: value }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(form);
    };
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
          <h3 className="text-xl font-semibold mb-4">{initialData ? 'Edit Category' : 'Add Category'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Category Name" required />
            <input name="description" value={form.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Description" />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function AddAdminModal({ onClose, onSave, loading, error }) {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin', status: 'Active' });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm(f => ({ ...f, [name]: value }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(form);
    };
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
          <h3 className="text-xl font-semibold mb-4">Add Admin</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Name" required />
            <input name="email" value={form.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Email" type="email" required />
            <input name="password" value={form.password} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Password" type="password" required />
            <select name="role" value={form.role} onChange={handleChange} className="w-full border px-3 py-2 rounded">
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="superadmin">superadmin</option>
            </select>
            <select name="status" value={form.status} onChange={handleChange} className="w-full border px-3 py-2 rounded">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function OrdersSection() {
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [ordersError, setOrdersError] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDetailsModal, setOrderDetailsModal] = useState(false);
    const [orderDetailsLoading, setOrderDetailsLoading] = useState(false);
    const [orderDetailsError, setOrderDetailsError] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState('');
    const [refreshFlag, setRefreshFlag] = useState(false);

    useEffect(() => {
      async function fetchOrders() {
        setOrdersLoading(true);
        setOrdersError('');
        try {
          const data = await getallorders();
          setOrders(data.data || []);
        } catch (err) {
          setOrdersError('Failed to load orders');
        } finally {
          setOrdersLoading(false);
        }
      }
      fetchOrders();
    }, [refreshFlag]);

    const handleViewOrder = async (order) => {
      setOrderDetailsModal(true);
      setOrderDetailsLoading(true);
      setOrderDetailsError('');
      try {
        const data = await getorderdetails(order._id || order.id);
        setSelectedOrder(data.data || data);
      } catch (err) {
        setOrderDetailsError('Failed to load order details');
      } finally {
        setOrderDetailsLoading(false);
      }
    };

    const handleUpdateOrder = async (orderId, updateData) => {
      setUpdateLoading(true);
      setUpdateError('');
      try {
        await updateorder(orderId, updateData);
        setOrderDetailsModal(false);
        setSelectedOrder(null);
        setRefreshFlag(f => !f); // Refresh orders list
      } catch (err) {
        setUpdateError(err.message || 'Failed to update order');
      } finally {
        setUpdateLoading(false);
      }
    };



    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold" style={{ color: '#2e2e2e' }}>
            Orders Management
          </h2>
        </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="overflow-x-auto">
            {ordersLoading ? (
              <div className="text-center py-8 text-lg text-gray-500">Loading orders...</div>
            ) : ordersError ? (
              <div className="text-center py-8 text-lg text-red-500">{ordersError}</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8 text-lg text-gray-400">No orders found.</div>
            ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Customer</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Total</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Status</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Payment</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Date</th>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: '#2e2e2e' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
                  {orders.map((order) => (
                    <tr key={order._id || order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium" style={{ color: '#2e2e2e' }}>
                          #{order._id?.slice(-8) || order.id?.slice(-8) || 'N/A'}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                        <div>
                          <div className="font-medium" style={{ color: '#2e2e2e' }}>
                            {order.user?.name || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-500">
                            { order.user?.email || order.phone || 'No contact'}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold" style={{ color: '#669999' }}>
                        {order.totalValue ? `${order.totalValue} DA` : (order.amount ? `${order.amount} DA` : '-')}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status || 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus || 'Pending'}
                    </span>
                  </td>
                      <td className="py-3 px-4 text-gray-600">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : (order.date ? new Date(order.date).toLocaleDateString() : '-')}
                  </td>
                  <td className="py-3 px-4">
                        <button 
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded" 
                          onClick={() => handleViewOrder(order)}
                        >
                        <Eye className="h-4 w-4" />
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            )}
        </div>
      </div>

        {/* Order Details Modal */}
        {orderDetailsModal && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => {
              setOrderDetailsModal(false);
              setSelectedOrder(null);
              setOrderDetailsError('');
            }}
            onUpdate={handleUpdateOrder}
            loading={orderDetailsLoading}
            updateLoading={updateLoading}
            error={orderDetailsError}
            updateError={updateError}
          />
        )}
    </div>
  );
  }

  function OrderDetailsModal({ order, onClose, onUpdate, loading, updateLoading, error, updateError }) {
    const [form, setForm] = useState({
      status: order?.status || 'pending',
      paymentStatus: order?.paymentStatus || 'pending'
    });

    useEffect(() => {
      if (order) {
        setForm({
          status: order.status || 'pending',
          paymentStatus: order.paymentStatus || 'pending'
        });
      }
    }, [order]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onUpdate(order._id || order.id, form);
    };

    if (loading) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full p-6">
            <div className="text-center py-8 text-lg text-gray-500">Loading order details...</div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full p-6">
            <div className="text-center py-8 text-lg text-red-500">{error}</div>
            <div className="flex justify-end">
              <button onClick={onClose} className="px-4 py-2 border rounded">Close</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold" style={{ color: '#2e2e2e' }}>
                Order Details - #{order?._id?.slice(-8) || order?.id?.slice(-8) || 'N/A'}
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>

            {
            order && (
    <div className="space-y-6">
                {/* Customer Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3" style={{ color: '#2e2e2e' }}>Customer Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{ order.user.name || 'Unknown'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{ order.user.email || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{order.phone  || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">{order.user.address || order.address || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-medium">
                        {order.orderDate ? new Date(order.orderDate).toLocaleString() : (order.date ? new Date(order.date).toLocaleString() : 'N/A')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Status Update */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3" style={{ color: '#2e2e2e' }}>Update Order Status</h4>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Order Status</label>
                        <select 
                          name="status" 
                          value={form.status} 
                          onChange={handleChange}
                          className="w-full border px-3 py-2 rounded"
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Payment Status</label>
                        <select 
                          name="paymentStatus" 
                          value={form.paymentStatus} 
                          onChange={handleChange}
                          className="w-full border px-3 py-2 rounded"
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </div>
                    </div>
                    {updateError && <div className="text-red-500 text-sm">{updateError}</div>}
                    <div className="flex justify-end space-x-2">
        <button 
                        type="button" 
                        onClick={onClose} 
                        className="px-4 py-2 border rounded"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-green-600 text-white rounded" 
                        disabled={updateLoading}
                      >
                        {updateLoading ? 'Updating...' : 'Update Order'}
        </button>
                    </div>
                  </form>
      </div>

                {/* Products */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3" style={{ color: '#2e2e2e' }}>Ordered Products</h4>
                  <div className="space-y-3">
                    {order.products?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            {item.product?.imagecover ? (
                              <img 
                                src={item.product.imagecover} 
                                alt={item.product.title} 
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <Package className="h-6 w-6 text-gray-400" />
                            )}
              </div>
                          <div>
                            <p className="font-medium">{item.product?.title || 'Unknown Product'}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold" style={{ color: '#669999' }}>
                            {item.price ? `${item.price} DA` : '-'}
                          </p>
                          <p className="text-sm text-gray-600">
                            Total: {item.price && item.quantity ? `${item.price * item.quantity} DA` : '-'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3" style={{ color: '#2e2e2e' }}>Order Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{order.totalValue ? `${order.totalValue} DA` : (order.amount ? `${order.amount} DA` : '-')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                        {order.status || 'Pending'}
              </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus || 'Pending'}
              </span>
            </div>
          </div>
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
  );
  }

  const AnalyticsSection = () => {
    const [topProducts, setTopProducts] = useState([]);
    const [topProductsLoading, setTopProductsLoading] = useState(true);
    const [topProductsError, setTopProductsError] = useState('');
    const [lastCategories, setLastCategories] = useState([]);
    const [lastCategoriesLoading, setLastCategoriesLoading] = useState(true);
    const [lastCategoriesError, setLastCategoriesError] = useState('');
    const [lastUsers, setLastUsers] = useState([]);
    const [lastUsersLoading, setLastUsersLoading] = useState(true);
    const [lastUsersError, setLastUsersError] = useState('');
    const [orders15Days, setOrders15Days] = useState([]);
    const [orders15DaysLoading, setOrders15DaysLoading] = useState(true);
    const [orders15DaysError, setOrders15DaysError] = useState('');

    useEffect(() => {
      async function fetchTopProducts() {
        setTopProductsLoading(true);
        setTopProductsError('');
        try {
          const data = await gettopproduct();
          setTopProducts(data.data || []);
        } catch (err) {
          setTopProductsError('Failed to load top products');
        } finally {
          setTopProductsLoading(false);
        }
      }
      fetchTopProducts();
    }, []);

    useEffect(() => {
      async function fetchLastCategories() {
        setLastCategoriesLoading(true);
        setLastCategoriesError('');
        try {
          const data = await getlastcategory();
          setLastCategories(data.data || []);
        } catch (err) {
          setLastCategoriesError('Failed to load categories');
        } finally {
          setLastCategoriesLoading(false);
        }
      }
      fetchLastCategories();
    }, []);

    useEffect(() => {
      async function fetchLastUsers() {
        setLastUsersLoading(true);
        setLastUsersError('');
        try {
          const data = await getlastusers();
          setLastUsers(data.data || []);
        } catch (err) {
          setLastUsersError('Failed to load users');
        } finally {
          setLastUsersLoading(false);
        }
      }
      fetchLastUsers();
    }, []);

    useEffect(() => {
      async function fetchOrders15Days() {
        setOrders15DaysLoading(true);
        setOrders15DaysError('');
        try {
          const data = await getlastorderin15day();
          setOrders15Days(data.data || []);
        } catch (err) {
          setOrders15DaysError('Failed to load 15-day orders');
        } finally {
          setOrders15DaysLoading(false);
        }
      }
      fetchOrders15Days();
    }, []);

    return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold" style={{ color: '#2e2e2e' }}>
        Analytics & Reports
      </h2>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Selling Products */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
            Top Selling Products
          </h3>
          <div className="space-y-3">
              {topProductsLoading ? (
                <div className="text-gray-500 text-sm">Loading top products...</div>
              ) : topProductsError ? (
                <div className="text-red-500 text-sm">{topProductsError}</div>
              ) : topProducts.length === 0 ? (
                <div className="text-gray-400 text-sm">No top products found.</div>
              ) : (
                topProducts.slice(0, 5).map((product, index) => (
                  <div key={product._id || product.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: '#669999' }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium" style={{ color: '#2e2e2e' }}>
                        {product.title || product.name}
                  </span>
                </div>
                <span className="text-sm font-semibold" style={{ color: '#669999' }}>
                      {product.sold || product.sales || '-'}
                </span>
              </div>
                ))
              )}
          </div>
        </div>
          {/* Revenue by Category */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
            Revenue by Category
          </h3>
          <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
              {lastCategoriesLoading ? (
                <div className="text-gray-500 text-sm">Loading categories...</div>
              ) : lastCategoriesError ? (
                <div className="text-red-500 text-sm">{lastCategoriesError}</div>
              ) : lastCategories.length === 0 ? (
                <div className="text-gray-400 text-sm">No categories found.</div>
              ) : (
                <div className="w-full">
                  {lastCategories.map((cat, idx) => (
                    <div key={cat._id || cat.id} className="flex items-center justify-between py-1 px-2">
                      <span className="text-sm font-medium" style={{ color: '#2e2e2e' }}>{cat.name}</span>
                      <span className="text-sm font-semibold" style={{ color: '#669999' }}>{cat.revenue ? `${cat.revenue} DA` : '-'}</span>
            </div>
                  ))}
          </div>
              )}
        </div>
          </div>
          {/* Customer Growth */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
            Customer Growth
          </h3>
            <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center overflow-y-auto">
              {lastUsersLoading ? (
                <div className="text-gray-500 text-sm">Loading users...</div>
              ) : lastUsersError ? (
                <div className="text-red-500 text-sm">{lastUsersError}</div>
              ) : lastUsers.length === 0 ? (
                <div className="text-gray-400 text-sm">No recent users found.</div>
              ) : (
                <div className="w-full">
                  {lastUsers.map((user, idx) => (
                    <div key={user._id || user.id} className="flex items-center justify-between py-1 px-2">
                      <span className="text-sm font-medium" style={{ color: '#2e2e2e' }}>{user.name}</span>
                      <span className="text-sm text-gray-500">{user.email}</span>
            </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: '#2e2e2e' }}>
          Detailed Analytics
        </h3>
        <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
            {orders15DaysLoading ? (
              <div className="text-gray-500">Loading 15-day orders chart...</div>
            ) : orders15DaysError ? (
              <div className="text-red-500">{orders15DaysError}</div>
            ) : orders15Days.length === 0 ? (
              <div className="text-gray-400">No order data for last 15 days.</div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={orders15Days} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#669999" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
        </div>
      </div>
    </div>
  );
  };

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
                      quantity Quantity
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
      case 'products': return <ProductsSection products={products} productsLoading={productsLoading} productsError={productsError} searchTerm={searchTerm} setSearchTerm={setSearchTerm} openModal={openModal} getStatusColor={getStatusColor} />;
      case 'users': return <UsersSection />;
      case 'categories': return <CategoriesSection />;
      case 'analytics': return <AnalyticsSection />;
      case 'orders': return <OrdersSection />;
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