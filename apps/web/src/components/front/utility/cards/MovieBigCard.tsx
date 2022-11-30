import BigCard from './BigCard';
import {Movie} from '../../../../types/MoviesTypes';

function MovieBigCard({movie}: {movie: Movie}) {
  return (
    <BigCard
      title={movie.localizedName}
      imageSrc={movie.moviePosterImageFilename}
      defaultImageSrc={'movie-big-card-placeholder.png'}
      descFirstRow={'Žanr: ' + movie.genres.map((genre) => genre.localizedName).join(', ')}
      descSecondRow={'Trajanje: ' + movie.runtimeMinutes.toString() + ' min'}
      rating={movie.rating}
    />
  );
}

export default MovieBigCard;
