import { Media, Post } from '@prisma/client';

export type PostWithMedia = Post & {
  media?: Media | null;
};
