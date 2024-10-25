import {Box, Grid} from '@mui/material';
import MoviesService from '../../../services/MoviesService';
import PageSubHeader from '../utility/PageSubHeader';
import MovieBigCard from '../utility/cards/MovieBigCard';
import PageHeader from '../utility/PageHeader';
import ContentWrapper from '../layout/ContentWrapper';
import LoadingBox from '../utility/LoadingBox';
import {useSearchParams} from 'react-router-dom';
import {useQuery} from 'react-query';
import Utils from '../../../helpers/Utils';
import MovieHelper from '../../../helpers/MovieHelper';
import ChipStyled from '../utility/ChipStyled';
import {useMemo} from 'react';

function MoviesSearchWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieFilters = useMemo(() => {
    const moviesFiltersQuery = Utils.urlSearchParamsToObject(searchParams.toString());
    return MovieHelper.formatMoviesFiltersFromQuery(moviesFiltersQuery);
  }, [searchParams]);

  const {data: moviesData, isLoading} = useQuery(['moviesSearch', movieFilters], () => {
    return MoviesService.getMoviesByFilter(movieFilters);
  });

  const removeFilterHandler = (key: string, value: string, isArray = false) => {
    const param = searchParams.get(key);
    if (param) {
      if (isArray) {
        const newParam = param
          .split(',')
          .filter((i) => i !== value)
          .join(',');

        if (newParam) {
          searchParams.set(key, newParam);
        } else {
          searchParams.delete(key);
        }

        setSearchParams(searchParams);
      } else {
        searchParams.delete(key);
        setSearchParams(searchParams);
      }
    }
  };

  // const genresRQ = useQuery(['genresForMoviesFilters'], () => {
  //   return MoviesService.getAllGenresForMoviesFilter();
  // });
  // const countriesRQ = useQuery(['countriesForMoviesFilters'], () => {
  //   return MoviesService.getAllCountriesForMoviesFilter();
  // });
  //
  // const citiesRQ = useQuery('cities', () => {
  //   return GeolocationService.findCitiesForMoviesFilter();
  // });

  // const cinemasRQ = useQuery(['cinemas', userSettingsStore.globalSelectedCity], () => {
  //   return CinemasService.findAllByCity(userSettingsStore.globalSelectedCity);
  // });

  // const directorsRQ = useQuery(['searchDirectorsByName', debouncedDirectorAutocompleteInputValue], {
  //   queryFn: () => {
  //     return PersonsService.searchDirectorsByName(debouncedDirectorAutocompleteInputValue);
  //   },
  // });

  // const actorsRQ = useQuery(['searchActorsByName', debouncedActorsAutocompleteInputValue], {
  //   queryFn: () => {
  //     return PersonsService.searchActorsByName(debouncedActorsAutocompleteInputValue);
  //   },
  // });

  const chosenFilterChips = useMemo(() => {
    const getLabel = (key: string, value: string) => {
      return `label-${key}-${value}`;
    };

    return Object.entries(movieFilters)
      .filter((kv) => !!kv[1])
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((valueItem) => {
            return {
              key: key + valueItem,
              label: getLabel(key, valueItem),
              onClickHandler: () => removeFilterHandler(key, valueItem, true),
            };
          });
        } else {
          return {
            key: key,
            label: getLabel(key, value),
            onClickHandler: () => removeFilterHandler(key, value),
          };
        }
      })
      .flat();
  }, [movieFilters]);

  return (
    <ContentWrapper padding>
      <Box
        sx={{
          paddingTop: '30px',
        }}
      >
        <PageHeader
          headerText={
            'Rezultat pretrage' + (Utils.isNullOrUndefined(moviesData?.dataCount) ? '' : ` (${moviesData?.dataCount})`)
          }
        />
        <Grid container spacing={1} mb={'20px'}>
          {chosenFilterChips.map((chip) => {
            return (
              <Grid item key={chip.key}>
                <ChipStyled label={chip.label} onClick={chip.onClickHandler} />
              </Grid>
            );
          })}
          {/*{Object.entries(movieFilters)*/}
          {/*  .filter((kv) => !!kv[1])*/}
          {/*  .map(([key, value]) => {*/}
          {/*    if (Array.isArray(value)) {*/}
          {/*      return value.map((valueItem) => {*/}
          {/*        return (*/}
          {/*          <Grid item key={key + valueItem}>*/}
          {/*            <ChipStyled*/}
          {/*              key={key}*/}
          {/*              label={valueItem}*/}
          {/*              onClick={() => removeFilterHandler(key, valueItem, true)}*/}
          {/*            />*/}
          {/*          </Grid>*/}
          {/*        );*/}
          {/*      });*/}
          {/*    } else {*/}
          {/*      return (*/}
          {/*        <Grid item key={key}>*/}
          {/*          <ChipStyled label={value} onClick={() => removeFilterHandler(key, value)} />*/}
          {/*        </Grid>*/}
          {/*      );*/}
          {/*    }*/}
          {/*  })}*/}
        </Grid>
        <Box mb={'20px'}>
          <Box
            sx={{
              display: 'grid',
              gap: '20px',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
                lg: '1fr 1fr 1fr 1fr',
              },
            }}
          >
            {isLoading ? (
              <LoadingBox />
            ) : (moviesData?.data || []).length > 0 ? (
              (moviesData?.data || []).map((movie, i) => <MovieBigCard movie={movie} key={i} />)
            ) : (
              <PageSubHeader headerText={'Nijedan film ne odgovara unešenim parametrima'} />
            )}
          </Box>
        </Box>
      </Box>
    </ContentWrapper>
  );
}

export default MoviesSearchWrapper;
