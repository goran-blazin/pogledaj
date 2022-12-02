import React from 'react';
import {Box} from '@mui/material';

export const borderImage = (modifier: number) =>
  `url('data:image/svg+xml;utf8,<svg width="${22 * modifier}" height="${
    26 * modifier
  }" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="black" /><rect rx="${
    5 * modifier
  }" height="${14 * modifier}" width="${16 * modifier}" y="${6 * modifier}" x="${
    3 * modifier
  }" fill="white"/></svg>') ${26 * modifier} 0 ${26 * modifier} 0 round round`;

function CardFilmStripWrapper({
  children,
  modifier = 1,
}: {
  children: React.ReactNode | React.ReactNode[];
  modifier?: number;
}) {
  return (
    <Box
      sx={{
        border: 'solid',
        borderImage: borderImage(modifier),
        borderWidth: `${26 * modifier}px 0`,
        padding: '0 4px',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </Box>
  );
}

export default CardFilmStripWrapper;
