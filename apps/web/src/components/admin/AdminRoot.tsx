// in src/admin/index.tsx
import {Admin, Resource} from 'react-admin';
import reactAdminDataProvider from '../../services/ReactAdminDataProvider';
import reactAdminAuthProvider from '../../services/ReactAdminAuthProvider';
import AdminUserList from './adminUser/AdminUserList';
import AdminUserCreate from './adminUser/AdminUserCreate';
// import Login from './authentication/Login';

const dataProvider = reactAdminDataProvider;
const authProvider = reactAdminAuthProvider;

const AdminRoot = () => (
  <Admin basename="/admin" dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="adminUsers" options={{label: 'Administratori'}} list={AdminUserList} create={AdminUserCreate} />
  </Admin>
);

export default AdminRoot;
