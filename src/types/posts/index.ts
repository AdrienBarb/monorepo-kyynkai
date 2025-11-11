import { Media, Post } from '@prisma/client';

export type PostWithMedia = Post & {
  media?: Media | null;
};

export type PostWithAiGirlfriend = {
  id: string;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  aiGirlfriend: {
    id: string;
    pseudo: string;
    slug: string;
    profileImageId: string | null;
  };
  media?: {
    id: string;
    type: string;
    mediaKey: string;
    visibility: string;
    unlockUsers: string[];
    createdAt: Date | string;
  } | null;
};

export type PostsResponse = {
  posts: PostWithAiGirlfriend[];
  nextCursor: string | null;
  hasNextPage: boolean;
};
