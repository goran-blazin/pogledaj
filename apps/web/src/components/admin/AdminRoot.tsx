// in src/admin/index.tsx
import {Admin, Resource, ListGuesser} from 'react-admin';
import reactAdminDataProvider from '../../services/ReactAdminDataProvider';

const dataProvider = reactAdminDataProvider;
const AdminRoot = () => (
  <Admin basename="/admin" dataProvider={dataProvider}>
    <Resource name="adminUsers" options={{label: 'Admins'}} list={ListGuesser} />
  </Admin>
);

export default AdminRoot;
