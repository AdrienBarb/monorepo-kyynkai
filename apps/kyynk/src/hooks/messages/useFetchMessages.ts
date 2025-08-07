import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { MessageType, MessageWithNudePermissions } from '@/types/messages';
import { useUser } from '../users/useUser';

export const useFetchMessages = () => {
  const { slug } = useParams<{ slug: string }>();
  const { useGet } = useApi();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const url = `/api/messages`;

  const { data: messages, refetch } = useGet(
    url,
    { slug },
    { enabled: !!user?.id },
  );

  const addMessageToCache = (
    newMessage: MessageType | MessageWithNudePermissions,
  ) => {
    const queryKey = ['get', { url, params: { slug } }];

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
