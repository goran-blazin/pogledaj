import { AdminRole, AdminUser } from '@prisma/client';
import e from 'express';

export type NodeEnv =
  | 'local'
  | 'development'
  | 'test'
  | 'staging'
  | 'production';

export type AdminUserSafe = Omit<AdminUser, 'password'>;

export type ExpressRequestWithUser = Omit<e.Request, 'user'> & {
  user: AdminUserSafe;
};

export type LoginOutputData = {
  accessToken: string;
};

export type AdminUserJwtPayload = {
  adminUserRole: AdminRole;
  fullName: string;
  cinemaIds: string[];
  email: string;
  jti: string;
};

export type ReturnList<T> = {
  data: Array<T>;
  total: number;
};

export type GetListOptions = {
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
  range?: {
    skip?: number;
    take?: number;
  };
  filter?: Record<string, unknown>;
};
