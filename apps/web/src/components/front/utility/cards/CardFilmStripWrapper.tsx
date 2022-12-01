import React from 'react';
import {Box} from '@mui/material';

function CardFilmStripWrapper({children}: {children: React.ReactNode | React.ReactNode[]}) {
  const borderImage =
    'url(\'data:image/svg+xml;utf8,<svg width="22" height="26" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="black" /><rect rx="5" height="14" width="16" y="6" x="3" fill="white"/></svg>\') 26 0 26 0 round round';

  return (
    <Box
      sx={{
        border: 'solid',
        borderImage: borderImage,
        borderWidth: '26px 0',
        padding: '0 4px',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </Box>
  );
}

export default CardFilmStripWrapper;
