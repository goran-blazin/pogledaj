import {useParams, useSearchParams} from 'react-router-dom';
import {useMemo} from 'react';
import {ProjectionsGroupedPerDateAndCinemaType} from '../../../types/MoviesTypes';
import PersonHelper from '../../../helpers/PersonHelper';
import MoviesService from '../../../services/MoviesService';
import MovieProjectionsService from '../../../services/MovieProjectionsService';
import {Link} from 'react-router-dom';
import ProjectionsGroupedPerDateAndCinema from './ProjectionsGroupedPerDateAndCinema';
import MovieSinglePreview from '../EventPreview/EventPreview';
import {DateTime} from 'ts-luxon';
import {Typography} from '@mui/material';
import {styled} from '@mui/material';

import MainTitle from '../utility/typography/MainTitle';
import RatingInfo from '../utility/RatingInfo';
import TagsComponent from '../utility/TagsComponent';
import {useQuery} from 'react-query';
import React from 'react';

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
  const [searchParams] = useSearchParams();
  const {movieId} = useParams();

  const selectedDate = searchParams.get('selectedDate');
  const movie = movieId ? useQuery(['movie', movieId], () => MoviesService.findById(movieId)) : undefined;
  const movieProjections = movieId
    ? useQuery(['movieProjections', movieId], () => MovieProjectionsService.findAllByMovie(movieId))
    : undefined;

  const projectionsGroupedPerDateAndCinema = useMemo(() => {
    if (!movieProjections?.data) {
      return {};
    }

    return movieProjections.data.reduce((carry: ProjectionsGroupedPerDateAndCinemaType, mp) => {
      // first try to find existing date
      const dateString = DateTime.fromISO(mp.dateTime).toFormat('yyyy-MM-dd');
      const cinema = mp.cinemaTheater.cinema;
      const timeObject = {
        movieProjectionId: mp.id,
        time: DateTime.fromISO(mp.dateTime).toFormat('HH:mm'),
      };

      if (carry[dateString]) {
        if (carry[dateString].groupedByCinemas[cinema.id]) {
          // both date and cinema objects exist
          carry[dateString].groupedByCinemas[cinema.id].movieProjections.push(timeObject);
        } else {
          // date cinema objects exists but not cinema
          carry[dateString].groupedByCinemas[cinema.id] = {
            cinema,
            movieProjections: [timeObject],
          };
        }
      } else {
        // create whole new date object
        carry[dateString] = {
          groupedByCinemas: {
            [cinema.id]: {
              cinema,
              movieProjections: [timeObject],
            },
          },
          formattedDate: DateTime.fromISO(mp.dateTime).toFormat('LLL dd'),
        };
      }

      return carry;
    }, {});
  }, [movieProjections?.data]);

  const {mainActors, supportingActors} = useMemo(() => {
    if (!movie?.data) {
      return {
        mainActors: [],
        supportingActors: [],
      };
    }

    return {
      mainActors: movie.data.actors.filter((a) => a.role === 'Main'),
      supportingActors: movie.data.actors.filter((a) => a.role === 'Supporting'),
    };
  }, [movie?.data]);

  return (
    <div className="movie-single-wrapper">
      {movie?.isLoading ? (
        <Typography color={'text.primary'}>Učitava se, molimo sačekajte...</Typography>
      ) : (
        <>
          {movie?.data ? (
            <React.Fragment>
              <MovieSinglePreview>
                <iframe width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=0"></iframe>
              </MovieSinglePreview>
              <div>
                <MovieTitleHolder>
                  <div className="titleWrap">
                    <MainTitle title={movie.data.localizedName} />
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
                    <strong>sinopsis:</strong> {movie.data.plot}
                  </li>
                  <li>
                    <p>
                      <strong>Reziser</strong> <span>{PersonHelper.concatName(movie.data.directors[0].person)}</span>
                    </p>
                    {mainActors.length > 0 && (
                      <p>
                        <strong>Glavni Glumci</strong>{' '}
                        <span>{mainActors.map((actor) => PersonHelper.concatName(actor.person)).join(', ')}</span>
                      </p>
                    )}
                    {supportingActors.length > 0 && (
                      <p>
                        <strong>Sporedni Glumci</strong>{' '}
                        <span>{supportingActors.map((actor) => PersonHelper.concatName(actor.person)).join(', ')}</span>
                      </p>
                    )}
                    <p>
                      <strong>Distributer</strong> <span>MegaCom Film</span>
                    </p>
                    <p>
                      <strong>Zemlja Porekla</strong> <span>{movie.data.countryOfOrigin.name}</span>
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                {Object.keys(projectionsGroupedPerDateAndCinema).length > 0 ? (
                  <div>
                    <h2>Projekcije:</h2>
                    <div>
                      {Object.keys(projectionsGroupedPerDateAndCinema).map((date) => {
                        return (
                          <span key={date}>
                            <Link to={`/movies/${movie?.data?.id}?selectedDate=${date}`}>
                              {projectionsGroupedPerDateAndCinema[date].formattedDate}
                            </Link>
                            &nbsp;
                          </span>
                        );
                      })}
                    </div>
                    {selectedDate && (
                      <div>
                        <ProjectionsGroupedPerDateAndCinema
                          groupedMovieProjections={projectionsGroupedPerDateAndCinema[selectedDate].groupedByCinemas}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <h2>Projekcije nisu pronadjene</h2>
                )}
              </div>
            </React.Fragment>
          ) : (
            <h2>Film nije pronadjen</h2>
          )}
        </>
      )}
    </div>
  );
}

export default MovieSingleWrapper;
