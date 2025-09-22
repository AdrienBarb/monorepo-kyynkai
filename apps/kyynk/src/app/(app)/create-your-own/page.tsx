'use client';

import { useUser } from '@/hooks/users/useUser';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';
import { useTranslations } from 'next-intl';
import { trackingEvent } from '@/constants/trackingEvent';
import { useClientPostHogEvent } from '@/utils/tracking/useClientPostHogEvent';

const CreateYourOwnPage = () => {
  const { isLoggedIn } = useUser();
  const { openModal } = useGlobalModalStore();
  const t = useTranslations();
  const { sendEventOnce } = useClientPostHogEvent();

  const handleSignUpClick = () => {
    sendEventOnce({
      eventName: trackingEvent.signup_for_create_your_own_clicked,
    });
    openModal('auth', { isSignInMode: false });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Create Your Own Girlfriend
      </h1>

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {isLoggedIn() ? 'Feature Coming Soon' : 'Get Started'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {isLoggedIn() ? (
              <CardDescription className="text-base">
                This feature is not yet available
              </CardDescription>
            ) : (
              <>
                <CardDescription className="text-base">
                  Sign up to start creating your girlfriend
                </CardDescription>
                <Button onClick={handleSignUpClick} className="w-full">
                  {t('signUp')}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateYourOwnPage;
