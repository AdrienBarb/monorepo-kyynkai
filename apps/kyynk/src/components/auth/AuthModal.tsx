'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { useTranslations } from 'next-intl';
import ModalSignInForm from './ModalSignInForm';
import ModalSignUpForm from './ModalSignUpForm';
import { useRouter } from 'next/navigation';
import { appRouter } from '@/constants/appRouter';
import { CheckCircle, XCircle } from 'lucide-react';

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
      message: `We've sent an email to ${email}. Please click on the link in the email to sign in. Be sure to check the spam folder!`,
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
            <Alert
              variant={alert.type === 'error' ? 'destructive' : 'default'}
              className={`${
                alert.type === 'success'
                  ? 'border-green-500/50 bg-green-900 text-white shadow-lg'
                  : ''
              }`}
            >
              {alert.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className="text-sm">
                {alert.message}
                {alert.type === 'success' && (
                  <div className="mt-2 text-right">
                    <button
                      onClick={handleChangeEmail}
                      className="text-green-300 underline hover:text-green-200"
                    >
                      Change Email
                    </button>
                  </div>
                )}
              </AlertDescription>
            </Alert>
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
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
