import {ProjectionsGroupedPerCinemaType} from '../../../types/MoviesTypes';
import {Link} from 'react-router-dom';

function ProjectionsGroupedPerDateAndCinema({
  groupedMovieProjections,
}: {
  groupedMovieProjections: ProjectionsGroupedPerCinemaType;
}) {
  return (
    <div>
      <h2>Bioskopi:</h2>
      {Object.keys(groupedMovieProjections).map((cinemaId) => {
        const cinema = groupedMovieProjections[cinemaId].cinema;
        const movieProjections = groupedMovieProjections[cinemaId].movieProjections;
        return (
          <div key={cinemaId}>
            <h5>{cinema.name}:</h5>
            <div>
              {movieProjections.map((mp) => {
                return (
                  <span key={mp.movieProjectionId}>
                    <Link to={`/movie-projections/${mp.movieProjectionId}`}>{mp.time}</Link>
                    &nbsp;
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectionsGroupedPerDateAndCinema;
