import {Box, Typography} from '@mui/material';
import React from 'react';

function PageHeader({headerText = 'Header', mb = 20}) {
  return (
    <Box>
      <Typography
        variant="h6"
        color={'primary.main'}
        fontWeight={700}
        fontSize={20}
        sx={{
          mb: `${mb.toString()}px`,
          ml: '5px',
        }}
      >
        {headerText}
      </Typography>
    </Box>
  );
}

export default PageHeader;
