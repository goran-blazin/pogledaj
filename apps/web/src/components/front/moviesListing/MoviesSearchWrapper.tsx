import {Box, Typography} from '@mui/material';
import useMoviesFiltersStore from '../../../store/MoviesFiltersStore';
import {useQuery} from 'react-query';
import MoviesService from '../../../services/MoviesService';
import React from 'react';
import PageSubHeader from '../utility/PageSubHeader';
import MovieBigCard from '../utility/cards/MovieBigCard';
import PageHeader from '../utility/PageHeader';
import MoviesSearchTextbox from './MoviesSearchTextbox';

function MoviesSearchWrapper() {
  const moviesFilters = useMoviesFiltersStore().moviesFilters;
  const moviesSearch = useQuery(['moviesSearch', moviesFilters], () => {
    return MoviesService.getMoviesByFilter(moviesFilters);
  });

  return (
    <Box>
      <PageHeader headerText={'Filmovi'} />
      <Box mb={'20px'}>
        <MoviesSearchTextbox />
      </Box>
      <Box mb={'20px'}>
        <PageSubHeader headerText={'Rezultat pretrage'} />
        {moviesSearch.isLoading ? (
          <Typography color={'text.primary'}>Filmovi se učitavaju, molimo sačekajte...</Typography>
        ) : (moviesSearch.data || []).length > 0 ? (
          (moviesSearch.data || []).map((movie, i) => (
            <Box sx={{mt: 1}} key={i}>
              <MovieBigCard movie={movie} />
            </Box>
          ))
        ) : (
          <PageSubHeader headerText={'Filmovi nisu pronađeni'} />
        )}
      </Box>
    </Box>
  );
}

export default MoviesSearchWrapper;
