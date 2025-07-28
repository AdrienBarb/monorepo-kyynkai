'use client';

import React from 'react';
import Title from '@/components/ui/Title';
import { useTranslations } from 'next-intl';

interface UserTypeStepProps {
  selectedUserType: string;
  onUserTypeSelect: (userType: string) => void;
}

const UserTypeStep: React.FC<UserTypeStepProps> = ({
  selectedUserType,
  onUserTypeSelect,
}) => {
  const t = useTranslations();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Title Tag="h2" className="mb-4 text-custom-black font-semibold">
          {t('welcomeToKyynk')}
        </Title>
        <p className="text-custom-black font-medium">{t('getToKnowYou')}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div
          onClick={() => onUserTypeSelect('creator')}
          className={`flex flex-col w-full border-2 rounded-xl p-8 text-center cursor-pointer transition-all duration-200 hover:scale-105 ${
            selectedUserType === 'creator'
              ? 'border-custom-black bg-background/20 text-custom-black'
              : 'border-custom-black/30 text-custom-black/80 hover:border-custom-black/60 hover:bg-background/10'
          }`}
        >
          <h3 className="font-bold text-xl mb-2">{t('creator')}</h3>
          <p className="text-custom-black/80 font-medium">
            {t('shareContentConnect')}
          </p>
        </div>

        <div
          onClick={() => onUserTypeSelect('member')}
          className={`flex flex-col w-full border-2 rounded-xl p-8 text-center cursor-pointer transition-all duration-200 hover:scale-105 ${
            selectedUserType === 'member'
              ? 'border-custom-black bg-background/20 text-custom-black'
              : 'border-custom-black/30 text-custom-black/80 hover:border-custom-black/60 hover:bg-background/10'
          }`}
        >
          <h3 className="font-bold text-xl mb-2">{t('member')}</h3>
          <p className="text-custom-black/80 font-medium">
            {t('discoverAmazingContent')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserTypeStep;
