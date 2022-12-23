import {Box, styled} from '@mui/material';
import {useMove} from './UseMove';

const Container = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  '& img, h2': {
    position: 'absolute',
    top: '50%',
    right: '50%',
    transform: 'translate(50%,-50%)',
  },
  '& img.stars': {
    zIndex: '1',
    top: 'calc(50% - 200px)',
    right: 'calc(50% + 0px)',
  },
  '& img.sofa': {
    zIndex: '3',
    top: 'calc(50% + 100px)',
    right: 'calc(50% + 0px)',
  },
  '& img.rolna': {
    zIndex: '2',
    top: 'calc(50% - 10px)',
    right: 'calc(50% - 120px)',
  },
  '& h2.title': {
    color: 'white',
    display: 'inline-block',
    zIndex: '4',
    top: 'calc(50% + 230px)',
    right: 'calc(50% + 0px)',
    fontSize: '46px',
    fontWeight: 'normal',
  },
}));

const MovingBackground = () => {
  const {handleMouseMove} = useMove();

  return (
    <Container
      onMouseMove={(event) => {
        event.persist();
        handleMouseMove(event.nativeEvent);
      }}
    >
      <img src="/img/stars.png" className={'object stars'} data-value="-2.5" alt="stars" />
      <img src="/img/sofa.png" className={'object sofa'} data-value="-1.5" alt="sofa" />
      <img src="/img/logo_rolna.png" className={'object rolna'} data-value="1.5" alt="logo_rolna" />
      <h2 className={'object title'} data-value="0">
        Uskoro!
      </h2>
    </Container>
  );
};

export default MovingBackground;
