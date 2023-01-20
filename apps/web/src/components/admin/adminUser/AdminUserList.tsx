import {
  ChipField,
  Datagrid,
  DateField,
  DeleteButton,
  EmailField,
  List,
  ReferenceArrayField,
  SingleFieldList,
  TextField,
} from 'react-admin';

function AdminUserList() {
  return (
    <List>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <EmailField source="email" />
        <TextField source="fullName" />
        <TextField source="role" />
        <ReferenceArrayField source="cinemaIds" reference="cinemas" label={'Bioskopi'}>
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <DeleteButton
          confirmContent={'Jeste li sigurni da zelite da obrisete ovog administratora?'}
          confirmTitle={'Brisanje administratora'}
          mutationMode={'pessimistic'}
        />
      </Datagrid>
    </List>
  );
}

export default AdminUserList;
