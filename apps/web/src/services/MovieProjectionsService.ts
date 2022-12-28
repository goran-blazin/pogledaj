import Utils from '../helpers/Utils';
import {MovieProjection} from '../types/MoviesTypes';
import * as _ from 'lodash';

const MovieProjectionsService = {
  async findAllByMovie(movieId: string): Promise<MovieProjection[]> {
    await Utils.delay(_.random(300));
    // eslint-disable-next-line no-console
    console.log('movie projections movie id', movieId);

    return [];
  },

  async findAllByCinema(cinemaId: string): Promise<MovieProjection[]> {
    await Utils.delay(_.random(300));
    // eslint-disable-next-line no-console
    console.log('movie projections cinema id', cinemaId);

    return [];
  },
};

export default Object.freeze(MovieProjectionsService);
