'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';

const HOTLINE = '0364888253';

export default function ContactPage() {
  const { t } = useLanguage();

  const cards = [
    {
      title: t('contact_address_title'),
      value: t('contact_address'),
      icon: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </>
      ),
    },
    {
      title: t('contact_hotline_title'),
      value: HOTLINE,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      ),
    },
    {
      title: t('contact_email_title'),
      value: 'support@sportstore.com',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      ),
    },
    {
      title: t('contact_hours_title'),
      value: t('contact_hours'),
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
    },
  ];

  const delivery = [
    t('contact_delivery_1'),
    t('contact_delivery_2'),
    t('contact_delivery_3'),
    t('contact_delivery_4'),
  ];

  return (
    <>
      <Breadcrumb items={[{ label: t('contact_title') }]} />

      <div className="ss-container py-8">
        <header className="mb-6">
          <h1 className="text-[24px] font-extrabold text-ink-900 md:text-[28px]">{t('contact_title')}</h1>
          <p className="mt-1 text-[14px] text-ink-500">{t('contact_subtitle')}</p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          {/* left column */}
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {cards.map((c) => (
                <div key={c.title} className="ss-card p-5">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-50 text-accent-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor">
                      {c.icon}
                    </svg>
                  </div>
                  <h2 className="mt-3 text-[14px] font-bold text-ink-900">{c.title}</h2>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-ink-700">{c.value}</p>
                </div>
              ))}
            </div>

            <section className="ss-card p-5">
              <h2 className="mb-3 text-[15px] font-bold text-ink-900">{t('contact_delivery_title')}</h2>
              <ul className="space-y-2.5">
                {delivery.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[13.5px] text-ink-700">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* map */}
          <div className="ss-card overflow-hidden">
            <iframe
              src="https://www.google.com/maps?q=123+%C4%90%C6%B0%E1%BB%9Dng+Th%E1%BB%83+Thao%2C+Qu%E1%BA%ADn+1%2C+TP.+H%E1%BB%93+Ch%C3%AD+Minh&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 420 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SportStore Location"
            />
          </div>
        </div>
      </div>
    </>
  );
}
