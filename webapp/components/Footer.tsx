'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#111111] text-gray-300 pt-12 pb-6 border-t border-gray-800 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Cột 1: Giới thiệu & Liên hệ */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-orange-500 mb-4">{t('footer_about_us')}</h3>
          <p className="text-sm leading-relaxed">
            SportStore là hệ thống cửa hàng dụng cụ thể thao hàng đầu, cung cấp sản phẩm chính hãng với chất lượng tốt nhất phục vụ đam mê của bạn.
          </p>
          <div className="space-y-2 mt-4 text-sm">
            <p className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">📍</span>
              <span><strong>{t('footer_address')}:</strong> 123 Đường Thể Thao, Quận 1, TP. HCM</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-orange-500">📞</span>
              <span><strong>{t('footer_phone')}:</strong> +84 123 456 789</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-orange-500">✉️</span>
              <span><strong>{t('footer_email')}:</strong> support@sportstore.com</span>
            </p>
          </div>
        </div>

        {/* Cột 2: Chính sách */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-orange-500 mb-4">{t('footer_policies')}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/policy/return" className="hover:text-orange-500 transition-colors flex items-center gap-2">
                <span className="text-xs">▪</span> {t('footer_return_policy')}
              </Link>
            </li>
            <li>
              <Link href="/policy/warranty" className="hover:text-orange-500 transition-colors flex items-center gap-2">
                <span className="text-xs">▪</span> {t('footer_warranty_policy')}
              </Link>
            </li>
            <li>
              <Link href="/policy/shipping" className="hover:text-orange-500 transition-colors flex items-center gap-2">
                <span className="text-xs">▪</span> {t('footer_shipping_policy')}
              </Link>
            </li>
            <li>
              <Link href="/policy/privacy" className="hover:text-orange-500 transition-colors flex items-center gap-2">
                <span className="text-xs">▪</span> {t('footer_privacy_policy')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Hỗ trợ khách hàng */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-orange-500 mb-4">{t('footer_support')}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/guide/buying" className="hover:text-orange-500 transition-colors flex items-center gap-2">
                <span className="text-xs">▪</span> {t('footer_buying_guide')}
              </Link>
            </li>
            <li>
              <Link href="/guide/racket" className="hover:text-orange-500 transition-colors flex items-center gap-2">
                <span className="text-xs">▪</span> {t('footer_racket_guide')}
              </Link>
            </li>
            <li>
              <Link href="/order-tracking" className="hover:text-orange-500 transition-colors flex items-center gap-2">
                <span className="text-xs">▪</span> {t('footer_order_tracking')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 4: Kết nối & Thanh toán */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-orange-500 mb-4">{t('footer_connect')}</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-80 transition-opacity">
                <span className="text-white font-bold">f</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center hover:opacity-80 transition-opacity">
                <span className="text-white font-bold">▶</span>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-black border border-gray-700 flex items-center justify-center hover:opacity-80 transition-opacity">
                <span className="text-white font-bold">t</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-orange-500 mb-4">{t('footer_payment')}</h3>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-white rounded text-blue-800 font-extrabold italic text-sm">VISA</div>
              <div className="px-3 py-1 bg-white rounded text-red-600 font-extrabold italic text-sm">MasterCard</div>
              <div className="px-3 py-1 bg-white rounded text-green-600 font-extrabold text-sm">MoMo</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>{t('footer_copyright_text')}</p>
        <div className="flex gap-4">
          <Link href="/policy/terms" className="hover:text-white transition-colors">{t('footer_terms')}</Link>
          <Link href="/policy/privacy" className="hover:text-white transition-colors">{t('footer_privacy_policy')}</Link>
        </div>
      </div>
    </footer>
  );
}
