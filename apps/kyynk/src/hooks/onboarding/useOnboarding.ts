import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/users/useUser';
import { appRouter } from '@/constants/appRouter';
import { apiRouter } from '@/constants/apiRouter';
import useApi from '@/hooks/requests/useApi';
import { User, UserType } from '@prisma/client';
import { useQueryState } from 'nuqs';
import { sendGTMEventToGTM } from '@/utils/tracking/sendGTMEvent';

export type OnboardingStep =
  | 'user-type'
  | 'preferences'
  | 'profile-picture'
  | 'message-price';

export interface OnboardingData {
  userType: string;
  preferences: string[];
  profileImageId?: string;
  fiatMessage?: string;
}

export const useOnboarding = () => {
  const { user, refetch } = useUser();
  const { usePut } = useApi();
  const router = useRouter();
  const [step, setStep] = useQueryState('step');

  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    userType: '',
    preferences: [],
    profileImageId: '',
    fiatMessage: '0',
  });

  useEffect(() => {
    if (user) {
      setOnboardingData((prev) => ({
        ...prev,
        userType: user.userType || '',
        preferences: user.preferences || [],
        profileImageId: user.profileImageId || '',
        fiatMessage: String(user.settings?.fiatMessage || '0'),
      }));
    }
  }, [user]);

  // Get current step from URL or default to 'user-type'
  const currentStep: OnboardingStep = (step as OnboardingStep) || 'user-type';

  // Define step order based on user type
  const getStepOrder = useCallback((userType: string): OnboardingStep[] => {
    if (userType === 'member') {
      return ['user-type', 'preferences'];
    }
    return ['user-type', 'profile-picture', 'message-price'];
  }, []);

  const { mutate: updateUser, isPending: isUpdatingUser } = usePut(
    apiRouter.me,
    {
      onSuccess: async (data: Partial<User>) => {
        refetch();

        // Navigate to next step or complete onboarding
        const nextStep = getNextStep();
        if (nextStep) {
          setStep(nextStep);
        } else {
          // Complete onboarding
          if (onboardingData.userType === 'member') {
            router.push(appRouter.home);
          } else {
            router.push(`/${user?.slug}`);
          }
        }
      },
    },
  );

  const { mutate: updateMessagePrice, isPending: isUpdatingPrice } = usePut(
    apiRouter.conversationsMessagesPrice,
    {
      onSuccess: async () => {
        refetch();

        // Navigate to next step or complete onboarding
        const nextStep = getNextStep();
        if (nextStep) {
          setStep(nextStep);
        } else {
          // Complete onboarding
          if (onboardingData.userType === 'member') {
            router.push(appRouter.home);
          } else {
            router.push(`/${user?.slug}`);
          }
        }
      },
    },
  );

  const getNextStep = useCallback((): OnboardingStep | null => {
    const stepOrder = getStepOrder(onboardingData.userType);
    const currentIndex = stepOrder.indexOf(currentStep);
    return currentIndex < stepOrder.length - 1
      ? stepOrder[currentIndex + 1]
      : null;
  }, [currentStep, onboardingData.userType, getStepOrder]);

  const getPreviousStep = useCallback((): OnboardingStep | null => {
    const stepOrder = getStepOrder(onboardingData.userType);
    const currentIndex = stepOrder.indexOf(currentStep);
    return currentIndex > 0 ? stepOrder[currentIndex - 1] : null;
  }, [currentStep, onboardingData.userType, getStepOrder]);

  const handleUserTypeSelect = useCallback((userType: string) => {
    setOnboardingData((prev) => ({ ...prev, userType }));
  }, []);

  const handlePreferencesToggle = useCallback((preference: string) => {
    setOnboardingData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((p) => p !== preference)
        : [...prev.preferences, preference],
    }));
  }, []);

  const handleProfilePictureUpdate = useCallback((profileImageId: string) => {
    setOnboardingData((prev) => ({ ...prev, profileImageId }));
  }, []);

  const handleMessagePriceChange = useCallback((fiatMessage: string) => {
    setOnboardingData((prev) => ({ ...prev, fiatMessage }));
  }, []);

  const handleContinue = useCallback(() => {
    const stepData = getStepData();
    if (stepData) {
      if (currentStep === 'message-price') {
        updateMessagePrice({ fiatMessage: stepData.fiatMessage });
      } else {
        updateUser(stepData);
      }
    }
  }, [currentStep, onboardingData, updateUser, updateMessagePrice]);

  const handleSkip = useCallback(() => {
    const nextStep = getNextStep();
    if (nextStep) {
      setStep(nextStep);
    } else {
      // Complete onboarding
      if (onboardingData.userType === 'member') {
        router.push(appRouter.home);
      } else {
        router.push(`/${user?.slug}`);
      }
    }
  }, [getNextStep, onboardingData.userType, router, user?.slug, setStep]);

  const getStepData = useCallback(() => {
    switch (currentStep) {
      case 'user-type':
        return { userType: onboardingData.userType };
      case 'preferences':
        return { preferences: onboardingData.preferences };
      case 'profile-picture':
        return { profileImageId: onboardingData.profileImageId };
      case 'message-price':
        return { fiatMessage: onboardingData.fiatMessage || '0' };
      default:
        return null;
    }
  }, [currentStep, onboardingData]);

  const canContinue = useCallback(() => {
    switch (currentStep) {
      case 'user-type':
        return !!onboardingData.userType;
      case 'preferences':
        return true;
      case 'profile-picture':
        return !!onboardingData.profileImageId;
      case 'message-price':
        return !!onboardingData.fiatMessage;
      default:
        return false;
    }
  }, [currentStep, onboardingData]);

  const goToPreviousStep = useCallback(() => {
    const previousStep = getPreviousStep();
    if (previousStep) {
      setStep(previousStep);
    }
  }, [getPreviousStep, setStep]);

  const isPending = isUpdatingUser || isUpdatingPrice;

  return {
    // State
    currentStep,
    onboardingData,
    isPending,

    // Actions
    handleUserTypeSelect,
    handlePreferencesToggle,
    handleProfilePictureUpdate,
    handleMessagePriceChange,
    handleContinue,
    handleSkip,
    goToPreviousStep,

    // Computed
    canContinue: canContinue(),
    hasNextStep: !!getNextStep(),
    hasPreviousStep: !!getPreviousStep(),
  };
};
