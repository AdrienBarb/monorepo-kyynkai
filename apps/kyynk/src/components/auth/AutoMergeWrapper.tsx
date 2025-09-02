'use client';

import { useEffect, useRef } from 'react';
import { useSession } from '@/lib/better-auth/auth-client';
import { getCookie } from 'cookies-next';
import useApi from '@/hooks/requests/useApi';
import { useConversations } from '@/hooks/conversations/useConversations';
import { useFetchMessages } from '@/hooks/messages/useFetchMessages';

const AutoMergeWrapper: React.FC = () => {
  const { data: session } = useSession();
  const { usePost } = useApi();
  const { refetch: refetchConversations } = useConversations();
  const mergeAttempted = useRef(false);

  const { refetch: refetchMessages } = useFetchMessages();

  const { mutate: mergeGuest } = usePost('/api/me/merge', {
    onSuccess: () => {
      refetchConversations();
      refetchMessages();
    },
    onError: () => {
      mergeAttempted.current = false;
    },
  });

  useEffect(() => {
    const attemptMerge = () => {
      if (!session?.user?.id || mergeAttempted.current) {
        return;
      }

      const guestId = getCookie('guest_id');
      if (!guestId) {
        return;
      }

      mergeAttempted.current = true;
      mergeGuest({});
    };

    attemptMerge();
  }, [session?.user?.id, mergeGuest]);

  return null;
};

export default AutoMergeWrapper;
