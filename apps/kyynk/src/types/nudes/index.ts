import { Nude, User, Media } from '@prisma/client';

export type NudeFromPrisma = Pick<
  Nude,
  | 'id'
  | 'description'
  | 'creditPrice'
  | 'fiatPrice'
  | 'userId'
  | 'buyers'
  | 'createdAt'
  | 'tags'
  | 'isArchived'
> & {
  media: Pick<Media, 'id' | 'thumbnailId'> & { videoId: string | null };
  user: Pick<User, 'id' | 'pseudo' | 'profileImageId' | 'slug'>;
};

export type NudeWithPermissions = NudeFromPrisma & {
  permissions: {
    canView: boolean;
    canEdit: boolean;
    canBuy: boolean;
  };
};
