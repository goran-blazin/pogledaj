import {Stack, styled, Typography} from '@mui/material';
import React from 'react';
import {SvgIconComponent} from '@mui/icons-material';
import {SxProps} from '@mui/system';

const StyledTypography = styled(Typography)((theme) => ({
  color: theme.theme.customTypography.mainTitle.color,
  fontWeight: '600',
  fontSize: '1em',
  lineHeight: '22px',
}));

function PageSubHeader({
  headerText = 'Header',
  Icon,
  sx,
}: {
  headerText: string;
  Icon?: SvgIconComponent;
  mb?: number;
  sx?: SxProps;
}) {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {Icon && <Icon color="primary" />}
      <StyledTypography sx={sx} variant="subtitle1">
        {headerText}
      </StyledTypography>
    </Stack>
  );
}

export default PageSubHeader;
