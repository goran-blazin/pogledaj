import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useMemo, useState} from 'react';
import {ProjectionsDates, ProjectionsGroupedPerCinemaType} from '../../../types/MoviesTypes';
import MoviesService from '../../../services/MoviesService';
import MovieProjectionsService from '../../../services/MovieProjectionsService';
import MovieSinglePreview from '../EventPreview/EventPreview';
import {DateTime} from 'ts-luxon';
import {Box, Button, FormControl, InputAdornment, MenuItem, SelectChangeEvent, Stack, Typography} from '@mui/material';
import {styled} from '@mui/material';

import MainTitle from '../utility/typography/MainTitle';
import RatingInfo from '../utility/RatingInfo';
import TagsComponent from '../utility/TagsComponent';
import ContentWrapper from '../layout/ContentWrapper';
import {useQuery} from 'react-query';
import React from 'react';
import PageSubHeader from '../utility/PageSubHeader';
import SelectBoxStyled from '../utility/form/SelectBoxStyled';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {LocalActivityOutlined} from '@mui/icons-material';
import _ from 'lodash';
import Utils from '../../../helpers/Utils';
import SmallButton from '../utility/buttons/SmallButton';
import {namedRoutes} from '../../../routes';

const monthsLocalization: Record<number, string> = {
  1: 'JAN',
  2: 'FEB',
  3: 'MAR',
  4: 'APR',
  5: 'MAJ',
  6: 'JUN',
  7: 'JUL',
  8: 'AVG',
  9: 'SEP',
  10: 'OKT',
  11: 'NOV',
  12: 'DEC',
};

const daysLocalization: Record<number, string> = {
  1: 'Pon',
  2: 'Uto',
  3: 'Sre',
  4: 'Čet',
  5: 'Pet',
  6: 'Sub',
  7: 'Ned',
};

const MovieTitleHolder = styled('div')({
  display: 'flex',
  marginBottom: '16px',
  gap: '10px',
  '& .titleWrap': {
    flex: '1 1 auto',
  },
  '& .titleRating': {
    flex: '0 0 auto',
    paddingTop: '4px',
  },
});

const ProjectionsRow = styled(Box)({
  fontSize: '12px',
  fontWeight: '600',
  lineHeight: '16px',
});

const ProjectionsSubHeader = styled(Typography)(({theme}) => ({
  color: theme.customTypography.movieProjectionsSubHeader.color,
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '22px',
}));

// TODO maybe move this in separate component, might be used in other components
const EventInformation = styled('ul')(({theme}) => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  color: theme.colorPalette.darkGrey.color,
  '.event-info-section': {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.colorPalette.lightGrey.color,
    marginBottom: '16px',
    paddingBottom: '16px',
    '.event-info-subtitle': {
      display: 'block',
      fontWeight: 600,
      '&.inline': {
        display: 'inline',
        marginRight: '5px',
      },
    },
    '.event-section-description': {
      margin: 0,
      '&.inline': {
        display: 'inline',
      },
    },
    '.event-info-section-with-icons': {
      display: 'flex',
      alignItems: 'center',
    },
  },
}));

