// in src/admin/index.tsx
import {Admin, CustomRoutes, Resource} from 'react-admin';
import reactAdminDataProvider from '../../services/ReactAdminDataProvider';
import reactAdminAuthProvider from '../../services/ReactAdminAuthProvider';
import AdminUserList from './adminUser/AdminUserList';
import AdminUserCreate from './adminUser/AdminUserCreate';
import TicketValidation from './ticketValidation/TicketValidation';
import {Route} from 'react-router-dom';
import {CustomLayout} from './layout/CustomLayout';
import React from 'react';
import {AdminRole, AdminRoutes} from '../../types/GeneralTypes';
import AdminHelper from '../../helpers/AdminHelper';
import MoviesList from './movies/MoviesList';
import MoviesCreate from './movies/MoviesCreate';
import Projections from './projections/Projections';
// import Login from './authentication/Login';

const dataProvider = reactAdminDataProvider;
const authProvider = reactAdminAuthProvider;

const AdminRoot = function () {
  return (
    <Admin
      layout={CustomLayout}
      basename="/admin"
      dataProvider={dataProvider}
      authProvider={authProvider}
      requireAuth={true}
    >
      {(permission: AdminRole) => {
        return [
          AdminHelper.checkRoutePermissions(AdminRoutes.adminUsers, permission) ? (
            <Resource
              name={AdminRoutes.adminUsers}
              options={{label: 'Administratori'}}
              list={AdminUserList}
              create={AdminUserCreate}
            />
          ) : null,
          AdminHelper.checkRoutePermissions(AdminRoutes.movies, permission) ? (
            <Resource name={AdminRoutes.movies} options={{label: 'Filmovi'}} list={MoviesList} create={MoviesCreate} />
          ) : null,
          <CustomRoutes>
            {AdminHelper.checkRoutePermissions(AdminRoutes.projections, permission) ? (
              <Route path={`/${AdminRoutes.projections}`} element={<Projections />} />
            ) : null}
            {AdminHelper.checkRoutePermissions(AdminRoutes.movieTickets, permission) ? (
              <Route path={`/${AdminRoutes.movieTickets}`} element={<TicketValidation />} />
            ) : null}
          </CustomRoutes>,
          null,
        ];
      }}
    </Admin>
  );
};

export default AdminRoot;
