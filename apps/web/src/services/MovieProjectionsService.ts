import {
  CreateMovieProjectionBulkDTO,
  CreateMovieProjectionDTO,
  EditMovieProjectionDTO,
  MovieProjection,
} from '../types/MoviesTypes';
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

  async createMovieProjectionBulk(data: CreateMovieProjectionBulkDTO) {
    return PogledajApi().post(`movieProjections/bulkCreate`, data);
  },

  async editMovieProjection(id: string, data: EditMovieProjectionDTO) {
    return PogledajApi().put(`movieProjections/${id}`, data);
  },

  async findOneById(id: string): Promise<MovieProjection> {
    const result = await PogledajApi().get(`movieProjections/${id}`);

    return result.data;
  },
};

export default Object.freeze(MovieProjectionsService);
