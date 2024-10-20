import MoviesService from '../../../services/MoviesService';
import {Autocomplete, Box, InputAdornment} from '@mui/material';
import React, {useEffect, useMemo, useState} from 'react';
import HorizontalSmallCardsCarousel from '../utility/reels/HorizontalSmallCardsCarousel';
import MovieSmallCard from '../utility/cards/MovieSmallCard';
import PageSubHeader from '../utility/PageSubHeader';
import {useQuery} from 'react-query';
import {MovieProjection, MovieWithMovieProjection} from '../../../types/MoviesTypes';
import ReservationsHelper from '../../../helpers/ReservationsHelper';
import {DateTime} from 'ts-luxon';
import ContentWrapper from '../layout/ContentWrapper';
import StyledPopper from '../utility/form/StyledPopper';
import {useDebounce} from '@uidotdev/usehooks';
import {Search} from '@mui/icons-material';
import {SearchTextFieldStyled} from '../utility/SearchTextField';
import {namedRoutes} from '../../../routes';
import FilterLinkButton from '../utility/FilterLinkButton';
import {useNavigate} from 'react-router-dom';
import Utils from '../../../helpers/Utils';
import parse from 'html-react-parser';
import {EventPreview} from '../EventPreview/EventPreview';
import _ from 'lodash';
import NoImage from '../utility/NoImage';
import Grid from '@mui/material/Grid';
import {isLandscape} from '../../../helpers/HelperFunctions';
import LoadingBox from '../utility/LoadingBox';

