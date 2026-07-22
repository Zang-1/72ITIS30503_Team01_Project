'use client';

import Navbar from '../Navbar';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <Navbar />

      <main className="p-10 max-w-4xl mx-auto flex-grow w-full mt-10">
        <h1 className="text-4xl font-bold text-orange-500 mb-8 border-l-4 border-orange-500 pl-4">
          {t('contact_title')}
        </h1>
        
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{t('contact_address_title')}</h2>
            <p className="text-gray-400">{t('contact_address')}</p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{t('contact_email_title')}</h2>
            <p className="text-gray-400">support@sportstore.com</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{t('contact_hotline_title')}</h2>
            <p className="text-gray-400">+84 123 456 789</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{t('contact_delivery_title')}</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>{t('contact_delivery_1')}</li>
              <li>{t('contact_delivery_2')}</li>
              <li>{t('contact_delivery_3')}</li>
              <li>{t('contact_delivery_4')}</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}