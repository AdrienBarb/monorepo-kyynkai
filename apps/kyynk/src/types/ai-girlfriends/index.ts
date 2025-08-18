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
  >,
  'chatOpeningLine'
> & {
  chatOpeningLine?: Record<string, string> | null;
};
