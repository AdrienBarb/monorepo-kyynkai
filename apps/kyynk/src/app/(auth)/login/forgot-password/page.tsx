import React from 'react';
import UserForgotPasswordForm from '@/components/UserForgotPasswordForm';
import Title from '@/components/ui/Title';
import SupportContact from '@/components/SupportContact';
import Text from '@/components/ui/Text';

const UserForgotPasswordPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-12">
          <Title Tag="h3" data-id="forgot-password-title">
            Forgot Password
          </Title>
          <Text className="text-center">Re-initialize your password</Text>
        </div>
        <UserForgotPasswordForm />
      </div>
      <SupportContact />
    </>
  );
};

export default UserForgotPasswordPage;
