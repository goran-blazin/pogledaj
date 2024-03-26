import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {styled} from '@mui/system';
import {ReactElement} from 'react';
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';

import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import EventPreviewAction from './EventPreviewAction';

const EventPreviewMainWrap = styled(Box)({
  width: '100%',
  height: '70vh',
  backgroundColor: 'primary.default', // TODO fix this
  position: 'relative',
  marginBottom: '30px',
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    boxSizing: 'border-Box',
    top: 0,
    left: 0,
    width: '100%',
    height: '152px',
    background: 'linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,0))',
  },
});
const EventPreviewHolder = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  'img, video, iframe': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    border: 'none',
    outline: 'none',
    padding: 0,
    margin: 0,
  },
});

function FavoriteIconStyle(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <FavoriteBorderIcon />
    </SvgIcon>
  );
}
function ShareIconStyle(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <ShareIcon />
    </SvgIcon>
  );
}

function EventPreview({children}: {children: ReactElement}) {
  const handleClickFavorites = () => {
    return 'handleClickFavorites';
  };
  const handleClickShare = () => {
    return 'handleClickShare';
  };

  return (
    <EventPreviewMainWrap>
      {/* image/video */}
      <EventPreviewHolder>{children}</EventPreviewHolder>
      {/* favorite button */}
      <EventPreviewAction position={'bl'}>
        <IconButton aria-label="Share" onClick={handleClickFavorites}>
          <FavoriteIconStyle
            sx={{
              color: (theme) => theme.eventPreviewAction.iconColor,
            }}
          />
        </IconButton>
      </EventPreviewAction>
      {/* share button */}
      <EventPreviewAction position={'br'}>
        <IconButton aria-label="Share" onClick={handleClickShare}>
          <ShareIconStyle
            sx={{
              color: (theme) => theme.eventPreviewAction.iconColor,
            }}
          />
        </IconButton>
      </EventPreviewAction>
    </EventPreviewMainWrap>
  );
}

export default EventPreview;
