import * as React from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {Datagrid, FunctionField, List, Title, useGetList} from 'react-admin';
import {Cinema} from '../../../types/CinemaTypes';
import {ReservationSeatWithMovieProjection} from '../../../types/ReservationTypes';
import {DateTime} from 'ts-luxon';
import Utils from '../../../helpers/Utils';

function ReservationsAndTicketsList() {
  const [currentCinemaId, setCurrentCinemaId] = React.useState('');

  const {data} = useGetList<Cinema>(
    'cinemas',
    {
      filter: undefined,
      pagination: {page: 1, perPage: 100},
      sort: {field: 'name', order: 'DESC'},
    },
    {
      onSuccess(result) {
        if (!currentCinemaId && result.data.length > 0) {
          setCurrentCinemaId(result.data[0].id);
        }
      },
    },
  );

  const cinemasSelectInput = (data || []).map((cinema) => {
    return {
      id: cinema.id,
      name: `${cinema.name}, ${cinema.address}, ${cinema.city.name}`,
    };
  });

  return (
    <Box>
      <Title title="Validacija Karata" />
      <FormControl sx={{margin: 1}} size="small">
        <InputLabel id="demo-select-small">Bioskop</InputLabel>
        <Select
          sx={{minWidth: 500}}
          labelId="demo-select-small"
          id="demo-select-small"
          value={currentCinemaId}
          label="Bioskop"
          onChange={(event: SelectChangeEvent) => {
            setCurrentCinemaId(event.target.value);
          }}
        >
          {cinemasSelectInput.map((cinemaItem) => {
            return (
              <MenuItem key={cinemaItem.id} value={cinemaItem.id}>
                {cinemaItem.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {currentCinemaId && (
        <List
          resource={`reservations/seats/cinema/${currentCinemaId}`}
          title={'Rezervacije'}
          sort={{field: 'reservationId', order: 'DESC'}}
        >
          <Datagrid bulkActionButtons={false}>
            <FunctionField<ReservationSeatWithMovieProjection>
              label="Projekcija"
              render={(reservationSeat) =>
                reservationSeat ? Utils.getMovieTitle(reservationSeat.reservation.movieProjection.movie) : 'N/A'
              }
            />
            <FunctionField<ReservationSeatWithMovieProjection>
              label="Sediste"
              render={(reservationSeat) =>
                reservationSeat
                  ? `Red ${reservationSeat.cinemaSeat.seatRow}; Broj ${reservationSeat.cinemaSeat.seatColumn}`
                  : 'N/A'
              }
            />
            <FunctionField<ReservationSeatWithMovieProjection>
              label="Validirana rezervacija"
              render={(reservationSeat) =>
                reservationSeat
                  ? reservationSeat.validatedAt
                    ? `DA - datum ${DateTime.fromISO(reservationSeat.validatedAt).toFormat(
                        Utils.luxonDateTimeFormat,
                      )}` +
                      (reservationSeat.validatedByAdminUser
                        ? ' - radnik ' + reservationSeat.validatedByAdminUser.fullName
                        : '')
                    : 'Ne'
                  : 'N/A'
              }
            />
          </Datagrid>
        </List>
      )}
    </Box>
  );
}

export default ReservationsAndTicketsList;
