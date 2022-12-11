import {ReactElement} from 'react';
import Box from '@mui/material/Box';
import {styled} from '@mui/system';

const ShapeRightBottom = styled('div')({
  width: 14 + 'px',
  height: 14 + 'px',
  position: 'absolute',
  overflow: 'hidden',
  left: 62,
  bottom: 0,
  '&::before': {
    content: '""',
    display: 'block',
    width: 200 + '%',
    height: 200 + '%',
    position: 'absolute',
    borderRadius: 50 + '%',
    bottom: 0,
    left: 0,
    boxShadow: '-7px 7px 0 0 white',
  },
});
const ShapeTopLeft = styled('div')({
  width: 14 + 'px',
  height: 14 + 'px',
  position: 'absolute',
  overflow: 'hidden',
  left: 0,
  bottom: 62,
  '&::before': {
    content: '""',
    display: 'block',
    width: 200 + '%',
    height: 200 + '%',
    position: 'absolute',
    borderRadius: 50 + '%',
    bottom: 0,
    left: 0,
    boxShadow: '-7px 7px 0 0 white',
  },
});
const ShapeLeftBottom = styled('div')({
  width: 14 + 'px',
  height: 14 + 'px',
  position: 'absolute',
  overflow: 'hidden',
  right: 62,
  bottom: 0,
  '&::before': {
    content: '""',
    display: 'block',
    width: 200 + '%',
    height: 200 + '%',
    position: 'absolute',
    borderRadius: 50 + '%',
    bottom: 0,
    right: 0,
    boxShadow: '7px 7px 0 0 white',
  },
});
const ShapeTopRight = styled('div')({
  width: 14 + 'px',
  height: 14 + 'px',
  position: 'absolute',
  overflow: 'hidden',
  right: 0,
  bottom: 62,
  '&::before': {
    content: '""',
    display: 'block',
    width: 200 + '%',
    height: 200 + '%',
    position: 'absolute',
    borderRadius: 50 + '%',
    bottom: 0,
    right: 0,
    boxShadow: '7px 7px 0 0 white',
  },
});

type EventPreviewActionProps = {
  position: string;
  children: ReactElement;
};

function EventPreviewAction(props: EventPreviewActionProps) {
  return (
    <Box
      sx={[
        {
          width: 62,
          height: 62,
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'background.default',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        props.position === 'br' && {
          right: 0,
          borderTopLeftRadius: 14,
        },
        props.position === 'bl' && {
          left: 0,
          borderTopRightRadius: 14,
        },
      ]}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          boxSizing: 'border-box',
          backgroundColor: 'rgba(245, 245, 245, .9)',
          border: '1px solid rgba(233, 233, 233, .5)',
          borderRadius: 10 + 'px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {props.children}
      </Box>
      {props.position === 'bl' && (
        <>
          <ShapeRightBottom />
          <ShapeTopLeft />
        </>
      )}
      {props.position === 'br' && (
        <>
          <ShapeLeftBottom />
          <ShapeTopRight />
        </>
      )}
    </Box>
  );
}

export default EventPreviewAction;
