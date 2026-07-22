'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface ProductDetailContentProps {
  name: string;
  price: string;
  imageFile: string;
  content: string;
}

export default function ProductDetailContent({ name, price, imageFile, content }: ProductDetailContentProps) {
  const { t } = useLanguage();

  return (
    <article className="p-10 max-w-4xl">
      {/* Luật của thầy: Duy nhất 1 thẻ H1 trên trang */}
      <h1 className="text-3xl font-bold text-[#fd7e14] mb-4">
        {name}
      </h1>
      
      <p className="text-xl font-bold text-[#28a745] mb-6">
        {t('product_price_label')} {price}
      </p>

      {/* Luật của thầy: Thẻ ảnh lấy đúng tên file và có alt chứa từ khóa */}
      <img 
        src={`/${imageFile}`} 
        alt="Vợt cầu lông Yonex Astrox 88D chính hãng" 
        className="max-w-md w-full mb-8 rounded border border-gray-700" 
      />

      {/* Phân cấp nhỏ hơn phải dùng H2, rồi tới H3 */}
      <h2 className="text-2xl font-bold text-[#ffc107] mb-3">
        {t('product_features')}
      </h2>
      <p className="text-gray-300 mb-8 leading-relaxed">
        {content}
      </p>

      <h3 className="text-xl font-bold text-[#17a2b8] mb-3">
        {t('product_specs')}
      </h3>
      <ul className="list-disc ml-6 text-gray-300 space-y-2">
        <li>{t('product_stiffness')}</li>
        <li>{t('product_weight_spec')}</li>
      </ul>
    </article>
  );
}
