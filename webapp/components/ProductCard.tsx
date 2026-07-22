'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  imageUrl: string | null;
  slug: string;
  categorySlug: string;
}

export default function ProductCard({ id, title, price, imageUrl, slug, categorySlug }: ProductCardProps) {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to detail page if clicking the card
    addToCart({
      id,
      title,
      price,
      imageUrl: imageUrl || '/vot-cau-long-yonex.jpg',
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/5">
      {/* Product Image */}
      <Link href={`/product/${categorySlug}/${slug}`} className="block aspect-square w-full overflow-hidden bg-zinc-950">
        <img
          src={imageUrl || '/vot-cau-long-yonex.jpg'}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
          <Link href={`/product/${categorySlug}/${slug}`}>
            <h3 className="text-sm font-bold text-zinc-100 hover:text-amber-500 line-clamp-2 transition-colors duration-200 min-h-[40px]">
              {title}
            </h3>
          </Link>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          {/* Price */}
          <div className="text-base font-black text-amber-500">
            {formatCurrency(price)}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link
              href={`/product/${categorySlug}/${slug}`}
              className="flex-1 text-center px-3 py-2 border border-zinc-700 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all"
            >
              {t('product_details')}
            </Link>
            <button
              onClick={handleAdd}
              className="flex-1 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-lg text-xs tracking-wider transition-all flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {t('product_add')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
