import {Route, Routes} from 'react-router-dom';
import {adminNamedRoutes} from '../../../routes';

import {Box, Container} from '@mui/material';
import AdminMoviesWrapper from '../adminMoviesWrapper/adminMoviesWrapper';

function MainAdminContentWrapper() {
  const routes = (
    <Routes>
      <Route path={adminNamedRoutes.home} element={<AdminMoviesWrapper />} />
      <Route path={adminNamedRoutes.movies} element={<AdminMoviesWrapper />} />
    </Routes>
  );

  if (routes.props.children.length !== Object.keys(adminNamedRoutes).length) {
    // eslint-disable-next-line no-console
    console.warn('adminNamedRoutes and main admin content routes do not have same number of elements!');
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
        <main>{routes}</main>
      </Box>
    </Container>
  );
}

export default MainAdminContentWrapper;
