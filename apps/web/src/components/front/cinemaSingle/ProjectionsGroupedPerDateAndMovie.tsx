import {ProjectionsGroupedPerMoviesType} from '../../../types/MoviesTypes';
import {Link} from 'react-router-dom';
import Utils from '../../../helpers/Utils';

function ProjectionsGroupedPerDateAndMovie({
  groupedMovieProjections,
  date,
}: {
  groupedMovieProjections: ProjectionsGroupedPerMoviesType;
  date: string;
}) {
  return (
    <div>
      <h2>Filmovi za {date}:</h2>
      {Object.keys(groupedMovieProjections).map((movieId) => {
        const movie = groupedMovieProjections[movieId].movie;
        const movieProjections = groupedMovieProjections[movieId].movieProjections;
        return (
          <div key={movieId}>
            <h5>{movie.localizedTitle || Utils.getMovieTitle(movie)}:</h5>
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

export default ProjectionsGroupedPerDateAndMovie;
