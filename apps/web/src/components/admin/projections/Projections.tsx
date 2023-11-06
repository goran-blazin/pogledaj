import * as React from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {Datagrid, DateField, FunctionField, List, Title, useGetList} from 'react-admin';
import {Cinema} from '../../../types/CinemaTypes';
import {MovieProjection} from '../../../types/MoviesTypes';

function Projections() {
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
      <Title title="Uredjivanje projekcija" />
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
        <List resource={`movieProjections/cinema/${currentCinemaId}`}>
          <Datagrid>
            <FunctionField<MovieProjection>
              label="Ime filma"
              render={(projection) => (projection ? projection.movie.originalTitle : 'N/A')}
            />
            <FunctionField<MovieProjection>
              label="Sala"
              render={(projection) => (projection ? projection.cinemaTheater.name : 'N/A')}
            />
            <DateField label="Datum projekcije" source="projectionDateTime" showTime={true} />
            <FunctionField<MovieProjection>
              label="Cena"
              render={(projection) =>
                projection?.projectionPrices.length
                  ? `${projection?.projectionPrices[0].price} ${projection?.projectionPrices[0].currencyCode}`
                  : 'N/A'
              }
            />
          </Datagrid>
        </List>
      )}
    </Box>
  );
}

export default Projections;
