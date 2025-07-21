'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getsliderimages } from '@/lib/api';

export default function OffersSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    getsliderimages()
      .then((data) => {
        setOffers(Array.isArray(data) ? data : []);
      })
      .catch(() => setOffers([]));
  }, []);

  useEffect(() => {
    if (offers.length === 0) return;
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
          key={offer._id || offer.id || index}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0 z-20' : 
            index < currentSlide ? '-translate-x-full z-10' : 'translate-x-full z-10'
          }`}
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',  overflow: 'hidden' }}
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${offer.image})`, objectFit: 'cover', minHeight: '100%' }}
          >
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(0,0,0,0.55) 60%, rgba(78,135,134,0.3) 100%)' }}></div>
            <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-5 drop-shadow-lg">
                  {offer.title}
                </h1>
                <p className="text-base sm:text-lg md:text-2xl lg:text-3xl mb-6 opacity-90 font-medium drop-shadow">
                  {offer.description}
                </p>
                {/* Optional: Add a button if you want a call-to-action */}
                {/*
                <button 
                  className="px-8 py-3 text-lg font-semibold rounded-full shadow-lg bg-gradient-to-r from-[#4E8786] to-[#2e2e2e] hover:from-[#2e2e2e] hover:to-[#4E8786] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4E8786]"
                  style={{ color: 'white' }}
                >
                  {offer.buttonText || 'Shop Now'}
                </button>
                */}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white bg-opacity-30 hover:bg-opacity-60 shadow-lg transition-all duration-200 border border-white z-30"
        disabled={offers.length === 0}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-7 w-7 text-white drop-shadow" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white bg-opacity-30 hover:bg-opacity-60 shadow-lg transition-all duration-200 border border-white z-30"
        disabled={offers.length === 0}
        aria-label="Next slide"
      >
        <ChevronRight className="h-7 w-7 text-white drop-shadow" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {offers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-200 focus:outline-none ${
              index === currentSlide ? 'bg-white shadow-lg scale-110' : 'bg-white bg-opacity-40'
            }`}
            disabled={offers.length === 0}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}