'use client';

import { use } from 'react';
import InfoPage from '@/components/InfoPage';
import { useLanguage } from '@/context/LanguageContext';

export default function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t } = useLanguage();

  const map: Record<string, string> = {
    return: t('footer_return_policy'),
    warranty: t('footer_warranty_policy'),
    shipping: t('footer_shipping_policy'),
    privacy: t('footer_privacy_policy'),
    terms: t('footer_terms'),
  };

  return (
    <InfoPage
      title={map[slug] ?? t('footer_policies')}
      paragraphs={[t('account_wip')]}
      bullets={[
        t('contact_delivery_1'),
        t('contact_delivery_2'),
        t('contact_delivery_3'),
        t('contact_delivery_4'),
      ]}
    />
  );
}
