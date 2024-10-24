import {MovieLengthCategory, MoviesFilters, MoviesFiltersQuery} from '../types/MoviesTypes';

const MovieHelper = {
  formatMoviesFiltersFromQuery(moviesFilters: MoviesFiltersQuery): MoviesFilters {
    return {
      selectedGenres: moviesFilters.selectedGenres ? moviesFilters.selectedGenres.split(',') : undefined,
      selectedCountries: moviesFilters.selectedCountries ? moviesFilters.selectedCountries.split(',') : undefined,
      selectedDirectorPersonId: moviesFilters.selectedDirectorPersonId || undefined,
      selectedActorPersonIds: moviesFilters.selectedActorPersonIds
        ? moviesFilters.selectedActorPersonIds.split(',')
        : undefined,
      movieLengths: moviesFilters.movieLengths
        ? (moviesFilters.movieLengths.split(',') as MovieLengthCategory[])
        : undefined,
      selectedCityId: moviesFilters.selectedCityId || undefined,
      selectedCinemasIds: moviesFilters.selectedCinemasIds ? [moviesFilters.selectedCinemasIds] : undefined,
      selectedDateFrom: moviesFilters.selectedDateFrom || undefined,
      selectedDateTo: moviesFilters.selectedDateTo || undefined,
    };
  },
};

export default MovieHelper;
