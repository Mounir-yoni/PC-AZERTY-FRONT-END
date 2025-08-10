import ProductClientView from './ProductClientView';
import { getProduct } from '@/lib/api';
import { notFound } from 'next/navigation';

// Add ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  try {
    // Fetch all products from the API
    const res = await fetch('https://api.azertycomputer.com/api/v1/products?sort=-createdAt&limit=1000', {
      cache: 'no-store',
    });
    const data = await res.json();
    const products = data.data || [];
    return products.map((product) => ({ id: product._id.toString() }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ProductPage({ params }) {
  try {
    const productResponse = await getProduct(params.id);
    
    // Check if product exists
    if (!productResponse.data) {
      notFound();
    }
    
    const product = productResponse.data;
    return <ProductClientView product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}