import FilterLinkButton from '../utility/FilterLinkButton';
import {namedRoutes} from '../../../routes';
import SearchTextField from '../utility/SearchTextField';
import Grid from '@mui/material/Grid';

function MoviesSearchTextbox() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <SearchTextField
          id={'search-movies'}
          placeholder={'Pronađi filmski naslov'}
          // EndAdornment={<FilterLinkButton navigateTo={namedRoutes.moviesFilters} />}
        />
      </Grid>
      <Grid item xs={6}>
        <FilterLinkButton navigateTo={namedRoutes.moviesFilters} text={'Detaljna pretraga'} fullWidth={true} />
      </Grid>
    </Grid>
  );
}

export default MoviesSearchTextbox;
