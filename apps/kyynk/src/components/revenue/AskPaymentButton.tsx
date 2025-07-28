'use client';

import React, { FC } from 'react';
import { Button } from '@/components/ui/Button';
import useApi from '@/hooks/requests/useApi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/users/useUser';

interface AskPaymentButtonProps {
  disabled: boolean;
}

const AskPaymentButton: FC<AskPaymentButtonProps> = ({ disabled }) => {
  const { usePost } = useApi();
  const router = useRouter();
  const { user } = useUser();

  const { mutate: askPayment, isPending } = usePost(
    '/api/revenue/ask-payment',
    {
      onSuccess: () => {
        router.refresh();
        toast.success('Payment request sent successfully!');
      },
    },
  );

  const handleAskPayment = () => {
    if (!user?.settings?.bankAccountName || !user?.settings?.iban) {
      toast.error('Please add your bank account information in your settings.');
      return;
    }

    askPayment({});
  };

  return (
    <Button
      size="sm"
      disabled={disabled || isPending}
      isLoading={isPending}
      onClick={handleAskPayment}
    >
      Ask Payment
    </Button>
  );
};

export default AskPaymentButton;
