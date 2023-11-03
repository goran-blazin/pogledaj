import {Box} from '@mui/material';
import {
  CreateButton,
  Datagrid,
  DeleteButton,
  ExportButton,
  List,
  ShowButton,
  TextField,
  TopToolbar,
  WrapperField,
} from 'react-admin';
import * as React from 'react';

function CinemasList() {
  const ListActions = () => (
    <TopToolbar>
      <CreateButton />
      <ExportButton />
    </TopToolbar>
  );

  return (
    <Box>
      <List actions={<ListActions />} resource={`cinemas`} title={'Bioskopi'}>
        <Datagrid bulkActionButtons={false}>
          <TextField label="Ime Bioskopa" source="name" />
          <TextField label="Grad" source="city.name" />
          <WrapperField>
            <ShowButton label="Detalji" />
            <DeleteButton
              label="Brisanje"
              confirmContent={'Jeste li sigurni da zelite da kompletno obrisete ovaj bioskop!?'}
              confirmTitle={'Brisanje bioskopa'}
              mutationMode={'pessimistic'}
            />
          </WrapperField>
        </Datagrid>
      </List>
    </Box>
  );
}

export default CinemasList;
