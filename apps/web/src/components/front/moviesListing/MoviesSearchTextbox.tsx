import FilterLinkButton from '../utility/FilterLinkButton';
import {namedRoutes} from '../../../routes';
import SearchTextField from '../utility/SearchTextField';
import Grid from '@mui/material/Grid';

function MoviesSearchTextbox() {
  return (
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
      <Grid
        item
        xs={6}
        sx={{
          maxWidth: {
            xs: '100%',
            sm: '50%',
          },
        }}
      >
        <SearchTextField
          id={'search-movies'}
          placeholder={'Pronađi filmski naslov'}
          // EndAdornment={<FilterLinkButton navigateTo={namedRoutes.moviesFilters} />}
        />
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          maxWidth: {
            xs: '100%',
            sm: '50%',
          },
        }}
      >
        <FilterLinkButton
          navigateTo={namedRoutes.moviesFilters}
          text={'Detaljna pretraga'}
          fullWidth={true}
          height="48px"
        />
      </Grid>
    </Grid>
  );
}

export default MoviesSearchTextbox;
