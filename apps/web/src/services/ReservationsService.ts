import {PogledajApi} from './ApiHelper';

type CreateReservation = {
  eventId: string;
  seatIds: string[];
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
};

const ReservationsService = {
  async createNewReservation(data: CreateReservation) {
    const res = await PogledajApi().post('reservations', {
      ...data,
    });

    return res.data;
  },
};

export default Object.freeze(ReservationsService);
