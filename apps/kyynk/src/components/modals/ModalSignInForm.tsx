'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { authClient } from '@/lib/better-auth/auth-client';

interface ModalSignInFormProps {
  onSuccess?: () => void;
}

const ModalSignInForm: React.FC<ModalSignInFormProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();

  const formSchema = z.object({
    email: z
      .string()
      .email(t('error.field_not_valid'))
      .min(1, t('error.field_required')),
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
          onSuccess?.();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
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
          {t('signIn')}
        </Button>
      </form>
    </Form>
  );
};

export default ModalSignInForm;
