'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from '@/styles/Form.module.scss';
import CustomTextField from '@/components/Inputs/TextField';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import { Button } from './ui/Button';
import { apiRouter } from '@/constants/apiRouter';

const UserForgotPasswordForm = () => {
  const t = useTranslations();
  const { usePost } = useApi();
  const [isEmailSend, setIsEmailSend] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t('error.field_not_valid'))
      .required(t('error.field_required')),
  });

  const { mutate: resetPasswordRequest, isPending } = usePost(
    apiRouter.forgotPassword,
    {
      onSuccess: () => {
        setIsEmailSend(true);
      },
    },
  );

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      resetPasswordRequest(values);
    },
  });

  if (isEmailSend) {
    return (
      <div className={styles.emailConfirmationWrapper}>
        <div className={styles.title}>{t('email_has_been_send')}</div>
        <div className={styles.email}>{formik.values.email}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <CustomTextField
          variant="standard"
          fullWidth
          id="email"
          name="email"
          label={t('email')}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button type="submit" isLoading={isPending} disabled={isPending}>
          {t('send')}
        </Button>
      </form>
    </div>
  );
};

export default UserForgotPasswordForm;
