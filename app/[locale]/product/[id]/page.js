import ProductClientView from './ProductClientView';
import { getProduct } from '@/lib/api';
import { notFound } from 'next/navigation';

// إعادة بناء الصفحة كل ساعة
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    // جلب جميع المنتجات
    const res = await fetch(
      'https://api.azertycomputer.com/api/v1/products?sort=-createdAt&limit=1000',
      { cache: 'no-store' }
    );

    const data = await res.json();
    const products = data.data || [];

    // اللغات المدعومة
    const locales = ['fr', 'en'];

    // توليد باراميترات لكل لغة ولكل منتج
    const params = [];
    for (const locale of locales) {
      for (const product of products) {
        params.push({
          locale,
          id: product._id.toString(),
        });
      }
    }

    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ProductPage({ params }) {
  try {
    // جلب المنتج
    const productResponse = await getProduct(params.id);

    // إذا لم يوجد المنتج
    if (!productResponse.data) {
      notFound();
    }

    const product = productResponse.data;
    return <ProductClientView product={product} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}
