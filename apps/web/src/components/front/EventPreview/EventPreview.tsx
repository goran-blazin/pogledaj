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
  height: 'calc(100vh - 210px)',
  position: 'relative',
  marginBottom: '20px',
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

export function EventPreviewWithAction({children}: {children: ReactElement}) {
  const handleClickFavorites = () => {
    return 'handleClickFavorites';
  };
  const handleClickShare = async () => {
    const shareData = {
      title: 'Podeli film',
      text: 'Podeli ovaj film sa prijateljima',
      url: window.location.href,
    };

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  };

  return (
    <EventPreviewMainWrap
      sx={{
        marginBottom: '30px',
      }}
    >
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

export function EventPreviewWithMargin({children, marginBottom}: {children: ReactElement; marginBottom: string}) {
  return (
    <EventPreviewMainWrap
      sx={{
        marginBottom,
      }}
    >
      {/* image/video */}
      <EventPreviewHolder>{children}</EventPreviewHolder>
    </EventPreviewMainWrap>
  );
}

export function EventPreview({children}: {children: ReactElement}) {
  return (
    <EventPreviewMainWrap>
      {/* image/video */}
      <EventPreviewHolder>{children}</EventPreviewHolder>
    </EventPreviewMainWrap>
  );
}
