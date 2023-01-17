import {Route, Routes} from 'react-router-dom';
import {adminNamedPrivateRoutes, adminNamedPublicRoutes} from '../../../routes';

import {Box, Container} from '@mui/material';
import AdminMoviesWrapper from '../adminMoviesWrapper/adminMoviesWrapper';
import AdminDashboardWrapper from '../adminDashboard/AdminDashboardWrapper';
import LoginWrapper from '../adminAuth/LoginWrapper';
import AdminRequireAuth from '../AdminRequireAuth';

function MainAdminContentWrapper() {
  const publicRoutes = (
    <Routes>
      <Route path={adminNamedPublicRoutes.login} element={<LoginWrapper />} />
    </Routes>
  );

  if (publicRoutes.props.children.length !== Object.keys(adminNamedPublicRoutes).length) {
    // eslint-disable-next-line no-console
    console.warn('adminNamedPublicRoutes and main admin content routes do not have same number of elements!');
  }

  const privateRoutes = (
    <Routes>
      <Route
        path={adminNamedPrivateRoutes.dashboard}
        element={
          <AdminRequireAuth>
            <AdminDashboardWrapper />
          </AdminRequireAuth>
        }
      />
      <Route
        path={adminNamedPrivateRoutes.movies}
        element={
          <AdminRequireAuth>
            <AdminMoviesWrapper />
          </AdminRequireAuth>
        }
      />
    </Routes>
  );

  if (privateRoutes.props.children.length !== Object.keys(adminNamedPrivateRoutes).length) {
    // eslint-disable-next-line no-console
    console.warn('adminNamedPrivateRoutes and main admin content routes do not have same number of elements!');
  }

  return (
    <Container>
      <Box
        sx={{
          mt: '35px',
          mb: '85px',
          pb: '50px',
        }}
      >
        <main>
          {privateRoutes}
          {publicRoutes}
        </main>
      </Box>
    </Container>
  );
}

export default MainAdminContentWrapper;
