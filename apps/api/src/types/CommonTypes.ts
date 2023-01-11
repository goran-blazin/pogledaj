import { AdminUser } from '@prisma/client';

export type NodeEnv =
  | 'local'
  | 'development'
  | 'test'
  | 'staging'
  | 'production';

export type AdminUserSafe = Omit<AdminUser, 'password'>;

export type ExpressRequestWithUser = Omit<Express.Request, 'user'> & {
  user: AdminUserSafe;
};
