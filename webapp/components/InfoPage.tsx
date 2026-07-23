'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';

export default function InfoPage({
  title,
  paragraphs = [],
  bullets = [],
}: {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}) {
  const { t } = useLanguage();

  return (
    <>
      <Breadcrumb items={[{ label: title }]} />
      <div className="ss-container py-8">
        <div className="ss-card mx-auto max-w-3xl p-6 md:p-8">
          <h1 className="text-[22px] font-extrabold text-ink-900 md:text-[26px]">{title}</h1>

          {paragraphs.map((p, i) => (
            <p key={i} className="mt-3.5 text-[14.5px] leading-[1.75] text-ink-700">
              {p}
            </p>
          ))}

          {bullets.length > 0 && (
            <ul className="mt-4 space-y-2.5">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] text-ink-700">
                  <svg className="mt-1 h-4 w-4 shrink-0 text-accent-500" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-7 flex flex-wrap gap-3 border-t border-ink-300 pt-5">
            <Link href="/shop" className="rounded-lg bg-accent-500 px-5 py-2.5 text-[13.5px] font-bold text-white hover:bg-accent-600">
              {t('cart_continue_shopping')}
            </Link>
            <Link href="/contact" className="rounded-lg border border-ink-300 px-5 py-2.5 text-[13.5px] font-semibold text-ink-700 hover:border-brand-500 hover:text-brand-600">
              {t('nav_contact')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
