import {Box} from '@mui/material';
import {
  CheckboxGroupInput,
  Create,
  required,
  SimpleForm,
  TextInput,
  useCreate,
  useNotify,
  useRedirect,
} from 'react-admin';
import {useCallback} from 'react';
import {AdminRoutes} from '../../../types/GeneralTypes';
import {AxiosError} from 'axios';
import Utils from '../../../helpers/Utils';
import * as React from 'react';
import {CreateCinemaTheaterDTO} from '../../../types/MoviesTypes';
import {useParams} from 'react-router-dom';

function CinemaTheatersCreate() {
  const [create] = useCreate();
  const redirect = useRedirect();
  const notify = useNotify();

  const params = useParams();

  const save = useCallback(
    async (values: Record<string, unknown>) => {
      try {
        const data: CreateCinemaTheaterDTO = {
          name: values.name as string,
          supports3D: ((values.options as string[]) || []).includes('is3D'),
          cinemaId: params.cinemaId as string,
          rowCount: parseInt(values.rowCount as string),
          columnCount: parseInt(values.columnCount as string),
        };
        await create('cinemaTheaters', {data}, {returnPromise: true});
        notify('ra.notification.created', {
          type: 'info',
          messageArgs: {smart_count: 1},
        });
        redirect('show', AdminRoutes.cinemas, params.cinemaId);
      } catch (error) {
        if (error instanceof AxiosError) {
          return Utils.convertErrorMessagesToReactAdminForm(error);
        }
      }
    },
    [create, notify, redirect],
  );

  return (
    <Box>
      <Create resource={'cinemaTheaters'}>
        <SimpleForm onSubmit={save}>
          <TextInput source={'name'} name={'name'} label={'Naziv'} validate={required()} sx={{width: '30em'}} />
          <TextInput
            source={'rowCount'}
            name={'rowCount'}
            label={'Broj redova'}
            validate={required()}
            sx={{width: '30em'}}
          />
          <TextInput
            source={'columnCount'}
            name={'columnCount'}
            label={'Broj kolona'}
            validate={required()}
            sx={{width: '30em'}}
          />
          <CheckboxGroupInput source={'options'} label={'Karakteristike'} choices={[{id: 'is3D', name: '3D'}]} />
        </SimpleForm>
      </Create>
    </Box>
  );
}

export default CinemaTheatersCreate;
