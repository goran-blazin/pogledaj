import {Box} from '@mui/material';
import PageHeader from '../utility/PageHeader';
import React from 'react';
import ReservationsList from './ReservationsList';

function ReservationsWrapper() {
  return (
    <Box>
      <PageHeader headerText={'Rezervacije'} />
      <Box>
        <ReservationsList />
      </Box>
    </Box>
  );
}

export default ReservationsWrapper;
