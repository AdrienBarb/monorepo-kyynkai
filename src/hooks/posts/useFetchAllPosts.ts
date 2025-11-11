import { useMemo } from 'react';
import useApi from '@/hooks/requests/useApi';
import { PostWithAiGirlfriend, PostsResponse } from '@/types/posts';
import { useQueryClient } from '@tanstack/react-query';

export const useFetchAllPosts = () => {
  const { useInfinite } = useApi();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinite(
    'allPosts',
    '/api/posts',
    { limit: 20 },
    {
      getNextPageParam: (lastPage: PostsResponse) => lastPage.nextCursor,
      initialPageParam: undefined,
    },
  );

  const posts = useMemo(() => {
    return data?.pages?.flatMap((page: PostsResponse) => page.posts) || [];
  }, [data]);

  const addUserToUnlockedList = (postId: string, userId: string) => {
    queryClient.setQueryData(['allPosts'], (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: PostsResponse) => ({
          ...page,
          posts: page.posts.map((post: PostWithAiGirlfriend) => {
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
          }),
        })),
      };
    });
  };

  return {
    posts,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    addUserToUnlockedList,
  };
};
