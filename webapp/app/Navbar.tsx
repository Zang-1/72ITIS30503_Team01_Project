'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();

  const categoryTree = [
    { 
      id: 1, 
      nameKey: 'nav_badminton' as const,
      slug: 'cau-long', 
      children: [
        { id: 11, nameKey: 'nav_racket_badminton' as const, slug: 'vot-cau-long' },
        { id: 12, nameKey: 'nav_shoes_badminton' as const, slug: 'giay-cau-long' },
        { id: 13, nameKey: 'nav_bag_badminton' as const, slug: 'balo-cau-long' },
        { id: 14, nameKey: 'nav_socks_badminton' as const, slug: 'tat-cau-long' },
        { id: 15, nameKey: 'nav_accessories_badminton' as const, slug: 'phu-kien-cau-long' }
      ] 
    },
    { 
      id: 2, 
      nameKey: 'nav_tennis' as const,
      slug: 'tennis', 
      children: [
        { id: 21, nameKey: 'nav_racket_tennis' as const, slug: 'vot-tennis' },
        { id: 22, nameKey: 'nav_shoes_tennis' as const, slug: 'giay-tennis' },
        { id: 23, nameKey: 'nav_accessories_tennis' as const, slug: 'phu-kien-tennis' }
      ] 
    },
    { 
      id: 3, 
      nameKey: 'nav_pickleball' as const,
      slug: 'pickleball', 
      children: [
        { id: 31, nameKey: 'nav_racket_pickleball' as const, slug: 'vot-pickleball' },
        { id: 32, nameKey: 'nav_ball_pickleball' as const, slug: 'bong-pickleball' },
        { id: 33, nameKey: 'nav_accessories_pickleball' as const, slug: 'phu-kien-pickleball' }
      ] 
    }
  ];

  const toggleLocale = () => {
    setLocale(locale === 'vi' ? 'en' : 'vi');
  };

  return (
    <nav className="bg-[#1a1a1a] px-8 py-4 flex flex-wrap gap-8 items-center text-white font-sans border-b border-gray-800">
      {/* 1. Static Pages */}
      <a href="/" className="text-white hover:text-orange-500 font-bold">{t('nav_home')}</a>
      <a href="/about" className="text-gray-300 hover:text-white">{t('nav_about')}</a>
      <a href="/contact" className="text-gray-300 hover:text-white">{t('nav_contact')}</a>
      
      {/* 2. Dynamic Categories */}
      {categoryTree.map((parent) => (
        <details key={parent.id} className="relative group cursor-pointer">
          <summary className="text-orange-500 font-bold list-none outline-none select-none flex items-center [&::-webkit-details-marker]:hidden">
            {t(parent.nameKey)} <span className="ml-1 text-sm group-open:rotate-180 transition-transform">▾</span>
          </summary>
          
          <div className="flex flex-col absolute top-full left-0 mt-3 bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 min-w-max z-50 shadow-xl">
            {parent.children.map((child) => (
              <a key={child.id} href={`/category/${child.slug}`} className="text-gray-300 hover:text-white py-1.5 px-2 hover:bg-gray-800 rounded transition-colors">
                {t(child.nameKey)}
              </a>
            ))}
          </div>
        </details>
      ))}

      {/* 3. Language Toggle Button */}
      <div className="ml-auto">
        <button
          onClick={toggleLocale}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/60 hover:bg-gray-700 text-sm font-semibold transition-all duration-300 hover:border-orange-500 hover:shadow-[0_0_12px_rgba(249,115,22,0.15)]"
          title={locale === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
        >
          <span className="text-base leading-none">{locale === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
          <span className={`transition-colors duration-200 ${locale === 'vi' ? 'text-orange-400' : 'text-blue-400'}`}>
            {locale === 'vi' ? 'VI' : 'EN'}
          </span>
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </button>
      </div>
    </nav>
  );
}