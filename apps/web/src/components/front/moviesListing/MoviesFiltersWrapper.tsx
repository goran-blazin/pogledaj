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
import {MovieLengthCategory} from '../../../types/MoviesTypes';
import GeolocationService from '../../../services/GeolocationService';
import CinemasService from '../../../services/CinemasService';
import {DatePicker, DatePickerToolbar} from '@mui/x-date-pickers/DatePicker';
import {DateTime} from 'ts-luxon';
import Utils from '../../../helpers/Utils';

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
    setSelectedCinemas([]);
    setSelectedCity(value);
  };

  const citiesRQ = useQuery('cities', () => {
    return GeolocationService.findCitiesForMoviesFilter();
  });

  // cinema select
  const [selectedCinemas, setSelectedCinemas] = useState<string[]>([]);
  const handleCinemasChange = (event: SelectChangeEvent<typeof selectedCinemas>) => {
    const {
      target: {value},
    } = event;
    setSelectedCinemas(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const cinemasRQ = useQuery(['cinemas', selectedCity], () => {
    return CinemasService.findAllByCity(selectedCity);
  });

  // dates
  const [selectedDateFrom, setSelectedDateFrom] = useState<DateTime>(DateTime.now());
  const [selectedDateTo, setSelectedDateTo] = useState<DateTime>(DateTime.now());

  return (
    <Box>
      <PageHeader headerText={'Filteri'} />
      <Box sx={{mt: 5}}>
        <PageSubHeader headerText={`Projekcije`} Icon={PersonalVideoOutlinedIcon} />
        <FormControl fullWidth sx={{mt: 2}}>
          <SelectBoxStyled
            value={selectedCity}
            startAdornment={
              <InputAdornment className={'select-adornment'} position="start">
                Grad
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
        <FormControl fullWidth sx={{mt: 2}}>
          <SelectBoxStyled
            multiple
            value={selectedCinemas}
            startAdornment={
              <InputAdornment className={'select-adornment'} position="start">
                Bioskopi
              </InputAdornment>
            }
            onChange={handleCinemasChange}
            renderValue={(selected) => (
              <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                {selected.map((value) => (
                  <Chip key={value} label={(cinemasRQ.data || []).find((g) => g.id === value)?.name} />
                ))}
              </Box>
            )}
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
        <FormControl fullWidth sx={{mt: 2}}>
          <DatePicker
            format={Utils.luxonDateFormat}
            value={selectedDateFrom}
            slots={{
              toolbar: (params) => {
                return <DatePickerToolbar {...params} hidden={true} />;
              },
              textField: (params) => {
                if (params.InputProps) {
                  params.InputProps.startAdornment = <InputAdornment position="start">Datum Od</InputAdornment>;
                }
                return (
                  <TextFieldStyled
                    {...params}
                    fullWidth
                    placeholder={''}
                    value={selectedDateFrom.toFormat(Utils.luxonDateFormat)}
                  />
                );
              },
            }}
            onAccept={(value) => {
              setSelectedDateFrom(value as DateTime);
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{mt: 2}}>
          <DatePicker
            format={Utils.luxonDateFormat}
            value={selectedDateTo}
            slots={{
              toolbar: (params) => {
                return <DatePickerToolbar {...params} hidden={true} />;
              },
              textField: (params) => {
                if (params.InputProps) {
                  params.InputProps.startAdornment = <InputAdornment position="start">Datum Do</InputAdornment>;
                }
                return (
                  <TextFieldStyled
                    {...params}
                    fullWidth
                    placeholder={''}
                    value={selectedDateTo.toFormat(Utils.luxonDateFormat)}
                  />
                );
              },
            }}
            onAccept={(value) => {
              setSelectedDateTo(value as DateTime);
            }}
          />
        </FormControl>
      </Box>
      <Box sx={{mt: 5}}>
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
          <Autocomplete<Person, true>
            id="choose-actors-filter"
            multiple
            filterOptions={(x) => x}
            filterSelectedOptions
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
        <FormControl fullWidth sx={{mt: 2}}>
          <Autocomplete<Person>
            id="choose-director-filter"
            filterOptions={(x) => x}
            filterSelectedOptions
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
          <SelectBoxStyled
            multiple
            value={movieLengths}
            startAdornment={
              <InputAdornment className={'select-adornment'} position="start">
                Trajanje filma
              </InputAdornment>
            }
            onChange={handleMovieLengthsChange}
            renderValue={(selected) => (
              <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                {selected.map((value) => (
                  <Chip key={value} label={movieLengthsMap[value]} />
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
    </Box>
  );
}

export default MoviesFiltersWrapper;
