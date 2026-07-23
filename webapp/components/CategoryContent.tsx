'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import { translateCategoryName } from '@/lib/categoryTranslations';

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string | null;
  slug: string;
  categorySlug: string;
}

interface SiblingCategory {
  id: number;
  name: string;
  slug: string;
}

interface CategoryContentProps {
  categoryName: string;
  categorySlug: string;
  products: Product[];
  siblings?: SiblingCategory[];
  parentName?: string | null;
  parentSlug?: string | null;
}

type SortKey = 'default' | 'price_asc' | 'price_desc' | 'name_asc';
type PriceKey = 'all' | 'p1' | 'p2' | 'p3' | 'p4';

const PRICE_RANGES: Record<PriceKey, [number, number]> = {
  all: [0, Number.MAX_SAFE_INTEGER],
  p1: [0, 1_000_000],
  p2: [1_000_000, 3_000_000],
  p3: [3_000_000, 5_000_000],
  p4: [5_000_000, Number.MAX_SAFE_INTEGER],
};

export default function CategoryContent({
  categoryName,
  categorySlug,
  products,
  siblings = [],
  parentName = null,
  parentSlug = null,
}: CategoryContentProps) {
  const { t, locale } = useLanguage();
  const displayCategoryName = translateCategoryName(categoryName, locale);
  const displayParentName = parentName ? translateCategoryName(parentName, locale) : null;
  const [sort, setSort] = useState<SortKey>('default');
  const [price, setPrice] = useState<PriceKey>('all');

  const visible = useMemo(() => {
    const [min, max] = PRICE_RANGES[price];
    const list = products.filter((p) => p.price >= min && p.price < max);
    switch (sort) {
      case 'price_asc':
        return [...list].sort((a, b) => a.price - b.price);
      case 'price_desc':
        return [...list].sort((a, b) => b.price - a.price);
      case 'name_asc':
        return [...list].sort((a, b) => a.title.localeCompare(b.title, 'vi'));
      default:
        return list;
    }
  }, [products, sort, price]);

  const priceOptions: { key: PriceKey; label: string }[] = [
    { key: 'all', label: t('filter_price_all') },
    { key: 'p1', label: t('filter_price_1') },
    { key: 'p2', label: t('filter_price_2') },
    { key: 'p3', label: t('filter_price_3') },
    { key: 'p4', label: t('filter_price_4') },
  ];

  const crumbs = displayParentName && parentSlug
    ? [{ label: displayParentName, href: `/${parentSlug}` }, { label: displayCategoryName }]
    : [{ label: displayCategoryName }];

  return (
    <>
      <Breadcrumb items={crumbs} />

      <div className="ss-container py-6">
        <div className="grid gap-6 lg:grid-cols-[248px_1fr]">
          {/* ================= SIDEBAR ================= */}
          <aside className="space-y-4">
            {siblings.length > 0 && (
              <div className="ss-card overflow-hidden">
                <div className="border-b border-ink-300 bg-ink-50 px-4 py-2.5 text-[13px] font-bold uppercase tracking-wide text-ink-900">
                  {t('category_other')}
                </div>
                <ul className="p-2">
                  {siblings.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/${s.slug}`}
                        className={`block rounded-md px-3 py-2 text-[13.5px] transition-colors ${
                          s.slug === categorySlug
                            ? 'bg-accent-50 font-bold text-accent-600'
                            : 'text-ink-700 hover:bg-ink-50 hover:text-brand-600'
                        }`}
                      >
                        {translateCategoryName(s.name, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="ss-card overflow-hidden">
              <div className="border-b border-ink-300 bg-ink-50 px-4 py-2.5 text-[13px] font-bold uppercase tracking-wide text-ink-900">
                {t('category_filter_price')}
              </div>
              <ul className="p-2">
                {priceOptions.map((o) => (
                  <li key={o.key}>
                    <button
                      onClick={() => setPrice(o.key)}
                      className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13.5px] transition-colors ${
                        price === o.key ? 'font-bold text-accent-600' : 'text-ink-700 hover:bg-ink-50'
                      }`}
                    >
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                          price === o.key ? 'border-accent-500' : 'border-ink-300'
                        }`}
                      >
                        {price === o.key && <span className="h-2 w-2 rounded-full bg-accent-500" />}
                      </span>
                      {o.label}
                    </button>
                  </li>
                ))}
              </ul>
              {(price !== 'all' || sort !== 'default') && (
                <div className="border-t border-ink-300 p-2">
                  <button
                    onClick={() => {
                      setPrice('all');
                      setSort('default');
                    }}
                    className="w-full rounded-md px-3 py-2 text-[12.5px] font-semibold text-brand-600 hover:bg-brand-50"
                  >
                    {t('category_reset')}
                  </button>
                </div>
              )}
            </div>

            <div className="ss-card space-y-2.5 p-4">
              {[t('pd_trust_1'), t('pd_trust_2'), t('pd_trust_3'), t('pd_trust_4')].map((txt) => (
                <div key={txt} className="flex items-start gap-2 text-[12.5px] text-ink-700">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {txt}
                </div>
              ))}
            </div>
          </aside>

          {/* ================= MAIN ================= */}
          <div>
            <div className="ss-card mb-4 flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <h1 className="text-[20px] font-extrabold text-ink-900 md:text-[24px]">{displayCategoryName}</h1>
                <p className="mt-0.5 text-[12.5px] text-ink-500">
                  {t('category_showing')} <b className="text-ink-900">{visible.length}</b> {t('category_products')}
                </p>
              </div>

              <label className="flex items-center gap-2 text-[13px] text-ink-700">
                <span className="hidden sm:inline">{t('category_sort_label')}:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-lg border border-ink-300 bg-white px-3 py-2 text-[13px] font-medium text-ink-900"
                >
                  <option value="default">{t('sort_default')}</option>
                  <option value="price_asc">{t('sort_price_asc')}</option>
                  <option value="price_desc">{t('sort_price_desc')}</option>
                  <option value="name_asc">{t('sort_name_asc')}</option>
                </select>
              </label>
            </div>

            {visible.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {visible.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            ) : (
              <div className="ss-card grid place-items-center gap-3 px-6 py-16 text-center">
                <svg className="h-14 w-14 text-ink-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.4" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <p className="text-[14px] font-semibold text-ink-700">{t('category_no_products')}</p>
                <Link
                  href="/shop"
                  className="rounded-lg bg-accent-500 px-5 py-2.5 text-[13px] font-bold text-white hover:bg-accent-600"
                >
                  {t('cart_continue_shopping')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
