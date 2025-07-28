import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { MessageType, MessageWithNudePermissions } from '@/types/messages';

export const useFetchMessages = () => {
  const { id: conversationId } = useParams();
  const { useGet } = useApi();
  const queryClient = useQueryClient();

  const url = `/api/conversations/${conversationId}/messages`;

  const { data: messages, refetch } = useGet(url);

  const addMessageToCache = (
    newMessage: MessageType | MessageWithNudePermissions,
  ) => {
    const queryKey = ['get', { url }];

    queryClient.setQueryData(queryKey, (oldData: any) => {
      if (!oldData) {
        return [newMessage];
      }

      return [...oldData, newMessage];
    });
  };

  return {
    messages,
    refetch,
    addMessageToCache,
  };
};
