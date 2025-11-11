import React from 'react';
import PageCenterMessage from '@/components/PageCenterMessage';
import { genPageMetadata } from '@/app/seo';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations();

  return genPageMetadata({
    title: t('error404Title'),
    description: t('error404Description'),
  });
}

const ErrorNotFoundPage = async () => {
  const t = await getTranslations();

  return <PageCenterMessage text={t('error404Message')} />;
};

export default ErrorNotFoundPage;
