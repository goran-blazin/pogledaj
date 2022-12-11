import {useParams, useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Movie, ProjectionsGroupedPerDateAndCinemaType} from '../../../types/MoviesTypes';
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
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [projectionsGroupedPerDateAndCinema, setProjectionsGroupedPerDateAndCinema] = useState<
    ProjectionsGroupedPerDateAndCinemaType | undefined
  >(undefined);
  const selectedDate = searchParams.get('selectedDate');

  useEffect(() => {
    if (movieId !== undefined) {
      Promise.all([MoviesService.findById(movieId), MovieProjectionsService.findAllByMovie(movieId)])
        .then(([movie, movieProjections]) => {
          setMovie(movie);
          if (movie) {
            setProjectionsGroupedPerDateAndCinema(
              movieProjections.reduce((carry: ProjectionsGroupedPerDateAndCinemaType, mp) => {
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
              }, {}),
            );
          }
        })
        .finally(() => {
          setLoadingData(false);
        });
    }
  }, []);

  const mainActors = (movie ? movie.actors : []).filter((actor) => actor.role === 'Main');
  // const supportingActors = (movie ? movie.actors : []).filter((actor) => actor.role === 'Supporting');

  return (
    <div className="movie-single-wrapper">
      {loadingData ? (
        <Typography color={'text.primary'}>Učitava se, molimo sačekajte...</Typography>
      ) : (
        <>
          {movie !== undefined ? (
            <>
              <MovieSinglePreview>
                <iframe width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=0"></iframe>
              </MovieSinglePreview>
              <div>
                <MovieTitleHolder>
                  <div className="titleWrap">
                    <MainTitle title={movie.localizedName} />
                  </div>
                  <div className="titleRating">
                    <RatingInfo rating={movie.rating} />
                  </div>
                </MovieTitleHolder>
                <TagsComponent genres={movie.genres} />
                <ul>
                  <li>
                    <span>{movie.runtimeMinutes}min</span>{' '}
                    <span>{DateTime.fromISO(movie.releaseDate).toFormat('yyyy LLL dd')}</span>
                  </li>
                  <li>
                    <strong>sinopsis:</strong> {movie.plot}
                  </li>
                  <li>
                    <p>
                      <strong>Reziser</strong> <span>{PersonHelper.concatName(movie.director.person)}</span>
                    </p>
                    <p>
                      <strong>Glumci</strong>{' '}
                      <span>{mainActors.map((actor) => PersonHelper.concatName(actor.person)).join(', ')}</span>
                    </p>
                    <p>
                      <strong>Distributer</strong> <span>MegaCom Film</span>
                    </p>
                    <p>
                      <strong>Zemlja Porekla</strong> <span>movie.countryOfOrigin.name</span>
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                {projectionsGroupedPerDateAndCinema !== undefined &&
                Object.keys(projectionsGroupedPerDateAndCinema).length > 0 ? (
                  <div>
                    <h2>Projekcije:</h2>
                    <div>
                      {Object.keys(projectionsGroupedPerDateAndCinema).map((date) => {
                        return (
                          <span key={date}>
                            <Link to={`/movies/${movie.id}?selectedDate=${date}`}>
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
            </>
          ) : (
            <h2>Film nije pronadjen</h2>
          )}
        </>
      )}
    </div>
  );
}

export default MovieSingleWrapper;
