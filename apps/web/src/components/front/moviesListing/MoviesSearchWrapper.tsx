import {Box} from '@mui/material';
import useMoviesFiltersStore from '../../../store/MoviesFiltersStore';

function MoviesSearchWrapper() {
  const moviesFiltersStore = useMoviesFiltersStore();

  console.log(moviesFiltersStore.moviesFilters);

  return <Box>MOVIES SEARCH</Box>;
}

export default MoviesSearchWrapper;
