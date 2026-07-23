'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string | null;
  slug: string;
  categorySlug: string;
}

interface CategoryContentProps {
  categoryName: string;
  products: Product[];
}

// Dịch tên danh mục VN → EN
const categoryNameMap: Record<string, string> = {
  'Vợt Cầu Lông': 'Badminton Rackets',
  'Giày Cầu Lông': 'Badminton Shoes',
  'Balo Cầu Lông': 'Badminton Bags',
  'Tất Cầu Lông': 'Badminton Socks',
  'Phụ Kiện Cầu Lông': 'Badminton Accessories',
  'Đồ Cầu Lông': 'Badminton Equipment',
  'Vợt Tennis': 'Tennis Rackets',
  'Giày Tennis': 'Tennis Shoes',
  'Bóng & Phụ Kiện Tennis': 'Tennis Balls & Accessories',
  'Tennis': 'Tennis',
  'Vợt Pickleball': 'Pickleball Paddles',
  'Bóng Pickleball': 'Pickleball Balls',
  'Phụ Kiện Pickleball': 'Pickleball Accessories',
  'Pickleball': 'Pickleball',
};

export default function CategoryContent({ categoryName, products }: CategoryContentProps) {
  const { locale, t } = useLanguage();

  const displayCategoryName = locale === 'en' 
    ? (categoryNameMap[categoryName] || categoryName) 
    : categoryName;

  return (
    <div className="p-10 max-w-6xl mx-auto flex-grow">
      <h1 className="text-3xl font-bold text-orange-500 mb-2 border-l-4 border-orange-500 pl-4">
        {displayCategoryName}
      </h1>
      <p className="text-gray-400 mb-10">
        {t('category_label')} {displayCategoryName}
      </p>

      {/* Danh sách sản phẩm của Danh mục */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl}
              slug={product.slug}
              categorySlug={product.categorySlug}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500 bg-zinc-900 rounded-xl border border-zinc-800">
            {t('category_no_products')}
          </div>
        )}
      </div>
    </div>
  );
}
