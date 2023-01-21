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
  useRecordContext,
} from 'react-admin';
import Utils from '../../../helpers/Utils';
import {AdminRole, AdminUser} from '../../../types/GeneralTypes';

function DeleteUserButton() {
  const record = useRecordContext<AdminUser>();
  const loggedUser = Utils.getLoggedUser();

  const canDelete: boolean = (() => {
    // cannot delete yourself
    if (loggedUser.email === record.email) {
      return false;
    }

    // SuperAdmin cannot be deleted
    if (record.role === AdminRole.SuperAdmin) {
      return false;
    }

    if (loggedUser.adminUserRole === AdminRole.SuperAdmin) {
      // super admin can delete anyone at this point
      return true;
    } else if (loggedUser.adminUserRole === AdminRole.Manager) {
      // manager can only delete employees from his own cinema
      return (
        record.role === AdminRole.Employee &&
        record.cinemaIds.every((id) => (loggedUser.cinemaIds as string[]).includes(id))
      );
    }

    return false;
  })();

  return canDelete ? (
    <DeleteButton
      confirmContent={'Jeste li sigurni da zelite da obrisete ovog administratora?'}
      confirmTitle={'Brisanje administratora'}
      mutationMode={'pessimistic'}
    />
  ) : loggedUser.email === record.email ? (
    <span>Prijavljeni administrator</span>
  ) : null;
}

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
        <DeleteUserButton />
      </Datagrid>
    </List>
  );
}

export default AdminUserList;
