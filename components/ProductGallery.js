'use client';

export default function ProductGallery() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#2e2e2e' }}>
            Our Product Showcase
          </h2>
          <p className="text-lg text-gray-600">
            Experience the quality and design of our premium products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* First Gallery Item */}
          <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
              src="https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
              alt="Gaming Setup"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Ultimate Gaming Experience</h3>
              <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-4">
                High-performance gaming setups designed for competitive play
              </p>
              <button 
                className="px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#4E8786', color: 'white' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#6a8e8f'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#4E8786'}
              >
                Explore Gaming
              </button>
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
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Professional Workstations</h3>
              <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-4">
                Powerful systems for creators, developers, and professionals
              </p>
              <button 
                className="px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#4E8786', color: 'white' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#6a8e8f'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#4E8786'}
              >
                View Workstations
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}