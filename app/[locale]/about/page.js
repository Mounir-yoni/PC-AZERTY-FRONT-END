'use client';

import { Users, Award, Truck, Shield, Heart, Zap, Target, Globe } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function AboutPage() {
  const t = useTranslations('About');
  const stats = [
    { number: '10+', label: t('stats.years'), icon: Award },
    { number: '50K+', label: t('stats.customers'), icon: Users },
    { number: '100K+', label: t('stats.products'), icon: Truck },
    { number: '99.9%', label: t('stats.uptime'), icon: Shield }
  ];

  const values = [
    {
      icon: Heart,
      title: t('values.customer'),
      description: t('values.customer_description'),
      color: '#669999'
    },
    {
      icon: Zap,
      title: t('values.innovation'),
      description: t('values.innovation_description'),
      color: '#669999'
    },
    {
      icon: Target,
      title: t('values.quality'),
      description: t('values.quality_description'),
      color: '#669999'
    },
    {
      icon: Globe,
      title: t('values.global'),
      description: t('values.global_description'),
      color: '#669999'
    }
  ];


  const timeline = [
    {
      year: '2014',
      title: t('timeline.company'),
      description: t('timeline.company_description')
    },
    {
      year: '2016',
      title: t('timeline.location'),
      description: t('timeline.location_description')
    },
    {
      year: '2018',
      title: t('timeline.online'),
      description: t('timeline.online_description')
    },
    {
      year: '2020',
      title: t('timeline.custom'),
      description: t('timeline.custom_description')
    },
    {
      year: '2022',
      title: t('timeline.enterprise'),
      description: t('timeline.enterprise_description')
    },
    {
      year: '2024',
      title: t('timeline.global'),
      description: t('timeline.global_description')
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
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              {t('description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#669999' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5a8585'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#669999'}
              >
                {t('button')}
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
                  {t('mission.title')}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {t('mission.description')}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {t('mission.commitment')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#669999' }}></div>
                    <span className="text-gray-700">{t('mission.expert_consultation')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#669999' }}></div>
                    <span className="text-gray-700">{t('mission.custom_solutions')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#669999' }}></div>
                    <span className="text-gray-700">{t('mission.lifetime_support')}</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-24 w-24 mx-auto mb-4" style={{ color: '#669999' }} />
                    <p className="text-gray-600 font-medium">{t('mission.building_technology_communities')}</p>
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
                {t('values.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('values.description')}
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
                {t('timeline.title')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('timeline.description')}
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
              {t('cta.title')}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {t('cta.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                style={{ color: '#669999' }}
              >
                {t('cta.button')}
              </button>
              <button className="px-8 py-3 border-2 border-white rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-gray-800">
                {t('cta.button')}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}