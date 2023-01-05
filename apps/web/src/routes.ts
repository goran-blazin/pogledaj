import * as _ from 'lodash';

export const namedRoutes = {
  home: '/',
  cinemasListing: '/cinemas',
  cinemaSingle: '/cinemas/:cinemaId',
  moviesListing: '/movies',
  movieSingle: '/movies/:movieId',
  movieProjectionSingle: '/movie-projections/:movieProjectionId',
  settings: '/settings',
};

const adminRootPath = '/admin';

const _adminNamedRoutes = {
  home: '/',
  movies: '/movies',
};

export const adminNamedRoutes = _.mapValues(_adminNamedRoutes, (value) => {
  return adminRootPath + value;
});

export function isAdminRoute(route: string): boolean {
  return route.startsWith(adminRootPath);
}
