import useApi from '@/hooks/requests/useApi';
import { ConversationType } from '@/types/conversations';
import { useUser } from '../users/useUser';

export const useConversations = () => {
  const { useGet } = useApi();
  const { user } = useUser();

  const {
    data: conversations,
    isLoading,
    error,
    refetch,
  } = useGet('/api/conversations', {
    enabled: !!user?.id,
  });

  return {
    conversations: conversations as ConversationType[] | undefined,
    isLoading,
    error,
    refetch,
  };
};
