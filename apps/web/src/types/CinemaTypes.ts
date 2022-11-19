import {City} from './GeneralTypes';

export type Cinema = {
  id: string;
  name: string;
  description: string;
  city: City;
  address: string;
  phone: string[];
};

export type CinemaTheater = {
  id: string;
  localizedName: string;
  cinema: Cinema;
  seatNumber: number;
  rowNumber: number;
  supports3D: boolean;
};
