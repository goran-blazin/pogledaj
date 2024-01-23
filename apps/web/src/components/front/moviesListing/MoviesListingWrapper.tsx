import MoviesService from '../../../services/MoviesService';
import {Box, Typography} from '@mui/material';
import React, {useMemo} from 'react';
import PageHeader from '../utility/PageHeader';
import SearchTextField from '../utility/SearchTextField';
import HorizontalSmallCardsCarousel from '../utility/reels/HorizontalSmallCardsCarousel';
import MovieSmallCard from '../utility/cards/MovieSmallCard';
import PageSubHeader from '../utility/PageSubHeader';
import {useQuery} from 'react-query';
import {MovieProjection, MovieWithMovieProjection} from '../../../types/MoviesTypes';
import ReservationsHelper from '../../../helpers/ReservationsHelper';
import {DateTime} from 'ts-luxon';
import FilterLinkButton from '../utility/FilterLinkButton';
import {namedRoutes} from '../../../routes';

function MoviesListingWrapper() {
  const movies = useQuery(['movies', 'findAll'], () => {
    return MoviesService.findAll({onlyWithActiveProjections: true});
  });

  const soonMovies = useQuery(['movies', 'findSoonMovies'], () => {
    return MoviesService.findSoonMovies();
  });

  const MAX_ITEMS_PER_SLIDER = 20;

  const moviePopularitySort = (movie1: MovieWithMovieProjection, movie2: MovieWithMovieProjection) => {
    const reducer = (sum: number, mp: MovieProjection) => {
      return sum + ReservationsHelper.calculateNumberOfReservationSeats(mp.reservations);
    };
    const movie1SoldCount = movie1.movieProjections.reduce(reducer, 0);
    const movie2SoldCount = movie2.movieProjections.reduce(reducer, 0);
    return movie2SoldCount - movie1SoldCount;
  };

  const {popularMoviesList, lastChanceMoviesList, newestMoviesList, forChildrenMoviesList} = useMemo(() => {
    if (movies?.data) {
      return {
        popularMoviesList: movies.data.sort(moviePopularitySort).slice(0, MAX_ITEMS_PER_SLIDER), // sort by most made reservations,
        lastChanceMoviesList: movies.data
          .filter((movie) => {
            // filter all movies that will be here only in the next 7 days
            return !movie.movieProjections.some((mp) => {
              return DateTime.now().plus({day: 7}) < DateTime.fromISO(mp.projectionDateTime);
            });
          })

          .sort((movie1, movie2) => {
            const reducer = (latest: MovieProjection, current: MovieProjection) =>
              DateTime.fromISO(current.projectionDateTime) > DateTime.fromISO(latest.projectionDateTime)
                ? current
                : latest;
            const latestDateMovie1 = movie1.movieProjections.reduce(reducer);
            const latestDateMovie2 = movie2.movieProjections.reduce(reducer);
            return DateTime.fromISO(latestDateMovie1.projectionDateTime) >
              DateTime.fromISO(latestDateMovie2.projectionDateTime)
              ? 1
              : -1;
          })
          .slice(0, MAX_ITEMS_PER_SLIDER),
        newestMoviesList: movies.data
          .sort((movie1, movie2) => {
            return DateTime.fromISO(movie1.createdAt) > DateTime.fromISO(movie2.createdAt) ? -1 : 1;
          })
          .slice(0, MAX_ITEMS_PER_SLIDER),
        forChildrenMoviesList: movies.data
          .filter((movie) => movie.additionalData.forChildren)
          .sort(moviePopularitySort)
          .slice(0, MAX_ITEMS_PER_SLIDER), // .sort((movie1, movie2) => {}),
      };
    } else {
      return {
        popularMoviesList: [],
        lastChanceMoviesList: [],
        newestMoviesList: [],
        forChildrenMoviesList: [],
      };
    }
  }, [movies?.data]);

  const soonMoviesList = useMemo(() => {
    if (soonMovies?.data) {
      return soonMovies.data
        .sort((movie1, movie2) => {
          return DateTime.fromISO(movie1.createdAt) < DateTime.fromISO(movie2.createdAt) ? -1 : 1;
        })
        .slice(0, MAX_ITEMS_PER_SLIDER);
    } else {
      return [];
    }
  }, [soonMovies?.data]);

  return (
    <Box>
      <PageHeader headerText={'Filmovi'} />
      <Box mb={'20px'}>
        <SearchTextField
          id={'search-movies'}
          placeholder={'Pronađi filmski naslov'}
          EndAdornment={<FilterLinkButton navigateTo={namedRoutes.moviesFilters} />}
        />
      </Box>
      {movies.isLoading ? (
        <Typography color={'text.primary'}>Učitava se, molimo sačekajte...</Typography>
      ) : (
        <React.Fragment>
          <Box mb={'20px'}>
            <PageSubHeader headerText={'Popularno'} />

            <HorizontalSmallCardsCarousel>
              {popularMoviesList.map((movie, i) => (
                <MovieSmallCard movie={movie} key={i} />
              ))}
            </HorizontalSmallCardsCarousel>
          </Box>
          <Box mb={'20px'}>
            <PageSubHeader headerText={'Poslednja prilika'} />

            <HorizontalSmallCardsCarousel>
              {lastChanceMoviesList.map((movie, i) => (
                <MovieSmallCard movie={movie} key={i} />
              ))}
            </HorizontalSmallCardsCarousel>
          </Box>
          <Box mb={'20px'}>
            <PageSubHeader headerText={'Najnovije'} />

            <HorizontalSmallCardsCarousel>
              {newestMoviesList.map((movie, i) => (
                <MovieSmallCard movie={movie} key={i} />
              ))}
            </HorizontalSmallCardsCarousel>
          </Box>
          <Box mb={'20px'}>
            <PageSubHeader headerText={'Za decu'} />

            <HorizontalSmallCardsCarousel>
              {forChildrenMoviesList.map((movie, i) => (
                <MovieSmallCard movie={movie} key={i} />
              ))}
            </HorizontalSmallCardsCarousel>
          </Box>
          <Box mb={'20px'}>
            <PageSubHeader headerText={'Uskoro'} />

            <HorizontalSmallCardsCarousel>
              {soonMoviesList.map((movie, i) => (
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
