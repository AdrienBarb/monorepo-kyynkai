import { useUserStore } from '@/stores/UserStore';
import useApi from '@/hooks/requests/useApi';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { LoggedUserType } from '@/types/users';

export const useUser = () => {
  const { user, setUser: setUserStore, clearUser } = useUserStore();
  const { useGet } = useApi();
  const { data: session } = useSession();

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

  return {
    user,
    isLoading,
    error,
    refetch,
    isLoggedIn: () => !!user,
    setUser,
  };
};
