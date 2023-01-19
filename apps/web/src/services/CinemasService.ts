import {Cinema} from '../types/CinemaTypes';
import {PogledajApi} from './ApiHelper';

const CinemasService = {
  async findAll(): Promise<Cinema[]> {
    const result = await PogledajApi().get(`cinemas`);

    return result.data;
  },

  // async findAllByCity(city: City): Promise<Cinema[]> {
  //   await Utils.delay(_.random(500));
  //   return cinemas.filter((cinema) => {
  //     return cinema.city.postalCode === city.postalCode;
  //   });
  // },

  async findById(id: string): Promise<Cinema | undefined> {
    const result = await PogledajApi().get(`cinemas/${id}`);
    return result.data;
  },
};
export default Object.freeze(CinemasService);
