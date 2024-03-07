import FilterLinkButton from '../utility/FilterLinkButton';
import {namedRoutes} from '../../../routes';
import SearchTextField from '../utility/SearchTextField';
import React from 'react';

function MoviesSearchTextbox() {
  return (
    <SearchTextField
      id={'search-movies'}
      placeholder={'Pronađi filmski naslov'}
      EndAdornment={<FilterLinkButton navigateTo={namedRoutes.moviesFilters} />}
    />
  );
}

export default MoviesSearchTextbox;
