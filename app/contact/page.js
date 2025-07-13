'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User, Building } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ContactPage() {
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
      title: 'Visit Our Store',
      details: ['123 Tech Street', 'Silicon Valley, CA 94000'],
      color: '#669999'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['(555) 123-4567', 'Mon-Fri: 9AM-6PM PST'],
      color: '#669999'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@techhub.com', 'support@techhub.com'],
      color: '#669999'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9AM-6PM', 'Sat: 10AM-4PM', 'Sun: Closed'],
      color: '#669999'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'sales', label: 'Sales Question' },
    { value: 'warranty', label: 'Warranty Claim' },
    { value: 'partnership', label: 'Business Partnership' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f2' }}>
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#2e2e2e' }}>
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our products or need technical support? We're here to help! 
            Reach out to our expert team and get the assistance you need.
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
                    <p key={idx} className="text-gray-600">
                      {detail}
                    </p>
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
                Send us a Message
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    Full Name *
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
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    Email Address *
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
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Phone and Inquiry Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    Phone Number
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
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                    Inquiry Type
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
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': '#669999' }}
                  placeholder="Brief description of your inquiry"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#2e2e2e' }}>
                  Message *
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
                    placeholder="Please provide details about your inquiry..."
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
                <span>Send Message</span>
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
                  <p className="text-gray-600 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-500">123 Tech Street, Silicon Valley</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#2e2e2e' }}>
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold mb-2" style={{ color: '#669999' }}>
                    What are your return policies?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We offer a 30-day return policy on all products with original packaging and receipt.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold mb-2" style={{ color: '#669999' }}>
                    Do you offer technical support?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Yes! Our expert technicians provide free technical support for all purchased products.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#669999' }}>
                    What payment methods do you accept?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We accept all major credit cards, PayPal, and financing options through our partners.
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