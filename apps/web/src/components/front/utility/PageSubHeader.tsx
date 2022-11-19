import {Box, Stack, Typography} from '@mui/material';
import React from 'react';
import {SvgIconComponent} from '@mui/icons-material';

function PageSubHeader({
  headerText = 'Header',
  Icon,
  mb = 0,
}: {
  headerText: string;
  Icon: SvgIconComponent;
  mb?: number;
}) {
  return (
    <Box
      sx={{
        mb: `${mb.toString()}px`,
      }}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <Icon
          sx={{
            color: '#3274F6',
          }}
        />
        <Typography variant="subtitle1" color={'text.primary'}>
          {headerText}
        </Typography>
      </Stack>
    </Box>
  );
}

export default PageSubHeader;
