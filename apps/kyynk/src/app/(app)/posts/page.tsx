'use client';

import Text from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';
import { useFetchAllPosts } from '@/hooks/posts/useFetchAllPosts';
import PageContainer from '@/components/PageContainer';
import PostCard from '@/components/posts/PostCard';
import { PostWithAiGirlfriend } from '@/types/posts';

const PostsPage = () => {
  const {
    posts,
    isLoading,
    addUserToUnlockedList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchAllPosts();

  const handleUnlock = (postId: string, userId: string) => {
    addUserToUnlockedList(postId, userId);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-64 px-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
          <Text className="text-center text-muted-foreground">
            Loading posts...
          </Text>
        </div>
      </PageContainer>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-64 px-4">
          <Text className="text-center text-muted-foreground">
            No posts available yet...
          </Text>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-6 p-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: PostWithAiGirlfriend) => (
            <PostCard
              key={post.id}
              post={post}
              onUnlock={handleUnlock}
              showAuthor={true}
            />
          ))}
        </div>

        {hasNextPage && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleLoadMore}
              isLoading={isFetchingNextPage}
              variant="secondary"
              size="lg"
            >
              {isFetchingNextPage ? 'Loading more...' : 'Load More Posts'}
            </Button>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default PostsPage;
