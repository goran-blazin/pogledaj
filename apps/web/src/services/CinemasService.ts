import {Cinema} from '../types/CinemaTypes';
import seedData from '../data/seedDemoData';
import {City} from '../types/GeneralTypes';
import Utils from '../helpers/Utils';
import * as _ from 'lodash';

const {cinemas} = seedData;

const CinemasService = {
  async findAll(): Promise<Cinema[]> {
    await Utils.delay(_.random(500));
    return cinemas;
  },

  async findAllByCity(city: City): Promise<Cinema[]> {
    await Utils.delay(_.random(500));
    return cinemas.filter((cinema) => {
      return cinema.city.postalCode === city.postalCode;
    });
  },

  async findById(id: string): Promise<Cinema | undefined> {
    await Utils.delay(_.random(200));
    return cinemas.find((cinema) => {
      return cinema.id === id;
    });
  },
};
export default Object.freeze(CinemasService);
