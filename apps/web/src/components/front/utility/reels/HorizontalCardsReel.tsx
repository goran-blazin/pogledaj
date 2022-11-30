import {Box} from '@mui/material';
import React from 'react';

function HorizontalCardsReel({children}: {children: React.ComponentType[]}) {
  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'auto',
        display: 'flex',
      }}
    >
      {children.map((Item, i) => {
        return <Item key={i} />;
      })}
    </Box>
  );
}

export default HorizontalCardsReel;
