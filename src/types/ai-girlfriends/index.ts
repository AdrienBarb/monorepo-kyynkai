import { AIGirlfriend } from '@prisma/client';

export type AiGirlfriendType = Omit<
  Pick<
    AIGirlfriend,
    | 'id'
    | 'pseudo'
    | 'slug'
    | 'profileImageId'
    | 'archetype'
    | 'traits'
    | 'hook'
    | 'chatOpeningLine'
    | 'profileVideoId'
    | 'age'
  >,
  'chatOpeningLine'
> & {
  chatOpeningLine?: Record<string, string> | null;
};
