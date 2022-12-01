import React from 'react';
import {Box} from '@mui/material';

function HorizontalFilmStripWrapper({children}: {children: React.ReactNode | React.ReactNode[]}) {
  return (
    <Box
      sx={{
        backgroundColor: '#000000',
        width: '100vw',
        position: 'relative',
        left: 'calc(-50vw + 50%)',
      }}
    >
      {children}
    </Box>
  );
}

export default HorizontalFilmStripWrapper;
