'use client';

import InfoPage from '@/components/InfoPage';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <InfoPage
      title={t('nav_about')}
      paragraphs={[t('footer_about_desc')]}
      bullets={[t('pd_trust_1'), t('pd_trust_2'), t('pd_trust_3'), t('pd_trust_4')]}
    />
  );
}
