import {
  ArrayInput,
  CheckboxGroupInput,
  Create,
  DateInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  TimeInput,
  useGetList,
  useGetOne,
  useNotify,
} from 'react-admin';
import * as React from 'react';
import {useCallback, useState} from 'react';
import {AxiosError} from 'axios';
import Utils from '../../../helpers/Utils';
import {Box, MenuItem, Select, Stack} from '@mui/material';
import {Cinema, CinemaTheater} from '../../../types/CinemaTypes';
import {useNavigate, useParams} from 'react-router-dom';
import {CreateMovieProjectionBulkDTO, CurrencyCode, Movie} from '../../../types/MoviesTypes';
import {useMutation} from 'react-query';
import {ApiErrors} from '../../../types/ErrorTypes';
import {DateTime} from 'ts-luxon';
import MovieProjectionsService from '../../../services/MovieProjectionsService';
import LoadingBox from '../utility/LoadingBox';
import {AutocompleteInput} from 'react-admin';

const DATE_FORM_TYPE = {
  dateRange: 'dateRange',
  dateArray: 'dateArray',
} as const;

function getDatesBetween(from: string, to: string): string[] {
  const startDate = DateTime.fromISO(from);
  const endDate = DateTime.fromISO(to);

  if (startDate > endDate) {
    throw new Error("The 'from' date must be before the 'to' date.");
  }

  const dates: string[] = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const isoDate = currentDate.toISODate();
    if (!isoDate) {
      // eslint-disable-next-line no-console
      console.error('Current date ISO is null', currentDate);
      throw new Error('Current date ISO is null');
    }
    dates.push(isoDate); // Format as YYYY-MM-DD
    currentDate = currentDate.plus({days: 1}); // Move to the next day
  }

  return dates;
}

