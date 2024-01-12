import {useMemo} from 'react';
import CinemasService from '../../../services/CinemasService';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import MovieProjectionsService from '../../../services/MovieProjectionsService';
import {ProjectionsGroupedPerDateAndMovieType} from '../../../types/MoviesTypes';
import {DateTime} from 'ts-luxon';
import ProjectionsGroupedPerDateAndMovie from './ProjectionsGroupedPerDateAndMovie';
import {Typography} from '@mui/material';
import {useQuery} from 'react-query';
import CinemaSinglePreview from '../EventPreview/EventPreview';
import MainTitle from '../utility/typography/MainTitle';
import RatingInfo from '../utility/RatingInfo';
import LinkComponent from '../utility/typography/Link';

import {styled} from '@mui/material';

const CinemaTitleHolder = styled('div')({
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

function CinemaSingleWrapper() {
  const [searchParams] = useSearchParams();
  const {cinemaId} = useParams();
  const selectedDate = searchParams.get('selectedDate');

  const cinema = cinemaId ? useQuery(['cinema', cinemaId], () => CinemasService.findById(cinemaId)) : undefined;
  const movieProjections = cinemaId
    ? useQuery(['movieProjections.findAllByCinema', cinemaId], () => MovieProjectionsService.findAllByCinema(cinemaId))
    : undefined;

  const projectionsGroupedPerDateAndMovie: ProjectionsGroupedPerDateAndMovieType = useMemo(() => {
    if (!movieProjections?.data) {
      return {};
    }

    return movieProjections.data.reduce((carry: ProjectionsGroupedPerDateAndMovieType, mp) => {
      // first try to find existing date
      const dateString = DateTime.fromISO(mp.projectionDateTime).toFormat('yyyy-MM-dd');
      const movie = mp.movie;
      const timeObject = {
        movieProjectionId: mp.id,
        time: DateTime.fromISO(mp.projectionDateTime).toFormat('HH:mm'),
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
          formattedDate: DateTime.fromISO(mp.projectionDateTime).toFormat('LLL dd'),
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
              <CinemaSinglePreview>
                {/* TODO add cinema image */}
                <img src={'/iron-man.png'} alt={'POSTER IMAGE'} />
              </CinemaSinglePreview>
              <CinemaTitleHolder>
                <div className="titleWrap">
                  <MainTitle title={cinema.data.name} />
                </div>
                <div className="titleRating">
                  <RatingInfo rating={cinema.data.rating} />
                </div>
              </CinemaTitleHolder>
              <EventInformation>
                <li className="event-info-section">
                  <div>
                    <span className="event-info-subtitle inline">Adresa:</span>
                    <p className="event-section-description inline">
                      {`${cinema.data.address}, ${cinema.data.city.postalCode} ${cinema.data.city.name}`}
                    </p>
                    {/* TODO cinema website */}
                    <p>
                      <LinkComponent text={'www.arenacineplex.com'} link={'www.arenacineplex.com'} />
                    </p>
                  </div>
                </li>
              </EventInformation>
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
