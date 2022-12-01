import {City, IntRange} from './GeneralTypes';

export type Cinema = {
  id: string;
  name: string;
  description: string;
  city: City;
  address: string;
  rating?: IntRange<0, 101>;
  phone: string[];
  cinemaPosterImageFilename?: string;
};

export type CinemaTheater = {
  id: string;
  localizedName: string;
  cinema: Cinema;
  seatNumber: number;
  rowNumber: number;
  supports3D: boolean;
};
