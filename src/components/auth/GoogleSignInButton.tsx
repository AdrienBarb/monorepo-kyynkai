'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { authClient } from '@/lib/better-auth/auth-client';
import { FcGoogle } from 'react-icons/fc';
import { usePathname } from 'next/navigation';
import { useClientPostHogEvent } from '@/utils/tracking/useClientPostHogEvent';
import { trackingEvent } from '@/constants/trackingEvent';

interface GoogleSignInButtonProps {
  isSignUp?: boolean;
  onError?: (error: string) => void;
  isLoading?: boolean;
  setIsLoading?: (loading: boolean) => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  isSignUp = false,
  onError,
  isLoading = false,
  setIsLoading,
}) => {
  const pathname = usePathname();
  const { sendEventOnce } = useClientPostHogEvent();
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading?.(true);

      await authClient.signIn.social(
        {
          provider: 'google',
          callbackURL: pathname,
        },
        {
          onSuccess: () => {
            if (isSignUp) {
              sendEventOnce({
                eventName: trackingEvent.signup_completed,
              });
            }
          },
          onError: (ctx: any) => {
            const errorMessage = ctx.error?.message || 'Google sign-in failed';
            onError?.(errorMessage);
          },
        },
      );
    } catch (error) {
      onError?.('An unexpected error occurred');
    } finally {
      setIsLoading?.(false);
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 py-3"
    >
      <FcGoogle size={20} />
      <span>Continue with Google</span>
    </Button>
  );
};

export default GoogleSignInButton;
