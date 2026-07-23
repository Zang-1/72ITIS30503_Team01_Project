'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const HOTLINE = '1900 6969 39';

export default function Footer() {
  const { t } = useLanguage();

  const policies = [
    { href: '/policy/return', label: t('footer_return_policy') },
    { href: '/policy/warranty', label: t('footer_warranty_policy') },
    { href: '/policy/shipping', label: t('footer_shipping_policy') },
    { href: '/policy/privacy', label: t('footer_privacy_policy') },
  ];

  const support = [
    { href: '/guide/buying', label: t('footer_buying_guide') },
    { href: '/guide/racket', label: t('footer_racket_guide') },
    { href: '/order-tracking', label: t('footer_order_tracking') },
    { href: '/contact', label: t('nav_contact') },
  ];

  return (
    <footer className="mt-auto w-full bg-brand-900 text-white/75 ss-no-print">
      {/* ===== hotline banner ===== */}
      <div className="bg-accent-500">
        <div className="ss-container flex flex-col items-center justify-center gap-2 py-3 text-center text-[13.5px] font-bold text-white sm:flex-row sm:gap-8">
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            {t('footer_hotline_label')}: {HOTLINE}
          </span>
          <span className="hidden text-white/50 sm:inline">|</span>
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {t('footer_working_hours')}: 8:00 – 21:00 ({t('footer_everyday')})
          </span>
        </div>
      </div>

      {/* ===== main ===== */}
      <div className="ss-container grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-12">
        {/* about */}
        <div className="lg:col-span-4">
          <Link href="/" className="mb-4 flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-500 text-[17px] font-black text-white">
              S
            </span>
            <span className="text-[19px] font-black text-white">
              Sport<span className="text-accent-500">Store</span>
            </span>
          </Link>
          <p className="text-[13px] leading-relaxed">{t('footer_about_desc')}</p>

          <ul className="mt-4 space-y-2 text-[13px]">
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-accent-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </span>
              <span>
                <b className="text-white">{t('footer_address')}:</b> {t('footer_address_value')}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="shrink-0 text-accent-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </span>
              <span>
                <b className="text-white">{t('footer_email')}:</b> support@sportstore.com
              </span>
            </li>
          </ul>
        </div>

        {/* policies */}
        <div className="lg:col-span-2">
          <h3 className="mb-3.5 text-[14px] font-bold uppercase tracking-wide text-accent-500">
            {t('footer_policies')}
          </h3>
          <ul className="space-y-2 text-[13px]">
            {policies.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="transition-colors hover:text-accent-500">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* support */}
        <div className="lg:col-span-2">
          <h3 className="mb-3.5 text-[14px] font-bold uppercase tracking-wide text-accent-500">
            {t('footer_support')}
          </h3>
          <ul className="space-y-2 text-[13px]">
            {support.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="transition-colors hover:text-accent-500">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* connect + payment + map */}
        <div className="space-y-5 lg:col-span-4">
          <div>
            <h3 className="mb-3 text-[14px] font-bold uppercase tracking-wide text-accent-500">
              {t('footer_connect')}
            </h3>
            <div className="flex gap-2.5">
              {[
                { label: 'Facebook', href: 'https://www.facebook.com/gain.baor', c: '#1877F2' },
                { label: 'YouTube', href: 'https://www.youtube.com/@file', c: '#FF0000' },
                { label: 'TikTok', href: 'https://www.tiktok.com/@shopvnbsports', c: '#FFFFFF' },
                { label: 'Zalo', href: 'https://zalo.me/0364888253', c: '#0068FF' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/5 text-[12px] font-bold transition-colors hover:bg-white/15"
                  style={{ color: s.c }}
                >
                  {s.label[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-[14px] font-bold uppercase tracking-wide text-accent-500">
              {t('footer_payment')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {['VISA', 'MASTERCARD', 'MoMo', 'COD'].map((p) => (
                <span
                  key={p}
                  className="rounded border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-white/80"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-[14px] font-bold uppercase tracking-wide text-accent-500">
              {t('footer_map_title')}
            </h3>
            <div className="overflow-hidden rounded-lg border border-white/10">
              <iframe
                src="https://www.google.com/maps?q=123+%C4%90%C6%B0%E1%BB%9Dng+Th%E1%BB%83+Thao%2C+Qu%E1%BA%ADn+1%2C+TP.+H%E1%BB%93+Ch%C3%AD+Minh&output=embed"
                width="100%"
                height="150"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SportStore Location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== bottom ===== */}
      <div className="border-t border-white/10">
        <div className="ss-container flex flex-col items-center justify-between gap-2.5 py-4 text-[12px] text-white/55 md:flex-row">
          <p>{t('footer_copyright_text')}</p>
          <div className="flex gap-4">
            <Link href="/policy/terms" className="hover:text-accent-500">
              {t('footer_terms')}
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/policy/privacy" className="hover:text-accent-500">
              {t('footer_privacy_policy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
