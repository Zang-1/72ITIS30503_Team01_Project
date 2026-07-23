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
  /** Optional strike-through original price to show a discount badge */
  regularPrice?: number | null;
  badge?: 'new' | 'hot' | null;
}

// Dictionary dịch tên sản phẩm VN → EN
const viToEnMap: Record<string, string> = {
  'Vợt Cầu Lông': 'Badminton Racket',
  'Vợt Tennis': 'Tennis Racket',
  'Vợt Pickleball': 'Pickleball Paddle',
  'Giày Cầu Lông': 'Badminton Shoes',
  'Giày Tennis': 'Tennis Shoes',
  'Quấn Cán Vợt': 'Racket Grip Tape',
  'Ống Cầu Lông': 'Shuttlecock Tube',
  'Bao Vợt': 'Racket Bag',
  'Bóng Tennis': 'Tennis Ball',
  'Bóng Pickleball': 'Pickleball Ball',
  'Dây Căng Vợt': 'Racket String',
  'Chính Hãng': 'Authentic',
  'Cao Cấp': 'Premium',
  'Tiêu Chuẩn Thi Đấu': 'Tournament Standard',
  'Chống Trơn': 'Anti-Slip',
};

function translateTitle(text: string): string {
  let result = text;
  const sortedKeys = Object.keys(viToEnMap).sort((a, b) => b.length - a.length);
  for (const vi of sortedKeys) {
    result = result.replaceAll(vi, viToEnMap[vi]);
  }
  return result;
}

export default function ProductCard({
  id,
  title,
  price,
  imageUrl,
  slug,
  categorySlug,
  regularPrice = null,
  badge = null,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { locale, t } = useLanguage();

  const displayTitle = locale === 'en' ? translateTitle(title) : title;
  const href = `/${categorySlug}/${slug}`;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  const hasDiscount = !!regularPrice && regularPrice > price;
  const percent = hasDiscount ? Math.round(((regularPrice! - price) / regularPrice!) * 100) : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      title: displayTitle,
      price,
      imageUrl: imageUrl || '/vot-cau-long-yonex.jpg',
    });
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-ink-300 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-accent-500 hover:shadow-[0_10px_28px_-12px_rgba(11,93,138,.35)]">
      {/* badges */}
      <div className="pointer-events-none absolute left-0 top-3 z-10 flex flex-col gap-1.5">
        {hasDiscount && (
          <span className="rounded-r-md bg-[#dc2626] px-2 py-1 text-[11px] font-bold text-white shadow-sm">
            -{percent}%
          </span>
        )}
        {badge === 'new' && (
          <span className="rounded-r-md bg-brand-500 px-2 py-1 text-[11px] font-bold text-white shadow-sm">
            {t('product_new_badge')}
          </span>
        )}
        {badge === 'hot' && (
          <span className="rounded-r-md bg-accent-500 px-2 py-1 text-[11px] font-bold text-white shadow-sm">
            {t('product_hot_badge')}
          </span>
        )}
      </div>

      {/* image */}
      <Link href={href} className="block aspect-square w-full overflow-hidden bg-ink-50 p-3">
        <img
          src={imageUrl || '/vot-cau-long-yonex.jpg'}
          alt={displayTitle}
          loading="lazy"
          className="h-full w-full rounded-lg object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* body */}
      <div className="flex flex-1 flex-col p-3.5 pt-2.5">
        <Link href={href}>
          <h3 className="ss-line-clamp-2 min-h-[38px] text-[13.5px] font-semibold leading-[1.4] text-ink-900 transition-colors hover:text-accent-600">
            {displayTitle}
          </h3>
        </Link>

        {/* rating placeholder — visual trust signal */}
        <div className="mt-1.5 flex items-center gap-1 text-accent-500">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
            </svg>
          ))}
          <span className="ml-1 text-[11px] font-medium text-ink-500">(5.0)</span>
        </div>

        <div className="mt-auto pt-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-[16px] font-extrabold text-[#dc2626]">{formatCurrency(price)}</span>
            {hasDiscount && (
              <span className="text-[12px] font-medium text-ink-500 line-through">
                {formatCurrency(regularPrice!)}
              </span>
            )}
          </div>

          <div className="mt-2.5 flex gap-2">
            <Link
              href={href}
              className="flex-1 rounded-lg border border-ink-300 px-2 py-2 text-center text-[12px] font-semibold text-ink-700 transition-all hover:border-brand-500 hover:text-brand-600"
            >
              {t('product_details')}
            </Link>
            <button
              onClick={handleAdd}
              title={t('product_add_short')}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-accent-500 px-3 py-2 text-[12px] font-bold text-white transition-all hover:bg-accent-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <span className="hidden sm:inline">{t('product_add')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
