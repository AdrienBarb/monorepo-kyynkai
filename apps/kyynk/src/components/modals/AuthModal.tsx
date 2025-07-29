'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import ModalSignInForm from './ModalSignInForm';
import ModalSignUpForm from './ModalSignUpForm';
import { useRouter } from 'next/navigation';
import { appRouter } from '@/constants/appRouter';

interface AuthModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, setOpen }) => {
  const [isLogin, setIsLogin] = useState(false);
  const t = useTranslations();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    setIsLogin(true);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleAuthSuccess = () => {
    handleClose();
    router.refresh();
  };

  const handleForgotPassword = () => {
    handleClose();
    router.push(appRouter.forgotPassword);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isLogin ? t('signIn') : t('signUp')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {isLogin ? (
            <ModalSignInForm onSuccess={handleAuthSuccess} />
          ) : (
            <ModalSignUpForm onSuccess={handleAuthSuccess} />
          )}

          <div className="flex justify-center">
            {isLogin ? (
              <span>
                Don&apos;t have an account?{' '}
                <span
                  onClick={toggleMode}
                  className="cursor-pointer text-primary"
                >
                  Sign up
                </span>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <span
                  onClick={toggleMode}
                  className="cursor-pointer text-primary"
                >
                  Sign in
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
