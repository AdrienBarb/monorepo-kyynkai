'use client';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

const AuthErrorHandler = () => {
  const [error, setError] = useQueryState('error');
  const t = useTranslations();

  useEffect(() => {
    if (error) {
      setError(null);

      switch (error) {
        case 'INVALID_TOKEN':
          toast.error(
            t('error.invalidToken') ||
              'This link has expired or is invalid. Please try again.',
          );
          break;
        case 'EXPIRED_TOKEN':
          toast.error(
            t('error.expiredToken') ||
              'This link has expired. Please request a new one.',
          );
          break;
        case 'UNAUTHORIZED':
          toast.error(
            t('error.unauthorized') ||
              'You are not authorized to access this resource.',
          );
          break;
        case 'FORBIDDEN':
          toast.error(t('error.forbidden') || 'Access denied.');
          break;
        case 'NOT_FOUND':
          toast.error(
            t('error.notFound') || 'The requested resource was not found.',
          );
          break;
        case 'RATE_LIMITED':
          toast.error(
            t('error.rateLimited') ||
              'Too many requests. Please try again later.',
          );
          break;
        case 'SERVER_ERROR':
          toast.error(
            t('error.serverError') ||
              'Something went wrong. Please try again later.',
          );
          break;
        default:
          toast.error(
            t('error.generic') || 'An error occurred. Please try again.',
          );
          break;
      }
    }
  }, [error, setError, t]);

  return null; // This component doesn't render anything
};

export default AuthErrorHandler;
