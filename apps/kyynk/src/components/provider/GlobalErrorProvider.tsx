'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useErrorStore } from '@/stores/ErrorStore';
import { signOut } from 'next-auth/react';

const GlobalErrorProvider = () => {
  const router = useRouter();
  const { isError, statusCode, errorMessage, clearError } = useErrorStore();

  useEffect(() => {
    if (isError) {
      if (statusCode === 404) {
        router.push('/404');
      }

      if (statusCode === 401) {
        signOut({ redirectTo: '/' });
      }

      if (errorMessage) {
        toast.error(errorMessage);
      }
    }

    clearError();
  }, [isError, errorMessage, statusCode]);

  return <></>;
};

export default GlobalErrorProvider;
