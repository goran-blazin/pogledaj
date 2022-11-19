import Utils from '../helpers/Utils';
import seedData from '../data/seedDemoData';
import {MovieProjection} from '../types/MoviesTypes';
const {movieProjections} = seedData;

const MovieProjectionsService = {
  async findAllByMovie(movieId: string): Promise<MovieProjection[]> {
    await Utils.delay(300);

    return movieProjections.filter((mp) => {
      return mp.movie.id === movieId;
    });
  },

  async findAllByCinema(cinemaId: string): Promise<MovieProjection[]> {
    await Utils.delay(300);

    return movieProjections.filter((mp) => {
      return mp.cinemaTheater.cinema.id === cinemaId;
    });
  },
};

export default Object.freeze(MovieProjectionsService);
