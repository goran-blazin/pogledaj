import {Box} from '@mui/material';
import useReservationsStore from '../../../store/ReservationsStore';
import ReservationSingle from './ReservationSingle';
import {useQuery} from 'react-query';
import ReservationsService from '../../../services/ReservationsService';
import LoadingBox from '../utility/LoadingBox';
import PageHeader from '../utility/PageHeader';
import React from 'react';

function ReservationsWrapper() {
  const reservationsStore = useReservationsStore();

  const {isSuccess, data} = useQuery({
    queryKey: ['reservations', reservationsStore.reservations],
    queryFn: () => ReservationsService.findByIds(reservationsStore.reservations),
  });

  return (
    <Box>
      <PageHeader headerText={'Rezervacije'} />
      {isSuccess && Array.isArray(data) ? (
        data.length ? (
          data.map((reservation) => {
            return <ReservationSingle key={reservation.id} reservation={reservation} />;
          })
        ) : (
          <Box>Nemate rezervacije</Box>
        )
      ) : (
        <LoadingBox />
      )}
    </Box>
  );
}

export default ReservationsWrapper;
