import {JwtPayload} from 'jwt-decode';

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type EnvTypes = 'production' | 'staging' | 'test' | 'dev';

export type Genre = {
  systemName: string;
  localizedName: string;
};

export type Language = {
  name: string;
  code: string;
};

export type Country = {
  name: string;
  code: string;
};

export type City = {
  name: string;
  code: string;
  postalCode: string;
};

export type AuthData = {
  accessToken: string;
};

export const AdminRole = {
  SuperAdmin: 'SuperAdmin',
  Manager: 'Manager',
  Employee: 'Employee',
};

export type AdminRole = typeof AdminRole[keyof typeof AdminRole];

export type AdminUserJwtPayload = {
  adminUserRole: AdminRole;
  fullName: string;
  cinemaIds: string[];
  email: string;
  jti: string;
} & JwtPayload;

export const AUTH_DATA_LOCAL_STORAGE = 'authData';