function MoviesListingWrapper() {
  const navigate = useNavigate();
  const [moviePoster, setMoviePoster] = useState<MovieWithMovieProjection>();
  const [orientation, setOrientation] = useState('');

  const movies = useQuery(['movies', 'findAll'], () => {
    return MoviesService.findAll({onlyWithActiveProjections: true});
  });

  // const soonMovies = useQuery(['movies', 'findSoonMovies'], () => {
  //   return MoviesService.findSoonMovies();
  // });

  // movies autocomplete data
  const [moviesAutocompleteInputValue, setMoviesAutocompleteInputValue] = React.useState('');
  const debouncedMoviesAutocompleteInputValue = useDebounce(moviesAutocompleteInputValue, 400);
  const moviesSearchRQ = useQuery(['searchMovies', debouncedMoviesAutocompleteInputValue], {
    queryFn: () => {
      return MoviesService.findMoviesForSearch(debouncedMoviesAutocompleteInputValue);
    },
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

  useEffect(() => {
    if (!moviePoster && popularMoviesList.length > 0) {
      const moviesWithBackground = popularMoviesList.filter((movie) => {
        return !!movie?.posterImages?.bigBackground;
      });
      if (moviesWithBackground.length) {
        const movieIndex = _.random(0, moviesWithBackground.length - 1);
        setMoviePoster(moviesWithBackground[movieIndex]);
        setOrientationFn();
      }
    }
  }, [popularMoviesList.length]);

  // const soonMoviesList = useMemo(() => {
  //   if (soonMovies?.data) {
  //     return soonMovies.data
  //       .sort((movie1, movie2) => {
  //         return DateTime.fromISO(movie1.createdAt) < DateTime.fromISO(movie2.createdAt) ? -1 : 1;
  //       })
  //       .slice(0, MAX_ITEMS_PER_SLIDER);
  //   } else {
  //     return [];
  //   }
  // }, [soonMovies?.data]);

  const setOrientationFn = () => {
    const portrait = window.matchMedia('(orientation: portrait)');
    if (isLandscape()) {
      setOrientation('Landscape');
    } else {
      setOrientation('Portrait');
    }
    portrait.addEventListener('change', (e) => {
      if (e.matches) {
        setOrientation('Portrait');
      } else {
        setOrientation('Landscape');
      }
    });
  };

  return (
    <Box>
      {movies.isLoading && !moviePoster ? (
        // <Typography color={'text.primary'}>Učitava se, molimo sačekajte...</Typography>
        <LoadingBox />
      ) : (
        <React.Fragment>
          <EventPreview>
            {moviePoster ? (
              <img
                src={
                  orientation === 'Landscape'
                    ? moviePoster?.posterImages?.bigBackground
                    : moviePoster?.posterImages?.mediumPoster
                }
                alt={'POSTER IMAGE'}
                onClick={() => {
                  navigate(namedRoutes.movieSingle.replace(':movieId', moviePoster.id));
                }}
              />
            ) : (
              <NoImage />
            )}
          </EventPreview>
          <ContentWrapper padding marginBottom={'48px'}>
            <Grid
              container
              spacing={2}
              sx={{
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
              }}
            >
              <Grid item xs={12} sm={8}>
                <Autocomplete<MovieWithMovieProjection>
                  id="movies-search-autocomplete"
                  filterOptions={(x) => x}
                  filterSelectedOptions
                  options={moviesSearchRQ.data || []}
                  autoComplete
                  renderOption={(props, option, state, ownerState) => {
                    return (
                      <Box
                        component={'li'}
                        key={props.id}
                        {..._.omit(props, 'key')}
                        sx={(theme) => ({
                          whiteSpace: 'pre',
                          '& span': {
                            color: theme.palette.primary.main,
                          },
                        })}
                      >
                        {parse(Utils.wrapSubstringInTag(ownerState.getOptionLabel(option), state.inputValue))}
                      </Box>
                    );
                  }}
                  getOptionLabel={(movie) =>
                    `${movie.localizedTitle || Utils.getMovieTitle(movie)} (${DateTime.fromISO(
                      movie.releaseDate,
                    ).toFormat('yyyy')})`
                  }
                  includeInputInList
                  loading={moviesSearchRQ.isLoading}
                  PopperComponent={StyledPopper}
                  renderInput={(params) => {
                    params.InputProps.startAdornment = (
                      <InputAdornment position="start">
                        <Search color="primary" />
                      </InputAdornment>
                    );
                    // params.InputProps.endAdornment = <FilterLinkButton navigateTo={namedRoutes.moviesFilters} />;
                    return (
                      <SearchTextFieldStyled
                        {...params}
                        variant="outlined"
                        fullWidth
                        placeholder={'Pronađi filmski naslov'}
                      />
                    );
                  }}
                  noOptionsText="Nije nadjeno"
                  onInputChange={(event, newInputValue) => {
                    setMoviesAutocompleteInputValue(newInputValue);
                  }}
                  onChange={(event: React.SyntheticEvent, newValue: MovieWithMovieProjection | null) => {
                    if (newValue) {
                      navigate(namedRoutes.movieSingle.replace(':movieId', newValue.id));
                    }
                  }}
                  isOptionEqualToValue={(option, value) => {
                    return option.id === value.id;
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FilterLinkButton
                  navigateTo={namedRoutes.moviesFilters}
                  fullWidth={true}
                  text={'Detaljna pretraga'}
                  height="48px"
                />
              </Grid>
            </Grid>
          </ContentWrapper>
          {popularMoviesList.length > 0 && (
            <Box mb={'20px'}>
              <ContentWrapper padding>
                <PageSubHeader headerText={'Popularno'} />
              </ContentWrapper>
              <HorizontalSmallCardsCarousel>
                {popularMoviesList.map((movie, i) => (
                  <MovieSmallCard movie={movie} key={i} />
                ))}
              </HorizontalSmallCardsCarousel>
            </Box>
          )}

          {lastChanceMoviesList.length > 0 && (
            <Box mb={'20px'}>
              <ContentWrapper padding>
                <PageSubHeader headerText={'Poslednja prilika'} />
              </ContentWrapper>
              <HorizontalSmallCardsCarousel>
                {lastChanceMoviesList.map((movie, i) => (
                  <MovieSmallCard movie={movie} key={i} />
                ))}
              </HorizontalSmallCardsCarousel>
            </Box>
          )}

          {newestMoviesList.length > 0 && (
            <Box mb={'20px'}>
              <ContentWrapper padding>
                <PageSubHeader headerText={'Najnovije'} />
              </ContentWrapper>
              <HorizontalSmallCardsCarousel>
                {newestMoviesList.map((movie, i) => (
                  <MovieSmallCard movie={movie} key={i} />
                ))}
              </HorizontalSmallCardsCarousel>
            </Box>
          )}

          {forChildrenMoviesList.length > 0 && (
            <Box mb={'20px'}>
              <ContentWrapper padding>
                <PageSubHeader headerText={'Za decu'} />
              </ContentWrapper>
              <HorizontalSmallCardsCarousel>
                {forChildrenMoviesList.map((movie, i) => (
                  <MovieSmallCard movie={movie} key={i} />
                ))}
              </HorizontalSmallCardsCarousel>
            </Box>
          )}

          {/*{soonMoviesList.length > 0 && (*/}
          {/*  <Box mb={'20px'}>*/}
          {/*    <ContentWrapper padding>*/}
          {/*      <PageSubHeader headerText={'Uskoro'} />*/}
          {/*    </ContentWrapper>*/}
          {/*    <HorizontalSmallCardsCarousel>*/}
          {/*      {soonMoviesList.map((movie, i) => (*/}
          {/*        <MovieSmallCard movie={movie} key={i} />*/}
          {/*      ))}*/}
          {/*    </HorizontalSmallCardsCarousel>*/}
          {/*  </Box>*/}
          {/*)}*/}
        </React.Fragment>
      )}
    </Box>
  );
}

export default MoviesListingWrapper;
