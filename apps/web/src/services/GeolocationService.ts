import {PogledajApi} from './ApiHelper';
import {City} from '../types/GeneralTypes';

const GeolocationService = {
  async findCitiesForMoviesFilter(): Promise<City[]> {
    const result = await PogledajApi().get(`moviesFilters/getAllCitiesWithCinemas`);
    return result.data;
  },
};

export default GeolocationService;
