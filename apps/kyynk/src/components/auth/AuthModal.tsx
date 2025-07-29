'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

import { useTranslations } from 'next-intl';
import ModalSignInForm from './ModalSignInForm';
import ModalSignUpForm from './ModalSignUpForm';
import AuthAlert from './AuthAlert';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface AlertState {
  type: 'success' | 'error';
  message: string;
  email?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, setOpen }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);
  const t = useTranslations();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    setIsLogin(true);
    setAlert(null);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setAlert(null);
  };

  const handleAuthSuccess = (email: string) => {
    setAlert({
      type: 'success',
      message: t('magicLinkEmailSent', { email }),
      email,
    });
  };

  const handleAuthError = (errorMessage: string) => {
    setAlert({
      type: 'error',
      message: errorMessage,
    });
  };

  const handleChangeEmail = () => {
    setAlert(null);
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
          {alert ? (
            <AuthAlert
              type={alert.type}
              message={alert.message}
              onChangeEmail={handleChangeEmail}
            />
          ) : (
            <>
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

              <div className="flex justify-center">
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
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
