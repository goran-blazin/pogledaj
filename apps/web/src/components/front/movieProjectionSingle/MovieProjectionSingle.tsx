import {useParams} from 'react-router-dom';

function MovieProjectionSingle() {
  const {movieProjectionId} = useParams();

  return <div>TEST {movieProjectionId}</div>;
}

export default MovieProjectionSingle;
