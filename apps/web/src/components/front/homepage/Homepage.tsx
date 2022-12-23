import {Box, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import SearchTextField from '../utility/SearchTextField';
import PageSubHeader from '../utility/PageSubHeader';
import {LocalFireDepartmentOutlined, LocationOnOutlined} from '@mui/icons-material';
import MovieBigCard from '../utility/cards/MovieBigCard';
import {Movie} from '../../../types/MoviesTypes';
import MoviesService from '../../../services/MoviesService';
import HorizontalCardsCarousel from '../utility/reels/HorizontalCardsCarousel';
import {Cinema} from '../../../types/CinemaTypes';
import CinemasService from '../../../services/CinemasService';
import CinemaBigCard from '../utility/cards/CinemaBigCard';

function Homepage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    MoviesService.findAll().then((movies:any) => {
      setMovies(movies);
    });
  }, []);

  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  useEffect(() => {
    CinemasService.findAll().then((cinemas) => {
      setCinemas(cinemas);
    });
  }, []);

  return (
    <Box>
      <Box mb={'20px'}>
        <SearchTextField id={'search-all'} placeholder={'Pronađi bioskop ili filmski naslov'} />
      </Box>
      <PageSubHeader headerText={'Ne propusti ove filmove'} Icon={LocalFireDepartmentOutlined} />
      <Box mb={'20px'}>
        {movies.length === 0 ? (
          <Typography color={'text.primary'}>Filmovi se učitavaju, molimo sačekajte...</Typography>
        ) : (
          <HorizontalCardsCarousel>
            {[...movies, ...movies].map((movie, i) => (
              <MovieBigCard movie={movie} key={i} />
            ))}
          </HorizontalCardsCarousel>
        )}
      </Box>
      <PageSubHeader headerText={'Bioskopi u tvojoj blizini'} Icon={LocationOnOutlined} />
      <Box mb={'20px'}>
        {cinemas.length === 0 ? (
          <Typography color={'text.primary'}>Bioskopi se učitavaju, molimo sačekajte...</Typography>
        ) : (
          <HorizontalCardsCarousel>
            {cinemas.map((cinema, i) => (
              <CinemaBigCard cinema={cinema} key={i} />
            ))}
          </HorizontalCardsCarousel>
        )}
      </Box>
    </Box>
  );
}

export default Homepage;
