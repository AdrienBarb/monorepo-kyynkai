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

interface AuthModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isSignInMode: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({
  open,
  setOpen,
  isSignInMode,
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
