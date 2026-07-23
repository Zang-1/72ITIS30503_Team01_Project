'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';
import { translateCategoryName } from '@/lib/categoryTranslations';
import type { NavParent } from '@/lib/categories';

export default function ShopContent({
  groups,
  counts,
}: {
  groups: NavParent[];
  counts: Record<number, number>;
}) {
  const { t, locale } = useLanguage();

  const totalFor = (g: NavParent) =>
    (counts[g.id] ?? 0) + g.children.reduce((sum, c) => sum + (counts[c.id] ?? 0), 0);

  return (
    <>
      <Breadcrumb items={[{ label: t('nav_shop') }]} />

      <div className="ss-container py-8">
        <header className="mb-6 text-center">
          <h1 className="text-[24px] font-extrabold text-ink-900 md:text-[28px]">{t('shop_title')}</h1>
          <p className="mt-1.5 text-[14px] text-ink-500">{t('shop_subtitle')}</p>
        </header>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <section key={g.id} className="ss-card overflow-hidden transition-shadow hover:shadow-md">
              <Link href={`/${g.slug}`} className="block bg-brand-500 px-5 py-4 text-white">
                <h2 className="text-[17px] font-extrabold">{translateCategoryName(g.name, locale)}</h2>
                <p className="mt-0.5 text-[12.5px] text-white/70">
                  {totalFor(g)} {t('category_products')}
                </p>
              </Link>

              <ul className="divide-y divide-ink-300">
                {g.children.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/${c.slug}`}
                      className="flex items-center justify-between px-5 py-3 text-[13.5px] text-ink-700 transition-colors hover:bg-ink-50 hover:text-accent-600"
                    >
                      <span>{translateCategoryName(c.name, locale)}</span>
                      <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[11.5px] font-semibold text-ink-500">
                        {counts[c.id] ?? 0}
                      </span>
                    </Link>
                  </li>
                ))}
                {g.children.length === 0 && (
                  <li className="px-5 py-3 text-[13px] text-ink-500">{t('category_no_products')}</li>
                )}
              </ul>

              <div className="border-t border-ink-300 p-3">
                <Link
                  href={`/${g.slug}`}
                  className="block rounded-lg bg-accent-500 py-2.5 text-center text-[13px] font-bold text-white hover:bg-accent-600"
                >
                  {t('shop_explore')}
                </Link>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
