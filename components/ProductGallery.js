'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function ProductGallery() {
  const t = useTranslations('ProductGallery');
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#2e2e2e' }}>
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* First Gallery Item */}
          <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UEN8ZW58MHx8MHx8fDA%3D"
              alt="Gaming Setup"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">{t('gaming.title')}</h3>
              <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-4">
                {t('gaming.description')}
              </p>
              <Link href="/products">
                <button 
                  className="px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: '#4E8786', color: 'white' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#6a8e8f'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4E8786'}
                >
                  {t('gaming.button')}
                </button>
              </Link>
            </div>
          </div>

          {/* Second Gallery Item */}
          <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
              src="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
              alt="Professional Workstation"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">{t('workstation.title')}</h3>
              <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-4">
                {t('workstation.description')}
              </p>
              <Link href="/products">
                <button 
                  className="px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: '#4E8786', color: 'white' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#6a8e8f'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4E8786'}
                >
                  {t('workstation.button')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}