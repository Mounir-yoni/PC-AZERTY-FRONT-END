'use client';

import { Star, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NewProducts({ products = [] }) {
  const t = useTranslations('NewProducts');
  
  return (
    <section className="py-16 px-4" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#2e2e2e' }}>
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 text-lg text-gray-600">{t('noProducts')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product) => {
              console.log('New Product ID:', product._id, 'Type:', typeof product._id);
              return (
                <Link
                  key={product._id}
                  href={`/product/${product._id}`}
                  className="block"
                >
                  <div
                    className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 overflow-hidden group hover:scale-105 h-96 flex flex-col border-2 border-transparent hover:border-[#4E8786] cursor-pointer relative"
                  >
                    {/* New Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span 
                        className="px-2 py-1 text-xs font-semibold text-white rounded-full"
                        style={{ backgroundColor: '#4E8786' }}
                      >
                        {t('newBadge')}
                      </span>
                    </div>

                    {/* Shopping Cart Button */}
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <ShoppingCart className="h-4 w-4" style={{ color: '#2e2e2e' }} />
                    </button>

                    {/* Product Image */}
                    <div className="flex-1 h-[80%] flex items-center justify-center bg-white">
                      <img
                        src={product.imagecover || '/placeholder-image.jpg'}
                        alt={product.title}
                        className="w-[90%] h-[95%] object-contain rounded-xl shadow-sm"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="h-[30%] flex flex-col justify-center items-center px-4">
                      <h3 className="font-semibold text-base mb-1 text-center" style={{ color: '#2e2e2e' }}>
                        {product.title}
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
            })}
          </div>
        )}

        <div className="text-center">
          <Link href="/products">
            <button 
              className="px-6 lg:px-8 py-2 lg:py-3 text-base lg:text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 bg-[#4E8786] text-white hover:bg-primary-hover"
            >
              {t('viewAllNew')}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}