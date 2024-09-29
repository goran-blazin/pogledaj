import {Box} from '@mui/material';
import useMoviesFiltersStore from '../../../store/MoviesFiltersStore';
import {useQuery} from 'react-query';
import MoviesService from '../../../services/MoviesService';
import React from 'react';
import PageSubHeader from '../utility/PageSubHeader';
import MovieBigCard from '../utility/cards/MovieBigCard';
import PageHeader from '../utility/PageHeader';
import MoviesSearchTextbox from './MoviesSearchTextbox';
import ContentWrapper from '../layout/ContentWrapper';
import LoadingBox from '../utility/LoadingBox';

function MoviesSearchWrapper() {
  const moviesFilters = useMoviesFiltersStore().moviesFilters;
  const moviesSearch = useQuery(['moviesSearch', moviesFilters], () => {
    return MoviesService.getMoviesByFilter(moviesFilters);
  });

  return (
    <ContentWrapper padding>
      <Box
        sx={{
          paddingTop: '30px',
        }}
      >
        <PageHeader headerText={'Filmovi'} />
        <Box mb={'20px'}>
          <MoviesSearchTextbox />
        </Box>
        <Box mb={'20px'}>
          <PageSubHeader headerText={'Rezultat pretrage'} />
          <Box
            sx={{
              display: 'grid',
              gap: '20px',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
                lg: '1fr 1fr 1fr 1fr',
              },
            }}
          >
            {moviesSearch.isLoading ? (
              // <Typography color={'text.primary'}>Filmovi se učitavaju, molimo sačekajte...</Typography>
              <LoadingBox />
            ) : (moviesSearch.data || []).length > 0 ? (
              (moviesSearch.data || []).map((movie, i) => <MovieBigCard movie={movie} key={i} />)
            ) : (
              <PageSubHeader headerText={'Nijedan film ne odgovara unešenim parametrima'} />
            )}
          </Box>
        </Box>
      </Box>
    </ContentWrapper>
  );
}

export default MoviesSearchWrapper;
