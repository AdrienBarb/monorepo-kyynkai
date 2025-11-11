import useApi from '@/hooks/requests/useApi';

export const useFantasies = (slug: string) => {
  const { useGet } = useApi();

  return useGet(
    `/api/fantasies/${slug}`,
    {},
    {
      enabled: !!slug,
      staleTime: 5 * 60 * 1000,
    },
  );
};
