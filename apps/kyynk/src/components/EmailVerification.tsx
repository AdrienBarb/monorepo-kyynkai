'use client';

import React, { FC, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from './ui/Button';
import useApi from '@/hooks/requests/useApi';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/users/useUser';
import { appRouter } from '@/constants/appRouter';
import { Input } from './ui/Input';
import { useTranslations } from 'next-intl';

const VerificationCodeButton = ({}) => {
  const [code, setCode] = useState('');
  const router = useRouter();
  const { refetch } = useUser();
  const t = useTranslations();

  const { usePost } = useApi();

  const { mutate: verifyVerificationCode, isPending } = usePost(
    `/api/me/emails/verify-code`,
    {
      onSuccess: () => {
        refetch();
        router.push(appRouter.becomeCreator);
      },
    },
  );

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleVerifyCode = () => {
    if (!code) {
      return;
    }

    verifyVerificationCode({ code });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        type="text"
        placeholder={t('emailVerificationCodePlaceholder')}
        value={code}
        onChange={handleCodeChange}
        className="w-full"
      />

      <Button
        onClick={handleVerifyCode}
        disabled={!code}
        isLoading={isPending}
        className="w-full"
        variant="default"
      >
        {t('emailVerificationConfirmCode')}
      </Button>
    </div>
  );
};

const EmailVerification = () => {
  const { data: session } = useSession();
  const [isCodeSended, setIsCodeSended] = useState(false);

  const { usePost } = useApi();
  const t = useTranslations();

  const { mutate: sendVerificationCode, isPending } = usePost(
    `/api/me/emails/send-verification-code`,
    {
      onSuccess: () => {
        setIsCodeSended(true);
      },
    },
  );

  const handleSendCode = async () => {
    sendVerificationCode({});
  };

  return (
    <div className="w-full">
      {isCodeSended ? (
        <div className="flex flex-col gap-4 items-center">
          <div className="text-center">
            {t('emailVerificationSent', { email: session?.user?.email ?? '' })}
          </div>
          <VerificationCodeButton />
          <div>
            {t('emailVerificationNotReceived')}{' '}
            <span
              className="cursor-pointer underline"
              onClick={() => setIsCodeSended(false)}
            >
              {t('emailVerificationSendAgain')}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <div>{t('emailVerificationPrompt')}</div>
          <Button
            onClick={handleSendCode}
            isLoading={isPending}
            className="w-full"
            variant="default"
          >
            {t('emailVerificationSendCode')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
