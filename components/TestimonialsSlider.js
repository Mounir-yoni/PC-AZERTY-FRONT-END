'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Content Creator',
      rating: 5,
      comment: 'Amazing service and top-quality products! My new gaming PC performs flawlessly. The staff was incredibly knowledgeable and helped me choose the perfect components.',
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Software Developer',
      rating: 5,
      comment: 'Fast delivery and excellent customer support. The workstation I bought handles all my development tasks perfectly. Highly recommend TechHub for professional needs.',
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Alex Rodriguez',
      role: 'Gamer',
      rating: 5,
      comment: 'Best prices in town and genuine products. My RTX 4080 build is a beast! The team even helped with custom cable management. Outstanding service!',
      avatar: 'AR'
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'Graphic Designer',
      rating: 5,
      comment: 'Professional service from start to finish. They understood exactly what I needed for my design work and delivered beyond expectations. Will definitely shop here again.',
      avatar: 'ED'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 px-4" style={{ backgroundColor: 'white' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#2e2e2e' }}>
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600">
            Real reviews from real customers
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 text-center border-2">
                    {/* Avatar */}
                    <div 
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg sm:text-xl"
                      style={{ backgroundColor: '#4E8786' }}
                    >
                      {testimonial.avatar}
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 italic leading-relaxed">
                      "{testimonial.comment}"
                    </p>

                    {/* Name and Role */}
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg" style={{ color: '#2e2e2e' }}>
                        {testimonial.name}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200"
            style={{ backgroundColor: 'white' }}
          >
            <ChevronLeft className="h-6 w-6" style={{ color: '#2e2e2e' }} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200"
            style={{ backgroundColor: 'white' }}
          >
            <ChevronRight className="h-6 w-6" style={{ color: '#2e2e2e' }} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'w-8' : ''
                }`}
                style={{ 
                  backgroundColor: index === currentIndex ? '#4E8786' : '#d1d5db' 
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}