function MovieSingleWrapper() {
  const navigate = useNavigate();
  const {movieId} = useParams();
  // const isReadOnly = true;

  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const movie = movieId
    ? useQuery(['movie.includePersons', movieId], () => MoviesService.findByIdWithPersons(movieId))
    : undefined;

  const movieProjections = movieId
    ? useQuery(['movieProjections.findAllByMovie', movieId], () => MovieProjectionsService.findAllByMovie(movieId))
    : undefined;

  const todayISO = DateTime.local().toISODate();
  const tomorrowISO = DateTime.local().plus({day: 1}).toISODate();

  const projectionsGroupedPerCinema = useMemo(() => {
    if (!movieProjections?.data) {
      return {};
    }

    return movieProjections.data.reduce((carry: ProjectionsGroupedPerCinemaType, mp) => {
      const cinema = mp.cinemaTheater.cinema;

      if (!carry[cinema.id]) {
        carry[cinema.id] = {
          cinema,
          dates: {},
        };
      }

      if (carry[cinema.id]) {
        const cinemaInnerObj = carry[cinema.id];
        const luxonDate = DateTime.fromISO(mp.projectionDateTime);
        const dateString = luxonDate.toFormat('yyyy-MM-dd');
        const dateISO = luxonDate.toISODate();
        if (!cinemaInnerObj.dates[dateString]) {
          cinemaInnerObj.dates[dateString] = {
            weekDay:
              dateISO === todayISO ? 'Danas' : dateISO === tomorrowISO ? 'Sutra' : daysLocalization[luxonDate.weekday],
            day: luxonDate.toFormat('dd'),
            month: monthsLocalization[luxonDate.month],
            date: dateString,
            movieProjections: [],
          };
        }

        cinemaInnerObj.dates[dateString].movieProjections.push(mp);
      }

      return carry;
    }, {});
  }, [movieProjections?.data]);

  useEffect(() => {
    if (selectedCinema === '' && Object.keys(projectionsGroupedPerCinema).length > 0) {
      setSelectedCinema(Object.keys(projectionsGroupedPerCinema)[0]);
    }
  }, [projectionsGroupedPerCinema]);

  const sortDates = (dates: ProjectionsDates) =>
    Object.values(
      _(dates) // sort by date
        .toPairs()
        .sortBy(0)
        .fromPairs()
        .value(),
    );

  useEffect(() => {
    if (selectedCinema !== '') {
      const date = sortDates(projectionsGroupedPerCinema[selectedCinema].dates)[0];
      if (date) {
        setSelectedDate(date.date);
      }
    }
  }, [selectedCinema]);

  const {orderedActors, trailerUrl, posterUrl} = useMemo(() => {
    const movieData = movie?.data;
    if (!movieData) {
      return {
        orderedActors: [],
        trailerUrl: undefined,
        posterUrl: undefined,
      };
    }

    return {
      orderedActors: movieData.actors.sort((a, b) => a.castOrder - b.castOrder),
      trailerUrl: (() => {
        const makeUrl = (key: string) => `https://www.youtube.com/embed/${key}?controls=0`;
        const movieTrailer = movieData.videos.find((video) => video.type === 'Trailer');
        if (movieTrailer) {
          return makeUrl(movieTrailer.key);
        }
        const movieTeaser = movieData.videos.find((video) => video.type === 'Teaser');
        if (movieTeaser) {
          return makeUrl(movieTeaser.key);
        }

        return undefined;
      })(),
      posterUrl: movieData.posterImages.bigPoster,
    };
  }, [movie?.data]);

  return (
    <div className="movie-single-wrapper">
      {movie?.isLoading ? (
        <Typography color={'text.primary'}>Učitava se, molimo sačekajte...</Typography>
      ) : (
        <React.Fragment>
          {movie?.data ? (
            <React.Fragment>
              <MovieSinglePreview>
                {trailerUrl ? (
                  <iframe width="420" height="315" src={trailerUrl}></iframe>
                ) : posterUrl ? (
                  <img src={posterUrl} alt={'POSTER IMAGE'} />
                ) : (
                  <div>NO POSTER IMAGE</div>
                )}
              </MovieSinglePreview>
              <ContentWrapper padding>
                <>
                  <MovieTitleHolder>
                    <div className="titleWrap">
                      <MainTitle title={movie.data.localizedTitle} />
                    </div>
                    <div className="titleRating">
                      <RatingInfo rating={movie.data.rating} />
                    </div>
                  </MovieTitleHolder>
                  <EventInformation>
                    <li className="event-info-section">
                      <TagsComponent genres={movie.data.genres} />
                    </li>
                    <li className="event-info-section">
                      <div className="event-info-section-with-icons">
                        <span>
                          <AccessTimeIcon
                            fontSize={'small'}
                            sx={{
                              display: 'flex',
                              color: (theme) => theme.palette.primary.main,
                              mr: 0.5,
                            }}
                          />
                        </span>
                        <span>
                          {movie.data.runtimeMinutes} min | {DateTime.fromISO(movie.data.releaseDate).toFormat('yyyy')}
                        </span>
                      </div>
                    </li>
                    <li className="event-info-section">
                      <span className="event-info-subtitle">Sinopsis:</span>
                      <p className="event-section-description">{movie.data.localizedPlot}</p>
                    </li>
                    <li className="event-info-section">
                      <span className="event-info-subtitle">Sinopsis u originalu:</span>
                      <p className="event-section-description">{movie.data.plot}</p>
                    </li>
                    <li className="event-info-section">
                      <div>
                        <span className="event-info-subtitle inline">Režiseri:</span>
                        <p className="event-section-description inline">
                          {movie.data.directors.map((director) => director.person.name).join(', ')}
                        </p>
                      </div>
                      {orderedActors.length > 0 && (
                        <div>
                          <span className="event-info-subtitle inline">Glumci:</span>
                          <p className="event-section-description inline">
                            {orderedActors.map((actor) => actor.person.name).join(', ')}
                          </p>
                        </div>
                      )}
                      {/*<div>*/}
                      {/*  <span className="event-info-subtitle inline">Distributer:</span>*/}
                      {/*  <p className="event-section-description inline">*/}
                      {/*    MegaCom Film*/}
                      {/*  </p>*/}
                      {/*</div>*/}
                      <div>
                        <span className="event-info-subtitle inline">Zemlja Porekla:</span>
                        <p className="event-section-description inline">{movie.data.countryOfOrigin.name}</p>
                      </div>
                    </li>
                    {/*<li className="event-info-section">*/}
                    {/*  <div>{'IMDB RATING'}</div>*/}
                    {/*</li>*/}
                  </EventInformation>
                </>
              </ContentWrapper>
              {/*<div>*/}
              {/*  KOMENTARI*/}
              {/*</div>*/}
              <ContentWrapper padding>
                {Object.keys(projectionsGroupedPerCinema).length > 0 ? (
                  <Box>
                    <PageSubHeader
                      headerText={Utils.isBetaMode() ? 'Rezervacija karata:' : 'Datumi projekcija:'}
                      Icon={LocalActivityOutlined}
                      sx={{
                        fontWeight: 700,
                        fontStyle: 'normal',
                        fontSize: '22px',
                        lineHeight: '30px',
                      }}
                    />
                    <FormControl fullWidth sx={{mt: 2}}>
                      <ProjectionsSubHeader>Izaberi bioskop:</ProjectionsSubHeader>
                      <SelectBoxStyled
                        sx={{mt: 1}}
                        value={selectedCinema}
                        startAdornment={
                          <InputAdornment className={'select-adornment'} position="start">
                            Bioskop
                          </InputAdornment>
                        }
                        onChange={(event: SelectChangeEvent) => setSelectedCinema(event.target.value)}
                      >
                        {Object.keys(projectionsGroupedPerCinema).map((cinemaId, i) => {
                          return (
                            <MenuItem key={i} value={cinemaId}>
                              {projectionsGroupedPerCinema[cinemaId].cinema.name}
                            </MenuItem>
                          );
                        })}
                      </SelectBoxStyled>
                    </FormControl>
                    <React.Fragment>
                      {selectedCinema && (
                        <Box sx={{mt: 2}}>
                          <ProjectionsSubHeader>Izaberi datum:</ProjectionsSubHeader>
                          <Stack
                            sx={{
                              mt: 1,
                              overflowX: 'auto',
                            }}
                            direction={'row'}
                            spacing={2}
                          >
                            {sortDates(projectionsGroupedPerCinema[selectedCinema].dates).map((date, index) => (
                              <Button
                                key={index}
                                variant="outlined"
                                onClick={() => setSelectedDate(date.date)}
                                sx={{
                                  borderRadius: '15px', // Rounded border
                                  borderColor: (theme) =>
                                    selectedDate === date.date
                                      ? theme.customButtons.dateButtons.selectedColor
                                      : theme.customButtons.dateButtons.nonSelectedColor, // Border color
                                  borderWidth: '2px', // Border width
                                  '&.MuiButtonBase-root:hover': {
                                    borderWidth: '2px',
                                  },
                                  textTransform: 'none', // Prevent uppercase transformation
                                  backgroundColor: 'transparent', // Transparent background
                                  width: '66px', // Fit to content size
                                  height: '66px', // Fit to content size
                                }}
                              >
                                <Stack spacing={0}>
                                  <Box
                                    component="span"
                                    sx={{
                                      fontSize: '1em',
                                      fontWeight: 600,
                                      color: (theme) =>
                                        selectedDate === date.date
                                          ? theme.customButtons.dateButtons.selectedColor
                                          : theme.customButtons.dateButtons.nonSelectedColor,
                                    }}
                                  >
                                    {date.weekDay}
                                  </Box>
                                  <Box
                                    component="span"
                                    sx={{
                                      mt: 1,
                                      lineHeight: 0,
                                      fontSize: '0.6em',
                                      fontWeight: 600,
                                      color: (theme) =>
                                        selectedDate === date.date
                                          ? theme.customButtons.dateButtons.selectedColor
                                          : theme.customButtons.dateButtons.nonSelectedColor,
                                    }}
                                  >
                                    {date.month}
                                  </Box>
                                  <Box
                                    component="span"
                                    sx={{
                                      fontSize: '1.2em',
                                      fontWeight: 600,
                                      color: (theme) =>
                                        selectedDate === date.date
                                          ? theme.customButtons.dateButtons.selectedColor
                                          : theme.customButtons.dateButtons.nonSelectedColor,
                                    }}
                                  >
                                    {date.day}
                                  </Box>
                                </Stack>
                              </Button>
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </React.Fragment>
                    <React.Fragment>
                      {selectedDate && projectionsGroupedPerCinema[selectedCinema].dates[selectedDate] && (
                        <Box sx={{mt: 2}}>
                          <ProjectionsSubHeader
                            sx={(theme) => ({
                              borderBottomWidth: '1px',
                              borderBottomStyle: 'solid',
                              borderBottomColor: theme.colorPalette.lightGrey.color,
                              marginBottom: '16px',
                              paddingBottom: '16px',
                            })}
                          >
                            Izaberi projekciju:
                          </ProjectionsSubHeader>
                          {projectionsGroupedPerCinema[selectedCinema].dates[selectedDate].movieProjections.length >
                          0 ? (
                            <>
                              {projectionsGroupedPerCinema[selectedCinema].dates[selectedDate].movieProjections.map(
                                (mp, i) => {
                                  return (
                                    <Stack
                                      direction="row"
                                      justifyContent="space-between"
                                      alignItems="center"
                                      key={mp.id + i}
                                      sx={(theme) => ({
                                        borderBottomWidth: '1px',
                                        borderBottomStyle: 'solid',
                                        borderBottomColor: theme.colorPalette.lightGrey.color,
                                        marginBottom: '16px',
                                        paddingBottom: '16px',
                                      })}
                                    >
                                      <ProjectionsRow>
                                        <Box component={'span'} sx={{color: 'primary.main'}}>
                                          Vreme:
                                        </Box>
                                        &nbsp;
                                        {DateTime.fromISO(mp.projectionDateTime).toFormat('HH:mm')}
                                      </ProjectionsRow>
                                      <ProjectionsRow>
                                        <Box component={'span'} sx={{color: 'primary.main'}}>
                                          Sala:
                                        </Box>
                                        &nbsp;
                                        {mp.cinemaTheater.name}
                                      </ProjectionsRow>
                                      <ProjectionsRow>
                                        <Box component={'span'} sx={{color: 'primary.main'}}>
                                          Jezik:
                                        </Box>
                                        &nbsp;
                                        {mp.dubbedLanguage ? 'SINH' : 'ORIG'}
                                      </ProjectionsRow>
                                      {Utils.isBetaMode() && (
                                        <ProjectionsRow>
                                          <SmallButton
                                            variant="contained"
                                            onClick={() => {
                                              navigate(
                                                namedRoutes.movieProjectionSingle.replace(':movieProjectionId', mp.id),
                                              );
                                            }}
                                          >
                                            Rezerviši
                                          </SmallButton>
                                        </ProjectionsRow>
                                      )}
                                    </Stack>
                                  );
                                },
                              )}
                            </>
                          ) : (
                            <Typography>Projekcije nisu pronadjene</Typography>
                          )}
                        </Box>
                      )}
                    </React.Fragment>
                  </Box>
                ) : (
                  <PageSubHeader headerText={'Projekcije nisu pronadjene'} />
                )}
              </ContentWrapper>
            </React.Fragment>
          ) : (
            <PageSubHeader headerText={'Film nije pronadjen'} />
          )}
        </React.Fragment>
      )}
    </div>
  );
}
export default MovieSingleWrapper;
