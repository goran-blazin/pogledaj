import {Box} from '@mui/material';
import {
  Create,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useCreate,
  useGetList,
  useNotify,
  useRedirect,
} from 'react-admin';
import {useCallback} from 'react';
import {AdminRoutes, City} from '../../../types/GeneralTypes';
import {AxiosError} from 'axios';
import Utils from '../../../helpers/Utils';
import * as React from 'react';
import LoadingBox from '../utility/LoadingBox';

function CinemasCreate() {
  const [create] = useCreate();
  const redirect = useRedirect();
  const notify = useNotify();

  const {data: cities, isSuccess: citiesIsSuccess} = useGetList<City>('cities');
  const citiesSelectInput = (cities || []).map((city) => {
    return {
      id: city.id,
      name: `${city.name}`,
    };
  });

  const save = useCallback(
    async (values: Record<string, unknown>) => {
      try {
        await create('cinemas', {data: values}, {returnPromise: true});
        notify('ra.notification.created', {
          type: 'info',
          messageArgs: {smart_count: 1},
        });
        redirect('list', AdminRoutes.cinemas);
      } catch (error) {
        if (error instanceof AxiosError) {
          return Utils.convertErrorMessagesToReactAdminForm(error);
        }
      }
    },
    [create, notify, redirect],
  );

  return citiesIsSuccess ? (
    <Box>
      <Create resource={'cinemas'}>
        <SimpleForm onSubmit={save}>
          <TextInput source={'name'} name={'name'} label={'Naziv'} validate={required()} sx={{width: '30em'}} />
          <TextInput
            source={'description'}
            name={'description'}
            label={'Opis'}
            validate={required()}
            sx={{width: '30em'}}
          />
          <TextInput source={'address'} name={'address'} label={'Adresa'} validate={required()} sx={{width: '30em'}} />
          <TextInput source={'phone'} name={'phone'} label={'Telefon'} validate={required()} sx={{width: '30em'}} />
          <SelectInput
            source={'cityId'}
            label={'Grad'}
            validate={required()}
            sx={{width: '30em'}}
            choices={citiesSelectInput}
          />
        </SimpleForm>
      </Create>
    </Box>
  ) : (
    <LoadingBox />
  );
}

export default CinemasCreate;
