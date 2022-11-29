import BigCard from '../utility/cards/BigCard';
import {Movie} from '../../../types/MoviesTypes';
import ImageHelper from '../../../helpers/ImageHelper';

function MovieBigCard({movie}: {movie: Movie}) {
  return (
    <BigCard
      title={movie.localizedName}
      imageSrc={
        movie.moviePosterImageFilename
          ? ImageHelper.getDynamicImagePath({
              imageFileName: movie.moviePosterImageFilename,
            })
          : ImageHelper.getPlaceholderImagePath({
              imageFileName: 'movie-big-card-placeholder.png',
            })
      }
      descFirstRow={'Žanr: ' + movie.genres.map((genre) => genre.localizedName).join(', ')}
      descSecondRow={'Trajanje: ' + movie.runtimeMinutes.toString() + ' min'}
      rating={movie.rating}
    />
  );
}

export default MovieBigCard;
