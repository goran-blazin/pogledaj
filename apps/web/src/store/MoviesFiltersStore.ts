import {MovieLengthCategory} from '../types/MoviesTypes';
import {DateTime} from 'ts-luxon';
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import _ from 'lodash';

type MoviesFilters = Partial<{
  selectedGenres: string[];
  selectedCountries: string[];
  selectedDirectorPersonId: string;
  selectedActorsPersonIds: string[];
  movieLengths: MovieLengthCategory[];
  selectedCityId: string;
  selectedCinemasIds: string[];
  selectedDateFrom: DateTime;
  selectedDateTo: DateTime;
}>;

type MoviesFiltersStore = {
  moviesFilters: Partial<MoviesFilters>;
  applyMoviesFilters: (data: MoviesFilters) => void;
};

const useMoviesFiltersStore = create<MoviesFiltersStore>()(
  devtools(
    (set) => {
      return {
        applyMoviesFilters(moviesFilters: MoviesFilters) {
          set(() => ({
            moviesFilters: _.clone(moviesFilters),
          }));
        },
        moviesFilters: {},
      };
    },
    {
      name: 'moviesFiltersStore',
    },
  ),
);

export default useMoviesFiltersStore;
