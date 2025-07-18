'use client';

import { Users, Award, Truck, Shield, Heart, Zap, Target, Globe } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const stats = [
    { number: '10+', label: 'Years Experience', icon: Award },
    { number: '50K+', label: 'Happy Customers', icon: Users },
    { number: '100K+', label: 'Products Sold', icon: Truck },
    { number: '99.9%', label: 'Uptime Guarantee', icon: Shield }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make is centered around providing the best possible experience for our customers.',
      color: '#669999'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We stay ahead of technology trends to bring you the latest and most advanced products.',
      color: '#669999'
    },
    {
      icon: Target,
      title: 'Quality Assurance',
      description: 'We rigorously test every product to ensure it meets our high standards before reaching you.',
      color: '#669999'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving customers worldwide with fast shipping and localized support in multiple languages.',
      color: '#669999'
    }
  ];


  const timeline = [
    {
      year: '2014',
      title: 'Company Founded',
      description: 'Started as a small computer repair shop with a vision to democratize technology access.'
    },
    {
      year: '2016',
      title: 'First Retail Location',
      description: 'Opened our flagship store in Silicon Valley, becoming a local tech destination.'
    },
    {
      year: '2018',
      title: 'Online Expansion',
      description: 'Launched our e-commerce platform, reaching customers nationwide.'
    },
    {
      year: '2020',
      title: 'Custom PC Division',
      description: 'Introduced custom PC building services and gaming system specialization.'
    },
    {
      year: '2022',
      title: 'Enterprise Solutions',
      description: 'Expanded into enterprise and professional workstation markets.'
    },
    {
      year: '2024',
      title: 'Global Presence',
      description: 'Now serving customers in over 50 countries with 24/7 support.'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f2' }}>
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#2e2e2e' }}>
              About AZerty
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              We're passionate about technology and committed to helping you find the perfect 
              computing solutions for your needs. From gaming enthusiasts to professional creators, 
              we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#669999' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5a8585'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#669999'}
              >
                Our Story
              </button>

            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4" style={{ backgroundColor: '#669999' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center text-white">
                    <IconComponent className="h-12 w-12 mx-auto mb-4 opacity-90" />
                    <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                    <div className="text-lg opacity-90">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6" style={{ color: '#2e2e2e' }}>
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  At AZerty, we believe technology should empower everyone to achieve their goals. 
                  Whether you're a gamer seeking the ultimate performance, a creator pushing the 
                  boundaries of digital art, or a professional building the next big thing, we're 
                  here to provide the tools you need.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Our commitment goes beyond just selling products. We're your technology partners, 
                  offering expert advice, comprehensive support, and solutions tailored to your 
                  unique requirements.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#669999' }}></div>
                    <span className="text-gray-700">Expert Consultation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#669999' }}></div>
                    <span className="text-gray-700">Custom Solutions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#669999' }}></div>
                    <span className="text-gray-700">Lifetime Support</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-24 w-24 mx-auto mb-4" style={{ color: '#669999' }} />
                    <p className="text-gray-600 font-medium">Building Technology Communities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4" style={{ backgroundColor: '#f5f5f2' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6" style={{ color: '#2e2e2e' }}>
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide everything we do and shape how we serve our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:scale-105"
                  >
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${value.color}20` }}
                    >
                      <IconComponent className="h-8 w-8" style={{ color: value.color }} />
                    </div>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: '#2e2e2e' }}>
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        

        {/* Timeline Section */}
        <section className="py-20 px-4" style={{ backgroundColor: '#f5f5f2' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6" style={{ color: '#2e2e2e' }}>
                Our Journey
              </h2>
              <p className="text-xl text-gray-600">
                A decade of growth, innovation, and customer success
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full" style={{ backgroundColor: '#669999' }}></div>
              
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4"
                          style={{ backgroundColor: '#669999' }}
                        >
                          {item.year.slice(-2)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold" style={{ color: '#2e2e2e' }}>
                            {item.title}
                          </h3>
                          <p className="text-sm" style={{ color: '#669999' }}>
                            {item.year}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white" style={{ backgroundColor: '#669999' }}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4" style={{ backgroundColor: '#669999' }}>
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Join the AZerty Family?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Experience the difference that expert knowledge and personalized service can make. 
              Let's build something amazing together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                style={{ color: '#669999' }}
              >
                Shop Now
              </button>
              <button className="px-8 py-3 border-2 border-white rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-gray-800">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}