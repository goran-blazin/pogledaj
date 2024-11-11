import {Cinema} from '../../../../types/CinemaTypes';
import BigCard from './BigCard';
import {namedRoutes} from '../../../../routes';

function CinemaBigCard({cinema}: {cinema: Cinema}) {
  return (
    <BigCard
      title={cinema.name}
      imageSrc={cinema.posterImages[0]}
      defaultImageSrc={'cinema-big-card-placeholder.png'}
      descFirstRow={cinema.address}
      descSecondRow={`${cinema.city.postalCode} ${cinema.city.name}`}
      rating={cinema.rating}
      anchorUrl={namedRoutes.cinemaSingle.replace(':cinemaId', cinema.id)}
    />
  );
}

export default CinemaBigCard;
