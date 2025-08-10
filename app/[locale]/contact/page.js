'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User, Building } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Contact');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contactInfo.visit'),
      details: ['06 rue Ounnoughi Benghadfa', 'Ouled Brahem'],
      color: '#669999'
    },
    {
      icon: Phone,
      title: t('contactInfo.call'),
      details: ['0772725573', '0667294070'],
      color: '#669999'
    },
    {
      icon: Mail,
      title: t('contactInfo.email'),
      details: ['azertycomputerdz@gmail.com', ''],
      color: '#669999'
    },
    {
      icon: Clock,
      title: t('contactInfo.hours'),
      details: [t('contactInfo.support')],
      color: '#669999'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: t('inquiryTypes.general') },
    { value: 'support', label: t('inquiryTypes.support') },
    { value: 'sales', label: t('inquiryTypes.sales') },
    { value: 'warranty', label: t('inquiryTypes.warranty') },
    { value: 'partnership', label: t('inquiryTypes.partnership') }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f2' }}>
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#2e2e2e' }}>
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:scale-105"
              >
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${info.color}20` }}
                >
                  <IconComponent className="h-8 w-8" style={{ color: info.color }} />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#2e2e2e' }}>
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    detail && (
                      <p key={idx} className="text-gray-600">
                        {detail}
                      </p>
                    )
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#2e2e2e' }}>
                {t('form.title')}
              </h2>
              <p className="text-gray-600">
                {t('form.description')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    {t('form.name')} {t('form.required')}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                      style={{ '--tw-ring-color': '#669999' }}
                      placeholder={t('form.namePlaceholder')}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    {t('form.email')} {t('form.required')}
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
                      style={{ '--tw-ring-color': '#669999' }}
                      placeholder={t('form.emailPlaceholder')}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Phone and Inquiry Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    {t('form.phone')}
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
                      style={{ '--tw-ring-color': '#669999' }}
                      placeholder={t('form.phonePlaceholder')}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    {t('form.inquiryType')}
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all appearance-none"
                      style={{ '--tw-ring-color': '#669999' }}
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                  {t('form.subject')} {t('form.required')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': '#669999' }}
                  placeholder={t('form.subjectPlaceholder')}
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                  {t('form.message')} {t('form.required')}
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all resize-none"
                    style={{ '--tw-ring-color': '#669999' }}
                    placeholder={t('form.messagePlaceholder')}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                style={{ backgroundColor: '#669999' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5a8585'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#669999'}
              >
                <Send className="h-5 w-5" />
                <span>{t('form.sendButton')}</span>
              </button>
            </form>
          </div>

          {/* Map and Additional Info */}
          <div className="space-y-8">
            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4" style={{ color: '#669999' }} />
                  <p className="text-gray-600 font-medium">{t('map.title')}</p>
                  <p className="text-sm text-gray-500">06 rue Ounnoughi Benghadfa, Ouled Brahem</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#2e2e2e' }}>
                {t('faq.title')}
              </h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold mb-2" style={{ color: '#669999' }}>
                    {t('faq.returnPolicy.question')}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t('faq.returnPolicy.answer')}
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold mb-2" style={{ color: '#669999' }}>
                    {t('faq.support.question')}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t('faq.support.answer')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#669999' }}>
                    {t('faq.payment.question')}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t('faq.payment.answer')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}