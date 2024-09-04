import {MoviesFilters} from '../types/MoviesTypes';
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import _ from 'lodash';

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
      name: 'MoviesFiltersStore',
    },
  ),
);

export default useMoviesFiltersStore;
