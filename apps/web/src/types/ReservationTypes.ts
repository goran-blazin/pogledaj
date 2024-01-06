import {MovieProjection} from './MoviesTypes';
import {CinemaSeats} from './CinemaTypes';
import {AdminUser} from './GeneralTypes';

export type Reservation = {
  id: string; // uuid
  eventId: string; // uuid, references MovieProjection
  customerInformation: {
    name?: string;
    phone?: string;
    email?: string;
  }; // jsonb
  createdAt: Date; // timestamp without time zone
  updatedAt: Date | null; // timestamp without time zone, nullable
  options: Record<string, unknown>; // jsonb
  reservationSeats: ReservationSeat[];
};

export type ReservationWithMovieProjection = Reservation & {
  movieProjection: MovieProjection;
};

export type ReservationSeat = {
  reservationId: string; // uuid, references Reservation
  eventId: string; // uuid, not null
  seatId: string; // uuid, references CinemaSeat
  options: Record<string, unknown>; // jsonb
  cinemaSeat: CinemaSeats;
  validatedAt: string;
  validatedByAdminUser?: AdminUser;
};

export type ReservationSeatWithMovieProjection = ReservationSeat & {
  reservation: ReservationWithMovieProjection;
};

export type CreateReservation = {
  eventId: string;
  seatIds: string[];
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
};
