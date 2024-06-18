import {
  CheckboxGroupInput,
  Create,
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
import * as React from 'react';
import {useCallback} from 'react';
import {AxiosError} from 'axios';
import Utils from '../../../helpers/Utils';
import {Box} from '@mui/material';
import {Cinema, CinemaTheater} from '../../../types/CinemaTypes';
import {useNavigate, useParams} from 'react-router-dom';
import {CreateMovieProjectionDTO, CurrencyCode, Movie} from '../../../types/MoviesTypes';
import {useMutation} from 'react-query';
import {ApiErrors} from '../../../types/ErrorTypes';
import {DateTime} from 'ts-luxon';
import MovieProjectionsService from '../../../services/MovieProjectionsService';
import LoadingBox from '../utility/LoadingBox';

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
      name: movie.localizedTitle
        ? `${movie.localizedTitle} (${Utils.getMovieTitle(movie)})`
        : Utils.getMovieTitle(movie),
    };
  });

  const useMutationResult = useMutation<unknown, AxiosError<ApiErrors>, CreateMovieProjectionDTO>({
    mutationFn: (data: CreateMovieProjectionDTO) => MovieProjectionsService.createMovieProjection(data),
  });

  const save = useCallback(
    async (values: Record<string, unknown>) => {
      try {
        const data: CreateMovieProjectionDTO = {
          movieId: values.movieId as string,
          cinemaTheaterId: values.cinemaTheaterId as string,
          projectionDateTime: `${values.projectionDate} ${DateTime.fromJSDate(values.projectionTime as Date)
            .set({seconds: 0, milliseconds: 0})
            .toISOTime()}`,
          // dubbedLanguageId?: string | null;
          is3D: ((values.options as string[]) || []).includes('is3D'),
          price: parseInt(values.price as string),
          currencyCode: CurrencyCode.RSD,
        };

        await useMutationResult.mutateAsync(data);
        notify('ra.notification.created', {
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
        <SelectInput
          source={'cinemaTheaterId'}
          choices={cinemaTheatersSelectInput}
          label={'Bioskopska Sala'}
          validate={required()}
          sx={{width: '30em'}}
        />
        <DateInput
          source={'projectionDate'}
          sx={{width: '30em'}}
          defaultValue={DateTime.now().toFormat('yyyy-MM-dd')}
          label="Datum"
          validate={required()}
        />
        <TimeInput
          source={'projectionTime'}
          sx={{width: '30em'}}
          defaultValue={DateTime.now().toJSDate()}
          label="Vreme"
          validate={required()}
        />
        <TextInput source={'price'} name={'price'} label={'Cena'} validate={required()} sx={{width: '30em'}} />
        <CheckboxGroupInput source={'options'} label={'Karakteristike'} choices={[{id: 'is3D', name: '3D'}]} />
      </SimpleForm>
    </Create>
  ) : (
    <LoadingBox />
  );
}

export default MovieProjectionsCreate;
