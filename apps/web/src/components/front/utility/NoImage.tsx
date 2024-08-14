import {styled} from '@mui/material';

const NoImageWrap = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: 'var(--dark-mode-background)',
  backgroundImage: 'url(/no_image_bg.svg)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top center',
  backgroundSize: '80%',
  textAlign: 'center',
  img: {
    width: '120px',
    height: 'auto',
    position: 'relative',
    top: '20%',
    margin: '0 auto',
  },
});

function NoImage() {
  return (
    <>
      <NoImageWrap>
        <img src="/no_image.svg" alt="image" />
      </NoImageWrap>
    </>
  );
}

export default NoImage;
