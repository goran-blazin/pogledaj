import {Box, Typography} from '@mui/material';
import PageHeader from '../utility/PageHeader';
import React, {useEffect, useState} from 'react';
import SearchTextField from '../utility/SearchTextField';
import PageSubHeader from '../utility/PageSubHeader';
import {LocalFireDepartmentOutlined, LocationOnOutlined} from '@mui/icons-material';
import MovieBigCard from '../moviesListing/MovieBigCard';
import {Movie} from '../../../types/MoviesTypes';
import MoviesService from '../../../services/MoviesService';

function Homepage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    MoviesService.findAll().then((movies) => {
      setMovies(movies);
    });
  }, []);

  return (
    <Box>
      <PageHeader headerText={'Dobrodošli na Pogledaj! test for CI'} />
      <Box mb={'20px'}>
        <SearchTextField id={'search-all'} placeholder={'Pronađi bioskop ili filmski naslov'} />
      </Box>
      <PageSubHeader headerText={'Ne propusti ove filmove'} Icon={LocalFireDepartmentOutlined} />
      <Box mb={'5px'}>
        {movies.length === 0 ? (
          <Typography color={'text.primary'}>Filmovi se učitavaju, molimo sačekajte...</Typography>
        ) : (
          <React.Fragment>
            {movies.map((movie, i) => {
              return (
                <Box mb={'5px'} key={i}>
                  <MovieBigCard movie={movie} />
                </Box>
              );
            })}
          </React.Fragment>
        )}
      </Box>
      <PageSubHeader headerText={'Bioskopi u tvojoj blizini'} Icon={LocationOnOutlined} />
    </Box>
  );
}

export default Homepage;
