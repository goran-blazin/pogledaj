import {Route, Routes} from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import CinemasListingWrapper from '../cinemasListing/CinemasListingWrapper';
import CinemaSingleWrapper from '../cinemaSingle/CinemaSingleWrapper';
import MoviesListingWrapper from '../moviesListing/MoviesListingWrapper';
import MovieSingleWrapper from '../movieSingle/MovieSingleWrapper';
import MovieProjectionSingle from '../movieProjectionSingle/MovieProjectionSingle';
import SettingsWrapper from '../settings/settingsWrapper';
import React from 'react';
import namedRoutes from '../../../routes';

import {Box, Container} from '@mui/material';

function MainContentWrapper() {
  const routes = (
    <Routes>
      <Route path={namedRoutes.home} element={<Homepage />} />
      <Route path={namedRoutes.settings} element={<SettingsWrapper />} />
      <Route path={namedRoutes.cinemasListing} element={<CinemasListingWrapper />} />
      <Route path={namedRoutes.cinemaSingle} element={<CinemaSingleWrapper />} />
      <Route path={namedRoutes.moviesListing} element={<MoviesListingWrapper />} />
      <Route path={namedRoutes.movieSingle} element={<MovieSingleWrapper />} />
      <Route path={namedRoutes.movieProjectionSingle} element={<MovieProjectionSingle />} />
    </Routes>
  );

  if (routes.props.children.length !== Object.keys(namedRoutes).length) {
    // eslint-disable-next-line no-console
    console.warn('namedRoutes and main content routes do not have same number of elements!');
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

export default MainContentWrapper;
