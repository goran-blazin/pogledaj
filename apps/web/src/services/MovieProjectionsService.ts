import {CreateMovieProjectionDTO, MovieProjection} from '../types/MoviesTypes';
import {PogledajApi} from './ApiHelper';

const MovieProjectionsService = {
  async findAllByMovie(movieId: string): Promise<MovieProjection[]> {
    const result = await PogledajApi().get(`movieProjections/movie/${movieId}`);

    return result.data.data;
  },

  async findAllByCinema(cinemaId: string): Promise<MovieProjection[]> {
    const result = await PogledajApi().get(`movieProjections/cinema/${cinemaId}`);

    return result.data.data;
  },

  async createMovieProjection(data: CreateMovieProjectionDTO) {
    return PogledajApi().post(`movieProjections`, data);
  },

  async findOneById(id: string): Promise<MovieProjection> {
    const result = await PogledajApi().get(`movieProjections/${id}`);

    return result.data;
  },
};

export default Object.freeze(MovieProjectionsService);
