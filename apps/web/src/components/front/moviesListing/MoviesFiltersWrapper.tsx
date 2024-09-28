import {Autocomplete, Box, FormControl, InputAdornment, MenuItem, SelectChangeEvent} from '@mui/material';
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
import PersonsService from '../../../services/PersonsService';
import {useDebounce} from '@uidotdev/usehooks';
import {MovieLengthCategory} from '../../../types/MoviesTypes';
import GeolocationService from '../../../services/GeolocationService';
import CinemasService from '../../../services/CinemasService';
import {DatePicker, DatePickerToolbar} from '@mui/x-date-pickers/DatePicker';
import {DateTime} from 'ts-luxon';
import Utils from '../../../helpers/Utils';
import useMoviesFiltersStore from '../../../store/MoviesFiltersStore';
import ButtonStyled from '../utility/buttons/Button';
import ChipStyled from '../utility/ChipStyled';
import {namedRoutes} from '../../../routes';
import {useNavigate} from 'react-router-dom';
import ContentWrapper from '../layout/ContentWrapper';

import {styled} from '@mui/material';
import {PickersActionBar} from '@mui/x-date-pickers';

const InputText = styled('span')(({theme}) => ({
  color: theme.customForm.inputFieldStyled.color,
}));

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

  // actor autocomplete data
  const [actorsAutocompleteInputValue, setActorsAutocompleteInputValue] = React.useState('');
  const [actorsAutocompleteValue, setActorsAutocompleteValue] = React.useState<Person[]>([]);
  const debouncedActorsAutocompleteInputValue = useDebounce(actorsAutocompleteInputValue, 400);
  const actorsRQ = useQuery(['searchActorsByName', debouncedActorsAutocompleteInputValue], {
    queryFn: () => {
      return PersonsService.searchActorsByName(debouncedActorsAutocompleteInputValue);
    },
  });

  const actorsAutocompleteOptions = useMemo(() => {
    const valuesArrayKeys = actorsAutocompleteValue.map((d) => d.id);
    const serverArray = (actorsRQ.data || []).filter((actors) => {
      // remove data that is already in valuesArray
      return !valuesArrayKeys.includes(actors.id);
    });

    return [...actorsAutocompleteValue, ...serverArray];
  }, [actorsRQ?.data]);

  const [movieLengths, setMovieLengths] = useState<MovieLengthCategory[]>([]);
  const movieLengthsMap = {
    [MovieLengthCategory.to90Minutes]: 'do 90 minuta',
    [MovieLengthCategory.from90To120Minutes]: 'od 90 do 120 minuta',
    [MovieLengthCategory.from120To180Minutes]: 'od 120 do 180 minuta',
    [MovieLengthCategory.over180Minutes]: 'preko 180 minuta',
  };

  const handleMovieLengthsChange = (event: SelectChangeEvent<typeof movieLengths>) => {
    const {
      target: {value},
    } = event;
    setMovieLengths(
      // On autofill we get a stringified value.
      typeof value === 'string' ? (value.split(',') as MovieLengthCategory[]) : value,
    );
  };

  // city select
  const [selectedCity, setSelectedCity] = useState<string>('');
  const handleCityChange = (event: SelectChangeEvent<typeof selectedCity>) => {
    const {
      target: {value},
    } = event;
    setSelectedCinema('');
    setSelectedCity(value);
  };

  const citiesRQ = useQuery('cities', () => {
    return GeolocationService.findCitiesForMoviesFilter();
  });

  // cinema select
  const [selectedCinema, setSelectedCinema] = useState<string>('');
  const handleCinemaChange = (event: SelectChangeEvent<typeof selectedCinema>) => {
    const {
      target: {value},
    } = event;
    setSelectedCinema(value);
  };

  const cinemasRQ = useQuery(['cinemas', selectedCity], () => {
    return CinemasService.findAllByCity(selectedCity);
  });

  // dates
  const [selectedDateFrom, setSelectedDateFrom] = useState<DateTime | null>(null);
  const [selectedDateTo, setSelectedDateTo] = useState<DateTime | null>(null);

  const moviesFiltersStore = useMoviesFiltersStore();
  const navigate = useNavigate();

  const buttonClickHandler = () => {
    moviesFiltersStore.applyMoviesFilters({
      selectedGenres: selectedGenres,
      selectedCountries: selectedCountries,
      selectedDirectorPersonId: directorAutocompleteValue?.id,
      selectedActorPersonIds: actorsAutocompleteValue.map((a) => a.id),
      movieLengths: movieLengths,
      selectedCityId: selectedCity.length > 0 ? selectedCity : undefined,
      selectedCinemasIds: selectedCinema ? [selectedCinema] : undefined,
      selectedDateFrom: selectedDateFrom ? selectedDateFrom.toFormat('yyyy-MM-dd') : undefined,
      selectedDateTo: selectedDateTo ? selectedDateTo.toFormat('yyyy-MM-dd') : undefined,
    });

    navigate(namedRoutes.moviesSearch);
  };

  const handleActorRemoval = (option: Person) => {
    const filterActor = actorsAutocompleteValue.filter((actor) => actor.id !== option.id);
    setActorsAutocompleteValue(filterActor);
  };

  return (
    <ContentWrapper padding>
      <>
        <PageHeader headerText={'Filteri'} />
        <Box sx={{mt: 5}}>
          <PageSubHeader headerText={`Projekcija`} Icon={PersonalVideoOutlinedIcon} />
          <FormControl fullWidth sx={{mt: 2}}>
            <SelectBoxStyled
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      backgroundColor: (theme: {customForm: {selectField: {color: string}}}) =>
                        theme.customForm.selectField.color,
                      color: (theme: {customForm: {selectField: {textColor: string}}}) =>
                        theme.customForm.selectField.textColor,
                    },
                  },
                },
              }}
              sx={{
                '.MuiSvgIcon-root ': {
                  color: (theme) => theme.customForm.selectField.startAdornmentTextColor,
                },
              }}
              value={selectedCity}
              startAdornment={
                <InputAdornment className={'select-adornment'} position="start">
                  <InputText>Grad</InputText>
                </InputAdornment>
              }
              onChange={handleCityChange}
            >
              {(citiesRQ.data || []).map((city, i) => {
                return (
                  <MenuItem key={i} value={city.id}>
                    {city.name}
                  </MenuItem>
                );
              })}
            </SelectBoxStyled>
          </FormControl>
          <FormControl fullWidth sx={{mt: 1}}>
            <SelectBoxStyled
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      backgroundColor: (theme: {customForm: {selectField: {color: string}}}) =>
                        theme.customForm.selectField.color,
                      color: (theme: {customForm: {selectField: {textColor: string}}}) =>
                        theme.customForm.selectField.textColor,
                    },
                  },
                },
              }}
              sx={{
                '.MuiSvgIcon-root ': {
                  color: (theme) => theme.customForm.selectField.startAdornmentTextColor,
                },
              }}
              value={selectedCinema}
              startAdornment={
                <InputAdornment className={'select-adornment'} position="start">
                  <InputText>Bioskopi</InputText>
                </InputAdornment>
              }
              onChange={handleCinemaChange}
            >
              {(cinemasRQ.data || []).map((cinema, i) => {
                return (
                  <MenuItem key={i} value={cinema.id}>
                    {cinema.name}
                  </MenuItem>
                );
              })}
            </SelectBoxStyled>
          </FormControl>
          <FormControl fullWidth sx={{mt: 1}}>
            <DatePicker
              sx={{
                '.MuiSvgIcon-root ': {
                  color: (theme) => theme.customForm.selectField.startAdornmentTextColor,
                },
              }}
              format={Utils.luxonDateFormat}
              value={selectedDateFrom}
              slots={{
                actionBar: (params) => {
                  return <PickersActionBar {...params} actions={[]} />;
                },
                toolbar: (params) => {
                  return <DatePickerToolbar {...params} hidden={true} />;
                },
                textField: (params) => {
                  if (params.InputProps) {
                    params.InputProps.startAdornment = (
                      <InputAdornment position="start">
                        <InputText>Datum od</InputText>
                      </InputAdornment>
                    );
                  }
                  return <TextFieldStyled {...params} fullWidth placeholder={''} />;
                },
              }}
              onChange={(value) => {
                setSelectedDateFrom(value as DateTime);
              }}
              closeOnSelect={true}
            />
          </FormControl>
          <FormControl fullWidth sx={{mt: 1}}>
            <DatePicker
              sx={{
                '.MuiSvgIcon-root ': {
                  color: (theme) => theme.customForm.selectField.startAdornmentTextColor,
                },
              }}
              format={Utils.luxonDateFormat}
              value={selectedDateTo}
              slots={{
                actionBar: (params) => {
                  return <PickersActionBar {...params} actions={[]} />;
                },
                toolbar: (params) => {
                  return <DatePickerToolbar {...params} hidden={true} />;
                },
                textField: (params) => {
                  if (params.InputProps) {
                    params.InputProps.startAdornment = (
                      <InputAdornment position="start">
                        <InputText>Datum do</InputText>
                      </InputAdornment>
                    );
                  }
                  return <TextFieldStyled {...params} fullWidth placeholder={''} />;
                },
              }}
              closeOnSelect={true}
              onChange={(value) => {
                setSelectedDateTo(value as DateTime);
              }}
            />
          </FormControl>
        </Box>
        <Box sx={{mt: 5}}>
          <PageSubHeader headerText={`Film`} Icon={MovieCreationOutlinedIcon} />
          <FormControl fullWidth sx={{mt: 2}}>
            <SelectBoxStyled
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      backgroundColor: (theme: {customForm: {selectField: {color: string}}}) =>
                        theme.customForm.selectField.color,
                      color: (theme: {customForm: {selectField: {textColor: string}}}) =>
                        theme.customForm.selectField.textColor,
                    },
                  },
                },
              }}
              sx={{
                '.MuiSvgIcon-root ': {
                  color: (theme) => theme.customForm.selectField.startAdornmentTextColor,
                },
              }}
              multiple
              value={selectedGenres}
              startAdornment={
                <InputAdornment className={'select-adornment'} position="start">
                  <InputText>Žanr</InputText>
                </InputAdornment>
              }
              onChange={handleGenreChange}
              renderValue={(selected) => (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                  {selected.map((value) => (
                    <ChipStyled
                      key={value}
                      label={(genresRQ.data || []).find((g) => g.systemName === value)?.localizedName}
                    />
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
          <FormControl fullWidth sx={{mt: 1}}>
            <SelectBoxStyled
              // TODO rework inputProps into main component
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      backgroundColor: (theme: {customForm: {selectField: {color: string}}}) =>
                        theme.customForm.selectField.color,
                      color: (theme: {customForm: {selectField: {textColor: string}}}) =>
                        theme.customForm.selectField.textColor,
                    },
                  },
                },
              }}
              sx={{
                '.MuiSvgIcon-root ': {
                  color: (theme) => theme.customForm.selectField.startAdornmentTextColor,
                },
              }}
              multiple
              value={selectedCountries}
              startAdornment={
                <InputAdornment className={'select-adornment'} position="start">
                  <InputText>Zemlja porekla</InputText>
                </InputAdornment>
              }
              onChange={handleCountryChange}
              renderValue={(selected) => (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                  {selected.map((value) => (
                    <ChipStyled key={value} label={(countriesRQ.data || []).find((c) => c.code === value)?.name} />
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
          <FormControl fullWidth sx={{mt: 1}}>
            <Autocomplete<Person, true>
              sx={{
                '.MuiSvgIcon-root ': {
                  color: (theme) => theme.customForm.selectField.startAdornmentTextColor,
                },
              }}
              id="choose-actors-filter"
              multiple
              filterOptions={(x) => x}
              filterSelectedOptions
              options={actorsAutocompleteOptions}
              autoComplete
              includeInputInList
              loading={actorsRQ.isLoading}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <ChipStyled
                    label={option.name}
                    {...getTagProps({index})}
                    margin={'0 5px 0 0'}
                    onClick={() => handleActorRemoval(option)}
                  />
                ))
              }
              renderInput={(params) => {
                params.InputProps.startAdornment = (
                  <>
                    <InputAdornment className={'select-adornment'} position="start">
                      <InputText>Glumci</InputText>
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
              getOptionKey={(actor) => actor.id}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{mt: 1}}>
            <Autocomplete<Person>
              sx={{
                '.MuiSvgIcon-root ': {
                  color: (theme) => theme.customForm.selectField.startAdornmentTextColor,
                },
              }}
              id="choose-director-filter"
              filterOptions={(x) => x}
              filterSelectedOptions
              options={directorAutocompleteOptions}
              autoComplete
              includeInputInList
              loading={directorsRQ.isLoading}
              renderInput={(params) => {
                params.InputProps.startAdornment = (
                  <InputAdornment position="start">
                    <InputText>Režiser</InputText>
                  </InputAdornment>
                );
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
          <FormControl fullWidth sx={{mt: 1}}>
            <SelectBoxStyled
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      backgroundColor: (theme: {customForm: {selectField: {color: string}}}) =>
                        theme.customForm.selectField.color,
                      color: (theme: {customForm: {selectField: {textColor: string}}}) =>
                        theme.customForm.selectField.textColor,
                    },
                  },
                },
              }}
              sx={{
                '.MuiSvgIcon-root ': {
                  color: (theme) => theme.customForm.selectField.startAdornmentTextColor,
                },
              }}
              multiple
              value={movieLengths}
              startAdornment={
                <InputAdornment className={'select-adornment'} position="start">
                  <InputText>Trajanje filma</InputText>
                </InputAdornment>
              }
              onChange={handleMovieLengthsChange}
              renderValue={(selected) => (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                  {selected.map((value) => (
                    <ChipStyled key={value} label={movieLengthsMap[value]} />
                  ))}
                </Box>
              )}
            >
              {(Object.keys(movieLengthsMap) as MovieLengthCategory[]).map((movieLengthCategory, i) => {
                return (
                  <MenuItem key={i} value={movieLengthCategory}>
                    {movieLengthsMap[movieLengthCategory]}
                  </MenuItem>
                );
              })}
            </SelectBoxStyled>
          </FormControl>
        </Box>
        <Box sx={{mt: 5}} textAlign="center">
          <ButtonStyled variant="contained" onClick={buttonClickHandler}>
            {'Primeni filtere'}
          </ButtonStyled>
        </Box>
      </>
    </ContentWrapper>
  );
}

export default MoviesFiltersWrapper;
