import {useState} from 'react';
// libs
import {Box} from '@mui/material';
import {styled} from '@mui/material';
import {DateTime} from 'ts-luxon';

// import {useNavigate, useParams} from 'react-router-dom';
// import {namedRoutes} from '../../../../routes';

// components
import ButtonStyled from '../../utility/buttons/Button';

// types
import {MovieProjection, MovieProjectionOptions} from '../../../../types/MoviesTypes';

export type ProjectionTypes = {
  projection: MovieProjection;
};

const CardWrap = styled(Box)(({theme}) => ({
  backgroundColor: theme.customForm.inputField.color,
  borderRadius: '25px',
  padding: '20px',
  marginBottom: '20px',
}));

const BoxFlex = styled(Box)(() => ({
  display: 'flex',
  gap: '20px',
  '& div': {
    flex: 1,
  },
}));

const Info = styled(Box)(({theme}) => ({
  color: theme.customTypography.color,
  fontWeight: 500,
  marginBottom: '10px',
  '&:last-child': {
    marginBottom: 0,
  },
  '& span': {
    color: theme.colorPalette.lightBlue.color,
  },
}));

const CardActionsWrap = styled(Box)(() => ({
  display: 'flex',
  gap: '20px',
  marginTop: '20px',
}));

function ProjectionCard({projection}: ProjectionTypes) {
  // const navigate = useNavigate();

  const [currentPreview, setCurrentPreview] = useState('both');

  const handleBtnClick = () => {};

  const handleShufflePreview = () => {
    const previews = ['reserve', 'buy', 'both', 'none'];

    const current = previews.indexOf(currentPreview);

    const getNext = current >= previews.length - 1 ? 0 : current + 1;

    setCurrentPreview(previews[getNext]);
  };

  const handleMovieTechnology = (options: MovieProjectionOptions) => {
    // TODO handle all possible options
    if (options.is3D) {
      return '3D';
    } else {
      return '2D';
    }
  };

  const handleActionButton = (type?: string) => {
    const reserveTickets = (
      <CardActionsWrap>
        <ButtonStyled sx={{flex: 1, height: '36px'}} variant="contained" onClick={handleBtnClick}>
          {'Rezerviši'}
        </ButtonStyled>
      </CardActionsWrap>
    );

    const buyTickets = (
      <CardActionsWrap>
        <ButtonStyled sx={{flex: 1, height: '36px'}} variant="contained" onClick={handleBtnClick}>
          {'Kupi Karte'}
        </ButtonStyled>
      </CardActionsWrap>
    );

    const buyAndReserveTickets = (
      <CardActionsWrap>
        <ButtonStyled sx={{flex: 1, height: '36px'}} variant="contained" onClick={handleBtnClick}>
          {'Kupi Karte'}
        </ButtonStyled>
        <ButtonStyled sx={{flex: 1, height: '36px'}} variant="contained" onClick={handleBtnClick}>
          {'Rezerviši'}
        </ButtonStyled>
      </CardActionsWrap>
    );

    switch (type) {
      case 'reserve':
        return reserveTickets;
      case 'buy':
        return buyTickets;
      case 'both':
        return buyAndReserveTickets;
      default:
        null;
    }
  };

  return (
    <CardWrap onClick={handleShufflePreview}>
      <BoxFlex>
        <Box>
          <Info>
            <span>Vreme: </span>
            {DateTime.fromISO(projection.projectionDateTime).toFormat('HH:mm')}
          </Info>
          <Info>
            <span>Tehnologija: </span>
            {handleMovieTechnology(projection.options)}
          </Info>
        </Box>
        <Box>
          <Info>
            <span>Sala: </span>
            {projection.cinemaTheater.name}
          </Info>
          <Info>
            <span>Cena: </span>
            {projection.projectionPrices?.[0].price + 'RSD'}
          </Info>
        </Box>
      </BoxFlex>
      <BoxFlex>{handleActionButton(currentPreview)}</BoxFlex>
    </CardWrap>
  );
}

export default ProjectionCard;
