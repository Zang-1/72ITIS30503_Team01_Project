'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { translateCategoryName } from '@/lib/categoryTranslations';
import type { NavParent } from '@/lib/categories';

const HOTLINE = '1900 6969 39';

const I = {
  phone: (c = '') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  ),
  pin: (c = '') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  ),
  book: (c = '') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  search: (c = '') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  ),
  user: (c = '') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  ),
  cart: (c = '') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  ),
  grid: (c = '') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  chevron: (c = '') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" strokeWidth="2.4" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  ),
  right: (c = '') => (
    <svg className={c} fill="none" viewBox="0 0 24 24" strokeWidth="2.4" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  ),
};

export default function Header({ categories }: { categories: NavParent[] }) {
  const { totalItems, setIsOpen } = useCart();
  const { locale, setLocale, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState('');
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeParent, setActiveParent] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    }
    if (megaOpen) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [megaOpen]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const hotKeywords = ['Yonex', 'Victor', 'Pickleball', 'Lining'];
  const firstParent = categories[0];
  const currentParent = activeParent ?? firstParent?.id ?? null;

  return (
    <header className="sticky top-0 z-50 ss-no-print">
      {/* TOP BAR */}
      <div className="hidden md:block bg-brand-700 text-white/90 text-[12.5px]">
        <div className="ss-container flex h-9 items-center justify-between">
          <div className="flex items-center gap-5">
            <a href={`tel:${HOTLINE.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-white">
              {I.phone('w-3.5 h-3.5')}
              <span>{t('topbar_hotline')}: <b className="text-accent-500">{HOTLINE}</b></span>
            </a>
            <Link href="/contact" className="flex items-center gap-1.5 hover:text-white">
              {I.pin('w-3.5 h-3.5')} {t('topbar_stores')}
            </Link>
            <Link href="/shop" className="flex items-center gap-1.5 hover:text-white">
              {I.book('w-3.5 h-3.5')} {t('topbar_guide')}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/70">{t('topbar_freeship')}</span>
            <button
              onClick={() => setLocale(locale === 'vi' ? 'en' : 'vi')}
              className="flex items-center gap-1.5 rounded-full border border-white/25 px-2.5 py-0.5 hover:bg-white/10"
              title={locale === 'vi' ? 'Switch to English' : 'Chuyen sang Tieng Viet'}
            >
              <span>{locale === 'vi' ? '\u{1F1FB}\u{1F1F3}' : '\u{1F1EC}\u{1F1E7}'}</span>
              <span className="font-semibold">{locale === 'vi' ? 'VI' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="bg-brand-500 text-white">
        <div className="ss-container flex h-[68px] items-center gap-4">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden -ml-1 rounded-md p-2 hover:bg-white/10"
            aria-label={t('nav_menu')}
          >
            {I.grid('w-6 h-6')}
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-500 text-[19px] font-black text-white shadow-sm">
              S
            </span>
            <span className="hidden sm:block text-[22px] font-black leading-none tracking-tight">
              Sport<span className="text-accent-500">Store</span>
              <span className="mt-0.5 block text-[10px] font-medium tracking-[0.16em] text-white/60">
                RACKET SPORTS
              </span>
            </span>
          </Link>

          <form onSubmit={submitSearch} className="mx-auto hidden w-full max-w-[560px] md:block">
            <div className="flex overflow-hidden rounded-full bg-white shadow-sm">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search_placeholder')}
                className="min-w-0 flex-1 border-0 bg-transparent px-5 py-2.5 text-[14px] text-ink-900 placeholder:text-ink-500 focus:shadow-none"
                aria-label={t('search_button')}
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-accent-500 px-5 text-[13px] font-bold text-white hover:bg-accent-600"
              >
                {I.search('w-4 h-4')}
                <span className="hidden lg:inline">{t('search_button')}</span>
              </button>
            </div>
            <div className="mt-1.5 hidden items-center gap-2 text-[11.5px] text-white/70 lg:flex">
              <span>{t('search_hot')}:</span>
              {hotKeywords.map((k) => (
                <Link key={k} href={`/search?q=${encodeURIComponent(k)}`} className="hover:text-white hover:underline">
                  {k}
                </Link>
              ))}
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1.5">
            <Link href="/account" className="hidden items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10 sm:flex">
              {I.user('w-5 h-5')}
              <span className="hidden text-[13px] font-semibold xl:block">{t('nav_account')}</span>
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10"
            >
              <span className="relative">
                {I.cart('w-6 h-6')}
                {mounted && totalItems > 0 && (
                  <span className="absolute -right-2 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent-500 px-1 text-[11px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </span>
              <span className="hidden text-[13px] font-semibold xl:block">{t('nav_cart')}</span>
            </button>
          </div>
        </div>

        <form onSubmit={submitSearch} className="ss-container pb-3 md:hidden">
          <div className="flex overflow-hidden rounded-full bg-white">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="min-w-0 flex-1 border-0 bg-transparent px-4 py-2.5 text-[14px] text-ink-900 placeholder:text-ink-500 focus:shadow-none"
            />
            <button type="submit" className="bg-accent-500 px-4 text-white">
              {I.search('w-4 h-4')}
            </button>
          </div>
        </form>
      </div>

      {/* NAV BAR */}
      <div className="border-b border-ink-300 bg-white shadow-sm">
        <div className="ss-container flex h-11 items-center gap-1">
          <div ref={megaRef} className="relative h-full">
            <button
              onClick={() => setMegaOpen((v) => !v)}
              className="flex h-full items-center gap-2 bg-accent-500 px-4 text-[13px] font-bold uppercase tracking-wide text-white hover:bg-accent-600"
            >
              {I.grid('w-4 h-4')}
              <span className="hidden sm:inline">{t('nav_all_categories')}</span>
              {I.chevron(`w-3.5 h-3.5 transition-transform ${megaOpen ? 'rotate-180' : ''}`)}
            </button>

            {megaOpen && categories.length > 0 && (
              <div className="ss-fade-up absolute left-0 top-full z-50 flex w-[min(920px,92vw)] overflow-hidden rounded-b-xl border border-t-0 border-ink-300 bg-white shadow-xl">
                <ul className="w-[240px] shrink-0 border-r border-ink-300 bg-ink-50 py-2">
                  {categories.map((p) => (
                    <li key={p.id} onMouseEnter={() => setActiveParent(p.id)}>
                      <Link
                        href={`/${p.slug}`}
                        className={`flex items-center justify-between px-4 py-2.5 text-[13.5px] font-semibold transition-colors ${
                          currentParent === p.id
                            ? 'bg-white text-accent-600'
                            : 'text-ink-700 hover:bg-white hover:text-accent-600'
                        }`}
                      >
                        {translateCategoryName(p.name, locale)}
                        {I.right('w-3 h-3 opacity-50')}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="flex-1 p-5">
                  {categories
                    .filter((p) => p.id === currentParent)
                    .map((p) => (
                      <div key={p.id}>
                        <Link
                          href={`/${p.slug}`}
                          className="mb-3 inline-block text-[12px] font-bold uppercase tracking-wider text-accent-600 hover:underline"
                        >
                          {translateCategoryName(p.name, locale)}
                        </Link>
                        <ul className="grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-3">
                          {p.children.map((c) => (
                            <li key={c.id}>
                              <Link
                                href={`/${c.slug}`}
                                className="block truncate rounded px-2 py-1.5 text-[13.5px] text-ink-700 hover:bg-brand-50 hover:text-brand-600"
                              >
                                {translateCategoryName(c.name, locale)}
                              </Link>
                            </li>
                          ))}
                          {p.children.length === 0 && <li className="px-2 py-1.5 text-[13px] text-ink-500">-</li>}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <nav className="hidden items-center lg:flex">
            {[
              { href: '/', label: t('nav_home') },
              { href: '/shop', label: t('nav_shop') },
              ...categories.slice(0, 3).map((p) => ({ href: `/${p.slug}`, label: translateCategoryName(p.name, locale) })),
              { href: '/contact', label: t('nav_contact') },
            ].map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className={`px-3.5 py-2.5 text-[13.5px] font-semibold transition-colors ${
                  pathname === l.href ? 'text-accent-600' : 'text-ink-700 hover:text-accent-600'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="ss-fade-up absolute inset-x-0 z-50 max-h-[70vh] overflow-y-auto border-b border-ink-300 bg-white shadow-xl">
            <nav className="p-3">
              <Link href="/" className="block rounded px-3 py-2.5 text-[14px] font-semibold text-ink-900 hover:bg-ink-50">
                {t('nav_home')}
              </Link>
              {categories.map((p) => (
                <div key={p.id} className="border-t border-ink-100 pt-1">
                  <Link href={`/${p.slug}`} className="block rounded px-3 py-2.5 text-[14px] font-bold text-accent-600">
                    {translateCategoryName(p.name, locale)}
                  </Link>
                  <ul className="pb-1">
                    {p.children.map((c) => (
                      <li key={c.id}>
                        <Link href={`/${c.slug}`} className="block rounded px-6 py-2 text-[13.5px] text-ink-700 hover:bg-ink-50">
                          {translateCategoryName(c.name, locale)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="border-t border-ink-100 pt-1">
                <Link href="/contact" className="block rounded px-3 py-2.5 text-[14px] font-semibold text-ink-900 hover:bg-ink-50">
                  {t('nav_contact')}
                </Link>
                <Link href="/account" className="block rounded px-3 py-2.5 text-[14px] font-semibold text-ink-900 hover:bg-ink-50">
                  {t('nav_account')}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
