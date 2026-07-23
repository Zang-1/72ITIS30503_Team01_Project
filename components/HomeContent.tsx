'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';
import { translateCategoryName } from '@/lib/categoryTranslations';

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string | null;
  slug: string;
  categorySlug: string;
}

interface SportGroup {
  id: number;
  name: string;
  slug: string;
  children: { id: number; name: string; slug: string }[];
}

interface HomeContentProps {
  latestProducts: Product[];
  premiumProducts: Product[];
  sportGroups?: SportGroup[];
}

/* ------------------------------ small pieces ------------------------------ */

function SectionTitle({ title, href, viewAll }: { title: string; href?: string; viewAll: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4 border-b-2 border-ink-300 pb-2.5">
      <h2 className="ss-section-title text-[19px] text-ink-900 md:text-[22px]">
        <span className="mr-2 inline-block h-4 w-1.5 translate-y-0.5 rounded-sm bg-accent-500" />
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-[13px] font-semibold text-brand-600 hover:text-accent-600 hover:underline"
        >
          {viewAll} →
        </Link>
      )}
    </div>
  );
}

const policyIcons = [
  <svg key="a" className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-6m0-13.5V14.25m0 0H2.25m13.5 0V5.25" />
  </svg>,
  <svg key="b" className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
  </svg>,
  <svg key="c" className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
  </svg>,
  <svg key="d" className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>,
];

/* --------------------------------- page ---------------------------------- */

export default function HomeContent({ latestProducts, premiumProducts, sportGroups = [] }: HomeContentProps) {
  const { t, locale } = useLanguage();

  const policies = [
    { t: t('policy_ship_title'), d: t('policy_ship_desc') },
    { t: t('policy_quality_title'), d: t('policy_quality_desc') },
    { t: t('policy_pay_title'), d: t('policy_pay_desc') },
    { t: t('policy_return_title'), d: t('policy_return_desc') },
  ];

  const brands = ['YONEX', 'VICTOR', 'LI-NING', 'WILSON', 'BABOLAT', 'HEAD', 'JOOLA', 'MIZUNO'];

  return (
    <div className="bg-[var(--page)]">
      {/* ============ HERO ============ */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-500 to-brand-600">
        <div className="ss-container grid gap-6 py-8 lg:grid-cols-[1fr_360px] lg:py-10">
          {/* main banner */}
          <div className="relative overflow-hidden rounded-2xl bg-white/5 p-7 ring-1 ring-white/15 md:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-500/15 px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-accent-500 ring-1 ring-accent-500/40">
              {t('hero_badge')}
            </span>
            <h1 className="mt-4 max-w-[16ch] text-[30px] font-black leading-[1.12] text-white md:text-[42px]">
              {t('hero_title')}
            </h1>
            <p className="mt-3 max-w-[46ch] text-[14.5px] leading-relaxed text-white/75 md:text-[15.5px]">
              {t('hero_subtitle')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-lg bg-accent-500 px-6 py-3 text-[14px] font-bold text-white shadow-lg shadow-black/20 transition-all hover:bg-accent-600"
              >
                {t('hero_cta')}
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-white/30 px-6 py-3 text-[14px] font-bold text-white transition-all hover:bg-white/10"
              >
                {t('nav_contact')}
              </Link>
            </div>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-white/15 pt-5">
              {[
                { n: '29+', l: t('hero_stat_products') },
                { n: '8', l: t('hero_stat_brands') },
                { n: '24/7', l: t('hero_stat_support') },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-[22px] font-black text-accent-500">{s.n}</div>
                  <div className="text-[11.5px] leading-tight text-white/65">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* side promos */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="flex flex-col justify-between rounded-2xl bg-accent-500 p-5 text-white">
              <div>
                <div className="text-[12px] font-bold uppercase tracking-wider text-white/80">
                  {t('home_deal_title')}
                </div>
                <div className="mt-1.5 text-[19px] font-black leading-tight">XUAN2026</div>
                <p className="mt-1.5 text-[12.5px] leading-snug text-white/85">{t('home_deal_desc')}</p>
              </div>
              <Link
                href="/shop"
                className="mt-4 inline-block w-fit rounded-lg bg-white px-4 py-2 text-[12.5px] font-bold text-accent-600 hover:bg-white/90"
              >
                {t('home_deal_cta')}
              </Link>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white p-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                {policyIcons[0]}
              </div>
              <div>
                <div className="text-[14px] font-bold text-ink-900">{t('policy_ship_title')}</div>
                <p className="mt-0.5 text-[12.5px] leading-snug text-ink-500">{t('home_ship_banner')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ POLICY STRIP ============ */}
      <section className="border-b border-ink-300 bg-white">
        <div className="ss-container grid grid-cols-2 gap-x-6 gap-y-4 py-5 lg:grid-cols-4">
          {policies.map((p, i) => (
            <div key={p.t} className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-50 text-accent-600">
                {policyIcons[i]}
              </div>
              <div className="min-w-0">
                <div className="truncate text-[13.5px] font-bold text-ink-900">{p.t}</div>
                <div className="truncate text-[12px] text-ink-500">{p.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="ss-container py-8 md:py-10">
        {/* ============ SHOP BY SPORT ============ */}
        {sportGroups.length > 0 && (
          <section className="mb-10">
            <SectionTitle title={t('home_by_sport')} viewAll={t('home_view_all')} href="/shop" />
            <div className="grid gap-4 md:grid-cols-3">
              {sportGroups.map((g) => (
                <div key={g.id} className="ss-card overflow-hidden p-5 transition-shadow hover:shadow-md">
                  <Link
                    href={`/${g.slug}`}
                    className="text-[16px] font-extrabold text-ink-900 hover:text-accent-600"
                  >
                    {translateCategoryName(g.name, locale)}
                  </Link>
                  <ul className="mt-3 space-y-1.5">
                    {g.children.slice(0, 5).map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/${c.slug}`}
                          className="flex items-center gap-2 text-[13.5px] text-ink-700 transition-colors hover:text-brand-600"
                        >
                          <span className="h-1 w-1 rounded-full bg-ink-300" />
                          {translateCategoryName(c.name, locale)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${g.slug}`}
                    className="mt-4 inline-block text-[12.5px] font-bold text-accent-600 hover:underline"
                  >
                    {t('home_view_all')} →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============ LATEST ============ */}
        <section className="mb-10">
          <SectionTitle title={t('latest_products')} viewAll={t('home_view_all')} href="/shop" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {latestProducts.map((p) => (
              <ProductCard key={p.id} {...p} badge="new" />
            ))}
          </div>
        </section>

        {/* ============ PREMIUM ============ */}
        <section className="mb-10">
          <SectionTitle title={t('premium_products')} viewAll={t('home_view_all')} href="/shop" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {premiumProducts.map((p) => (
              <ProductCard
                key={p.id}
                {...p}
                badge="hot"
                regularPrice={Math.round((p.price * 1.15) / 10000) * 10000}
              />
            ))}
          </div>
        </section>

        {/* ============ BRANDS ============ */}
        <section>
          <SectionTitle title={t('home_brands')} viewAll={t('home_view_all')} />
          <div className="ss-card overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-y divide-ink-300 sm:grid-cols-4">
              {brands.map((b) => (
                <Link
                  key={b}
                  href={`/search?q=${encodeURIComponent(b)}`}
                  className="grid h-[74px] place-items-center text-[15px] font-black tracking-wide text-ink-500 transition-colors hover:bg-ink-50 hover:text-brand-600"
                >
                  {b}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
