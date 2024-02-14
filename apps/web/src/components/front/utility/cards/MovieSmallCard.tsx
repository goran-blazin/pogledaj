import SmallCard from './SmallCard';
import {Movie} from '../../../../types/MoviesTypes';
import {useNavigate} from 'react-router-dom';
import {namedRoutes} from '../../../../routes';

function MovieSmallCard({movie}: {movie: Movie}) {
  const navigate = useNavigate();

  return (
    <SmallCard
      title={movie.localizedTitle || movie.originalTitle}
      imageSrc={movie.posterImages.smallPoster}
      defaultImageSrc={'movie-small-card-placeholder.png'}
      onClick={() => {
        navigate(namedRoutes.movieSingle.replace(':movieId', movie.id));
      }}
    />
  );
}

export default MovieSmallCard;
