'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from '@/styles/Form.module.scss';
import { useRouter } from 'next/navigation';
import CustomTextField from '@/components/Inputs/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import useApi from '@/hooks/requests/useApi';
import { Button } from './ui/Button';

const UserResetPasswordForm = () => {
  //router
  const router = useRouter();
  const { userId, token } = useParams<{
    userId: string;
    token: string;
  }>();

  //redux
  const t = useTranslations();

  //localstate
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const { usePost } = useApi();

  const { mutate: resetPassword, isPending } = usePost(
    `/api/me/password/reset`,
    {
      onSuccess: () => {
        toast.success(t('success.passwordChangeSucceed'));
        router.push('/');
      },
    },
  );

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleClickShowPasswordConfirmation = () => {
    setShowPasswordConfirmation((prevShowPassword) => !prevShowPassword);
  };

  const validationSchema = yup.object({
    password: yup
      .string()
      .required(t('error.field_required'))
      .min(8, t('error.password_to_short')),
    passwordConfirmation: yup
      .string()
      .required(t('error.field_required'))
      .min(8, t('error.password_to_short')),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.password !== values.passwordConfirmation) {
        toast.error(t('error.password_confirmation_invalid'));
        return;
      }

      resetPassword({
        password: values.password,
        userId: userId,
        token: token,
      });
    },
  });

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <CustomTextField
          variant="standard"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          label={t('common.password')}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            // add this
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <CustomTextField
          variant="standard"
          fullWidth
          type={showPasswordConfirmation ? 'text' : 'password'}
          id="passwordConfirmation"
          name="passwordConfirmation"
          label={t('common.passwordConfirmation')}
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          error={
            formik.touched.passwordConfirmation &&
            Boolean(formik.errors.passwordConfirmation)
          }
          helperText={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordConfirmation}
                >
                  {showPasswordConfirmation ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" isLoading={isPending} disabled={isPending}>
          {t('common.validate')}
        </Button>
      </form>
    </div>
  );
};

export default UserResetPasswordForm;
