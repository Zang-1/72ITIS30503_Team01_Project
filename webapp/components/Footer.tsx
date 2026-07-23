'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0a0a0a] text-gray-300 border-t border-gray-800 mt-auto w-full">
      
      {/* ===== TOP BANNER: HOTLINE ===== */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-black font-bold text-sm sm:text-base">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            {t('footer_hotline_label')}: 1900 6969 39
          </span>
          <span className="hidden sm:inline text-black/40">|</span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {t('footer_working_hours')}: 8:00 - 21:00 ({t('footer_everyday')})
          </span>
        </div>
      </div>

      {/* ===== MAIN FOOTER CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Cột 1: Giới thiệu & Liên hệ (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-lg font-bold text-orange-500 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a.75.75 0 0 1 .334-.624L12 2.25l7.916 6.475a.75.75 0 0 1 .334.625M3.75 9.349v0" />
              </svg>
              {t('footer_about_us')}
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              {t('footer_about_desc')}
            </p>
            <div className="space-y-2.5 mt-4 text-sm">
              <p className="flex items-start gap-2.5">
                <span className="text-orange-500 mt-0.5 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </span>
                <span><strong className="text-gray-200">{t('footer_address')}:</strong> {t('footer_address_value')}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="text-orange-500 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </span>
                <span><strong className="text-gray-200">{t('footer_phone')}:</strong> 0364888253</span>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="text-orange-500 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
                <span><strong className="text-gray-200">{t('footer_email')}:</strong> support@sportstore.com</span>
              </p>
            </div>
          </div>

          {/* Cột 2: Chính sách (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-lg font-bold text-orange-500 mb-3">{t('footer_policies')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/policy/return" className="hover:text-orange-400 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-orange-400 transition-colors shrink-0"></span>
                  {t('footer_return_policy')}
                </Link>
              </li>
              <li>
                <Link href="/policy/warranty" className="hover:text-orange-400 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-orange-400 transition-colors shrink-0"></span>
                  {t('footer_warranty_policy')}
                </Link>
              </li>
              <li>
                <Link href="/policy/shipping" className="hover:text-orange-400 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-orange-400 transition-colors shrink-0"></span>
                  {t('footer_shipping_policy')}
                </Link>
              </li>
              <li>
                <Link href="/policy/privacy" className="hover:text-orange-400 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-orange-400 transition-colors shrink-0"></span>
                  {t('footer_privacy_policy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ & Kết nối (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-orange-500 mb-3">{t('footer_support')}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/guide/buying" className="hover:text-orange-400 transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-orange-400 transition-colors shrink-0"></span>
                    {t('footer_buying_guide')}
                  </Link>
                </li>
                <li>
                  <Link href="/guide/racket" className="hover:text-orange-400 transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-orange-400 transition-colors shrink-0"></span>
                    {t('footer_racket_guide')}
                  </Link>
                </li>
                <li>
                  <Link href="/order-tracking" className="hover:text-orange-400 transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-orange-400 transition-colors shrink-0"></span>
                    {t('footer_order_tracking')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mạng xã hội */}
            <div>
              <h3 className="text-lg font-bold text-orange-500 mb-3">{t('footer_connect')}</h3>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/gain.baor" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-[#1877F2]/20 border border-[#1877F2]/30 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300 group" aria-label="Facebook">
                  <svg className="w-4 h-4 text-[#1877F2] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.youtube.com/@file" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-[#FF0000]/20 border border-[#FF0000]/30 flex items-center justify-center hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-300 group" aria-label="YouTube">
                  <svg className="w-4 h-4 text-[#FF0000] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@shopvnbsports" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300 group" aria-label="TikTok">
                  <svg className="w-4 h-4 text-white group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
                <a href="https://zalo.me/0364888253" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-[#0068FF]/20 border border-[#0068FF]/30 flex items-center justify-center hover:bg-[#0068FF] hover:border-[#0068FF] transition-all duration-300 group" aria-label="Zalo">
                  <span className="text-xs font-black text-[#0068FF] group-hover:text-white transition-colors">Z</span>
                </a>
              </div>
            </div>

            {/* Thanh toán */}
            <div>
              <h3 className="text-lg font-bold text-orange-500 mb-3">{t('footer_payment')}</h3>
              <div className="flex flex-wrap gap-2">
                <div className="px-2.5 py-1 bg-white/10 border border-white/20 rounded text-blue-400 font-extrabold italic text-xs">VISA</div>
                <div className="px-2.5 py-1 bg-white/10 border border-white/20 rounded text-red-400 font-extrabold italic text-xs">MC</div>
                <div className="px-2.5 py-1 bg-white/10 border border-white/20 rounded text-pink-400 font-extrabold text-xs">MoMo</div>
                <div className="px-2.5 py-1 bg-white/10 border border-white/20 rounded text-green-400 font-extrabold text-xs">COD</div>
              </div>
            </div>
          </div>

          {/* Cột 4: Google Maps (4 cols) */}
          <div className="lg:col-span-4">
            <h3 className="text-lg font-bold text-orange-500 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
              </svg>
              {t('footer_map_title')}
            </h3>
            <div className="rounded-xl overflow-hidden border border-gray-700/50 shadow-lg shadow-black/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4946681007835!2d106.69765091533417!3d10.776889492319712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3e10a89c4f%3A0x7afdd0b1d78a5e01!2zQuG6v24gTmjDoCBSb25nIFRQLiBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SportStore Location"
                className="w-full"
              ></iframe>
            </div>
            <p className="mt-2 text-xs text-gray-500 italic">
              📍 {t('footer_address_value')}
            </p>
          </div>

        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="border-t border-gray-800/80 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>{t('footer_copyright_text')}</p>
          <div className="flex gap-4">
            <Link href="/policy/terms" className="hover:text-orange-400 transition-colors">{t('footer_terms')}</Link>
            <span className="text-gray-700">|</span>
            <Link href="/policy/privacy" className="hover:text-orange-400 transition-colors">{t('footer_privacy_policy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
