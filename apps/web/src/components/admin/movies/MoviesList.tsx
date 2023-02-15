import {ArrayField, ChipField, Datagrid, DateField, FunctionField, List, SingleFieldList, TextField} from 'react-admin';
import {Movie} from '../../../types/MoviesTypes';
import {Link} from '@mui/material';

// function DeleteMovieButton() {
//   const loggedUser = Utils.getLoggedUser();
//
//   const canDelete: boolean = (() => {
//     if (loggedUser.adminUserRole === AdminRole.SuperAdmin) {
//       // super admin can delete anyone at this point
//       return true;
//     }
//
//     return false;
//   })();
//
//   return canDelete ? (
//     <DeleteButton
//       confirmContent={'Jeste li sigurni da zelite da obrisete ovaj film?'}
//       confirmTitle={'Brisanje filma'}
//       mutationMode={'pessimistic'}
//     />
//   ) : null;
// }

function MoviesList() {
  return (
    <List>
      <Datagrid bulkActionButtons={false}>
        <TextField source="originalTitle" label="Originalni naziv" />
        <TextField source="localizedTitle" label="Prevedeni naziv" />
        <ArrayField source="genres" label={'Zanrovi'}>
          <SingleFieldList>
            <ChipField source="localizedName" />
          </SingleFieldList>
        </ArrayField>
        <TextField source="externalType" label="Eksterni izvor" />
        <TextField source="externalId" label="Eksterni ID" />
        <DateField source="createdAt" label="Datum nastanka" />
        <DateField source="updatedAt" label="Datum poslednje izmene" />
        <FunctionField
          label="IMDB"
          render={(record: Movie) =>
            record.additionalData.imdbId ? (
              <Link
                target={'_blank'}
                href={`https://www.imdb.com/title/${record.additionalData.imdbId}`}
              >{`https://www.imdb.com/title/${record.additionalData.imdbId}`}</Link>
            ) : (
              '-'
            )
          }
        />
      </Datagrid>
    </List>
  );
}

export default MoviesList;
