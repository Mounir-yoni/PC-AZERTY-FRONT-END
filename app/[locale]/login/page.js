'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/navigation';
import { login } from '@/lib/api';
import { setUser } from '@/lib/storage';
import { showNotification } from '@/components/NotificationSystem';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('Login');
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userData = await login({
        email: formData.email,
        password: formData.password,
      });
      setUser(userData);
      showNotification({
        title: t('notifications.loginSuccess'),
        description: t('notifications.welcomeBack'),
        variant: 'default',
      });
      // Redirect or show success (example: window.location.href = '/')
      window.location.href = '/';
    } catch (err) {
      setError(err?.message || t('notifications.loginFailedMessage'));
      showNotification({
        title: t('notifications.loginFailed'),
        description: err?.message || t('notifications.loginFailedMessage'),
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

          {/* Login Form */}
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
                    style={{ focusRingColor: '#7a9e9f' }}
                    placeholder={t('emailPlaceholder')}
                    required
                  />
                </div>
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
                    style={{ focusRingColor: '#7a9e9f' }}
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="rounded border-gray-300 focus:ring-2"
                    style={{ accentColor: '#7a9e9f' }}
                  />
                  <span className="ml-2 text-sm text-gray-600">{t('rememberMe')}</span>
                </label>
                <Link href="/forgot-password" className="text-sm hover:underline" style={{ color: '#4E8786' }}>
                  {t('forgotPassword')}
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 bg-[#4E8786] text-white hover:bg-primary-hover disabled:opacity-60"
                disabled={loading}
              >
                {loading ? t('signingIn') : t('signIn')}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t('orContinueWith')}</span>
                </div>
              </div>

          
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {t('noAccount')}{' '}
                <Link href="/signup" className="font-semibold hover:underline" style={{ color: '#4E8786' }}>
                  {t('signUpHere')}
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