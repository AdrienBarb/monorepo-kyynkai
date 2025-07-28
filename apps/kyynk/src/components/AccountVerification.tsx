'use client';

import React from 'react';
import VerificationCard from './VerificationCard';
import { useUser } from '@/hooks/users/useUser';
import { appRouter } from '@/constants/appRouter';
import { useTranslations } from 'next-intl';

const AccountVerification = () => {
  const { user } = useUser();
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-4">
      <VerificationCard
        isValid={!!user?.profileImageId}
        path={appRouter.myProfile}
        label={t('accountVerificationAddProfileImage')}
      />
      <VerificationCard
        isValid={!!user?.isEmailVerified}
        path={appRouter.becomeCreatorEmail}
        label={t('accountVerificationConfirmEmail')}
      />
      <VerificationCard
        isValid={user?.identityVerificationStatus === 'verified'}
        path={appRouter.becomeCreatorIdentity}
        label={t('accountVerificationVerifyIdentity')}
      />
    </div>
  );
};

export default AccountVerification;
