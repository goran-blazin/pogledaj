import Utils from '../helpers/Utils';
import seedData from '../data/seedDemoData';
import {Movie} from '../types/MoviesTypes';
const {movies} = seedData;

const MoviesService = {
  async findAll(): Promise<Movie[]> {
    await Utils.delay(500);

    return movies;
  },

  async findById(id: string): Promise<Movie | undefined> {
    await Utils.delay(200);

    return movies.find((movie) => {
      return movie.id === id;
    });
  },
};
export default Object.freeze(MoviesService);
