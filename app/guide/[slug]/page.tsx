'use client';

import { use } from 'react';
import InfoPage from '@/components/InfoPage';
import { useLanguage } from '@/context/LanguageContext';

export default function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t } = useLanguage();

  const map: Record<string, string> = {
    buying: t('footer_buying_guide'),
    racket: t('footer_racket_guide'),
  };

  return (
    <InfoPage
      title={map[slug] ?? t('footer_support')}
      paragraphs={[t('account_wip')]}
      bullets={[t('policy_ship_title'), t('policy_pay_title'), t('policy_return_title')]}
    />
  );
}
