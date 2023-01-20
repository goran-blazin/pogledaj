// in src/admin/index.tsx
import {Admin, CustomRoutes, EditGuesser, Resource} from 'react-admin';
import reactAdminDataProvider from '../../services/ReactAdminDataProvider';
import reactAdminAuthProvider from '../../services/ReactAdminAuthProvider';
import AdminUserList from './adminUser/AdminUserList';
import AdminUserCreate from './adminUser/AdminUserCreate';
import MovieTickets from './movieTickets/MovieTickets';
import {Route} from 'react-router-dom';
import {CustomLayout} from './layout/CustomLayout';
// import Login from './authentication/Login';

const dataProvider = reactAdminDataProvider;
const authProvider = reactAdminAuthProvider;

const AdminRoot = () => (
  <Admin layout={CustomLayout} basename="/admin" dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name="adminUsers"
      options={{label: 'Administratori'}}
      list={AdminUserList}
      create={AdminUserCreate}
      edit={EditGuesser}
    />
    <CustomRoutes>
      <Route path="/movieTickets" element={<MovieTickets />} />
    </CustomRoutes>
  </Admin>
);

export default AdminRoot;
