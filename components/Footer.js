'use client';

import { Monitor, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-4 lg:space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <Monitor className="h-8 w-8" style={{ color: '#4E8786' }} />
              <span className="text-2xl font-bold">TechHub</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted destination for premium computers, components, and tech accessories. 
              We've been serving the tech community for over 10 years.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full transition-colors hover:bg-gray-800">
                <Facebook className="h-5 w-5" style={{ color: '#4E8786' }} />
              </a>
              <a href="#" className="p-2 rounded-full transition-colors hover:bg-gray-800">
                <Twitter className="h-5 w-5" style={{ color: '#4E8786' }} />
              </a>
              <a href="#" className="p-2 rounded-full transition-colors hover:bg-gray-800">
                <Instagram className="h-5 w-5" style={{ color: '#4E8786' }} />
              </a>
              <a href="#" className="p-2 rounded-full transition-colors hover:bg-gray-800">
                <Youtube className="h-5 w-5" style={{ color: '#4E8786' }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6">Quick Links</h3>
            <ul className="space-y-2 lg:space-y-3">
              {['About Us', 'Contact', 'Shipping Info', 'Returns', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6">Categories</h3>
            <ul className="space-y-2 lg:space-y-3">
              {['Gaming PCs', 'Laptops', 'Components', 'Accessories', 'Monitors', 'Peripherals'].map((category) => (
                <li key={category}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-1" style={{ color: '#4E8786' }} />
                <div>
                  <p className="text-sm lg:text-base text-gray-400">123 Tech Street</p>
                  <p className="text-sm lg:text-base text-gray-400">Silicon Valley, CA 94000</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" style={{ color: '#4E8786' }} />
                <p className="text-sm lg:text-base text-gray-400">(555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" style={{ color: '#4E8786' }} />
                <p className="text-sm lg:text-base text-gray-400">info@techhub.com</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm lg:text-base font-semibold mb-3">Newsletter</h4>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm lg:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
                />
                <button 
                  className="px-4 py-2 rounded-lg font-semibold text-sm lg:text-base transition-colors"
                  style={{ backgroundColor: '#4E8786', color: 'white' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#6a8e8f'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4E8786'}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 lg:mt-12 pt-6 lg:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm lg:text-base text-gray-400 text-center sm:text-left">
              © 2024 TechHub. All rights reserved.
            </p>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}