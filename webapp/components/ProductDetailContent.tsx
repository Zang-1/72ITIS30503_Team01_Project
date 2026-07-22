'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ProductActions from './ProductActions';

interface ProductDetailContentProps {
  id: number;
  name: string;
  price: number;
  imageFile: string;
  content: string;
  specifications: string;
}

export default function ProductDetailContent({ id, name, price, imageFile, content, specifications }: ProductDetailContentProps) {
  const { t } = useLanguage();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  return (
    <article className="p-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
      {/* Cột ảnh */}
      <div className="w-full md:w-1/2">
        <img 
          src={imageFile} 
          alt={name} 
          className="w-full rounded-xl border border-gray-800 object-cover bg-zinc-900" 
        />
      </div>
      
      {/* Cột thông tin */}
      <div className="w-full md:w-1/2">
        {/* Luật của thầy: Duy nhất 1 thẻ H1 trên trang */}
        <h1 className="text-3xl font-bold text-orange-500 mb-4">
          {name}
        </h1>
        
        <p className="text-3xl font-bold text-emerald-500 mb-6">
          {formatCurrency(price)}
        </p>

        {/* Nút thêm vào giỏ hàng và tùy chọn */}
        <div className="mb-10">
          <ProductActions id={id} title={name} price={price} imageUrl={imageFile} />
        </div>

        {/* Phân cấp nhỏ hơn phải dùng H2, rồi tới H3 */}
        <h2 className="text-2xl font-bold text-amber-500 mb-4 pb-2 border-b border-gray-800">
          {t('product_features')}
        </h2>
        <div className="text-gray-300 mb-8 leading-relaxed whitespace-pre-wrap">
          {content}
        </div>

        <h3 className="text-xl font-bold text-cyan-500 mb-4 pb-2 border-b border-gray-800">
          {t('product_specs')}
        </h3>
        <div className="text-gray-300 space-y-2 whitespace-pre-wrap">
          {specifications}
        </div>
      </div>
    </article>
  );
}
