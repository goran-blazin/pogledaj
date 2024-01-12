import {ReactElement} from 'react';
import Box from '@mui/material/Box';
// import {styled} from '@mui/system';
import {styled} from '@mui/material';

const ShapeRightBottom = styled('div')(({theme}) => ({
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
    boxShadow: `-7px 7px 0 0 ${theme.eventPreviewAction.backgroundColor}`,
  },
}));
const ShapeTopLeft = styled('div')(({theme}) => ({
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
    boxShadow: `-7px 7px 0 0 ${theme.eventPreviewAction.backgroundColor}`,
  },
}));
const ShapeLeftBottom = styled('div')(({theme}) => ({
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
    boxShadow: `7px 7px 0 0 ${theme.eventPreviewAction.backgroundColor}`,
  },
}));
const ShapeTopRight = styled('div')(({theme}) => ({
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
    boxShadow: `7px 7px 0 0 ${theme.eventPreviewAction.backgroundColor}`,
  },
}));

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
          backgroundColor: (theme) => theme.eventPreviewAction.backgroundColor,
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
          backgroundColor: (theme) => theme.eventPreviewAction.iconHolderBackgroundColor,
          border: (theme) => `1px solid ${theme.eventPreviewAction.iconHolderBorderColor}`,
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
