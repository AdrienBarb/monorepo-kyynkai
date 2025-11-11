import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { PostWithMedia } from '@/types/posts';

export const useFetchPosts = () => {
  const { slug } = useParams<{ slug: string }>();
  const { useGet } = useApi();
  const queryClient = useQueryClient();

  const url = `/api/ai-girlfriends/${slug}/posts`;

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useGet(url, {}, { enabled: !!slug });

  const updatePostInCache = (
    postId: string,
    updates: Partial<PostWithMedia>,
  ) => {
    const queryKey = ['get', { url, params: {} }];

    queryClient.setQueryData(
      queryKey,
      (oldData: PostWithMedia[] | undefined) => {
        if (!oldData) return oldData;

        return oldData.map((post) =>
          post.id === postId ? { ...post, ...updates } : post,
        );
      },
    );
  };

  const addUserToUnlockedList = (postId: string, userId: string) => {
    const queryKey = ['get', { url, params: {} }];

    queryClient.setQueryData(
      queryKey,
      (oldData: PostWithMedia[] | undefined) => {
        if (!oldData) return oldData;

        return oldData.map((post) => {
          if (post.id === postId && post.media) {
            return {
              ...post,
              media: {
                ...post.media,
                unlockUsers: [...(post.media.unlockUsers || []), userId],
              },
            };
          }
          return post;
        });
      },
    );
  };

  return {
    posts: posts as PostWithMedia[] | undefined,
    isLoading,
    error,
    refetch,
    updatePostInCache,
    addUserToUnlockedList,
  };
};
