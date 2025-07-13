'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Cpu, MonitorSpeaker, HardDrive, Gamepad2, Laptop, Headphones } from 'lucide-react';

export default function CategoriesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    { name: 'Processors', icon: Cpu, color: '#4E8786' },
    { name: 'Graphics Cards', icon: MonitorSpeaker, color: '#4E8786' },
    { name: 'Storage', icon: HardDrive, color: '#4E8786' },
    { name: 'Gaming', icon: Gamepad2, color: '#4E8786' },
    { name: 'Laptops', icon: Laptop, color: '#4E8786' },
    { name: 'Audio', icon: Headphones, color: '#4E8786' },
  ];

  const itemsPerView = {
    mobile: 2,
    tablet: 2,
    desktop: 6
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(categories.length / itemsPerView.mobile));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(categories.length / itemsPerView.mobile)) % Math.ceil(categories.length / itemsPerView.mobile));
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#2e2e2e' }}>
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600">
            Find exactly what you're looking for
          </p>
        </div>

        <div className="relative">
          {/* Desktop View */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.name}
                  className="bg-white rounded-xl p-4 lg:p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105"
                >
                  <div className="mb-2 lg:mb-4 flex justify-center">
                    <IconComponent 
                      className="h-8 w-8 lg:h-12 lg:w-12 group-hover:scale-110 transition-transform duration-300" 
                      style={{ color: category.color }} 
                    />
                  </div>
                  <h3 className="font-semibold text-sm lg:text-base" style={{ color: '#2e2e2e' }}>
                    {category.name}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Mobile/Tablet View */}
          <div className="md:hidden">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(categories.length / itemsPerView.mobile) }).map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className={`w-full flex-shrink-0 grid gap-4 justify-items-center grid-cols-2`}
                  >
                    {categories
                      .slice(slideIndex * itemsPerView.mobile, (slideIndex + 1) * itemsPerView.mobile)
                      .map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <div
                            key={category.name}
                            className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center min-h-[140px] sm:min-h-[180px] w-full"
                          >
                            <div className="mb-4 flex justify-center items-center">
                              <IconComponent 
                                className="h-12 w-12 sm:h-16 sm:w-16 group-hover:scale-110 transition-transform duration-300" 
                                style={{ color: category.color }} 
                              />
                            </div>
                            <h3 className="font-semibold text-lg sm:text-xl" style={{ color: '#2e2e2e' }}>
                              {category.name}
                            </h3>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows for mobile */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200"
              style={{ backgroundColor: 'white' }}
            >
              <ChevronLeft className="h-6 w-6" style={{ color: '#2e2e2e' }} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200"
              style={{ backgroundColor: 'white' }}
            >
              <ChevronRight className="h-6 w-6" style={{ color: '#2e2e2e' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}