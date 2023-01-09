import {MovieProjection} from '../types/MoviesTypes';
import {PogledajApi} from './ApiHelper';

const MovieProjectionsService = {
  async findAllByMovie(movieId: string): Promise<MovieProjection[]> {
    const result = await PogledajApi.get(`movieProjections/movie/${movieId}`);

    return result.data;
  },

  async findAllByCinema(cinemaId: string): Promise<MovieProjection[]> {
    const result = await PogledajApi.get(`movieProjections/cinema/${cinemaId}`);

    return result.data;
  },
};

export default Object.freeze(MovieProjectionsService);
