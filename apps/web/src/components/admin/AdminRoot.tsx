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
import MovieProjectionsList from './projections/MovieProjectionsList';
import MovieProjectionsCreate from './projections/MovieProjectionsCreate';
import CinemasList from './cinemas/CinemasList';
import CinemasShow from './cinemas/CinemasShow';
import CinemasCreate from './cinemas/CinemasCreate';
import CinemaTheatersCreate from './cinemas/CinemaTheatersCreate';
import ReservationsAndTicketsList from './reservationsAndTickets/ReservationsAndTicketsList';
import MovieProjectionsEdit from './projections/MovieProjectionsEdit';

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
            {AdminHelper.checkRoutePermissions(AdminRoutes.cinemas, permission) ? (
              <React.Fragment>
                <Route path={`/${AdminRoutes.cinemas}`} element={<CinemasList />} />
                <Route path={`/${AdminRoutes.cinemasShow}`} element={<CinemasShow />} />
                <Route path={`/${AdminRoutes.cinemasCreate}`} element={<CinemasCreate />} />
                <Route path={`/${AdminRoutes.cinemaTheatersCreate}`} element={<CinemaTheatersCreate />} />
              </React.Fragment>
            ) : null}
            {AdminHelper.checkRoutePermissions(AdminRoutes.projections, permission) ? (
              <React.Fragment>
                <Route path={`/${AdminRoutes.projections}`} element={<MovieProjectionsList />} />
                <Route path={`/${AdminRoutes.projectionsWithCinema}`} element={<MovieProjectionsList />} />
                <Route path={`/${AdminRoutes.projectionsCreate}`} element={<MovieProjectionsCreate />} />
                <Route path={`/${AdminRoutes.projectionsEdit}`} element={<MovieProjectionsEdit />} />
              </React.Fragment>
            ) : null}
            {AdminHelper.checkRoutePermissions(AdminRoutes.movieTickets, permission) ? (
              <React.Fragment>
                <Route path={`/${AdminRoutes.movieTickets}`} element={<ReservationsAndTicketsList />} />
                <Route path={`/${AdminRoutes.ticketValidation}`} element={<TicketValidation />} />
              </React.Fragment>
            ) : null}
          </CustomRoutes>,
          null,
        ];
      }}
    </Admin>
  );
};

export default AdminRoot;
