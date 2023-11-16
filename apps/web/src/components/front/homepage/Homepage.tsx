import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography} from '@mui/material';
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

function Homepage() {
  const movies = useQuery(['movies', 'findAll'], MoviesService.findAll);
  const cinemas = useQuery(['cinemas', 'findAll'], CinemasService.findAll);
  const reservationStore = useReservationsStore();

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
              <Button variant="contained" href={namedRoutes.moviesListing}>
                {reservationStore.reservations.length === 0 ? 'Rezerviši kartu' : 'Nova rezervacija'}
              </Button>
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
            {(movies.data || []).map((movie, i) => (
              <MovieBigCard movie={movie} key={i} />
            ))}
          </HorizontalCardsCarousel>
        )}
      </Box>
      <PageSubHeader headerText={'Bioskopi u tvojoj blizini'} Icon={LocationOnOutlined} />
      <Box mb={'20px'}>
        {movies.isLoading ? (
          <Typography color={'text.primary'}>Bioskopi se učitavaju, molimo sačekajte...</Typography>
        ) : (
          <HorizontalCardsCarousel>
            {(cinemas.data || []).map((cinema, i) => (
              <CinemaBigCard cinema={cinema} key={i} />
            ))}
          </HorizontalCardsCarousel>
        )}
      </Box>
    </Box>
  );
}

export default Homepage;
