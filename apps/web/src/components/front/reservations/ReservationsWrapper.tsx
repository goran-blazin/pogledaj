import {Box} from '@mui/material';
import PageHeader from '../utility/PageHeader';
import React from 'react';
import ReservationsList from './ReservationsList';
import ContentWrapper from '../layout/ContentWrapper';

function ReservationsWrapper() {
  return (
    <ContentWrapper padding>
      <>
        <PageHeader headerText={'Rezervacije'} />
        <Box>
          <ReservationsList />
        </Box>
      </>
    </ContentWrapper>
  );
}

export default ReservationsWrapper;
