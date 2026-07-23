'use client';

import InfoPage from '@/components/InfoPage';
import { useLanguage } from '@/context/LanguageContext';

export default function OrderTrackingPage() {
  const { t } = useLanguage();
  return (
    <InfoPage
      title={t('footer_order_tracking')}
      paragraphs={[t('account_wip')]}
      bullets={[t('success_status_pending'), t('admin_col_processing'), t('admin_col_completed')]}
    />
  );
}
