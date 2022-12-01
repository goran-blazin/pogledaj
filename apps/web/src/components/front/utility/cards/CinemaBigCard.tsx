import {Cinema} from '../../../../types/CinemaTypes';
import BigCard from './BigCard';
import namedRoutes from '../../../../routes';
import {useNavigate} from 'react-router-dom';

function CinemaBigCard({cinema}: {cinema: Cinema}) {
  const navigate = useNavigate();

  return (
    <BigCard
      title={cinema.name}
      imageSrc={cinema.cinemaPosterImageFilename}
      defaultImageSrc={'cinema-big-card-placeholder.png'}
      descFirstRow={cinema.address}
      descSecondRow={`${cinema.city.postalCode} ${cinema.city.name}`}
      rating={cinema.rating}
      onClick={() => {
        navigate(namedRoutes.cinemaSingle.replace(':cinemaId', cinema.id));
      }}
    />
  );
}

export default CinemaBigCard;
