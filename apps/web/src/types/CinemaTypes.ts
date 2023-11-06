import {City, IntRange} from './GeneralTypes';

export const CinemaSeatGroupPosition = {
  TopLeft: 'TopLeft',
  TopCenter: 'TopCenter',
  TopRight: 'TopRight',
  CenterLeft: 'CenterLeft',
  Center: 'Center',
  CenterRight: 'CenterRight',
  BottomLeft: 'BottomLeft',
  BottomCenter: 'BottomCenter',
  BottomRight: 'BottomRight',
} as const;

export type CinemaSeatGroupPosition = (typeof CinemaSeatGroupPosition)[keyof typeof CinemaSeatGroupPosition];

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
  cinemaSeatGroups: SeatGroup[];
};

export type SeatGroup = {
  id: string;
  name: string;
  rowCount: number;
  columnCount: number;
  position: CinemaSeatGroupPosition;
  cinemaSeats: CinemaSeats[];
};

export type CinemaSeats = {
  id: string;
  seatRow: string;
  seatColumn: string;
};
