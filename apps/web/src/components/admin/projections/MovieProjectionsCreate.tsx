import {
  ArrayInput,
  CheckboxGroupInput,
  Create,
  DateInput,
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
import {useCallback} from 'react';
import {AxiosError} from 'axios';
import Utils from '../../../helpers/Utils';
import {Box} from '@mui/material';
import {Cinema, CinemaTheater} from '../../../types/CinemaTypes';
import {useNavigate, useParams} from 'react-router-dom';
import {CreateMovieProjectionBulkDTO, CurrencyCode, Movie} from '../../../types/MoviesTypes';
import {useMutation} from 'react-query';
import {ApiErrors} from '../../../types/ErrorTypes';
import {DateTime} from 'ts-luxon';
import MovieProjectionsService from '../../../services/MovieProjectionsService';
import LoadingBox from '../utility/LoadingBox';

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

  const {data: cinema, isSuccess: cinemaIsSuccess} = useGetOne<Cinema>('cinemas', {id: params.cinemaId || ''});
  const {data: cinemaTheaters, isSuccess: cinemaTheatersIsSuccess} = useGetList<CinemaTheater>('cinemaTheaters', {
    filter: {
      cinemaId: params.cinemaId,
    },
    pagination: {page: 1, perPage: 100},
    sort: {field: 'name', order: 'ASC'},
  });
  const {data: movies, isSuccess: moviesIsSuccess} = useGetList<Movie>('movies', {
    pagination: {page: 1, perPage: 10000},
    sort: {field: 'localizedTitle', order: 'ASC'},
  });

  const cinemaTheatersSelectInput = (cinemaTheaters || []).map((cinemaTheater) => {
    return {
      id: cinemaTheater.id,
      name: `${cinemaTheater.name}`,
    };
  });

  const moviesSelectInput = (movies || []).map((movie) => {
    return {
      id: movie.id,
      name: Utils.getMovieLocalizedTitle(movie),
    };
  });

  const useMutationResult = useMutation<unknown, AxiosError<ApiErrors>, CreateMovieProjectionBulkDTO>({
    mutationFn: (data: CreateMovieProjectionBulkDTO) => MovieProjectionsService.createMovieProjectionBulk(data),
  });

  const save = useCallback(
    async (values: Record<string, unknown>) => {
      try {
        const dates = getDatesBetween(values.projectionDateFrom as string, values.projectionDateTo as string);
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

          // await Utils.forEachAwait(bulkData.projectionDetails, async (item) => {
          //   const data: CreateMovieProjectionDTO = {
          //     movieId: bulkData.movieId,
          //     cinemaTheaterId: bulkData.cinemaTheaterId,
          //     ...item,
          //   };
          //
          // });
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
    [notify, params.cinemaId],
  );

  return cinemaIsSuccess && cinemaTheatersIsSuccess && moviesIsSuccess ? (
    <Create title={'Kreiranje projekcije'} resource={'movieProjections'}>
      <SimpleForm onSubmit={save}>
        <Box>Izabrani bioskop: {cinema.name}</Box>
        <SelectInput
          source={'movieId'}
          choices={moviesSelectInput}
          label={'Film'}
          validate={required()}
          sx={{width: '30em'}}
        />

        <DateInput
          source={'projectionDateFrom'}
          sx={{width: '30em'}}
          defaultValue={DateTime.now().plus({day: 1}).toFormat('yyyy-MM-dd')}
          label="Datum Od"
          validate={required()}
        />
        <DateInput
          source={'projectionDateTo'}
          sx={{width: '30em'}}
          defaultValue={DateTime.now().plus({day: 8}).toFormat('yyyy-MM-dd')}
          label="Datum Do"
          validate={required()}
        />
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
