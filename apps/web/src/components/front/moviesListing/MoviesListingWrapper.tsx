import {useState, useEffect} from 'react';
import {Movie} from '../../../types/MoviesTypes';
import MoviesService from '../../../services/MoviesService';
import {Box, Typography} from '@mui/material';
import React from 'react';
import PageHeader from '../utility/PageHeader';
import SearchTextField from '../utility/SearchTextField';
import HorizontalSmallCardsCarousel from '../utility/reels/HorizontalSmallCardsCarousel';
import MovieSmallCard from '../utility/cards/MovieSmallCard';
import PageSubHeader from '../utility/PageSubHeader';
import FilterButton from "../utility/FilterButton";

function MoviesListingWrapper() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    MoviesService.findAll().then((movies) => {
      setMovies(movies);
    });
  }, []);

  return (
    <Box>
      <PageHeader headerText={'Filmovi'} />
      <Box mb={'20px'}>
        <SearchTextField id={'search-movies'} placeholder={'Pronađi filmski naslov'} EndAdornment={<FilterButton />} />
      </Box>
      {movies.length === 0 ? (
        <Typography color={'text.primary'}>Učitava se, molimo sačekajte...</Typography>
      ) : (
        <React.Fragment>
          <Box mb={'20px'}>
            <PageSubHeader headerText={'Najnovije'} />

            <HorizontalSmallCardsCarousel>
              {[...movies, ...movies].map((movie, i) => (
                <MovieSmallCard movie={movie} key={i} />
              ))}
            </HorizontalSmallCardsCarousel>
          </Box>
          <Box mb={'20px'}>
            <PageSubHeader headerText={'Popularno'} />

            <HorizontalSmallCardsCarousel>
              {[...movies, ...movies].map((movie, i) => (
                <MovieSmallCard movie={movie} key={i} />
              ))}
            </HorizontalSmallCardsCarousel>
          </Box>
          <Box mb={'20px'}>
            <PageSubHeader headerText={'Za decu'} />

            <HorizontalSmallCardsCarousel>
              {[...movies, ...movies].map((movie, i) => (
                <MovieSmallCard movie={movie} key={i} />
              ))}
            </HorizontalSmallCardsCarousel>
          </Box>
          <Box mb={'20px'}>
            <PageSubHeader headerText={'Poslednja prilika'} />

            <HorizontalSmallCardsCarousel>
              {[...movies, ...movies].map((movie, i) => (
                <MovieSmallCard movie={movie} key={i} />
              ))}
            </HorizontalSmallCardsCarousel>
          </Box>
          <Box mb={'20px'}>
            <PageSubHeader headerText={'Uskoro'} />

            <HorizontalSmallCardsCarousel>
              {[...movies, ...movies].map((movie, i) => (
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
