// in src/admin/index.tsx
import {Admin, Resource, ListGuesser} from 'react-admin';
import reactAdminDataProvider from '../../services/ReactAdminDataProvider';
import reactAdminAuthProvider from '../../services/ReactAdminAuthProvider';
// import Login from './authentication/Login';

const dataProvider = reactAdminDataProvider;
const authProvider = reactAdminAuthProvider;

const AdminRoot = () => (
  <Admin basename="/admin" dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="adminUsers" options={{label: 'Admins'}} list={ListGuesser} />
  </Admin>
);

export default AdminRoot;