function MovieProjectionsCreate() {
  const params = useParams();

  const navigate = useNavigate();
  const notify = useNotify();
  const [dateFormType, setDateFormType] = useState<string>(DATE_FORM_TYPE.dateRange);

  const {data: cinema, isSuccess: cinemaIsSuccess} = useGetOne<Cinema>('cinemas', {id: params.cinemaId || ''});
  const {data: cinemaTheaters, isSuccess: cinemaTheatersIsSuccess} = useGetList<CinemaTheater>('cinemaTheaters', {
    filter: {
      cinemaId: params.cinemaId,
    },
    pagination: {page: 1, perPage: 100},
    sort: {field: 'name', order: 'ASC'},
  });

  const cinemaTheatersSelectInput = (cinemaTheaters || []).map((cinemaTheater) => {
    return {
      id: cinemaTheater.id,
      name: `${cinemaTheater.name}`,
    };
  });

  const useMutationResult = useMutation<unknown, AxiosError<ApiErrors>, CreateMovieProjectionBulkDTO>({
    mutationFn: (data: CreateMovieProjectionBulkDTO) => MovieProjectionsService.createMovieProjectionBulk(data),
  });

  const save = useCallback(
    async (values: Record<string, unknown>) => {
      try {
        const dates = (() => {
          if (dateFormType === DATE_FORM_TYPE.dateRange) {
            return getDatesBetween(values.projectionDateFrom as string, values.projectionDateTo as string);
          } else {
            return (values.dateArray as Record<string, unknown>[]).map((item) => item.projectionDateArray as string);
          }
        })();
        if (!dates.length) {
          notify(`Niste izabrali datume`, {
            type: 'error',
          });

          return;
        }

        await Utils.forEachAwait(values.projectionDetails as Record<string, unknown>[], async (projectionDetail) => {
          const bulkData: CreateMovieProjectionBulkDTO = {
            movieId: values.movieId as string,
            cinemaTheaterId: projectionDetail.cinemaTheaterId as string,
            projectionDetails: dates.map((date) => {
              return {
                projectionDateTime: `${date} ${DateTime.fromJSDate(projectionDetail.projectionTime as Date)
                  .set({seconds: 0, milliseconds: 0})
                  .toISOTime()}`,
                is3D: ((values.options as string[]) || []).includes('is3D'),
                price: parseInt(projectionDetail.price as string),
                currencyCode: CurrencyCode.RSD,
              };
            }),
          };

          await useMutationResult.mutateAsync(bulkData);
        });

        notify('ra.notification.created', {
          type: 'info',
          messageArgs: {smart_count: 1},
        });
        navigate(`/admin/movieProjections/cinema/${params.cinemaId}`);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.data?.code === 'OverlappingProjections') {
            notify(
              `Projekcija se preklapa sa filmom ${error.response?.data?.overLappingProjectionsMovieName} u sali ${error.response?.data?.overLappingProjectionsCinemaTheater}`,
              {
                type: 'error',
              },
            );

            return;
          }

          return Utils.convertErrorMessagesToReactAdminForm(error, {
            projectionDateTime: 'projectionDate',
          });
        } else {
          throw error;
        }
      }
    },
    [notify, params.cinemaId, dateFormType],
  );

  // Note we declared the function outside the component to avoid rerenders
  const optionTextRenderer = (movie: Movie) => Utils.getMovieLocalizedTitle(movie);
  const filterToQuery = (searchText: string) => ({searchText: searchText});

  return cinemaIsSuccess && cinemaTheatersIsSuccess ? (
    <Create title={'Kreiranje projekcije'} resource={'movieProjections'}>
      <SimpleForm onSubmit={save}>
        <Box>Izabrani bioskop: {cinema.name}</Box>
        <ReferenceInput label="Author" source="movieId" reference="movies">
          <AutocompleteInput optionText={optionTextRenderer} sx={{width: '40em'}} filterToQuery={filterToQuery} />
        </ReferenceInput>

        <Select
          value={dateFormType}
          onChange={(event) => {
            setDateFormType(event.target.value);
          }}
        >
          <MenuItem value={'dateRange'}>Unesi raspon datuma</MenuItem>
          <MenuItem value={'dateArray'}>Unesi pojedinacne datume</MenuItem>
        </Select>

        <Box sx={{display: dateFormType === DATE_FORM_TYPE.dateRange ? undefined : 'none'}}>
          <Stack direction={'row'} spacing={2}>
            <DateInput
              source={'projectionDateFrom'}
              sx={{width: '20em'}}
              defaultValue={DateTime.now().plus({day: 1}).toFormat('yyyy-MM-dd')}
              label="Datum Od"
            />
            <DateInput
              source={'projectionDateTo'}
              sx={{width: '20em'}}
              defaultValue={DateTime.now().plus({day: 8}).toFormat('yyyy-MM-dd')}
              label="Datum Do"
            />
          </Stack>
        </Box>

        <Box sx={{display: dateFormType === DATE_FORM_TYPE.dateArray ? undefined : 'none'}}>
          <ArrayInput source="dateArray" defaultValue={[{}]}>
            <SimpleFormIterator inline getItemLabel={(index) => `#${index + 1}`}>
              <DateInput
                source={'projectionDateArray'}
                sx={{width: '30em'}}
                defaultValue={DateTime.now().plus({day: 1}).toFormat('yyyy-MM-dd')}
                label="Datum"
              />
            </SimpleFormIterator>
          </ArrayInput>
        </Box>

        <ArrayInput source="projectionDetails" defaultValue={[{}]}>
          <SimpleFormIterator inline>
            <SelectInput
              source={'cinemaTheaterId'}
              choices={cinemaTheatersSelectInput}
              label={'Bioskopska Sala'}
              validate={required()}
              sx={{width: '20em'}}
            />
            <TimeInput source={'projectionTime'} sx={{width: '20em'}} label="Vreme" validate={required()} />
            <TextInput source={'price'} label={'Cena'} validate={required()} sx={{width: '20em'}} />
          </SimpleFormIterator>
        </ArrayInput>
        <CheckboxGroupInput source={'options'} label={'Karakteristike'} choices={[{id: 'is3D', name: '3D'}]} />
      </SimpleForm>
    </Create>
  ) : (
    <LoadingBox />
  );
}

export default MovieProjectionsCreate;
