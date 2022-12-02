import {Stack, Typography} from '@mui/material';
import React from 'react';
import {SvgIconComponent} from '@mui/icons-material';

function PageSubHeader({headerText = 'Header', Icon}: {headerText: string; Icon?: SvgIconComponent; mb?: number}) {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {Icon && <Icon color="primary" />}
      <Typography variant="subtitle1" color={'text.primary'} fontSize={'16px'} fontWeight={'600'}>
        {headerText}
      </Typography>
    </Stack>
  );
}

export default PageSubHeader;
