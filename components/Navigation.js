'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Search, ShoppingCart, User, Monitor } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Settings } from "lucide-react";
import { getUser, removeUser, getCartItemCount } from '@/lib/storage';
import { usePathname } from 'next/navigation';


import image from './Z2.png'; // Adjust the path as necessary
export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  
  useEffect(() => {
    setUser(getUser());
    console.log(getUser()); // Debugging line to check user data
    // Optionally, listen for storage events to update on login/logout from other tabs
    const handleStorage = () => setUser(getUser());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Update cart count
  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartItemCount());
    };
    updateCartCount();

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        updateCartCount();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logout handler
  const handleLogout = () => {
    removeUser();
    setUser(null);
    setShowProfileMenu(false);
    window.location.href = '/';
  };

  // Optionally, close the dropdown when clicking outside
  useEffect(() => {
    if (!showProfileMenu) return;
    function handleClick(e) {
      if (!e.target.closest('.relative')) setShowProfileMenu(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showProfileMenu]);

  const menuItems = [
    { name: 'Home page', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'PC builder', href: '/pc-builder' },
    { name: 'About us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`shadow-md sticky top-0 z-50 transition-all duration-300 ${
        pathname === '/' ? (isScrolled ? 'bg-[#4E8786]' : 'bg-transparent') : 'bg-[#4E8786]'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 flex-shrink-0">
           {
            /*
             <Monitor className="h-8 w-8" style={{ color: '#4E8786' }} />
            */
           } 
              <div className="flex items-center sticky gap-0">
                <a href="/" className="flex items-center ">

                <Image
                  src={image}
                  alt="ZERTY Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 m-0 p-0"
                  />
                <span className="text-xl sm:text-2xl font-bold text-white m-0 p-0 " style={{ color: '#ded4d2' }}>
                  ZERTY
                </span>
                  </a>
              </div>
            
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm xl:text-base font-medium transition-colors duration-200 hover:text-white whitespace-nowrap text-white/90"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-white/20 rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-white mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm w-32 lg:w-40 text-white placeholder-white/70"
              />
            </div>

            {/* Mobile Search Button */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/20"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5 text-white" />
            </button>

            {/* Icons */}
            {user ? (
              <div className="relative hidden sm:flex items-center">
                <button
                  className="flex items-center p-2 rounded-lg transition-colors hover:bg-white/20 focus:outline-none"
                  onClick={() => setShowProfileMenu((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={showProfileMenu}
                >
                  <User className="h-5 w-5 text-white mr-2" />
                  <span className="text-white font-medium max-w-[120px] truncate">{user.name}</span>
                  <svg className={`ml-2 w-3 h-3 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-4 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 animate-dropdown">
                    {/* Arrow */}
                    <div className="absolute -top-2 right-1/2 translate-x-1/2 w-4 h-4 overflow-hidden">
                      <div className="w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45 transform origin-bottom-left shadow-md"></div>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-5 py-3 text-gray-800 hover:bg-gray-100 rounded-t-xl transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Profile
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block px-5 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-5 py-3 text-red-600 hover:bg-gray-100 rounded-b-xl transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden sm:flex p-2 rounded-lg transition-colors hover:bg-white/20">
                <User className="h-5 w-5 text-white" />
              </Link>
            )}
            <Link href="/cart" className="p-2 rounded-lg transition-colors hover:bg-white/20 relative">
              <ShoppingCart className="h-5 w-5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-white/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <div
              className="fixed top-0 left-0 right-0 z-50 border-t border-white/20 shadow-lg transition-transform duration-300 transform translate-y-0 lg:hidden"
              style={{ backgroundColor: '#4E8786' }}
            >
              <nav className="py-6 px-5">
                {/* Main Menu Items */}
                <div className="space-y-2 mb-6">
                  {menuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-5 py-3 rounded-xl font-medium transition-colors hover:bg-white/20 text-white text-base"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                {/* Mobile Auth Links */}
                <div className="border-t border-white/20 pt-5 space-y-2">
                  <Link
                    href="/admin"
                    className="flex items-center px-5 py-3 rounded-xl font-medium transition-colors hover:bg-white/20 text-white text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5 mr-3 text-white" />
                    Admin Panel
                  </Link>
                  {user && user.token ? (
                    <Link
                      href="/profile"
                      className="flex items-center px-5 py-3 rounded-xl font-medium transition-colors hover:bg-white/20 text-white text-base"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5 mr-3 text-white" />
                      {user.name || user.email}
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="flex items-center px-5 py-3 rounded-xl font-medium transition-colors hover:bg-white/20 text-white text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5 mr-3 text-white" />
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="flex items-center px-5 py-3 rounded-xl font-medium transition-colors hover:bg-white/20 text-white text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5 mr-3 text-white" />
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </>
        )}

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t border-white/20 fixed top-16 left-0 right-0 z-50" style={{ backgroundColor: '#4E8786' }}>
            <div className="flex items-center bg-white/20 rounded-lg px-4 py-3 mx-4 shadow-md">
              <Search className="h-4 w-4 text-white mr-2" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none text-base flex-1 text-white placeholder-white/70"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Tablet Navigation (md to lg) */}
        <div className="hidden md:flex lg:hidden border-t border-white/20 py-2" style={{ backgroundColor: '#4E8786' }}>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 w-full">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors duration-200 hover:text-white px-2 py-1 text-white/90"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}