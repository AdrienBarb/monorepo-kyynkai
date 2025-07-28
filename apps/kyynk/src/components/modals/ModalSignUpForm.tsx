'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { getUTMFromLocalStorage } from '@/utils/tracking/getUTMFromLocalStorage';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { signUp } from '@/lib/better-auth/auth-client';

interface ModalSignUpFormProps {
  onSuccess?: () => void;
}

const ModalSignUpForm: React.FC<ModalSignUpFormProps> = ({ onSuccess }) => {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    name: z
      .string()
      .min(1, t('error.field_required'))
      .min(2, t('error.name_to_short')),
    email: z
      .string()
      .min(1, t('error.field_required'))
      .email(t('error.field_not_valid')),
    password: z
      .string()
      .min(1, t('error.field_required'))
      .min(8, t('error.password_to_short')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const { data, error } = await signUp.email(
      {
        name: values.name,
        email: values.email.toLowerCase(),
        password: values.password,
      },
      {
        onSuccess: () => {
          toast.success(t('signUpSuccess') || 'Successfully signed up!');
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('name')}</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('password')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} type={showPassword ? 'text' : 'password'} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
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
