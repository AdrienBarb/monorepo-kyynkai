'use client';

import { FC } from 'react';
import Text from '../ui/Text';
import { Post } from '@prisma/client';

const PostsList: FC<{ posts: Post[] }> = ({ posts }) => {
  console.log('🚀 ~ PostsList ~ posts:', posts);
  return (
    <div className="flex flex-col items-center justify-center h-64 px-4">
      <Text className="text-center text-muted-foreground">
        Posts feature coming soon...
      </Text>
    </div>
  );
};

export default PostsList;
