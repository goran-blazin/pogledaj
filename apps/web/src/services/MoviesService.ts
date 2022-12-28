import {Movie, MovieWithPersons} from '../types/MoviesTypes';
import {PogledajApi} from './ApiHelper';

const MoviesService = {
  async findAll(): Promise<Movie[]> {
    const result = await PogledajApi.get('movies');
    return result.data;
  },

  async findAllWithPersons(): Promise<MovieWithPersons[]> {
    const result = await PogledajApi.get('movies', {
      params: {
        includePersons: 'true',
      },
    });

    return result.data;
  },

  async findById(id: string): Promise<Movie | undefined> {
    const result = await PogledajApi.get(`movies/${id}`);

    return result.data;
  },

  async findByIdWithPersons(id: string): Promise<MovieWithPersons | undefined> {
    const result = await PogledajApi.get(`movies/${id}`, {
      params: {
        includePersons: 'true',
      },
    });

    return result.data;
  },
};
export default Object.freeze(MoviesService);
