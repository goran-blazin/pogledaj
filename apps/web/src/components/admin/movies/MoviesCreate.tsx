import {Create, required, SelectInput, SimpleForm, TextInput, useNotify, useRedirect} from 'react-admin';
import {useCallback} from 'react';
import {InputProvider, UpsertMovieFromExternalDTO} from '../../../types/MoviesTypes';
import {useMutation} from 'react-query';
import {AxiosError} from 'axios';
import {ApiErrors} from '../../../types/ErrorTypes';
import MoviesService from '../../../services/MoviesService';
import Utils from '../../../helpers/Utils';
import {AdminRoutes} from '../../../types/GeneralTypes';

function MoviesCreate() {
  const redirect = useRedirect();
  const notify = useNotify();

  const InputProviderChoices = [
    {id: InputProvider.Tmdb, name: 'TMDB'},
    // {id: InputProvider.Imdb, name: 'IMDB'},
  ];

  const useMutationResult = useMutation<unknown, AxiosError<ApiErrors>, UpsertMovieFromExternalDTO>({
    mutationFn: (data: UpsertMovieFromExternalDTO) => MoviesService.upsertFromExternal(data),
  });

  const save = useCallback(
    async (values: Record<string, unknown>) => {
      try {
        await useMutationResult.mutateAsync(values as UpsertMovieFromExternalDTO);

        notify('ra.notification.created', {
          type: 'info',
          messageArgs: {smart_count: 1},
        });
        redirect('list', AdminRoutes.movies);
      } catch (error) {
        if (error instanceof AxiosError) {
          return Utils.convertErrorMessagesToReactAdminForm(error);
        }
      }
    },
    [notify, redirect, useMutationResult],
  );

  return (
    <Create title="Kreiranje/ubacivanje filma">
      <SimpleForm onSubmit={save}>
        <SelectInput
          name={'externalType'}
          source={'externalType'}
          choices={InputProviderChoices}
          label={'Eksterna Baza'}
          defaultValue={InputProvider.Tmdb}
          validate={required()}
        />
        <TextInput
          name={'externalId'}
          source={'externalId'}
          label={'Eksterni ID'}
          validate={required()}
          sx={{width: '30em'}}
        />
        <TextInput
          name={'localizedTitle'}
          source={'localizedTitle'}
          validate={required()}
          label={'Prevedeni naziv'}
          sx={{width: '30em'}}
        />
        <TextInput
          name={'localizedPlot'}
          source={'localizedPlot'}
          validate={required()}
          label={'Prevedeni sinopsis'}
          sx={{width: '40em', '& textarea': {height: '100px !important'}}}
          multiline
        />
      </SimpleForm>
    </Create>
  );
}

export default MoviesCreate;
