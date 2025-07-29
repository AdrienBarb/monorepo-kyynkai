'use client';

import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { CheckCircle, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface AuthAlertProps {
  type: 'success' | 'error';
  message: string;
  onChangeEmail?: () => void;
}

const AuthAlert: React.FC<AuthAlertProps> = ({
  type,
  message,
  onChangeEmail,
}) => {
  const t = useTranslations();

  return (
    <Alert
      variant={type === 'error' ? 'destructive' : 'default'}
      className={`${type === 'success' ? ' bg-primary text-secondary' : ''}`}
    >
      {type === 'success' ? (
        <CheckCircle className="h-4 w-4 text-green-400" />
      ) : (
        <XCircle className="h-4 w-4 text-red-600" />
      )}
      <AlertDescription className="text-sm">
        {message}
        {type === 'success' && onChangeEmail && (
          <div className="mt-2 text-right">
            <button
              onClick={onChangeEmail}
              className="text-custom-black underline"
            >
              {t('changeEmail')}
            </button>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default AuthAlert;
