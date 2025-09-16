'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

import { useTranslations } from 'next-intl';
import ModalSignInForm from './ModalSignInForm';
import ModalSignUpForm from './ModalSignUpForm';
import toast from 'react-hot-toast';
import { Separator } from '../ui/Separator';
import SignUpOffer from './SignUpOffer';
import { SignUpOfferVariant } from './SignUpOffer';

interface AuthModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isSignInMode: boolean;
  context: SignUpOfferVariant;
  girlfriendName: string;
  avatarImageId: string;
}

const AuthModal: React.FC<AuthModalProps> = ({
  open,
  setOpen,
  isSignInMode,
  context = 'default',
  girlfriendName,
  avatarImageId,
}) => {
  const [isLogin, setIsLogin] = useState(false);

  const t = useTranslations();

  useEffect(() => {
    if (isSignInMode) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isSignInMode]);

  const handleClose = () => {
    setOpen(false);
    setIsLogin(true);
  };

  const toggleMode = () => {
    const newMode = !isLogin;
    setIsLogin(newMode);
  };

  const handleAuthSuccess = () => {
    handleClose();
  };

  const handleAuthError = (errorMessage: string) => {
    toast.error(errorMessage);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0">
        {isLogin ? (
          <DialogHeader className="p-4">
            <DialogTitle className="text-center">{t('signIn')}</DialogTitle>
          </DialogHeader>
        ) : (
          <DialogHeader>
            <SignUpOffer
              girlfriendName={girlfriendName}
              context={context}
              avatarImageId={
                avatarImageId ?? process.env.NEXT_PUBLIC_DEFAULT_SIGN_UP_IMAGE
              }
            />
          </DialogHeader>
        )}
        <div className="">
          {isLogin ? (
            <ModalSignInForm
              onSuccess={handleAuthSuccess}
              onError={handleAuthError}
            />
          ) : (
            <ModalSignUpForm
              onSuccess={handleAuthSuccess}
              onError={handleAuthError}
            />
          )}

          <Separator className="my-0 bg-black/10" />

          <div className="flex justify-center p-4">
            {isLogin ? (
              <span>
                {t('dontHaveAccount')}{' '}
                <span
                  onClick={toggleMode}
                  className="cursor-pointer text-primary"
                >
                  {t('signUp')}
                </span>
              </span>
            ) : (
              <span>
                {t('alreadyHaveAccount')}{' '}
                <span
                  onClick={toggleMode}
                  className="cursor-pointer text-primary"
                >
                  {t('signIn')}
                </span>
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
