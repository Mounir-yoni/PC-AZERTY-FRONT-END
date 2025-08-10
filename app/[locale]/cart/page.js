'use client';

import { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getCart, removeFromCart, updateCartItemQuantity, getUser } from '@/lib/storage';
import { Link } from '@/i18n/navigation';
import { addOrder } from '@/lib/api';
import { showNotification } from '@/components/NotificationSystem';
import OrderUserInfo from '@/components/OrderUserInfo';
import useWilayas from '@/hooks/useWilayas';
import { useTranslations } from 'next-intl';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: '', phone: '', address: '', wilaya: '', wilayaObj: null, place: 'home' });
  const t = useTranslations('Cart');

  useEffect(() => {
    // Load cart from localStorage on component mount
    const loadCart = () => {
      const cart = getCart();
      setCartItems(cart);
    };
    loadCart();

    // Listen for storage changes (if cart is updated from other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        loadCart();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Meta Pixel tracking for ViewCart
  useEffect(() => {
    if (cartItems.length > 0 && window.fbq) {
      const content_ids = cartItems.map(item => item._id || item.id);
      const content_names = cartItems.map(item => item.title || item.name);
      const total_value = cartItems.reduce((sum, item) => sum + (parseFloat(item.price || 0) * (item.quantity || 1)), 0);
      
      window.fbq('track', 'ViewCart', {
        content_ids: content_ids,
        content_names: content_names,
        content_type: 'product',
        value: total_value,
        currency: 'DZD',
        num_items: cartItems.length,
      });
    }
  }, [cartItems]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    const updatedCart = updateCartItemQuantity(id, newQuantity);
    setCartItems(updatedCart);
    
    // Meta Pixel tracking for cart quantity update
    if (window.fbq) {
      const item = cartItems.find(item => item._id === id || item.id === id);
      if (item) {
        window.fbq('track', 'CustomizeProduct', {
          content_name: item.title || item.name,
          content_ids: [item._id || item.id],
          content_type: 'product',
          value: parseFloat(item.price || 0),
          currency: 'DZD',
          quantity: newQuantity,
        });
      }
    }
  };

  const removeItem = (id) => {
    const item = cartItems.find(item => item._id === id || item.id === id);
    const updatedCart = removeFromCart(id);
    setCartItems(updatedCart);
    
    // Meta Pixel tracking for remove from cart
    if (window.fbq && item) {
      window.fbq('track', 'RemoveFromCart', {
        content_name: item.title || item.name,
        content_ids: [item._id || item.id],
        content_type: 'product',
        value: parseFloat(item.price || 0),
        currency: 'DZD',
        quantity: item.quantity || 1,
      });
    }
  };

  // Calculate dynamic shipping
  const selectedWilaya = userInfo.wilayaObj;
  let shipping = 0;
  if (selectedWilaya) {
    shipping = userInfo.place === 'office'
      ? selectedWilaya.pricetooffice
      : selectedWilaya.pricetohome;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + (shipping || 0) ;

  const handleOrder = async () => {
    // No longer require login, just use userInfo
    if (!userInfo.name || !userInfo.phone || !userInfo.address || !userInfo.wilaya || !userInfo.place) {
      showNotification({
        title: t('notifications.missingInfo.title'),
        description: t('notifications.missingInfo.description'),
        variant: 'destructive',
      });
      return;
    }
    
    // Meta Pixel tracking for InitiateCheckout
    if (window.fbq) {
      const content_ids = cartItems.map(item => item._id || item.id);
      const content_names = cartItems.map(item => item.title || item.name);
      
      window.fbq('track', 'InitiateCheckout', {
        content_ids: content_ids,
        content_names: content_names,
        content_type: 'product',
        value: total,
        currency: 'DZD',
        num_items: cartItems.length,
      });
    }
    
    try {
      await addOrder({ address: userInfo.address, name: userInfo.name, phone: userInfo.phone, wilaya: userInfo.wilaya, place: userInfo.place, wilayaObj: userInfo.wilayaObj });
      
      // Meta Pixel tracking for Purchase
      if (window.fbq) {
        const content_ids = cartItems.map(item => item._id || item.id);
        const content_names = cartItems.map(item => item.title || item.name);
        
        window.fbq('track', 'Purchase', {
          content_ids: content_ids,
          content_names: content_names,
          content_type: 'product',
          value: total,
          currency: 'DZD',
          num_items: cartItems.length,
        });
      }
      
      showNotification({
        title: t('notifications.orderSuccess.title'),
        description: t('notifications.orderSuccess.description'),
        variant: 'default',
      });
    } catch (err) {
      showNotification({
        title: t('notifications.orderFailed.title'),
        description: err?.message || t('notifications.orderFailed.description'),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f2' }}>
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/" className="mr-4 p-2 rounded-lg hover:bg-white transition-colors">
              <ArrowLeft className="h-5 w-5" style={{ color: '#2e2e2e' }} />
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: '#2e2e2e' }}>
              {t('title')}
            </h1>
          </div>
          <p className="text-gray-600">
            {t('itemsInCart', { count: cartItems.length })}
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-gray-400" />
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#2e2e2e' }}>
              {t('empty.title')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('empty.subtitle')}
            </p>
            <Link href="/products">
              <button 
                className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 bg-[#4E8786] text-white hover:bg-primary-hover"
              >
                {t('continueShopping')}
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id || item.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={item.imagecover || item.image}
                      alt={item.title || item.name}
                      className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg mb-1" style={{ color: '#2e2e2e' }}>
                            {item.title || item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{item.description || item.specs}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item._id || item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item._id || item.id, (item.quantity || 1) - 1)}
                            className="p-1 rounded-lg border hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="h-4 w-4" style={{ color: '#2e2e2e' }} />
                          </button>
                          <span className="font-semibold px-3 py-1 bg-gray-100 rounded-lg min-w-[3rem] text-center">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id || item.id, (item.quantity || 1) + 1)}
                            className="p-1 rounded-lg border hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="h-4 w-4" style={{ color: '#2e2e2e' }} />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xl font-bold" style={{ color: '#4E8786' }}>
                            {((item.price || 0) * (item.quantity || 1))}DA
                          </p>
                          <p className="text-sm text-gray-500">
                            {(item.price || 0)}DA {t('each')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
                <h2 className="text-xl font-semibold mb-6" style={{ color: '#2e2e2e' }}>
                  {t('summary.title')}
                </h2>
                {/* User Info Form */}
                <OrderUserInfo onChange={setUserInfo} />
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('summary.subtotal')}</span>
                    <span className="font-semibold" style={{color:'#4E8786'}}>{subtotal}DA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('summary.shipping')}</span>
                    <span className="font-semibold">
                      {shipping === 0 ? t('summary.free') : `${shipping}DA`}
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span style={{ color: '#2e2e2e' }}>{t('summary.total')}</span>
                      <span style={{ color: '#4E8786' }}>{total} DA</span>
                    </div>
                  </div>
                </div>

               

                <button 
                  className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mb-4 bg-[#4E8786] text-white hover:bg-primary-hover"
                  onClick={handleOrder}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>{t('summary.orderNow')}</span>
                </button>

                <Link href="/products">
                  <button className="w-full py-2 px-4 rounded-lg font-semibold border-2 transition-all duration-300 hover:bg-gray-50"
                    style={{ borderColor: '#4E8786', color: '#4E8786' }}
                  >
                    {t('continueShopping')}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}