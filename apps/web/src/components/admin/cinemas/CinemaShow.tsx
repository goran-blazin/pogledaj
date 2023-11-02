import {Box} from '@mui/material';
import {FunctionField, Show, SimpleShowLayout, TextField, useRecordContext} from 'react-admin';
import {Cinema} from '../../../types/CinemaTypes';

function CinemaShow() {
  const CinemaTitle = () => {
    const record = useRecordContext();
    // the record can be empty while loading
    if (!record) return null;
    return <span>Bioskop "{record.name}"</span>;
  };

  return (
    <Box>
      <Show resource={`cinemas`} title={<CinemaTitle />}>
        <SimpleShowLayout>
          <TextField label={'Naziv'} source="name" />
          <TextField label={'Opis'} source="description" />
          <TextField label={'Grad'} source="city.name" />
          <TextField label={'Adresa'} source="address" />
          <FunctionField<Cinema> label={'Telefon'} render={(cinema) => (cinema ? `${cinema.phone.join(', ')}` : '')} />
        </SimpleShowLayout>
      </Show>
    </Box>
  );
}

export default CinemaShow;
