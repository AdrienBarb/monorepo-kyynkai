'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTranslations } from 'next-intl';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { authClient } from '@/lib/better-auth/auth-client';
import GoogleSignInButton from './GoogleSignInButton';
import { Separator } from '@/components/ui/Separator';

interface ModalSignInFormProps {
  onSuccess?: () => void;
  onError?: (errorMessage: string) => void;
}

const ModalSignInForm: React.FC<ModalSignInFormProps> = ({
  onSuccess,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const t = useTranslations();

  const emailSchema = z.object({
    email: z
      .string()
      .email(t('error.field_not_valid'))
      .min(1, t('error.field_required')),
  });

  const otpSchema = z.object({
    otp: z
      .string()
      .min(6, t('error.field_required'))
      .max(6, t('error.field_not_valid')),
  });

  const form = useForm<{
    email: string;
    otp: string;
  }>({
    resolver: zodResolver(
      z.object({
        email: emailSchema.shape.email,
        otp: isOtpSent ? otpSchema.shape.otp : z.string().optional(),
      }),
    ),
    defaultValues: {
      email: '',
      otp: '',
    },
  });

  const sendOtp = async (email: string) => {
    setIsLoading(true);

    await authClient.emailOtp.sendVerificationOtp(
      {
        email: email.toLowerCase(),
        type: 'sign-in',
      },
      {
        onSuccess: () => {
          setSentEmail(email.toLowerCase());
          setIsOtpSent(true);
        },
        onError: (ctx: any) => {
          const errorMessage = ctx.error.message || t('somethingWentWrong');
          onError?.(errorMessage);
        },
      },
    );

    setIsLoading(false);
  };

  const onSubmit = async (values: { email: string; otp: string }) => {
    if (!isOtpSent) {
      // Send OTP
      await sendOtp(values.email);
    } else {
      // Verify OTP
      setIsLoading(true);

      await authClient.signIn.emailOtp(
        {
          email: sentEmail,
          otp: values.otp,
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
          onError: (ctx: any) => {
            const errorMessage = ctx.error.message || t('somethingWentWrong');
            onError?.(errorMessage);
          },
        },
      );

      setIsLoading(false);
    }
  };

  const emailValue = form.watch('email');
  React.useEffect(() => {
    if (isOtpSent && emailValue.toLowerCase() !== sentEmail) {
      setIsOtpSent(false);
      setSentEmail('');
      form.setValue('otp', '');
    }
  }, [emailValue, isOtpSent, sentEmail, form]);

  return (
    <div className="space-y-4 px-4 pb-4">
      <GoogleSignInButton
        onError={onError}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      <Separator />

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

          {isOtpSent && (
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('verificationCode')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      maxLength={6}
                      placeholder="123456"
                    />
                  </FormControl>
                  <FormDescription>{t('otpHelperText')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {t('continue')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ModalSignInForm;
