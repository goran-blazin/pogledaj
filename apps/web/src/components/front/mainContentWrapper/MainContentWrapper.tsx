import {Route, Routes} from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import CinemasListingWrapper from '../cinemasListing/CinemasListingWrapper';
import CinemaSingleWrapper from '../cinemaSingle/CinemaSingleWrapper';
import MoviesListingWrapper from '../moviesListing/MoviesListingWrapper';
import MovieSingleWrapper from '../movieSingle/MovieSingleWrapper';
import MovieProjectionSingle from '../movieProjectionSingle/MovieProjectionSingle';
import React from 'react';
import namedRoutes from '../../../routes';

import {Box, Container} from '@mui/material';

function MainContentWrapper() {
  const routes = (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/cinemas" element={<CinemasListingWrapper />} />
      <Route path="/cinemas/:cinemaId" element={<CinemaSingleWrapper />} />
      <Route path="/movies" element={<MoviesListingWrapper />} />
      <Route path="/movies/:movieId" element={<MovieSingleWrapper />} />
      <Route path="/movie-projections/:movieProjectionId" element={<MovieProjectionSingle />} />
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
          mt: '20px',
          mb: '60px',
          ml: '5px',
          mr: '5px',
        }}
      >
        <main>{routes}</main>
      </Box>
    </Container>
  );
}

export default MainContentWrapper;
