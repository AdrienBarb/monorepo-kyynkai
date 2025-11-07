import useApi from '@/hooks/requests/useApi';

export const usePlayFantasy = () => {
  const { usePost } = useApi();

  return usePost(`/api/fantasies/play`, {
    onSuccess: (data: any) => {
      console.log('Fantasy choice played:', data);
    },
    onError: (error: any) => {
      console.error('Error playing fantasy choice:', error);
    },
  });
};
