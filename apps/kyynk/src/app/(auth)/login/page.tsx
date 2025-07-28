'use client';

import React, { useEffect } from 'react';
import PageContainer from '@/components/PageContainer';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import UserSignInForm from '@/components/auth/UserSignInForm';
import Title from '@/components/ui/Title';
import { appRouter } from '@/constants/appRouter';
import { useUser } from '@/hooks/users/useUser';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const LoginPage = () => {
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    if (isLoggedIn()) {
      router.push(appRouter.home);
    }
  }, [isLoggedIn]);

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-12">
          <Title Tag="h3" data-id="sign-in-title">
            {t('signIn')}
          </Title>
        </div>
        <UserSignInForm />
        <div className="flex flex-col gap-4 w-full my-5">
          <Button asChild variant="secondary">
            <Link href={appRouter.register}>{t('signUp')}</Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="text-sm text-primary font-light"
          >
            <Link href={appRouter.forgotPassword}>{t('forgotPassword')}</Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default LoginPage;
