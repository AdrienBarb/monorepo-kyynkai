import { User } from '@prisma/client';

export type LoggedUserType = Pick<User, 'id' | 'email' | 'creditBalance'>;
