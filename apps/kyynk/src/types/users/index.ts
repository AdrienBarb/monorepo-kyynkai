import { User, UserSettings } from '@prisma/client';

export type LoggedUserType = Pick<User, 'id' | 'name'>;

export type FetchedUserType = Pick<
  User,
  | 'id'
  | 'pseudo'
  | 'slug'
  | 'userType'
  | 'description'
  | 'profileImageId'
  | 'isArchived'
  | 'isEmailVerified'
  | 'identityVerificationStatus'
  | 'nudesCount'
  | 'lastSeenAt'
> & {
  settings: Pick<UserSettings, 'creditMessage'>;
};

export type ConversationUser = Pick<
  User,
  'id' | 'pseudo' | 'profileImageId' | 'slug' | 'userType'
> & {
  settings?: Pick<UserSettings, 'creditMessage'>;
};
