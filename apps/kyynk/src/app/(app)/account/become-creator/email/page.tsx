import React from 'react';
import EmailVerification from '@/components/EmailVerification';
import { Card } from '@/components/ui/Card';
const CreatorEmailConfirmationPage = () => {
  return (
    <Card className="max-w-screen-sm mx-auto">
      <EmailVerification />
    </Card>
  );
};

export default CreatorEmailConfirmationPage;
