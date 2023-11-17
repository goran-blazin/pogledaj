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
  // consult about margin bottom and gap
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
                <TagsComponent genres={movie.data.genres} />
                <ul>
                  <li>
                    <span>{movie.data.runtimeMinutes}min</span>{' '}
                    <span>{DateTime.fromISO(movie.data.releaseDate).toFormat('yyyy LLL dd')}</span>
                  </li>
                  <li>
                    <strong>Sinopsis:</strong> {movie.data.localizedPlot}
                  </li>
                  <li>
                    <strong>Sinopsis u originalu:</strong> {movie.data.plot}
                  </li>
                  <li>
                    <p>
                      <strong>Reziseri:</strong>{' '}
                      <span>{movie.data.directors.map((director) => director.person.name).join(', ')}</span>
                    </p>
                    {orderedActors.length > 0 && (
                      <p>
                        <strong>Glumci:</strong>{' '}
                        <span>{orderedActors.map((actor) => actor.person.name).join(', ')}</span>
                      </p>
                    )}
                    <p>
                      <strong>Producenti:</strong>{' '}
                      <span>{movie.data.producers.map((producer) => producer.person.name).join(', ')}</span>
                    </p>
                    <p>
                      <strong>Distributer:</strong> <span>MegaCom Film</span>
                    </p>
                    <p>
                      <strong>Zemlja Porekla:</strong> <span>{movie.data.countryOfOrigin.name}</span>
                    </p>
                  </li>
                </ul>
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
