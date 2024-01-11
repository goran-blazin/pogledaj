import {Box, Typography} from '@mui/material';
import ReservationSingle from './ReservationSingle';
import LoadingBox from '../utility/LoadingBox';
import React from 'react';
import useReservationsStore from '../../../store/ReservationsStore';
import {useQuery} from 'react-query';
import ReservationsService from '../../../services/ReservationsService';

function ReservationsList() {
  const reservationsStore = useReservationsStore();

  const {isSuccess, data} = useQuery({
    queryKey: ['reservations', reservationsStore.reservations],
    queryFn: () => ReservationsService.findByIds(reservationsStore.reservations),
    onSuccess: (data) => {
      const reservationsFromServer = data.map((r) => r.id);
      const reservationsStoreForDelete = reservationsStore.reservations.filter(
        (resStore) => !reservationsFromServer.includes(resStore),
      );
      reservationsStore.removeReservationsFromStore(reservationsStoreForDelete);
    },
  });

  return (
    <Box>
      {isSuccess && Array.isArray(data) ? (
        data.length ? (
          data.map((reservation) => {
            return <ReservationSingle key={reservation.id} reservation={reservation} />;
          })
        ) : (
          <Typography variant={'body1'} sx={{pb: 3}}>
            Trenutno ne postoji nijedna rezervacija
          </Typography>
        )
      ) : (
        <LoadingBox />
      )}
    </Box>
  );
}

export default ReservationsList;
