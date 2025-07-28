import { User, UserSettings } from '@prisma/client';

export type LoggedUserType = Pick<
  User,
  | 'id'
  | 'pseudo'
  | 'slug'
  | 'userType'
  | 'description'
  | 'profileImageId'
  | 'isArchived'
  | 'age'
  | 'gender'
  | 'bodyType'
  | 'hairColor'
  | 'country'
  | 'languages'
  | 'tags'
  | 'preferences'
  | 'creditsAmount'
  | 'isEmailVerified'
  | 'identityVerificationStatus'
  | 'nudesCount'
  | 'contentProviderPolicyAccepted'
  | 'lastSeenAt'
> & {
  settings: Pick<
    UserSettings,
    'fiatMessage' | 'creditMessage' | 'bankAccountName' | 'iban'
  >;
};

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
