import {Datagrid, DateField, EmailField, List, ReferenceArrayField, TextField} from 'react-admin';

function AdminUserList() {
  return (
    <List>
      <Datagrid rowClick="edit">
        <EmailField source="email" />
        <TextField source="fullName" />
        <TextField source="role" />
        <ReferenceArrayField source="cinemaIds" reference="cinemas" label={'Bioskopi'} />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
  );
}

export default AdminUserList;
