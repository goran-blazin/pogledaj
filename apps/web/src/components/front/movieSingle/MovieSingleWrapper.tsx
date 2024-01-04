import {useNavigate, useParams} from 'react-router-dom';
import {useMemo, useState} from 'react';
import {ProjectionsGroupedPerCinemaType} from '../../../types/MoviesTypes';
import MoviesService from '../../../services/MoviesService';
import MovieProjectionsService from '../../../services/MovieProjectionsService';
import MovieSinglePreview from '../EventPreview/EventPreview';
import {DateTime} from 'ts-luxon';
import {Box, FormControl, InputAdornment, MenuItem, SelectChangeEvent, Typography} from '@mui/material';
import {styled} from '@mui/material';

import MainTitle from '../utility/typography/MainTitle';
import RatingInfo from '../utility/RatingInfo';
import TagsComponent from '../utility/TagsComponent';
import {useQuery} from 'react-query';
import React from 'react';
import PageSubHeader from '../utility/PageSubHeader';
import SelectBoxStyled from '../utility/form/SelectBoxStyled';
import ButtonStyled from '../utility/buttons/Button';
import {namedRoutes} from '../../../routes';

const movieProjectionDateTimeFormat = 'dd.MM.yyyy / HH:mm';

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
      fontWeight: 'bold',
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
  },
}));

function MovieSingleWrapper() {
  const navigate = useNavigate();
  const {movieId} = useParams();

  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedMovieProjection, setSelectedMovieProjection] = useState('');

  const movie = movieId
    ? useQuery(['movie.includePersons', movieId], () => MoviesService.findByIdWithPersons(movieId))
    : undefined;

  const movieProjections = movieId
    ? useQuery(['movieProjections.findAllByMovie', movieId], () => MovieProjectionsService.findAllByMovie(movieId))
    : undefined;

  const projectionsGroupedPerCinema = useMemo(() => {
    if (!movieProjections?.data) {
      return {};
    }

    return movieProjections.data.reduce((carry: ProjectionsGroupedPerCinemaType, mp) => {
      const cinema = mp.cinemaTheater.cinema;

      if (!carry[cinema.id]) {
        carry[cinema.id] = {
          cinema,
          movieProjections: [],
        };
      }

      if (carry[cinema.id]) {
        carry[cinema.id].movieProjections.push(mp);
      }

      return carry;
    }, {});
  }, [movieProjections?.data]);

  const {orderedActors} = useMemo(() => {
    if (!movie?.data) {
      return {
        orderedActors: [],
      };
    }

    return {
      orderedActors: movie.data.actors.sort((a, b) => a.castOrder - b.castOrder),
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
                <iframe width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=0"></iframe>
              </MovieSinglePreview>
              <div>
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
                    {/* TODO missing clock icon - style this */}
                    <span>{movie.data.runtimeMinutes} min</span>
                    {' | '}
                    <span>{DateTime.fromISO(movie.data.releaseDate).toFormat('yyyy')}</span>
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
                      <span className="event-info-subtitle inline">Reziseri:</span>
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
                    <div>
                      <span className="event-info-subtitle inline">Distributer:</span>
                      <p className="event-section-description inline">
                        {/* TODO missing distributor in API */}
                        MegaCom Film
                      </p>
                    </div>
                    <div>
                      <span className="event-info-subtitle inline">Zemlja Porekla:</span>
                      <p className="event-section-description inline">{movie.data.countryOfOrigin.name}</p>
                    </div>
                  </li>
                  <li className="event-info-section">
                    {/* TODO - missing rating in API */}
                    <div>{'IMDB RATING'}</div>
                  </li>
                </EventInformation>
              </div>
              <div>
                {/* TODO missing in API */}
                KOMENTARI
              </div>
              <div>
                {Object.keys(projectionsGroupedPerCinema).length > 0 ? (
                  <Box>
                    <PageSubHeader headerText={'Rezervacija karata:'} />
                    <FormControl fullWidth sx={{mt: 2}}>
                      <SelectBoxStyled
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
                    <FormControl fullWidth sx={{mt: 2}}>
                      <SelectBoxStyled
                        value={selectedMovieProjection}
                        startAdornment={
                          <InputAdornment className={'select-adornment'} position="start">
                            Termin
                          </InputAdornment>
                        }
                        onChange={(event: SelectChangeEvent) => setSelectedMovieProjection(event.target.value)}
                      >
                        {selectedCinema &&
                          projectionsGroupedPerCinema[selectedCinema].movieProjections.map((mp, i) => {
                            return (
                              <MenuItem key={i} value={mp.id}>
                                {DateTime.fromISO(mp.projectionDateTime).toFormat(movieProjectionDateTimeFormat)} (
                                {mp.cinemaTheater.name})
                              </MenuItem>
                            );
                          })}
                      </SelectBoxStyled>
                    </FormControl>
                    <Box sx={{mt: 2}}>
                      <ButtonStyled
                        onClick={() => {
                          if (selectedMovieProjection) {
                            navigate(
                              namedRoutes.movieProjectionSingle.replace(':movieProjectionId', selectedMovieProjection),
                            );
                          } else {
                            alert('Izaberite termin');
                          }
                        }}
                      >
                        Rezerviši karte
                      </ButtonStyled>
                    </Box>
                  </Box>
                ) : (
                  <PageSubHeader headerText={'Projekcije nisu pronadjene'} />
                )}
              </div>
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
