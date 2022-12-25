import {Box, Typography} from '@mui/material';
import SearchTextField from '../utility/SearchTextField';
import PageSubHeader from '../utility/PageSubHeader';
import {LocalFireDepartmentOutlined, LocationOnOutlined} from '@mui/icons-material';
import MovieBigCard from '../utility/cards/MovieBigCard';
import MoviesService from '../../../services/MoviesService';
import HorizontalCardsCarousel from '../utility/reels/HorizontalCardsCarousel';
import CinemasService from '../../../services/CinemasService';
import CinemaBigCard from '../utility/cards/CinemaBigCard';
import {useQuery} from 'react-query';

function Homepage() {
  const movies = useQuery(['movies', 'findAll'], MoviesService.findAll);
  const cinemas = useQuery(['cinemas', 'findAll'], CinemasService.findAll);

  return (
    <Box>
      <Box mb={'20px'}>
        <SearchTextField id={'search-all'} placeholder={'Pronađi bioskop ili filmski naslov'} />
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
