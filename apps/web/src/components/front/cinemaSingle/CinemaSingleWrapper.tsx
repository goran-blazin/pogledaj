import {useMemo} from 'react';
import CinemasService from '../../../services/CinemasService';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import MovieProjectionsService from '../../../services/MovieProjectionsService';
import {ProjectionsGroupedPerDateAndMovieType} from '../../../types/MoviesTypes';
import {DateTime} from 'ts-luxon';
import ProjectionsGroupedPerDateAndMovie from './ProjectionsGroupedPerDateAndMovie';
import {Typography} from '@mui/material';
import {useQuery} from 'react-query';

function CinemaSingleWrapper() {
  const [searchParams] = useSearchParams();
  const {cinemaId} = useParams();
  const selectedDate = searchParams.get('selectedDate');

  const cinema = cinemaId ? useQuery(['cinema', cinemaId], () => CinemasService.findById(cinemaId)) : undefined;
  const movieProjections = cinemaId
    ? useQuery(['movieProjections', cinemaId], () => MovieProjectionsService.findAllByCinema(cinemaId))
    : undefined;

  const projectionsGroupedPerDateAndMovie: ProjectionsGroupedPerDateAndMovieType = useMemo(() => {
    if (!movieProjections?.data) {
      return {};
    }

    return movieProjections.data.reduce((carry: ProjectionsGroupedPerDateAndMovieType, mp) => {
      // first try to find existing date
      const dateString = DateTime.fromISO(mp.dateTime).toFormat('yyyy-MM-dd');
      const movie = mp.movie;
      const timeObject = {
        movieProjectionId: mp.id,
        time: DateTime.fromISO(mp.dateTime).toFormat('HH:mm'),
      };

      if (carry[dateString]) {
        if (carry[dateString].groupedByMovies[movie.id]) {
          // both date and cinema objects exist
          carry[dateString].groupedByMovies[movie.id].movieProjections.push(timeObject);
        } else {
          // date cinema objects exists but not cinema
          carry[dateString].groupedByMovies[movie.id] = {
            movie,
            movieProjections: [timeObject],
          };
        }
      } else {
        carry[dateString] = {
          groupedByMovies: {
            [movie.id]: {
              movie,
              movieProjections: [timeObject],
            },
          },
          formattedDate: DateTime.fromISO(mp.dateTime).toFormat('LLL dd'),
        };
      }

      return carry;
    }, {});
  }, [movieProjections?.data]);

  return (
    <div>
      {cinema?.isLoading || movieProjections?.isLoading ? (
        <Typography color={'text.primary'}>Učitava se, molimo sačekajte...</Typography>
      ) : (
        <div>
          {cinema?.data ? (
            <div>
              <div>
                <p>Ime: {cinema.data.name}</p>
                <p>Opis: {cinema.data.description}</p>
                <p>Grad: {cinema.data.city.name}</p>
                <p>Adresa: {cinema.data.address}</p>
                <p>
                  Telefon:{' '}
                  {cinema.data.phone.length ? cinema.data.phone.join(', ') : <template>Nema telefona</template>}
                </p>
              </div>
              <div>
                {Object.keys(projectionsGroupedPerDateAndMovie).length > 0 ? (
                  <div>
                    <h2>Projekcije:</h2>
                    <div>
                      {Object.keys(projectionsGroupedPerDateAndMovie).map((date) => {
                        return (
                          <span key={date}>
                            <Link to={`/cinemas/${cinema?.data?.id}?selectedDate=${date}`}>
                              {projectionsGroupedPerDateAndMovie[date].formattedDate}
                            </Link>
                            &nbsp;
                          </span>
                        );
                      })}
                    </div>
                    {selectedDate && (
                      <div>
                        <ProjectionsGroupedPerDateAndMovie
                          groupedMovieProjections={projectionsGroupedPerDateAndMovie[selectedDate].groupedByMovies}
                          date={projectionsGroupedPerDateAndMovie[selectedDate].formattedDate}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <h2>Projekcije nisu pronadjene</h2>
                )}
              </div>
            </div>
          ) : (
            <h2>Bioskop nije pronadjen</h2>
          )}
        </div>
      )}
    </div>
  );
}

export default CinemaSingleWrapper;
