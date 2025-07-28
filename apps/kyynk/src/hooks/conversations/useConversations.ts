import useApi from '@/hooks/requests/useApi';
import { ConversationType } from '@/types/conversations';
import { useQueryClient } from '@tanstack/react-query';

export const useConversations = () => {
  const { useGet } = useApi();
  const queryClient = useQueryClient();

  const {
    data: conversations,
    isLoading,
    error,
    refetch,
  } = useGet(
    '/api/conversations',
    {},
    {
      refetchInterval: 20000,
      staleTime: 0,
    },
  );

  const markConversationAsRead = (conversationId: string) => {
    queryClient.setQueryData(
      ['get', { url: '/api/conversations', params: {} }],
      (oldData: ConversationType[] | undefined) => {
        if (!oldData) return oldData;

        return oldData.map((conversation) =>
          conversation.id === conversationId
            ? { ...conversation, hasUnreadMessages: false }
            : conversation,
        );
      },
    );
  };

  return {
    conversations: conversations as ConversationType[] | undefined,
    isLoading,
    error,
    refetch,
    markConversationAsRead,
  };
};
