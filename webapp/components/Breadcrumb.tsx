'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const { t } = useLanguage();
  const all: Crumb[] = [{ label: t('breadcrumb_home'), href: '/' }, ...items];

  return (
    <nav aria-label="breadcrumb" className="border-b border-ink-300 bg-white">
      <ol className="ss-container flex flex-wrap items-center gap-1.5 py-2.5 text-[12.5px] text-ink-500">
        {all.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-ink-300">/</span>}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className="hover:text-accent-600 hover:underline">
                {c.label}
              </Link>
            ) : (
              <span className="font-semibold text-ink-900">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
