import useApi from '@/hooks/requests/useApi';
import { useSession } from '@/lib/better-auth/auth-client';

export interface UnlockedChoice {
  id: string;
  choiceId: string;
  choiceLabel: string;
  videoUrl: string;
  createdAt: string;
  fantasy: {
    id: string;
    title: string;
    aiGirlfriend: {
      id: string;
      pseudo: string;
      slug: string;
      profileImageId: string;
    };
  };
}

export const useUnlockedChoices = () => {
  const { useGet } = useApi();
  const { data: session } = useSession();

  const {
    data: unlockedChoices,
    isLoading,
    error,
    refetch,
  } = useGet(
    '/api/gallery/unlocked-choices',
    {},
    {
      enabled: !!session?.user?.id,
    },
  );

  return {
    unlockedChoices,
    isLoading,
    error,
    refetch,
  };
};
