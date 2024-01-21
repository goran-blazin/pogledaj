import {Movie, MovieWithMovieProjection, MovieWithPersons, UpsertMovieFromExternalDTO} from '../types/MoviesTypes';
import {PogledajApi} from './ApiHelper';

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
};
export default Object.freeze(MoviesService);
