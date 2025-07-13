'use client';

export default function BrandsSection() {
  const brands = [
    { name: 'Intel', logo: 'INTEL' },
    { name: 'AMD', logo: 'AMD' },
    { name: 'NVIDIA', logo: 'NVIDIA' },
    { name: 'ASUS', logo: 'ASUS' },
    { name: 'MSI', logo: 'MSI' },
    { name: 'Corsair', logo: 'CORSAIR' },
    { name: 'Logitech', logo: 'LOGITECH' },
    { name: 'Razer', logo: 'RAZER' },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#2e2e2e' }}>
            Trusted Brands
          </h2>
          <p className="text-lg text-gray-600">
            We partner with the world's leading technology brands
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="bg-white rounded-lg p-4 lg:p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 flex items-center justify-center"
            >
              <div className="text-center">
                <div 
                  className="text-lg lg:text-2xl font-bold group-hover:scale-110 transition-transform duration-300"
                  style={{ color: '#4E8786' }}
                >
                  {brand.logo}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Authorized dealer for all major brands with full warranty support
          </p>
          <button 
            className="px-4 lg:px-6 py-2 rounded-lg font-semibold text-sm lg:text-base transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#4E8786', color: 'white' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#6a8e8f'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4E8786'}
          >
            View All Brands
          </button>
        </div>
      </div>
    </section>
  );
}