import {Box} from '@mui/material';
import {
  CreateButton,
  FunctionField,
  List,
  Show,
  SimpleList,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useRecordContext,
} from 'react-admin';
import {Cinema, CinemaSeatGroupPosition, CinemaTheater} from '../../../types/CinemaTypes';
import * as React from 'react';
import {useParams} from 'react-router-dom';

function CinemasShow() {
  const params = useParams();

  const CinemaTitle = () => {
    const record = useRecordContext();
    // the record can be empty while loading
    if (!record) return null;
    return <span>Bioskop "{record.name}"</span>;
  };

  const ListCinemaTheatersActions = () => (
    <TopToolbar>
      <CreateButton />
    </TopToolbar>
  );

  return (
    <Box>
      <Box>
        <Show resource={`cinemas`} title={<CinemaTitle />}>
          <SimpleShowLayout>
            <TextField label={'Naziv'} source="name" />
            <TextField label={'Opis'} source="description" />
            <TextField label={'Grad'} source="city.name" />
            <TextField label={'Adresa'} source="address" />
            <FunctionField<Cinema>
              label={'Telefon'}
              render={(cinema) => (cinema ? `${cinema.phone.join(', ')}` : '')}
            />
          </SimpleShowLayout>
        </Show>
      </Box>
      <Box>
        <h2>Bioskopske sale</h2>
        <List actions={<ListCinemaTheatersActions />} resource={`cinemaTheaters/cinema/${params.id}`}>
          <SimpleList<CinemaTheater>
            linkType={false}
            rowStyle={() => ({
              padding: '8px 16px',
            })}
            primaryText={(cinemaTheater) => {
              const centerSeatGroup = cinemaTheater.cinemaSeatGroups.find(
                (sg) => sg.position === CinemaSeatGroupPosition.Center,
              );

              return centerSeatGroup ? (
                <Box>
                  <h3>{cinemaTheater.name}:</h3>
                  <p>Broj redova: {centerSeatGroup.rowCount}</p>
                  <p>Broj kolona: {centerSeatGroup.columnCount}</p>
                  <p>Broj sedista: {centerSeatGroup.rowCount * centerSeatGroup.columnCount}</p>
                  <p>Podrzava 3D: {cinemaTheater.supports3D ? 'DA' : 'NE'}</p>
                </Box>
              ) : (
                <Box>
                  <h3>{cinemaTheater.name}:</h3>
                  <p>POSTOJI GRESKA! OBRATITE SE ADMINISTRATORU!</p>
                </Box>
              );
            }}
          />
        </List>
      </Box>
    </Box>
  );
}

export default CinemasShow;
