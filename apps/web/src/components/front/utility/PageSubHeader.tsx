import {Stack, styled, Typography} from '@mui/material';
import React from 'react';
import {SvgIconComponent} from '@mui/icons-material';

const StyledTypography = styled(Typography)((theme) => ({
  color: theme.theme.customTypography.mainTitle.color,
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '22px',
}));

function PageSubHeader({headerText = 'Header', Icon}: {headerText: string; Icon?: SvgIconComponent; mb?: number}) {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {Icon && <Icon color="primary" />}
      <StyledTypography variant="subtitle1">{headerText}</StyledTypography>
    </Stack>
  );
}

export default PageSubHeader;
