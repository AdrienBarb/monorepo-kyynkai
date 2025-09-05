import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';

export const useFetchCurrentAiGirlfriend = () => {
  const { slug } = useParams<{ slug: string }>();
  const { useGet } = useApi();

  const { data: aiGirlfriend, refetch } = useGet(
    `/api/ai-girlfriends/${slug}`,
    { slug },
    { enabled: !!slug },
  );

  return { aiGirlfriend, refetch };
};
