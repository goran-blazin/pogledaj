import * as React from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {
  BulkDeleteButton,
  CreateButton,
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  ExportButton,
  FunctionField,
  List,
  TopToolbar,
  useGetList,
  WrapperField,
} from 'react-admin';
import {Cinema} from '../../../types/CinemaTypes';
import {MovieProjection} from '../../../types/MoviesTypes';
import Utils from '../../../helpers/Utils';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useMemo} from 'react';

function MovieProjectionsList() {
  const params = useParams();
  const navigate = useNavigate();

  const {data} = useGetList<Cinema>('cinemas', {
    filter: undefined,
    pagination: {page: 1, perPage: 100},
    sort: {field: 'name', order: 'DESC'},
  });

  useEffect(() => {
    if (!params.cinemaId && data && data.length > 0) {
      navigate(`/admin/movieProjections/cinema/${data[0].id}`);
    }
  }, [data, navigate]);

  const cinemasSelectInput = useMemo(() => {
    return (data || []).map((cinema) => {
      return {
        id: cinema.id,
        name: `${cinema.name}, ${cinema.address}, ${cinema.city.name}`,
      };
    });
  }, [data]);

  const ListActions = () => (
    <TopToolbar>
      <CreateButton />
      <ExportButton />
    </TopToolbar>
  );

  const PostBulkActionButtons = () => (
    <>
      <BulkDeleteButton
        label={'Brisanje'}
        mutationMode={'pessimistic'}
        confirmContent={'Jeste li sigurni da zelite da obrisete ove projekcije?'}
        confirmTitle={'Brisanje vise projekcija'}
      />
    </>
  );

  return (
    <>
      {data && (
        <Box>
          <FormControl sx={{margin: 1}} size="small">
            <InputLabel id="demo-select-small">Bioskop</InputLabel>
            <Select
              sx={{minWidth: 500}}
              labelId="demo-select-small"
              id="demo-select-small"
              value={params.cinemaId || (cinemasSelectInput.length ? cinemasSelectInput[0].id : '')}
              label="Bioskop"
              onChange={(event: SelectChangeEvent) => {
                navigate(`/admin/movieProjections/cinema/${event.target.value}`);
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
          {params.cinemaId && (
            <List
              actions={<ListActions />}
              resource={`movieProjections/cinema/${params.cinemaId}`}
              title={'Projekcije'}
              empty={<ListActions />}
              sort={{
                field: 'updatedAt',
                order: 'DESC',
              }}
            >
              <Datagrid bulkActionButtons={<PostBulkActionButtons />}>
                <FunctionField<MovieProjection>
                  label="Ime filma"
                  render={(projection) => (projection ? Utils.getMovieLocalizedTitle(projection.movie) : 'N/A')}
                />
                <FunctionField<MovieProjection>
                  label="Sala"
                  render={(projection) => (projection ? projection.cinemaTheater.name : 'N/A')}
                />
                <DateField label="Datum projekcije" source="projectionDateTime" showTime={true} />
                <DateField label="Poslednja promena" source="updatedAt" showTime={true} />
                <FunctionField<MovieProjection>
                  label="Cena"
                  render={(projection) =>
                    projection?.projectionPrices.length
                      ? `${projection?.projectionPrices[0].price} ${projection?.projectionPrices[0].currencyCode}`
                      : 'N/A'
                  }
                />
                <WrapperField>
                  <EditButton label={'Izmena'} />
                  <DeleteButton
                    label="Brisanje"
                    confirmContent={'Jeste li sigurni da zelite da obrisete ovu projekciju?'}
                    confirmTitle={'Brisanje projekcije'}
                    mutationMode={'pessimistic'}
                  />
                </WrapperField>
              </Datagrid>
            </List>
          )}
        </Box>
      )}
    </>
  );
}

export default MovieProjectionsList;
