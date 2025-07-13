'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, ShoppingCart, Heart, ChevronDown } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getProducts , getCategory } from '@/lib/api';
export default function ProductsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // Map sortBy to backend sort parameters
  const sortMap = {
    'featured': '-rating', // or whatever your backend expects for featured
    'price-low': 'price',
    'price-high': '-price',
    'rating': '-rating',
    'newest': '-createdAt',
    'name': 'title', // or 'name' if that's the field
  };

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const sortParam = sortMap[sortBy] || '-rating';
        const data = await getProducts(sortParam);
        console.log(data.data)
        setProducts(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [sortBy]);

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategory();
        let cats = Array.isArray(data.data) ? data.data : [];
        // Add 'All Products' as the first category
        cats = [{ _id: 'all', name: 'All Products' }, ...cats];
        setCategories(cats);
      } catch (err) {
        setCategories([{ _id: 'all', name: 'All Products' }]);
      }
    }
    fetchCategories();
  }, []);
  console.log("prod")
  console.log(products)
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'name', label: 'Name A-Z' }
  ];

  // In the filter logic, treat 'all' as no filter
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' ||
      (product.category === selectedCategory || product.category?._id === selectedCategory || product.category?.slug === selectedCategory);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = (product.title || product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Best Seller': return '#4E8786';
      case 'New': return '#10b981';
      case 'Hot Deal': return '#ef4444';
      case 'Popular': return '#f59e0b';
      default: return '#4E8786';
    }
  };

  // Card design from MostRequestedProducts.js
  const ProductCard = ({ product }) => (
    <Link href={`/product/${product._id || product.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 overflow-hidden group hover:scale-105 h-96 flex flex-col border-2 border-transparent hover:border-[#4E8786] cursor-pointer">
        <div className="flex-1 h-[80%] flex items-center justify-center bg-white">
          <img
            src={product.imagecover || product.image || '/placeholder-image.jpg'}
            alt={product.title || product.name}
            className="w-[90%] h-[95%] object-contain rounded-xl shadow-sm"
          />
        </div>
        <div className="h-[30%] flex flex-col justify-center items-center px-4">
          <h3 className="font-semibold text-base mb-1 text-center" style={{ color: '#2e2e2e' }}>
            {product.title || product.name}
          </h3>
          <span className="text-lg lg:text-lg font-semibold text-center" style={{ color: 'red' }}>
            {product.price} DA
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through text-center">
              {product.originalPrice} DA
            </span>
          )}
        </div>
      </div>
    </Link>
  );

  const ProductListItem = ({ product }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative md:w-48 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 md:h-32 object-cover rounded-lg"
          />
          {product.badge && (
            <div className="absolute top-2 left-2">
              <span 
                className="px-2 py-1 text-xs font-semibold text-white rounded-full"
                style={{ backgroundColor: getBadgeColor(product.badge) }}
              >
                {product.badge}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
            <div className="flex-1">
              <Link href={`/product/${product.id}`}>
                <h3 className="font-semibold text-xl mb-2 hover:text-blue-600 transition-colors cursor-pointer" style={{ color: '#2e2e2e' }}>
                  {product.name}
                </h3>
              </Link>
              <p className="text-gray-600 mb-3">
                {product.description}
              </p>
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl font-bold" style={{ color: '#2e2e2e' }}>
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <span className="text-sm px-2 py-1 bg-red-100 text-red-600 rounded-full">
                  Save ${(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
              <div className="mt-4 flex space-x-2">
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button 
                  disabled={!product.inStock}
                  className="px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#4E8786' }}
                  onMouseEnter={(e) => !e.target.disabled && (e.target.style.backgroundColor = '#5a8585')}
                  onMouseLeave={(e) => !e.target.disabled && (e.target.style.backgroundColor = '#4E8786')}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f2' }}>
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#2e2e2e' }}>
            Our Products
          </h1>
          <p className="text-lg text-gray-600">
            Discover our complete range of premium technology products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                  Search Products
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ '--tw-ring-color': '#4E8786' }}
                    placeholder="Search..."
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.length === 0 ? (
                    <div className="text-gray-400 text-sm">No categories found.</div>
                  ) : (
                    categories.map((category) => (
                      <button
                        key={category._id || category.id}
                        onClick={() => setSelectedCategory(category._id || category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === (category._id || category.id)
                            ? 'text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        style={{
                          backgroundColor:
                            selectedCategory === (category._id || category.id)
                              ? '#4E8786'
                              : 'transparent',
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          {/* Optionally show count if available: <span className="text-sm opacity-75">({category.count})</span> */}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
                  Price Range
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Max"
                    />
                  </div>
                  <button 
                    onClick={() => setPriceRange([0, 5000])}
                    className="w-full py-2 px-4 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#4E8786' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#5a8585'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#4E8786'}
                  >
                    Reset Filter
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">
                    Showing {filteredProducts.length} of {products.length} products
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': '#4E8786' }}
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* View Mode Toggle */}
                  
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <div className="text-center py-16 text-lg text-gray-600">Loading products...</div>
            ) : error ? (
              <div className="text-center py-16 text-lg text-red-600">{error}</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#2e2e2e' }}>
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters
                </p>
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 5000]);
                    setSearchQuery('');
                  }}
                  className="px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: '#4E8786' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#5a8585'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4E8786'}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {filteredProducts.map((product) => 
                  viewMode === 'grid' 
                    ? <ProductCard key={product._id || product.id} product={product} />
                    : <ProductListItem key={product._id || product.id} product={product} />
                )}
              </div>
            )}

            {/* Pagination (optional, can be updated for backend pagination) */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}