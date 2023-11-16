import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {CreateReservation} from '../types/ReservationTypes';
import ReservationsService from '../services/ReservationsService';

type ReservationsStore = {
  reservations: string[];
  createNewReservation: (params: CreateReservation) => Promise<void>;
  cancelReservation: (reservationId: string) => Promise<void>;
};

const useReservationsStore = create<ReservationsStore>()(
  devtools(
    persist(
      (set) => {
        return {
          reservations: [],
          createNewReservation: async ({eventId, seatIds}: CreateReservation) => {
            const res = await ReservationsService.createNewReservation({
              eventId,
              seatIds,
            });

            if (res.id) {
              set((state) => ({
                reservations: [res.id, ...state.reservations],
              }));
            } else {
              throw new Error('ReservationCreateFailed');
            }
          },
          cancelReservation: async (reservationId: string) => {
            await ReservationsService.deleteReservation(reservationId);

            set((state) => {
              return {
                reservations: state.reservations.filter((r) => r !== reservationId),
              };
            });
          },
        };
      },
      {
        name: 'reservationsStore',
      },
    ),
  ),
);

export default useReservationsStore;