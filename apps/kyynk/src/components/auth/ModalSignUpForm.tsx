'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import Link from 'next/link';
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

interface ModalSignUpFormProps {
  onSuccess?: () => void;
  onError?: (errorMessage: string) => void;
}

const ModalSignUpForm: React.FC<ModalSignUpFormProps> = ({
  onSuccess,
  onError,
}) => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const emailSchema = z.object({
    email: z
      .string()
      .min(1, t('error.field_required'))
      .email(t('error.field_not_valid')),
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
    ageVerification: boolean;
  }>({
    resolver: zodResolver(
      z.object({
        email: emailSchema.shape.email,
        otp: isOtpSent ? otpSchema.shape.otp : z.string().optional(),
        ageVerification: z.boolean().refine((val) => val === true, {
          message: t('error.field_required'),
        }),
      }),
    ),
    defaultValues: {
      email: '',
      otp: '',
      ageVerification: false,
    },
    mode: 'onBlur',
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

  const onSubmit = async (values: {
    email: string;
    otp: string;
    ageVerification: boolean;
  }) => {
    if (!isOtpSent) {
      await sendOtp(values.email);
    } else {
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
    <div className="space-y-6 px-4 pb-4">
      <div className="bg-primary rounded-lg p-4 text-white text-center shadow-lg">
        <div className="flex items-center justify-center mb-2">
          <span className="text-2xl mr-2">🎉</span>
          <h3 className="text-lg font-bold">{t('signUpBonusTitle')}</h3>
        </div>
        <p className="text-sm mb-2 font-medium">
          {t('signUpBonusDescription')}
        </p>
      </div>

      <GoogleSignInButton
        onSuccess={onSuccess}
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

          <FormField
            control={form.control}
            name="ageVerification"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    {t('ageVerificationCheckbox')}
                  </FormLabel>
                  <FormMessage />
                </div>
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
          <div>
            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={isLoading || !form.getValues('ageVerification')}
            >
              {isOtpSent ? t('continue') : t('signUp')}
            </Button>

            <p className="text-xs text-gray-600 text-center mt-2">
              By signing up, you agree to our{' '}
              <Link
                href="/terms"
                className="text-xs text-gray-600"
                target="_blank"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy-policy"
                className="text-xs text-gray-600"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ModalSignUpForm;
