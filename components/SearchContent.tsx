'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string | null;
  slug: string;
  categorySlug: string;
}

export default function SearchContent({ query, products }: { query: string; products: Product[] }) {
  const { t } = useLanguage();

  return (
    <>
      <Breadcrumb items={[{ label: t('search_title') }]} />

      <div className="ss-container py-6">
        <div className="ss-card mb-5 px-5 py-4">
          <h1 className="text-[20px] font-extrabold text-ink-900 md:text-[24px]">{t('search_title')}</h1>
          {query && (
            <p className="mt-1 text-[13.5px] text-ink-500">
              {t('search_for')}: <b className="text-accent-600">“{query}”</b> — {products.length}{' '}
              {t('search_found')}
            </p>
          )}
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        ) : (
          <div className="ss-card grid place-items-center gap-3 px-6 py-16 text-center">
            <svg className="h-14 w-14 text-ink-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.4" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <p className="text-[15px] font-semibold text-ink-700">{t('search_empty')}</p>
            <p className="text-[13px] text-ink-500">{t('search_empty_hint')}</p>
            <Link href="/shop" className="mt-1 rounded-lg bg-accent-500 px-5 py-2.5 text-[13px] font-bold text-white hover:bg-accent-600">
              {t('cart_continue_shopping')}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
