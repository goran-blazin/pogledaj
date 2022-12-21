import BigCard from './BigCard';
import {Movie} from '../../../../types/MoviesTypes';
import {useNavigate} from 'react-router-dom';
import namedRoutes from '../../../../routes';

function MovieBigCard({movie}: {movie: Movie}) {
  const navigate = useNavigate();

  return (
    <BigCard
      title={movie.localizedName}
      imageSrc={movie.posterImages[0]}
      defaultImageSrc={'movie-big-card-placeholder.png'}
      descFirstRow={'Žanr: ' + movie.genres.map((genre) => genre.localizedName).join(', ')}
      descSecondRow={'Trajanje: ' + movie.runtimeMinutes.toString() + ' min'}
      rating={movie.rating}
      onClick={() => {
        navigate(namedRoutes.movieSingle.replace(':movieId', movie.id));
      }}
    />
  );
}

export default MovieBigCard;
