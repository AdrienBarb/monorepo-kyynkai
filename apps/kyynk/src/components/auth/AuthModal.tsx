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
import { useAuthModal } from '@/hooks/auth/openAuthModal';
import toast from 'react-hot-toast';
import { Separator } from '../ui/Separator';
import useApi from '@/hooks/requests/useApi';
import { useConversations } from '@/hooks/conversations/useConversations';

const AuthModal: React.FC = () => {
  const {
    isOpen,
    isSignInMode,
    isSignUpMode,
    closeAuthModal,
    openSignIn,
    openSignUp,
  } = useAuthModal();
  const [isLogin, setIsLogin] = useState(false);

  const { usePost } = useApi();
  const { refetch: refetchConversations } = useConversations();

  const { mutate: mergeGuest } = usePost('/api/me/merge', {
    onSuccess: () => {
      refetchConversations();
    },
  });

  const t = useTranslations();

  useEffect(() => {
    if (isSignInMode) {
      setIsLogin(true);
    } else if (isSignUpMode) {
      setIsLogin(false);
    }
  }, [isSignInMode, isSignUpMode]);

  const handleClose = () => {
    closeAuthModal();
    setIsLogin(true);
  };

  const toggleMode = () => {
    const newMode = !isLogin;
    setIsLogin(newMode);
    if (newMode) {
      openSignIn();
    } else {
      openSignUp();
    }
  };

  const handleAuthSuccess = () => {
    mergeGuest({});
    handleClose();
  };

  const handleAuthError = (errorMessage: string) => {
    toast.error(errorMessage);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0">
        <DialogHeader className="p-4">
          <DialogTitle className="text-center">
            {isLogin ? t('signIn') : t('signUp')}
          </DialogTitle>
        </DialogHeader>

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
