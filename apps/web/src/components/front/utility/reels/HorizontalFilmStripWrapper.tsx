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
        backgroundColor: (theme) => theme.cardFilm.backgroundColor,
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
          borderImage: (theme) =>
            borderImage(modifier, theme.cardFilm.borderImageHole, theme.cardFilm.borderImageHoleBg),
          borderWidth: `${26 * modifier}px 0`,
          borderColor: (theme) => theme.cardFilm.backgroundColor,
        },
      }}
    >
      {children}
    </Box>
  );
}

export default HorizontalFilmStripWrapper;
