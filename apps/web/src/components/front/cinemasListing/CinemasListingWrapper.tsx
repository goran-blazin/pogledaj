import CinemasService from '../../../services/CinemasService';
import {Box, Typography} from '@mui/material';
import PageHeader from '../utility/PageHeader';
import SearchTextField from '../utility/SearchTextField';
import CinemaBigCard from '../utility/cards/CinemaBigCard';
import {useQuery} from 'react-query';
import FilterLinkButton from '../utility/FilterLinkButton';
import {namedRoutes} from '../../../routes';
import ContentWrapper from '../layout/ContentWrapper';

function CinemasListingWrapper() {
  const cinemas = useQuery(['cinemas', 'findAll'], CinemasService.findAll);

  return (
    <ContentWrapper padding>
      <>
        <PageHeader headerText={'Bioskopi'} />
        <Box mb={'20px'}>
          <SearchTextField
            id={'search-cinemas'}
            placeholder={'Pronađi bioskop'}
            EndAdornment={<FilterLinkButton navigateTo={namedRoutes.moviesFilters} />}
          />
        </Box>
        {cinemas.isLoading ? (
          <Typography color={'text.primary'}>Učitava se, molimo sačekajte...</Typography>
        ) : (
          <Box>
            {(cinemas.data || []).map((cinema, i) => {
              return (
                <Box mb={'13px'} key={i}>
                  <CinemaBigCard cinema={cinema} key={i} />
                </Box>
              );
            })}
          </Box>
        )}
      </>
    </ContentWrapper>
  );
}

export default CinemasListingWrapper;
