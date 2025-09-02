import { useUserStore } from '@/stores/UserStore';
import useApi from '@/hooks/requests/useApi';
import { useEffect, useState } from 'react';
import { LoggedUserType } from '@/types/users';
import { useSession } from '@/lib/better-auth/auth-client';
import { getCookie } from 'cookies-next';
import { VISITOR_TRACKING } from '@/constants/visitorTracking';

export const useUser = () => {
  const { user, setUser: setUserStore, clearUser } = useUserStore();
  const { useGet } = useApi();
  const { data: session } = useSession();
  const [visitorId, setVisitorId] = useState<string | null>(null);

  const {
    data: fetchedUser,
    isLoading,
    error,
    refetch,
  } = useGet(
    `/api/me`,
    {},
    {
      enabled: !!session?.user?.id,
      staleTime: 0,
      refetchOnWindowFocus: true,
    },
  );

  const setUser = (partialUser: Partial<LoggedUserType>) => {
    const updatedUser = { ...user, ...partialUser };
    setUserStore(updatedUser as LoggedUserType);
  };

  useEffect(() => {
    if (fetchedUser) {
      setUserStore(fetchedUser);
    }
  }, [fetchedUser, setUserStore]);

  useEffect(() => {
    if (!session?.user?.id) {
      clearUser();
    }
  }, [session?.user?.id, clearUser]);

  useEffect(() => {
    const id = getCookie(VISITOR_TRACKING.COOKIE_NAME) as string | null;
    setVisitorId(id);
  }, []);

  return {
    user,
    isLoading,
    error,
    refetch,
    isLoggedIn: () => !!user,
    setUser,
    visitorId,
  };
};
