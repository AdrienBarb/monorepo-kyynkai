'use client';

import { VerificationColumns } from '@/components/verifications/VerificationColumns';
import { VerificationTable } from '@/components/verifications/VerificationTable';
import useApi from '@/hooks/requests/useApi';
import { apiRouter } from '@/constants/apiRouter';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { useTranslations } from 'next-intl';

export default function DemoPage() {
  const { useGet } = useApi();
  const { data } = useGet(apiRouter.identityVerifications);
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={t('verificationsTitle')}
        description={t('verificationsDescription')}
      />
      <VerificationTable columns={VerificationColumns} data={data ?? []} />
    </div>
  );
}
