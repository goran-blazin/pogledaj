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
  id: string;
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

export type AdminRole = (typeof AdminRole)[keyof typeof AdminRole];

export type AdminUserJwtPayload = {
  adminUserRole: AdminRole;
  fullName: string;
  cinemaIds: string[];
  email: string;
  jti: string;
} & JwtPayload;

export const AUTH_DATA_LOCAL_STORAGE = 'authData';

export type AdminUser = {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  cinemaIds: string[];
  createdAt: Date;
  updatedAt: Date;
};

export const AdminRoutes = {
  adminUsers: 'adminUsers',
  movies: 'movies',
  projections: 'movieProjections',
  projectionsWithCinema: 'movieProjections/cinema/:cinemaId',
  projectionsCreate: 'movieProjections/cinema/:cinemaId/create',
  projectionsEdit: 'movieProjections/cinema/:cinemaId/:id',
  movieTickets: 'movieTickets',
  ticketValidation: 'ticketValidation',
  cinemas: 'cinemas',
  cinemasShow: 'cinemas/:id/show',
  cinemasCreate: 'cinemas/create',
  cinemaTheatersCreate: 'cinemaTheaters/cinema/:cinemaId/create',
};

export type PosterImages = {
  bigPoster: string;
  smallPoster: string;
  thumbPoster: string;
  mediumPoster: string;
  bigBackground: string;
  smallBackground: string;
  mediumBackground: string;
};

export type AdminRoutes = (typeof AdminRoutes)[keyof typeof AdminRoutes];

export type PriceType = 'Normal';

export const CurrencyCode = {
  RSD: 'RSD',
  USD: 'USD',
  EUR: 'EUR',
  CHF: 'CHF',
};

export type CurrencyCode = (typeof CurrencyCode)[keyof typeof CurrencyCode];

export type ProjectionPrice = {
  type: PriceType;
  currencyCode: CurrencyCode;
  price: number;
};
