"use client";

import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, CreditCard } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/navigation';
import { getProducts, getComments, addComment, addOrder } from '@/lib/api';
import { getToken, addToCart, getCart, removeItem } from '@/lib/storage';
import { showNotification } from '@/components/NotificationSystem';
import { useTranslations } from 'next-intl';
import useWilayas from '@/hooks/useWilayas';

export default function ProductClientView({ product }) {
  const t = useTranslations('Product');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showDirectOrder, setShowDirectOrder] = useState(false);
  const [directOrderForm, setDirectOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    wilaya: '',
    deliveryType: 'home'
  });
  const [submittingOrder, setSubmittingOrder] = useState(false);

  // Fetch wilaya data using useWilayas hook
  const { wilayas, isLoading: wilayasLoading, isError: wilayasError } = useWilayas();

  // Calculate shipping cost when wilaya or delivery type changes
  const selectedWilaya = wilayas?.find(w => w._id === directOrderForm.wilaya);
  const shippingCost = selectedWilaya && product.livraison !== 'free'
    ? (directOrderForm.deliveryType === 'office' ? selectedWilaya.pricetooffice : selectedWilaya.pricetohome)
    : 0;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const productsResponse = await getProducts();
        const allProducts = productsResponse.data;
        const filteredProducts = allProducts
          .filter(p => p._id !== product._id)
          .slice(0, 4);
        setRelatedProducts(filteredProducts);

        try {
          const commentsResponse = await getComments(product._id);
          let commentsData = [];
            if (Array.isArray(commentsResponse.data)) {
              commentsData = commentsResponse.data;
          } else if (commentsResponse.data?.comments) {
              commentsData = commentsResponse.data.comments;
          } else if (commentsResponse.data?.data) {
              commentsData = commentsResponse.data.data;
          }
          setComments(commentsData);
        } catch {
          setComments([]);
        }
      } catch {
        setError(t('errors.loadFailed'));
      } finally {
        setLoading(false);
      }
    }
    if (product?._id) {
      fetchData();
    }
  }, [product, t]);

  // Meta Pixel - ViewContent
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq && product) {
      try {
        window.fbq('track', 'ViewContent', {
          content_name: product.title,
          content_ids: [product._id],
          content_type: 'product',
          value: parseFloat(product.price),
          currency: 'DZD',
        });
      } catch (err) {
        console.warn("Meta Pixel tracking failed:", err);
      }
    }
  }, [product]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      showNotification({
        title: t('reviews.loginRequiredTitle'),
        description: t('reviews.loginRequiredDescription'),
        variant: 'destructive',
      });
      return;
    }
    if (!newComment.trim() || rating === 0) {
      showNotification({
        title: t('reviews.missingFieldsTitle'),
        description: t('reviews.missingFieldsDescription'),
        variant: 'destructive',
      });
      return;
    }
    setSubmittingComment(true);
    try {
      const response = await addComment(product._id, { comment: newComment, rating }, token);
      setComments(prev => [{
        _id: response.data._id || Date.now().toString(),
        user: response.data.user || { name: 'You' },
        comment: newComment,
        rating,
        date: new Date().toISOString().split('T')[0],
      }, ...prev]);
      setNewComment('');
      setRating(0);
      showNotification({
        title: t('reviews.submitSuccessTitle'),
        description: t('reviews.submitSuccessDescription'),
        variant: 'default',
      });
    } catch {
      showNotification({
        title: t('reviews.submitFailedTitle'),
        description: t('reviews.submitFailedDescription'),
        variant: 'destructive',
      });
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    setAddingToCart(true);
    try {
      addToCart(product);

      // Meta Pixel - AddToCart
      if (typeof window !== "undefined" && window.fbq) {
        try {
          window.fbq('track', 'AddToCart', {
            content_name: product.title,
            content_ids: [product._id],
            content_type: 'product',
            value: parseFloat(product.price),
            currency: 'DZD',
          });
        } catch (err) {
          console.warn("Meta Pixel AddToCart failed:", err);
        }
      }

      showNotification({
        title: t('notifications.addedToCart.title'),
        description: t('notifications.addedToCart.description', { title: product.title }),
        variant: 'default',
      });
    } catch {
      showNotification({
        title: t('notifications.error.title'),
        description: t('notifications.error.description'),
        variant: 'destructive',
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleDirectOrder = async (e) => {
    e.preventDefault();
    
    if (!directOrderForm.name || !directOrderForm.phone || !directOrderForm.address || !directOrderForm.wilaya) {
      showNotification({
        title: t('notifications.missingInfo.title'),
        description: t('notifications.missingInfo.description'),
        variant: 'destructive',
      });
      return;
    }

    setSubmittingOrder(true);
    
    try {
      // Get the selected wilaya object for shipping calculations
      const selectedWilaya = wilayas.find(w => w._id === directOrderForm.wilaya);
      if (!selectedWilaya) {
        throw new Error('Selected wilaya not found');
      }

      // Meta Pixel tracking for InitiateCheckout
      if (window.fbq) {
        window.fbq('track', 'InitiateCheckout', {
          content_ids: [product._id],
          content_names: [product.title],
          content_type: 'product',
          value: parseFloat(product.price) + shippingCost,
          currency: 'DZD',
          num_items: 1,
        });
      }

      // Save current cart state
      const currentCart = getCart();
      
      // Temporarily set cart to only contain the current product
      const tempCart = [{
        _id: product._id,
        title: product.title,
        price: parseFloat(product.price),
        quantity: 1,
        imagecover: product.imagecover
      }];
      
      // Set the temporary cart
      localStorage.setItem('cart', JSON.stringify(tempCart));

      // Call addOrder with the direct order data
      await addOrder({
        address: directOrderForm.address,
        name: directOrderForm.name,
        phone: directOrderForm.phone,
        wilaya: directOrderForm.wilaya,
        place: directOrderForm.deliveryType,
        wilayaObj: selectedWilaya,
        preserveCart: true
      });

      // Restore the original cart after successful order
      if (currentCart && currentCart.length > 0) {
        localStorage.setItem('cart', JSON.stringify(currentCart));
      } else {
        removeItem('cart');
      }

      // Meta Pixel tracking for Purchase
      if (window.fbq) {
        window.fbq('track', 'Purchase', {
          content_ids: [product._id],
          content_names: [product.title],
          content_type: 'product',
          value: parseFloat(product.price) + shippingCost,
          currency: 'DZD',
          num_items: 1,
        });
      }

      showNotification({
        title: t('notifications.orderSuccess.title'),
        description: t('notifications.orderSuccess.description'),
        variant: 'default',
      });
      
      setShowDirectOrder(false);
      setDirectOrderForm({
        name: '',
        phone: '',
        address: '',
        wilaya: '',
        deliveryType: 'home'
      });

      // Redirect to home page after successful order (optional)
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      
    } catch (error) {
      console.error('Direct order error:', error);
      showNotification({
        title: t('notifications.orderFailed.title'),
        description: error?.message || t('notifications.orderFailed.description'),
        variant: 'destructive',
      });
    } finally {
      setSubmittingOrder(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f2' }}>
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-800">{t('breadcrumbs.home')}</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-800">{t('breadcrumbs.products')}</Link>
            <span>/</span>
            <span className="text-gray-800">{t('breadcrumbs.category')}</span>
            <span>/</span>
            <span style={{ color: '#7a9e9f' }}>{product.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
                <img
                  src={product.imagecover}
                  alt={product.title}
                  className="w-[90%] object-contain rounded-xl shadow-sm transition-transform duration-300 hover:scale-105"
                />
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow opacity-0 group-hover:opacity-100">
                <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
              </button>
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#2e2e2e' }}>
                {product.title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(4.5) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    4.5 (156 reviews)
                  </span>
                </div>
                <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800">
                  <Share2 className="h-4 w-4" />
                  <span>{t('share')}</span>
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold" style={{ color: '#2e2e2e' }}>
                  {product.price} DA
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {product.originalPrice} DA
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                    {t('saveAmount', { amount: (product.originalPrice - product.price) })}
                  </span>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description || t('descriptionFallback')}
              </p>

              {/* Stock Status */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">
                    {product.quantity} {product.quantity > 0 ? t('stock.inStock') : t('stock.outOfStock')}
                  </span>
                </div>
              </div>

              {/* Order Now and Add to Cart */}
              <div className="space-y-4 mb-8">
                <button
                  onClick={() => setShowDirectOrder(true)}
                  className="w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  style={{ backgroundColor: '#4E8786', color: 'white' }}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>{t('directOrder.orderNow')}</span>
                </button>
                
                {/* Add to Cart Section */}
                <div className="border-t pt-6">
                  <div className="text-center mb-4">
                    <span className="text-sm text-gray-500">{t('directOrder.or')}</span>
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className="w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 border-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ borderColor: '#4E8786', color: '#4E8786' }}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>{addingToCart ? t('adding') : t('addToCartWithPrice', { price: product.price })}</span>
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg" style={{ color: '#2e2e2e' }}>
                  {t('features.title')}
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4E8786' }}></div>
                    <span className="text-gray-700">{t('features.items.highPerformance')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4E8786' }}></div>
                    <span className="text-gray-700">{t('features.items.rgb')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4E8786' }}></div>
                    <span className="text-gray-700">{t('features.items.optimized4k')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4E8786' }}></div>
                    <span className="text-gray-700">{t('features.items.buildQuality')}</span>
                  </li>
                </ul>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t">
                <div className="flex items-center space-x-3">
                  <Truck className="h-6 w-6" style={{ color: '#4E8786' }} />
                  <div>
                    <p className="font-medium text-sm">{t('guarantees.freeShipping')}</p>
                    <p className="text-xs text-gray-600">{t('guarantees.freeShippingSub')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6" style={{ color: '#4E8786' }} />
                  <div>
                    <p className="font-medium text-sm">{t('guarantees.warranty')}</p>
                    <p className="text-xs text-gray-600">{t('guarantees.warrantySub')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-6 w-6" style={{ color: '#4E8786' }} />
                  <div>
                    <p className="font-medium text-sm">{t('guarantees.returns')}</p>
                    <p className="text-xs text-gray-600">{t('guarantees.returnsSub')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Order Modal */}
        {showDirectOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold" style={{ color: '#2e2e2e' }}>
                    {t('directOrder.title')}
                  </h3>
                  <button
                    onClick={() => setShowDirectOrder(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Product Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.imagecover}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold" style={{ color: '#2e2e2e' }}>
                        {product.title}
                      </h4>
                      <p className="text-lg font-bold" style={{ color: '#4E8786' }}>
                        {product.price} DA
                      </p>
                    </div>
                  </div>
                  
                  {/* Shipping Cost Display */}
                  {directOrderForm.wilaya && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center text-sm">
                        <span style={{ color: '#2e2e2e' }}>{t('directOrder.productPrice')}</span>
                        <span style={{ color: '#4E8786' }}>{product.price} DA</span>
                      </div>
                      {selectedWilaya && (
                        <>
                          {product.livraison === 'free' ? (
                            <div className="text-sm text-green-600 font-medium text-center py-1 bg-green-50 rounded-lg mt-2">
                              🚚 {t('directOrder.freeShipping')}
                            </div>
                          ) : (
                            <div className="flex justify-between items-center text-sm mt-1">
                              <span style={{ color: '#2e2e2e' }}>{t('directOrder.shipping')} ({directOrderForm.deliveryType === 'office' ? t('directOrder.office') : t('directOrder.home')}):</span>
                              <span style={{ color: '#4E8786' }}>{shippingCost} DA</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center font-semibold mt-2 pt-2 border-t border-gray-200">
                            <span style={{ color: '#2e2e2e' }}>{t('directOrder.total')}</span>
                            <span style={{ color: '#4E8786' }}>{parseFloat(product.price) + shippingCost} DA</span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Order Form */}
                <form onSubmit={handleDirectOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                      {t('directOrder.name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={directOrderForm.name}
                      onChange={(e) => setDirectOrderForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E8786] focus:border-transparent"
                      placeholder={t('directOrder.namePlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                      {t('directOrder.phone')}
                    </label>
                    <input
                      type="tel"
                      required
                      value={directOrderForm.phone}
                      onChange={(e) => setDirectOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E8786] focus:border-transparent"
                      placeholder={t('directOrder.phonePlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                      {t('directOrder.address')}
                    </label>
                    <textarea
                      required
                      rows="3"
                      value={directOrderForm.address}
                      onChange={(e) => setDirectOrderForm(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E8786] focus:border-transparent resize-none"
                      placeholder={t('directOrder.addressPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                      {t('directOrder.wilaya')}
                    </label>
                    <select
                      required
                      value={directOrderForm.wilaya}
                      onChange={(e) => setDirectOrderForm(prev => ({ ...prev, wilaya: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E8786] focus:border-transparent"
                      disabled={wilayasLoading}
                    >
                      <option value="">{t('directOrder.selectWilaya')}</option>
                      {wilayas && wilayas.length > 0 && wilayas.map((wilaya) => (
                        <option key={wilaya._id} value={wilaya._id}>
                          {wilaya.name}
                        </option>
                      ))}
                    </select>
                    {wilayasError && (
                      <p className="text-red-500 text-sm mt-1">{t('wilayas.loadFailed')}</p>
                    )}
                    {wilayasLoading && (
                      <p className="text-gray-500 text-sm mt-1">{t('wilayas.loading')}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                      {t('directOrder.deliveryType')}
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="deliveryType"
                          value="home"
                          checked={directOrderForm.deliveryType === 'home'}
                          onChange={(e) => setDirectOrderForm(prev => ({ ...prev, deliveryType: e.target.value }))}
                          className="text-[#4E8786] focus:ring-[#4E8786]"
                        />
                        <span className="text-sm">{t('directOrder.homeDelivery')}</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="deliveryType"
                          value="office"
                          checked={directOrderForm.deliveryType === 'office'}
                          onChange={(e) => setDirectOrderForm(prev => ({ ...prev, deliveryType: e.target.value }))}
                          className="text-[#4E8786] focus:ring-[#4E8786]"
                        />
                        <span className="text-sm">{t('directOrder.officeDelivery')}</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submittingOrder}
                    className="w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#4E8786', color: 'white' }}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>{submittingOrder ? t('directOrder.placingOrder') : t('directOrder.placeOrder')}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8" style={{ color: '#2e2e2e' }}>
              {t('related.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  href={`/product/${relatedProduct._id}`}
                  className="block"
                >
                  <div
                    className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 overflow-hidden group hover:scale-105 h-96 flex flex-col border-2 border-transparent hover:border-[#4E8786] cursor-pointer"
                  >
                    <div className="flex-1 h-[80%] flex items-center justify-center bg-white">
                      <img
                        src={relatedProduct.imagecover || 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'}
                        alt={relatedProduct.title}
                        className="w-[90%] h-[95%] object-contain rounded-xl shadow-sm"
                      />
                    </div>
                    <div className="h-[30%] flex flex-col justify-center items-center px-4">
                      <h3 className="font-semibold text-base mb-1 text-center" style={{ color: '#2e2e2e' }}>
                        {relatedProduct.title}
                      </h3>
                      <span className="text-lg lg:text-lg font-semibold text-center" style={{ color: 'red' }}>
                        {relatedProduct.price} DA
                      </span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-gray-500 line-through text-center">
                          {relatedProduct.originalPrice} DA
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-md p-6 lg:p-8">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#2e2e2e' }}>
            {t('reviews.title', { count: comments && comments.length > 0 ? comments.length : 0 })}
          </h2>

          {/* Add Review Form */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#2e2e2e' }}>
              {t('reviews.writeTitle')}
            </h3>
            
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                  {t('reviews.ratingLabel')}
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {rating > 0 ? t('reviews.ratingSelected', { rating }) : t('reviews.selectRating')}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                  {t('reviews.yourReview')}
                </label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a9e9f] focus:border-transparent resize-none transition-colors"
                  rows="4"
                  placeholder={t('reviews.placeholder')}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={submittingComment}
                className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#4E8786', color: 'white' }}
              >
                {submittingComment ? t('reviews.submitting') : t('reviews.submit')}
              </button>
            </form>
          </div>

          {/* Reviews List */}
          {comments && comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment._id || comment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#7a9e9f] rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {typeof comment.user === 'object' ? comment.user.name.charAt(0).toUpperCase() : (comment.user || comment.userName || 'A').charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg" style={{ color: '#2e2e2e' }}>
                          {typeof comment.user === 'object' ? comment.user.name : (comment.user || comment.userName || t('reviews.anonymousUser'))}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < (comment.rating || 5) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {comment.date || comment.createdAt || t('reviews.recent')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4 text-base">
                    {comment.comment || comment.text || comment.content || t('reviews.noCommentText')}
                  </p>
                  
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-xs text-gray-500">
                        {t('reviews.verifiedPurchase')}
                      </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* No Comments Message */
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{t('reviews.emptyTitle')}</h3>
              <p className="text-gray-500 mb-4">{t('reviews.emptySubtitle')}</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}