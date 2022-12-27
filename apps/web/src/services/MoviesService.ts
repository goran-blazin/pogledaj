import Utils from '../helpers/Utils';
import seedData from '../data/seedDemoData';
import {Movie} from '../types/MoviesTypes';
import * as _ from 'lodash';
import {PogledajApi} from './ApiHelper';

const {movies} = seedData;

const MoviesService = {
  async findAll(): Promise<Movie[]> {
    if (Utils.isBetaMode()) {
      const result = await PogledajApi.get('movies');
      return result.data;
    }
    await Utils.delay(_.random(500));

    return movies;
  },

  async findById(id: string): Promise<Movie | undefined> {
    await Utils.delay(_.random(300));

    return movies.find((movie) => {
      return movie.id === id;
    });
  },
};
export default Object.freeze(MoviesService);
