import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {CreateReservation, Reservation} from '../types/ReservationTypes';
import ReservationsService from '../services/ReservationsService';

type ReservationsStore = {
  reservations: Record<string, Reservation>;
  createNewReservation: (params: CreateReservation) => Promise<void>;
};

const useReservationsStore = create<ReservationsStore>()(
  persist(
    (set) => {
      return {
        reservations: {},
        createNewReservation: async ({eventId, seatIds}: CreateReservation) => {
          const res = await ReservationsService.createNewReservation({
            eventId,
            seatIds,
          });

          if (res.id) {
            set((state) => ({
              reservations: {
                [res.id]: res,
                ...state.reservations,
              },
            }));
          } else {
            throw new Error('ReservationCreateFailed');
          }
        },
      };
    },
    {
      name: 'reservationsStore',
    },
  ),
);

export default useReservationsStore;
