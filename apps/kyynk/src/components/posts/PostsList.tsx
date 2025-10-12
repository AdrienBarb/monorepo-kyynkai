'use client';

import Text from '../ui/Text';
import { Loader2 } from 'lucide-react';
import { useFetchPosts } from '@/hooks/posts/useFetchPosts';
import PostCard from './PostCard';

const PostsList = () => {
  const { posts, isLoading, addUserToUnlockedList } = useFetchPosts();

  const handleUnlock = (postId: string, userId: string) => {
    addUserToUnlockedList(postId, userId);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 px-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <Text className="text-center text-muted-foreground">
          Loading posts...
        </Text>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 px-4">
        <Text className="text-center text-muted-foreground">
          No posts available yet...
        </Text>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onUnlock={handleUnlock} />
        ))}
      </div>
    </div>
  );
};

export default PostsList;
