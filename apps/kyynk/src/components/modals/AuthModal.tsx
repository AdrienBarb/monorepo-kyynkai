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
  const [isLogin, setIsLogin] = useState(true);
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
            <div className="space-y-4">
              <ModalSignInForm onSuccess={handleAuthSuccess} />
              <div className="text-center">
                <Button
                  variant="ghost"
                  className="text-sm text-primary font-light"
                  onClick={handleForgotPassword}
                >
                  {t('forgotPassword')}
                </Button>
              </div>
            </div>
          ) : (
            <ModalSignUpForm onSuccess={handleAuthSuccess} />
          )}

          <div className="flex flex-col gap-4">
            <Button variant="secondary" onClick={toggleMode} className="w-full">
              {isLogin ? t('signUp') : t('signIn')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
