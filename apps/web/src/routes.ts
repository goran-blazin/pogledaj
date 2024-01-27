import * as _ from 'lodash';

export const namedRoutes = {
  home: '/',
  cinemasListing: '/cinemas',
  cinemaSingle: '/cinemas/:cinemaId',
  moviesListing: '/movies',
  moviesFilters: '/moviesFilters',
  moviesSearch: '/moviesSearch',
  movieSingle: '/movies/:movieId',
  movieProjectionSingle: '/movie-projections/:movieProjectionId',
  reservations: '/reservations',
  settings: '/settings',
};

const adminRootPath = '/admin';

const _adminNamedPrivateRoutes = {
  dashboard: '/',
  movies: '/movies',
};

export const adminNamedPrivateRoutes = _.mapValues(_adminNamedPrivateRoutes, (value) => {
  return adminRootPath + value;
});

const _adminNamedPublicRoutes = {
  login: '/login',
};

export const adminNamedPublicRoutes = _.mapValues(_adminNamedPublicRoutes, (value) => {
  return adminRootPath + value;
});

export function isAdminRoute(route: string): boolean {
  return route.startsWith(adminRootPath);
}
