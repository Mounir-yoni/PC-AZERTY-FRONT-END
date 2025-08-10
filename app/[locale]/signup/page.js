'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/navigation';
import { signup } from '@/lib/api';
import { showNotification } from '@/components/NotificationSystem';
import { useTranslations } from 'next-intl';

export default function SignUpPage() {
  const t = useTranslations('SignUp');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false,
    address: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError(t('notifications.passwordMismatch'));
      showNotification({
        title: t('notifications.signupFailed'),
        description: t('notifications.passwordMismatch'),
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    try {
      await signup({
        name:formData.firstName+ ' ' + formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        subscribeNewsletter: formData.subscribeNewsletter,
        address: formData.address,
      });
      showNotification({
        title: t('notifications.signupSuccess'),
        description: t('notifications.accountCreated'),
        variant: 'default',
      });
      window.location.href = '/login';
    } catch (err) {
      setError(err?.message || t('notifications.signupFailedMessage'));
      showNotification({
        title: t('notifications.signupFailed'),
        description: err?.message || t('notifications.signupFailedMessage'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f2' }}>
      <Navigation />
      
      <main className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('backToHome')}
            </Link>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#2e2e2e' }}>
                {t('title')}
              </h1>
              <p className="text-gray-600">
                {t('subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="text-red-600 text-center font-medium mb-2">{error}</div>
              )}
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    {t('firstName')}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                      placeholder={t('firstNamePlaceholder')}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    {t('lastName')}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                    placeholder={t('lastNamePlaceholder')}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                  {t('email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                    placeholder={t('emailPlaceholder')}
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                  {t('phone')}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                    placeholder={t('phonePlaceholder')}
                    required
                  />
                </div>
              </div>

              {/* Address Field */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                  {t('address')}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                  placeholder={t('addressPlaceholder')}
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                  {t('password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                    placeholder={t('passwordPlaceholder')}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                  {t('confirmPassword')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                    placeholder={t('confirmPasswordPlaceholder')}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 rounded border-gray-300 focus:ring-2"
                    style={{ accentColor: '#4E8786' }}
                    required
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {t('agreeToTerms')}{' '}
                    <Link href="/terms" className="hover:underline" style={{ color: '#4E8786' }}>
                      {t('termsOfService')}
                    </Link>{' '}
                    {t('and')}{' '}
                    <Link href="/privacy" className="hover:underline" style={{ color: '#4E8786' }}>
                      {t('privacyPolicy')}
                    </Link>
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onChange={handleChange}
                    className="rounded border-gray-300 focus:ring-2"
                    style={{ accentColor: '#4E8786' }}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {t('subscribeNewsletter')}
                  </span>
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 bg-[#4E8786] text-white hover:bg-primary-hover disabled:opacity-60"
                disabled={loading}
              >
                {loading ? t('creatingAccount') : t('createAccount')}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t('loginDivider')}</span>
                </div>
              </div>

              
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {t('alreadyHaveAccount')}{' '}
                <Link href="/login" className="font-semibold hover:underline" style={{ color: '#4E8786' }}>
                  {t('signInHere')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}