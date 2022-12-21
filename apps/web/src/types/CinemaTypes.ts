import {City, IntRange} from './GeneralTypes';

export type Cinema = {
  id: string;
  name: string;
  description: string;
  city: City;
  address: string;
  rating?: IntRange<0, 101>;
  phone: string[];
  posterImages: string[];
};

export type CinemaTheater = {
  id: string;
  name: string;
  cinema: Cinema;
  seatLayout: SeatGroup[];
  supports3D: boolean;
  posterImages: string[];
};

export type SeatGroup = {
  id: string;
  name: string;
  rowCount: number;
  columnCount: number;
  seats: Seat[];
};

export type Seat = {
  id: string;
  seatRow: string;
  seatColumn: string;
};
