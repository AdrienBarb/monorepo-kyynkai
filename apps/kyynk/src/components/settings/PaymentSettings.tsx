'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { useUser } from '@/hooks/users/useUser';
import useApi from '@/hooks/requests/useApi';
import Text from '../ui/Text';
import { Separator } from '../ui/Separator';
import { bankDetailsSchema } from '@/schemas/settings/payment/bankDetails';
import { toast } from 'react-hot-toast';
import { Card } from '../ui/Card';
import { useTranslations } from 'next-intl';

const PaymentSettings = () => {
  const { user, refetch } = useUser();
  const { usePut } = useApi();
  const t = useTranslations();

  const form = useForm<z.infer<typeof bankDetailsSchema>>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      bankAccountName: '',
      iban: '',
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (user) {
      reset({
        bankAccountName: user.settings?.bankAccountName ?? '',
        iban: user.settings?.iban ?? '',
      });
    }
  }, [user, reset]);

  const { mutate: updateSettings, isPending } = usePut(
    '/api/settings/payment/bank-details',
    {
      onSuccess: () => {
        refetch();
        toast.success(t('bankDetailsUpdateSuccess'));
      },
    },
  );

  const onSubmit = (values: z.infer<typeof bankDetailsSchema>) => {
    updateSettings(values);
  };

  return (
    <Card>
      <div className="w-full mb-4">
        <Text className="font-bold">{t('paymentSettingsTitle')}</Text>
        <Text className="text-sm">{t('paymentSettingsDescription')}</Text>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="bankAccountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('bankAccountName')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="iban"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('iban')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4"
            isLoading={isPending}
            disabled={isPending}
          >
            {t('save')}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default PaymentSettings;
