import {Autocomplete, Box, Chip, FormControl, InputAdornment, MenuItem, SelectChangeEvent} from '@mui/material';
import PageHeader from '../utility/PageHeader';
import React, {useMemo, useState} from 'react';
import PageSubHeader from '../utility/PageSubHeader';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import PersonalVideoOutlinedIcon from '@mui/icons-material/PersonalVideoOutlined';
import {useQuery} from 'react-query';
import MoviesService from '../../../services/MoviesService';
import SelectBoxStyled from '../utility/form/SelectBoxStyled';
import {Person} from '../../../types/PeopleTypes';
import TextFieldStyled from '../utility/form/TextFieldStyled';
import StyledPopper from '../utility/form/StyledPopper';
import PersonsService from '../../../services/PersonsService';
import {useDebounce} from '@uidotdev/usehooks';

function MoviesFiltersWrapper() {
  const genresRQ = useQuery(['genresForMoviesFilters'], () => {
    return MoviesService.getAllGenresForMoviesFilter();
  });
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const handleGenreChange = (event: SelectChangeEvent<typeof selectedGenres>) => {
    const {
      target: {value},
    } = event;
    setSelectedGenres(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const countriesRQ = useQuery(['countriesForMoviesFilters'], () => {
    return MoviesService.getAllCountriesForMoviesFilter();
  });
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const handleCountryChange = (event: SelectChangeEvent<typeof selectedCountries>) => {
    const {
      target: {value},
    } = event;
    setSelectedCountries(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  // director autocomplete data
  const [directorAutocompleteInputValue, setDirectorAutocompleteInputValue] = React.useState('');
  const [directorAutocompleteValue, setDirectorAutocompleteValue] = React.useState<Person | null>(null);
  const debouncedDirectorAutocompleteInputValue = useDebounce(directorAutocompleteInputValue, 400);
  const directorsRQ = useQuery(['searchDirectorsByName', debouncedDirectorAutocompleteInputValue], {
    queryFn: () => {
      return PersonsService.searchDirectorsByName(debouncedDirectorAutocompleteInputValue);
    },
    enabled: !!debouncedDirectorAutocompleteInputValue,
  });

  const directorAutocompleteOptions = useMemo(() => {
    const valuesArray = directorAutocompleteValue ? [directorAutocompleteValue] : [];
    const valuesArrayKeys = valuesArray.map((d) => d.id);
    const serverArray = (directorsRQ.data || []).filter((director) => {
      // remove data that is already in valuesArray
      return !valuesArrayKeys.includes(director.id);
    });

    return [...valuesArray, ...serverArray];
  }, [directorsRQ?.data]);

  // director autocomplete data
  const [actorsAutocompleteInputValue, setActorsAutocompleteInputValue] = React.useState('');
  const [actorsAutocompleteValue, setActorsAutocompleteValue] = React.useState<Person[]>([]);
  const debouncedActorsAutocompleteInputValue = useDebounce(actorsAutocompleteInputValue, 400);
  const actorsRQ = useQuery(['searchActorsByName', debouncedActorsAutocompleteInputValue], {
    queryFn: () => {
      return PersonsService.searchActorsByName(debouncedActorsAutocompleteInputValue);
    },
    enabled: !!debouncedActorsAutocompleteInputValue,
  });

  const actorsAutocompleteOptions = useMemo(() => {
    const valuesArrayKeys = actorsAutocompleteValue.map((d) => d.id);
    const serverArray = (actorsRQ.data || []).filter((actors) => {
      // remove data that is already in valuesArray
      return !valuesArrayKeys.includes(actors.id);
    });

    return [...actorsAutocompleteValue, ...serverArray];
  }, [actorsRQ?.data]);

  return (
    <Box>
      <PageHeader headerText={'Filteri'} />
      <Box>
        <PageSubHeader headerText={`Film`} Icon={MovieCreationOutlinedIcon} />
        <FormControl fullWidth sx={{mt: 2}}>
          <SelectBoxStyled
            multiple
            value={selectedGenres}
            startAdornment={
              <InputAdornment className={'select-adornment'} position="start">
                Žanr
              </InputAdornment>
            }
            onChange={handleGenreChange}
            renderValue={(selected) => (
              <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                {selected.map((value) => (
                  <Chip key={value} label={(genresRQ.data || []).find((g) => g.systemName === value)?.localizedName} />
                ))}
              </Box>
            )}
          >
            {(genresRQ.data || []).map((genre, i) => {
              return (
                <MenuItem key={i} value={genre.systemName}>
                  {genre.localizedName}
                </MenuItem>
              );
            })}
          </SelectBoxStyled>
        </FormControl>
        <FormControl fullWidth sx={{mt: 2}}>
          <SelectBoxStyled
            multiple
            value={selectedCountries}
            startAdornment={
              <InputAdornment className={'select-adornment'} position="start">
                Država porekla
              </InputAdornment>
            }
            onChange={handleCountryChange}
            renderValue={(selected) => (
              <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                {selected.map((value) => (
                  <Chip key={value} label={(countriesRQ.data || []).find((c) => c.code === value)?.name} />
                ))}
              </Box>
            )}
          >
            {(countriesRQ.data || []).map((country, i) => {
              return (
                <MenuItem key={i} value={country.code}>
                  {country.name}
                </MenuItem>
              );
            })}
          </SelectBoxStyled>
        </FormControl>
        <FormControl fullWidth sx={{mt: 2}}>
          <Autocomplete<Person>
            id="choose-director-filter"
            filterOptions={(x) => x}
            options={directorAutocompleteOptions}
            autoComplete
            includeInputInList
            loading={directorsRQ.isLoading}
            PopperComponent={StyledPopper}
            renderInput={(params) => {
              params.InputProps.startAdornment = <InputAdornment position="start">Režiser</InputAdornment>;
              return <TextFieldStyled {...params} fullWidth />;
            }}
            noOptionsText="Nije nadjeno"
            onInputChange={(event, newInputValue) => {
              setDirectorAutocompleteInputValue(newInputValue);
            }}
            onChange={(event: React.SyntheticEvent, newValue: Person | null) => {
              setDirectorAutocompleteValue(newValue);
            }}
            value={directorAutocompleteValue}
            getOptionLabel={(director) => director.name}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{mt: 2}}>
          <Autocomplete<Person, true>
            id="choose-actors-filter"
            multiple
            filterOptions={(x) => x}
            options={actorsAutocompleteOptions}
            autoComplete
            includeInputInList
            loading={actorsRQ.isLoading}
            PopperComponent={StyledPopper}
            renderInput={(params) => {
              params.InputProps.startAdornment = (
                <>
                  <InputAdornment className={'select-adornment'} position="start">
                    Glumci
                  </InputAdornment>
                  <React.Fragment>{params.InputProps.startAdornment}</React.Fragment>
                </>
              );
              return <TextFieldStyled {...params} fullWidth />;
            }}
            noOptionsText="Nije nadjeno"
            onInputChange={(event, newInputValue) => {
              setActorsAutocompleteInputValue(newInputValue);
            }}
            onChange={(event: React.SyntheticEvent, newValue: Person[]) => {
              setActorsAutocompleteValue(newValue);
            }}
            value={actorsAutocompleteValue}
            getOptionLabel={(actor) => actor.name}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
          />
        </FormControl>
      </Box>
      <Box sx={{mt: 5}}>
        <PageSubHeader headerText={`Projekcija`} Icon={PersonalVideoOutlinedIcon} />
      </Box>
    </Box>
  );
}

export default MoviesFiltersWrapper;
