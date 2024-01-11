import {Reservation} from '../types/ReservationTypes';

const ReservationsHelper = {
  calculateNumberOfReservationSeats(reservations: Reservation[]) {
    return reservations.reduce((sum, reservation) => {
      return sum + reservation.reservationSeats.length;
    }, 0);
  },
};

export default ReservationsHelper;
