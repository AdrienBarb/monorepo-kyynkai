'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { useUser } from '@/hooks/users/useUser';
import { isCreator } from '@/utils/users/isCreator';
import { isUserVerified } from '@/utils/users/isUserVerified';
import { Button } from '@/components/ui/Button';
import { appRouter } from '@/constants/appRouter';
import { useTranslations } from 'next-intl';

const UserUncompletedProfileBanner = () => {
  const { user } = useUser();
  const { slug } = useParams<{ slug: string }>();
  const t = useTranslations();

  if (
    user &&
    user?.slug === slug &&
    isCreator({ user }) &&
    !isUserVerified({ user })
  ) {
    return (
      <Alert
        variant="default"
        className="mb-4 flex justify-between bg-primary text-secondary flex-col md:flex-row"
      >
        <div>
          <AlertTitle>{t('uncompletedProfileBannerTitle')}</AlertTitle>
          <AlertDescription>
            {t('uncompletedProfileBannerDescription')}
          </AlertDescription>
        </div>
        <Button
          variant="secondary"
          asChild
          className="text-custom-black mt-2 md:mt-none"
        >
          <Link href={appRouter.becomeCreator}>
            {t('uncompletedProfileBannerCta')}
          </Link>
        </Button>
      </Alert>
    );
  }

  return null;
};

export default UserUncompletedProfileBanner;
