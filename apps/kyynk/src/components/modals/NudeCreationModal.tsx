'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/Dialog';
import { Button } from '../ui/Button';
import MediasGallery from '../nudes/MediasGallery';
import Text from '../ui/Text';
import toast from 'react-hot-toast';
import type { Media } from '@prisma/client';
import CreateNudeForm from '@/components/nudes/CreateNudeForm';
import { NudeWithPermissions } from '@/types/nudes';
import NudeCard from '@/components/nudes/NudeCard';
import { TelegramShareButton, TwitterShareButton } from 'react-share';
import { useUser } from '@/hooks/users/useUser';
import { useTranslations } from 'next-intl';

export type NudeCreationStepsType =
  | 'form'
  | 'gallery'
  | 'uploading'
  | 'success';

const NudeCreationModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [step, setStep] = useState<NudeCreationStepsType>('form');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [createdNude, setCreatedNude] = useState<NudeWithPermissions | null>(
    null,
  );
  const { user } = useUser();
  const t = useTranslations();

  const URL_TO_SHARE = `${process.env.NEXT_PUBLIC_BASE_URL}/${user?.slug}`;

  const handleCloseModal = () => {
    if (step === 'uploading') {
      toast.error(t('waitForUpload'));
      return;
    }

    setStep('form');
    setCreatedNude(null);
    setSelectedMedia(null);
    setOpen(false);
  };

  const renderStepContent = () => {
    switch (step) {
      case 'form':
        return (
          <DialogContent className="h-[100dvh] sm:h-[80dvh] overflow-y-scroll flex flex-col">
            <DialogHeader className="flex flex-col items-center">
              <DialogTitle>{t('nudeCreationCreate')}</DialogTitle>
              <DialogDescription>
                {t('nudeCreationCreateDesc')}
              </DialogDescription>
            </DialogHeader>
            <CreateNudeForm
              setStep={setStep}
              selectedMedia={selectedMedia}
              setCreatedNude={setCreatedNude}
            />
          </DialogContent>
        );
      case 'gallery':
        return (
          <DialogContent
            className="h-[100dvh] sm:h-[80dvh] flex flex-col"
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            isClosable={false}
          >
            <DialogHeader className="flex flex-col items-center">
              <DialogTitle>{t('nudeCreationGallery')}</DialogTitle>
              <DialogDescription>
                {t('nudeCreationGalleryDesc')}
              </DialogDescription>
            </DialogHeader>
            <MediasGallery
              setStep={setStep}
              setUploadProgress={setUploadProgress}
              setSelectedMedia={setSelectedMedia}
              selectedMedia={selectedMedia}
            />
            <DialogFooter className="gap-2">
              <Button
                onClick={() => setStep('form')}
                className="w-full"
                variant="secondary"
              >
                {t('quit')}
              </Button>
              <Button
                onClick={() => setStep('form')}
                disabled={!selectedMedia}
                className="w-full"
              >
                {t('select')}
              </Button>
            </DialogFooter>
          </DialogContent>
        );
      case 'uploading':
        return (
          <DialogContent
            className="h-[100dvh] sm:h-[80dvh] flex flex-col"
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            isClosable={false}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <Text className="text-2xl text-custom-black">
                {uploadProgress}%
              </Text>
              <Text className="text-center text-custom-black mt-4">
                {t('refreshWarning')}
              </Text>
            </div>
          </DialogContent>
        );
      case 'success':
        return (
          <DialogContent className="h-[100dvh] sm:h-[80dvh] overflow-y-scroll flex flex-col">
            <DialogHeader className="flex flex-col items-center">
              <DialogTitle>{t('success')}</DialogTitle>
              <DialogDescription>
                {t('shareProfileDescription')}
              </DialogDescription>
            </DialogHeader>
            {createdNude && <NudeCard nude={createdNude} />}
            <div className="flex flex-col items-center justify-center w-full gap-2">
              <TwitterShareButton
                url={URL_TO_SHARE}
                title={t('shareProfileTitle')}
                style={{ width: '100%' }}
              >
                <Button className="w-full">{t('shareOnTwitter')}</Button>
              </TwitterShareButton>
              <TelegramShareButton
                url={URL_TO_SHARE}
                title={t('shareProfileTitle')}
                style={{ width: '100%' }}
              >
                <Button className="w-full">{t('shareOnTelegram')}</Button>
              </TelegramShareButton>
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                className="w-full"
              >
                {t('quit')}
              </Button>
            </div>
          </DialogContent>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      {renderStepContent()}
    </Dialog>
  );
};

export default NudeCreationModal;
