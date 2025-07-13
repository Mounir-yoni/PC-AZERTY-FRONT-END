'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function OffersSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const offers = [
    {
      id: 1,
      title: 'Gaming PCs up to 30% OFF',
      subtitle: 'High-performance systems for ultimate gaming',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D',
      buttonText: 'Shop Gaming PCs'
    },
    {
      id: 2,
      title: 'Latest Graphics Cards',
      subtitle: 'RTX 4000 series now available',
      image: 'https://images.unsplash.com/photo-1555618565-9f2b0323a10d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TnZpZGlhfGVufDB8fDB8fHww',
      buttonText: 'View GPUs'
    },
    {
      id: 3,
      title: 'Workstation Deals',
      subtitle: 'Professional systems for creators',
      image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      buttonText: 'Shop Workstations'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [offers.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  return (
    <section className="relative bottom-16 h-64 sm:h-80 md:h-96 lg:h-[100vh] overflow-hidden p-0 mt-0 w-full">
      {offers.map((offer, index) => (
        <div
          key={offer.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${offer.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
              <div className="max-w-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4">
                  {offer.title}
                </h1>
                <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8 opacity-90">
                  {offer.subtitle}
                </p>
                <button 
                  className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: '#4E8786', color: 'white' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4E8786'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4E8786'}
                >
                  {offer.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {offers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}