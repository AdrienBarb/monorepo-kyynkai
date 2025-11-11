import useApi from '@/hooks/requests/useApi';
import { useUser } from './useUser';

export const useIsFirstTimeBuyer = () => {
  const { user } = useUser();
  const { useGet } = useApi();

  return useGet(
    '/api/users/is-first-time-buyer',
    {},
    {
      enabled: !!user?.id,
      staleTime: 5 * 60 * 1000,
    },
  );
};
