import { AIGirlfriend } from '@prisma/client';

export type AiGirlfriendType = Pick<
  AIGirlfriend,
  | 'id'
  | 'pseudo'
  | 'slug'
  | 'profileImageId'
  | 'archetype'
  | 'traits'
  | 'hook'
  | 'chatOpeningLine'
>;
