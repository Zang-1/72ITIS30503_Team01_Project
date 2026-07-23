'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';

export default function AccountPage() {
  const { t } = useLanguage();

  return (
    <>
      <Breadcrumb items={[{ label: t('nav_account') }]} />

      <div className="ss-container py-8">
        <div className="mx-auto max-w-md">
          <div className="ss-card overflow-hidden">
            <div className="bg-brand-500 px-6 py-7 text-center text-white">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/15">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h1 className="mt-3 text-[20px] font-extrabold">{t('account_title')}</h1>
              <p className="mt-1 text-[13px] text-white/70">{t('account_subtitle')}</p>
            </div>

            <div className="space-y-3 p-6">
              <button className="w-full rounded-xl bg-accent-500 py-3 text-[14px] font-bold text-white hover:bg-accent-600">
                {t('account_login')}
              </button>
              <button className="w-full rounded-xl border border-ink-300 py-3 text-[14px] font-semibold text-ink-700 hover:border-brand-500 hover:text-brand-600">
                {t('account_register')}
              </button>

              <div className="!mt-5 rounded-lg bg-ink-50 px-4 py-3 text-center text-[12.5px] text-ink-500">
                {t('account_wip')}
              </div>

              <Link
                href="/order-tracking"
                className="block pt-1 text-center text-[13px] font-semibold text-brand-600 hover:underline"
              >
                {t('account_orders')} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
