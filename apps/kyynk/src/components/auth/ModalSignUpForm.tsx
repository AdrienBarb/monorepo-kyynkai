'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { authClient } from '@/lib/better-auth/auth-client';

interface ModalSignUpFormProps {
  onSuccess?: (email: string) => void;
  onError?: (errorMessage: string) => void;
}

const ModalSignUpForm: React.FC<ModalSignUpFormProps> = ({
  onSuccess,
  onError,
}) => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    email: z
      .string()
      .min(1, t('error.field_required'))
      .email(t('error.field_not_valid')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    await authClient.signIn.magicLink(
      {
        email: values.email.toLowerCase(),
        callbackURL: '/',
        newUserCallbackURL: '/',
        errorCallbackURL: '/',
      },
      {
        onSuccess: () => {
          onSuccess?.(values.email);
        },
        onError: (ctx) => {
          const errorMessage = ctx.error.message || t('somethingWentWrong');
          onError?.(errorMessage);
        },
      },
    );

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {t('signUp')}
        </Button>
      </form>
    </Form>
  );
};

export default ModalSignUpForm;
