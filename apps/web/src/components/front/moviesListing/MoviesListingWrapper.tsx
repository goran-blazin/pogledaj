import MoviesService from '../../../services/MoviesService';
import {Box, Typography} from '@mui/material';
import React from 'react';
import PageHeader from '../utility/PageHeader';
import SearchTextField from '../utility/SearchTextField';
import HorizontalSmallCardsCarousel from '../utility/reels/HorizontalSmallCardsCarousel';
import MovieSmallCard from '../utility/cards/MovieSmallCard';
import PageSubHeader from '../utility/PageSubHeader';
import FilterButton from '../utility/FilterButton';
import {useQuery} from 'react-query';

function MoviesListingWrapper() {
  const movies = useQuery(['movies', 'findAll'], () => {
    return MoviesService.findAll();
  });

  return (
    <Box>
      <PageHeader headerText={'Filmovi'} />
      <Box mb={'20px'}>
        <SearchTextField id={'search-movies'} placeholder={'Pronađi filmski naslov'} EndAdornment={<FilterButton />} />
      </Box>
      {movies.isLoading ? (
        <Typography color={'text.primary'}>Učitava se, molimo sačekajte...</Typography>
      ) : (
        <React.Fragment>
          <Box mb={'20px'}>
            <PageSubHeader headerText={'Najnovije'} />

            <HorizontalSmallCardsCarousel>
              {(movies.data || []).map((movie, i) => (
                <MovieSmallCard movie={movie} key={i} />
              ))}
            </HorizontalSmallCardsCarousel>
          </Box>
          <Box mb={'20px'}>
            <PageSubHeader headerText={'Popularno'} />

            <HorizontalSmallCardsCarousel>
              {(movies.data || []).map((movie, i) => (
                <MovieSmallCard movie={movie} key={i} />
              ))}
            </HorizontalSmallCardsCarousel>
          </Box>
          <Box mb={'20px'}>
            <PageSubHeader headerText={'Za decu'} />

            <HorizontalSmallCardsCarousel>
              {(movies.data || []).map((movie, i) => (
                <MovieSmallCard movie={movie} key={i} />
              ))}
            </HorizontalSmallCardsCarousel>
          </Box>
          <Box mb={'20px'}>
            <PageSubHeader headerText={'Poslednja prilika'} />

            <HorizontalSmallCardsCarousel>
              {(movies.data || []).map((movie, i) => (
                <MovieSmallCard movie={movie} key={i} />
              ))}
            </HorizontalSmallCardsCarousel>
          </Box>
          <Box mb={'20px'}>
            <PageSubHeader headerText={'Uskoro'} />

            <HorizontalSmallCardsCarousel>
              {(movies.data || []).map((movie, i) => (
                <MovieSmallCard movie={movie} key={i} />
              ))}
            </HorizontalSmallCardsCarousel>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default MoviesListingWrapper;
