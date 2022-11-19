import Utils from '../helpers/Utils';
import seedData from '../data/seedDemoData';
import {Movie} from '../types/MoviesTypes';
import * as _ from 'lodash';

const {movies} = seedData;

const MoviesService = {
  async findAll(): Promise<Movie[]> {
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
