'use client';

import Navbar from '../Navbar';
import { useLanguage } from '@/context/LanguageContext';

export default function AccountPage() {
  const { t } = useLanguage();

  return (
    <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', color: 'var(--text-white)' }}>
      <Navbar />
      <main style={{ padding: 'var(--main-padding)' }}>
        <h1 style={{ color: 'var(--accent-orange)' }}>{t('account_title')}</h1>
      </main>
    </div>
  );
}
