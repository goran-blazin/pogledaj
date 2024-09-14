import {
  CheckboxGroupInput,
  DateInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  TimeInput,
  useGetList,
  useGetOne,
  useNotify,
} from 'react-admin';
import {useNavigate, useParams} from 'react-router-dom';
import {CinemaTheater} from '../../../types/CinemaTypes';
import {CurrencyCode, EditMovieProjectionDTO, MovieProjection} from '../../../types/MoviesTypes';
import {useMutation} from 'react-query';
import {AxiosError} from 'axios';
import {ApiErrors} from '../../../types/ErrorTypes';
import MovieProjectionsService from '../../../services/MovieProjectionsService';
import {useCallback} from 'react';
import {Box} from '@mui/material';
import * as React from 'react';
import LoadingBox from '../utility/LoadingBox';
import Utils from '../../../helpers/Utils';
import {DateTime} from 'ts-luxon';

function MovieProjectionsEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const notify = useNotify();

  const {data: movieProjection, isSuccess: movieProjectionIsSuccess} = useGetOne<MovieProjection>('movieProjections', {
    id: params.id || '',
  });

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

  const useMutationResult = useMutation<unknown, AxiosError<ApiErrors>, EditMovieProjectionDTO>({
    mutationFn: (data: EditMovieProjectionDTO) => MovieProjectionsService.editMovieProjection(params.id || '', data),
  });

  const save = useCallback(
    async (values: Record<string, unknown>) => {
      try {
        const data: EditMovieProjectionDTO = {
          cinemaTheaterId: values.cinemaTheaterId as string,
          projectionDateTime: `${values.projectionDate} ${DateTime.fromJSDate(values.projectionTime as Date)
            .set({seconds: 0, milliseconds: 0})
            .toISOTime()}`,
          is3D: ((values.options as string[]) || []).includes('is3D'),
          price: parseInt(values.price as string),
          currencyCode: CurrencyCode.RSD,
        };

        await useMutationResult.mutateAsync(data);
        notify('ra.notification.edited', {
          type: 'info',
          messageArgs: {smart_count: 1},
        });
        navigate(`/admin/movieProjections/cinema/${params.cinemaId}`);
      } catch (error) {
        if (error instanceof AxiosError) {
          return Utils.convertErrorMessagesToReactAdminForm(error, {
            projectionDateTime: 'projectionDate',
          });
        } else {
          throw error;
        }
      }
    },
    [notify, params.id],
  );

  return movieProjectionIsSuccess && cinemaTheatersIsSuccess && movieProjection ? (
    <SimpleForm onSubmit={save}>
      <Box>Izabrani bioskop: {movieProjection.cinemaTheater.cinema.name}</Box>
      <Box>Izabrani film: {Utils.getMovieLocalizedTitle(movieProjection.movie)}</Box>
      <SelectInput
        source={'cinemaTheaterId'}
        choices={cinemaTheatersSelectInput}
        label={'Bioskopska Sala'}
        validate={required()}
        sx={{width: '30em'}}
        defaultValue={movieProjection.cinemaTheater.id}
      />
      <DateInput
        source={'projectionDate'}
        sx={{width: '30em'}}
        defaultValue={DateTime.fromISO(movieProjection.projectionDateTime).toFormat('yyyy-MM-dd')}
        label="Datum"
        validate={required()}
      />
      <TimeInput
        source={'projectionTime'}
        sx={{width: '30em'}}
        defaultValue={DateTime.fromISO(movieProjection.projectionDateTime).toJSDate()}
        label="Vreme"
        validate={required()}
      />
      <TextInput
        source={'price'}
        name={'price'}
        label={'Cena'}
        validate={required()}
        sx={{width: '30em'}}
        defaultValue={movieProjection.projectionPrices?.[0].price}
      />
      <CheckboxGroupInput
        source={'options'}
        label={'Karakteristike'}
        choices={[{id: 'is3D', name: '3D'}]}
        defaultValue={[...(movieProjection.options.is3D ? ['is3D'] : [])]}
      />
    </SimpleForm>
  ) : (
    <LoadingBox />
  );
}

export default MovieProjectionsEdit;
