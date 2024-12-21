import BigCard from './BigCard';
import {Movie} from '../../../../types/MoviesTypes';
import {namedRoutes} from '../../../../routes';
import Utils from '../../../../helpers/Utils';

function MovieBigCard({movie}: {movie: Movie}) {
  return (
    <BigCard
      title={movie.localizedTitle || Utils.getMovieTitle(movie)}
      imageSrc={movie.posterImages.bigPoster}
      defaultImageSrc={'movie-big-card-placeholder.png'}
      descFirstRow={'Žanr: ' + movie.genres.map((genre) => genre.localizedName).join(', ')}
      descSecondRow={'Trajanje: ' + movie.runtimeMinutes.toString() + ' min'}
      rating={movie.rating}
      anchorUrl={namedRoutes.movieSingle.replace(':movieId', movie.id)}
    />
  );
}

export default MovieBigCard;
