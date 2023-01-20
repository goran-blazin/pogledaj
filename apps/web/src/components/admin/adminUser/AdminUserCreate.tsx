import {
  Create,
  FormDataConsumer,
  PasswordInput,
  required,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useCreate,
  useGetList,
  useNotify,
  useRedirect,
  Validator,
} from 'react-admin';
import {AdminRole} from '../../../types/GeneralTypes';
import {Cinema} from '../../../types/CinemaTypes';
import {useCallback} from 'react';
import {AxiosError} from 'axios';
import Utils from '../../../helpers/Utils';

function AdminUserCreate() {
  const AdminRoleChoices = [
    {id: AdminRole.SuperAdmin, name: 'Super Admin'},
    {id: AdminRole.Manager, name: 'Menadzer'},
    {id: AdminRole.Employee, name: 'Radnik'},
  ];

  const {data} = useGetList<Cinema>('cinemas', {
    filter: undefined,
    pagination: {page: 1, perPage: 100},
    sort: {field: 'name', order: 'desc'},
  });

  const cinemasSelectInput = (data || []).map((cinema) => {
    return {
      id: cinema.id,
      name: `${cinema.name}, ${cinema.address}, ${cinema.city.name}`,
    };
  });

  const cinemaValidator: Validator[] = [required()];

  const [create] = useCreate();
  const redirect = useRedirect();
  const notify = useNotify();

  const save = useCallback(
    // change type with AdminUserDTO
    async (values: Record<string, unknown>) => {
      try {
        await create('adminUsers', {data: values}, {returnPromise: true});
        notify('ra.notification.created', {
          type: 'info',
          messageArgs: {smart_count: 1},
        });
        redirect('list');
      } catch (error) {
        if (error instanceof AxiosError) {
          return Utils.convertErrorMessagesToReactAdminForm(error);
        }
      }
    },
    [create, notify, redirect],
  );

  return (
    <Create title={'Kreiranje administratora'}>
      <SimpleForm onSubmit={save}>
        <TextInput source={'email'} label={'Email'} validate={required()} sx={{width: '30em'}} />
        <PasswordInput source={'password'} label={'Sifra'} validate={required()} sx={{width: '30em'}} />
        <PasswordInput source={'repeatPassword'} label={'Potvrdi Sifru'} validate={required()} sx={{width: '30em'}} />
        <TextInput source={'fullName'} label={'Ime i Prezime'} validate={required()} sx={{width: '30em'}} />
        <SelectInput
          source={'role'}
          choices={AdminRoleChoices}
          label={'Rola'}
          defaultValue={AdminRole.Employee}
          validate={required()}
        />
        <FormDataConsumer>
          {
            ({formData}) =>
              formData.role !== AdminRole.SuperAdmin && (
                <SelectArrayInput
                  source={'cinemaIds'}
                  choices={cinemasSelectInput}
                  label={'Bioskopi'}
                  validate={cinemaValidator}
                />
              )
            // <TextInput source="email" {...rest} />
          }
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
}

export default AdminUserCreate;
