import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from '@mui/material';
import SearchTextField from '../utility/SearchTextField';
import PageSubHeader from '../utility/PageSubHeader';
import {LocalActivityOutlined, LocalFireDepartmentOutlined, LocationOnOutlined} from '@mui/icons-material';
import MovieBigCard from '../utility/cards/MovieBigCard';
import MoviesService from '../../../services/MoviesService';
import HorizontalCardsCarousel from '../utility/reels/HorizontalCardsCarousel';
import CinemasService from '../../../services/CinemasService';
import CinemaBigCard from '../utility/cards/CinemaBigCard';
import {useQuery} from 'react-query';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useReservationsStore from '../../../store/ReservationsStore';
import ReservationsList from '../reservations/ReservationsList';
import {namedRoutes} from '../../../routes';
import useAppStore from '../../../store/AppStore';
import BigInfoDialog from '../utility/BigInfoDialog';
import ButtonStyled from '../utility/buttons/Button';
import {useMemo} from 'react';
import {MovieProjection} from '../../../types/MoviesTypes';
import ReservationsHelper from '../../../helpers/ReservationsHelper';
import {DateTime} from 'ts-luxon';
import React from 'react';
import Utils from '../../../helpers/Utils';

function Homepage() {
  const movies = useQuery(['movies', 'findAllOnlyWithActiveProjections'], () => {
    return MoviesService.findAll({onlyWithActiveProjections: true});
  });
  const cinemas = useQuery(['cinemas', 'findAll'], CinemasService.findAll);
  const userLocation = useQuery('userLocation', Utils.getUserLocation, {
    retry: 0,
    cacheTime: 0,
  });
  const reservationStore = useReservationsStore();
  const appStore = useAppStore();

  const MAX_ITEMS_PER_SLIDER = 10;

  const {dontMissTheseMoviesSlider, lastChanceMoviesSlider} = useMemo(() => {
    if (movies.data) {
      return {
        dontMissTheseMoviesSlider: movies.data.slice(0, MAX_ITEMS_PER_SLIDER).sort((movie1, movie2) => {
          const reducer = (sum: number, mp: MovieProjection) => {
            return sum + ReservationsHelper.calculateNumberOfReservationSeats(mp.reservations);
          };
          const movie1SoldCount = movie1.movieProjections.reduce(reducer, 0);
          const movie2SoldCount = movie2.movieProjections.reduce(reducer, 0);
          return movie2SoldCount - movie1SoldCount;
        }), // sort by most made reservations
        lastChanceMoviesSlider: movies.data
          .filter((movie) => {
            // filter all movies that will be here only in the next 7 days
            return !movie.movieProjections.some((mp) => {
              return DateTime.now().plus({day: 7}) < DateTime.fromISO(mp.projectionDateTime);
            });
          })
          .slice(0, MAX_ITEMS_PER_SLIDER)
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
          }), // sort by earliest archive date,
      };
    } else {
      return {
        dontMissTheseMoviesSlider: [],
        lastChanceMoviesSlider: [],
      };
    }
  }, [movies?.data]);

  const {sortedCinemasByProximity} = useMemo(() => {
    if (cinemas.data) {
      return {
        sortedCinemasByProximity: cinemas.data
          .sort((cinema1, cinema2) => {
            const cinema1HasGeolocation = !!cinema1.geoLatitude && !!cinema1.geoLongitude;
            const cinema2HasGeolocation = !!cinema2.geoLatitude && !!cinema2.geoLongitude;
            if (cinema1HasGeolocation && cinema2HasGeolocation) {
              if (userLocation.data) {
                const distanceCinema1 = Utils.calculateDistance(
                  userLocation.data.coords.latitude,
                  userLocation.data.coords.longitude,
                  cinema1.geoLatitude,
                  cinema1.geoLongitude,
                );

                const distanceCinema2 = Utils.calculateDistance(
                  userLocation.data.coords.latitude,
                  userLocation.data.coords.longitude,
                  cinema2.geoLatitude,
                  cinema2.geoLongitude,
                );

                return distanceCinema1 - distanceCinema2;
              }
            } else if (cinema1HasGeolocation) {
              return -1;
            } else if (cinema2HasGeolocation) {
              return 1;
            }

            return 0;
          })
          .slice(0, MAX_ITEMS_PER_SLIDER),
      };
    } else {
      return {
        sortedCinemasByProximity: [],
      };
    }
  }, [cinemas?.data, userLocation?.data]);

  return (
    <Box>
      <Box mb={'20px'}>
        <SearchTextField id={'search-all'} placeholder={'Pronađi bioskop ili filmski naslov'} />
      </Box>
      <Box mb={'20px'}>
        <Accordion defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <PageSubHeader
              headerText={`Tvoje rezervacije (${reservationStore.reservations.length})`}
              Icon={LocalActivityOutlined}
            />
          </AccordionSummary>
          <AccordionDetails>
            <ReservationsList />
            <Box textAlign="center">
              <ButtonStyled variant="contained" href={namedRoutes.moviesListing}>
                {reservationStore.reservations.length === 0 ? 'Rezerviši kartu' : 'Nova rezervacija'}
              </ButtonStyled>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <PageSubHeader headerText={'Ne propusti ove filmove'} Icon={LocalFireDepartmentOutlined} />
      <Box mb={'20px'}>
        {movies.isLoading ? (
          <Typography color={'text.primary'}>Filmovi se učitavaju, molimo sačekajte...</Typography>
        ) : (
          <HorizontalCardsCarousel>
            {dontMissTheseMoviesSlider.map((movie, i) => (
              <MovieBigCard movie={movie} key={i} />
            ))}
          </HorizontalCardsCarousel>
        )}
      </Box>
      {lastChanceMoviesSlider.length > 0 && (
        <React.Fragment>
          <PageSubHeader headerText={'Iskoristi poslednju priliku'} Icon={LocalFireDepartmentOutlined} />
          <Box mb={'20px'}>
            <HorizontalCardsCarousel>
              {lastChanceMoviesSlider.map((movie, i) => (
                <MovieBigCard movie={movie} key={i} />
              ))}
            </HorizontalCardsCarousel>
          </Box>
        </React.Fragment>
      )}
      <PageSubHeader
        headerText={userLocation.error ? ' Bioskopi (geolokacija isključena)' : 'Bioskopi u tvojoj blizini'}
        Icon={LocationOnOutlined}
      />
      <Box mb={'20px'}>
        {cinemas.isLoading ? (
          <Typography color={'text.primary'}>Bioskopi se učitavaju, molimo sačekajte...</Typography>
        ) : (
          <HorizontalCardsCarousel>
            {sortedCinemasByProximity.map((cinema, i) => (
              <CinemaBigCard cinema={cinema} key={i} />
            ))}
          </HorizontalCardsCarousel>
        )}
      </Box>
      <BigInfoDialog
        open={appStore.firstTimeVisitor}
        imgSrc={'/img/couchPopcorn.svg'}
        header={'Dobrodošli na pogledaj!'}
        text={`
        Čestitamo, postali ste deo budućnosti bioskopa! 
        Svi vaši omiljeni filmski titlovi, omiljeni bioskopi od sada se nalaze na jednom mestu, na dohvat ruke! 
        Neka uživanje počne!
    `}
        buttons={[{text: 'Pristupi platformi', onClick: appStore.setNotFirstTimeVisitor}]}
      />
    </Box>
  );
}

export default Homepage;
