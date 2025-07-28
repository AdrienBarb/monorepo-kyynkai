'use client';

import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/AlertDialog';
import Text from '../ui/Text';
import { useTranslations } from 'next-intl';

const AgeVerificationModal = () => {
  const [shouldOpen, setShouldOpen] = useState<boolean>(false);
  const t = useTranslations();

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified') === 'true';
    setShouldOpen(!verified);
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setShouldOpen(false);
  };

  const handleCancel = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <AlertDialog open={shouldOpen}>
      <AlertDialogContent className="max-w-xl overflow-y-scroll">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            {t('ageVerificationTitle')}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Text className="text-center">{t('ageVerificationText')}</Text>
        <AlertDialogFooter className="flex flex-col sm:flex-row items-center justify-between sm:justify-between gap-4">
          <AlertDialogAction
            onClick={handleConfirm}
            variant="default"
            className="w-full"
          >
            {t('enterOver18')}
          </AlertDialogAction>
          <AlertDialogCancel onClick={handleCancel} className="w-full">
            {t('exitUnder18')}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AgeVerificationModal;
