import {Box} from '@mui/material';
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
  });

  return (
    <Box>
      {isSuccess && Array.isArray(data) ? (
        data.length ? (
          data.map((reservation) => {
            return <ReservationSingle key={reservation.id} reservation={reservation} />;
          })
        ) : (
          <Box sx={{pb: 3}}>Trenutno ne postoji nijedna rezervacija</Box>
        )
      ) : (
        <LoadingBox />
      )}
    </Box>
  );
}

export default ReservationsList;
