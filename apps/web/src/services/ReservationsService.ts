import {PogledajApi} from './ApiHelper';
import {CreateReservation, ReservationWithMovieProjection} from '../types/ReservationTypes';

const ReservationsService = {
  async createNewReservation(data: CreateReservation) {
    const res = await PogledajApi().post('reservations', {
      ...data,
    });

    return res.data;
  },

  async findByIds(reservationIds: string[]): Promise<ReservationWithMovieProjection[]> {
    if (reservationIds.length === 0) {
      return [];
    }

    const res = await PogledajApi().get(`/reservations/for-customer?filter=${JSON.stringify({ids: reservationIds})}`);

    return res.data?.data;
  },

  async deleteReservation(reservationId: string) {
    const res = await PogledajApi().delete(`/reservations/${reservationId}`);
    return res.data;
  },
};

export default Object.freeze(ReservationsService);
