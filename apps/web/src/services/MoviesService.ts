import {
  Movie,
  MoviesFilters,
  MovieWithMovieProjection,
  MovieWithPersons,
  UpsertMovieFromExternalDTO,
} from '../types/MoviesTypes';
import {PogledajApi} from './ApiHelper';
import {Country, Genre, ReturnList} from '../types/GeneralTypes';

const MoviesService = {
  async findAll({onlyWithActiveProjections}: {onlyWithActiveProjections?: boolean} = {}): Promise<
    MovieWithMovieProjection[]
  > {
    const result = await PogledajApi().get('movies', {
      params: {
        onlyWithActiveProjections: onlyWithActiveProjections,
      },
    });
    return result.data.data;
  },

  async findSoonMovies(): Promise<Movie[]> {
    const result = await PogledajApi().get('movies/soon');
    return result.data;
  },

  async findMoviesForSearch(searchText: string): Promise<MovieWithMovieProjection[]> {
    const result = await PogledajApi().get('movies/search', {
      params: {
        searchText,
      },
    });
    return result.data;
  },

  async findAllWithPersons({onlyWithActiveProjections}: {onlyWithActiveProjections?: boolean} = {}): Promise<
    MovieWithPersons[]
  > {
    const result = await PogledajApi().get('movies', {
      params: {
        includePersons: 'true',
        onlyWithActiveProjections: onlyWithActiveProjections,
      },
    });

    return result.data.data;
  },

  async findById(id: string): Promise<Movie | undefined> {
    const result = await PogledajApi().get(`movies/${id}`);

    return result.data;
  },

  async findByIdWithPersons(id: string): Promise<MovieWithPersons | undefined> {
    const result = await PogledajApi().get(`movies/${id}`, {
      params: {
        includePersons: 'true',
      },
    });

    return result.data;
  },

  async upsertFromExternal(data: UpsertMovieFromExternalDTO) {
    return PogledajApi().post('movies/upsertFromExternal', data);
  },

  async getAllGenresForMoviesFilter(): Promise<Genre[]> {
    const result = await PogledajApi().get('moviesFilters/getAllGenres');
    return result.data;
  },

  async getAllCountriesForMoviesFilter(): Promise<Country[]> {
    const result = await PogledajApi().get('moviesFilters/getAllCountries');
    return result.data;
  },

  async getMoviesByFilter(moviesFilters: MoviesFilters): Promise<ReturnList<MovieWithMovieProjection>> {
    const result = await PogledajApi().get('moviesFilters/searchFilter', {
      params: moviesFilters,
    });

    return result.data;
  },
};
export default Object.freeze(MoviesService);
