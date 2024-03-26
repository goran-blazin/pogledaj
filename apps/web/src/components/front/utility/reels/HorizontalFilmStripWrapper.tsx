import React from 'react';
import {Box} from '@mui/material';
import {borderImage} from '../cards/CardFilmStripWrapper';

function HorizontalFilmStripWrapper({
  children,
  modifier = 1,
}: {
  children: React.ReactNode | React.ReactNode[];
  modifier?: number;
}) {
  return (
    <Box
      sx={{
        backgroundColor: '#000000',
        // width: '100vw',
        position: 'relative',
        // left: 'calc(-50vw + 50%)',
        '& div.swiper-wrapper:before': {
          marginLeft: '-100vw',
          paddingLeft: '100vw',
        },
        '& div.swiper-wrapper:after': {
          paddingRight: '100vw',
        },
        '& div.swiper-wrapper:before, & div.swiper-wrapper:after': {
          content: '""',
          border: 'solid',
          borderImage: borderImage(modifier),
          borderWidth: `${26 * modifier}px 0`,
        },
      }}
    >
      {children}
    </Box>
  );
}

export default HorizontalFilmStripWrapper;
