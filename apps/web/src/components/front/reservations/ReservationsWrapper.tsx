import {Box} from '@mui/material';
import useReservationsStore from '../../../store/ReservationsStore';
import ReservationSingle from './ReservationSingle';
import {useQuery} from 'react-query';
import ReservationsService from '../../../services/ReservationsService';
import LoadingBox from '../utility/LoadingBox';

function ReservationsWrapper() {
  const reservationsStore = useReservationsStore();

  const {isSuccess, data} = useQuery({
    queryFn: () => ReservationsService.findByIds(Object.keys(reservationsStore.reservations)),
  });

  return (
    <Box>
      <h2>Rezervacije</h2>
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
