'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import OffersSlider from '@/components/OffersSlider';
import CategoriesSlider from '@/components/CategoriesSlider';
import MostRequestedProducts from '@/components/MostRequestedProducts';
import NewProducts from '@/components/NewProducts';
import ProductGallery from '@/components/ProductGallery';
import BestDeals from '@/components/BestDeals';
import BrandsSection from '@/components/BrandsSection';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import Footer from '@/components/Footer';
import './globals.css';
import { Settings } from "lucide-react";
import { getHomeProducts } from '@/lib/api';

export default function Home() {
  const [homeData, setHomeData] = useState({
    latest: [],
    bestSelling: [],
    discounted: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchHomeData() {
      setLoading(true);
      setError('');
      try {
        const data = await getHomeProducts();
        console.log('Fetched home data:', data);
        setHomeData({
          latest: data.latest || [],
          bestSelling: data.bestSelling || [],
          discounted: data.discounted || []
        });
      } catch (err) {
        setError('Failed to load home data.');
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchHomeData();
  }, []);
  
  console.log('Home data set:', homeData);
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="text-center py-12 text-lg text-gray-600">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="text-center py-12 text-lg text-red-600">{error}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <OffersSlider />
        <CategoriesSlider />
        <MostRequestedProducts products={homeData.bestSelling} />
        <NewProducts products={homeData.latest} />
        <ProductGallery />
        <BestDeals products={homeData.discounted} />
        <BrandsSection />
        <TestimonialsSlider />
      </main>
      <Footer />
    </div>
  );
}