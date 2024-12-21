import {ReactElement} from 'react';
import {Box} from '@mui/material';

type ContentWrapperTypes = {
  children: ReactElement;
  padding?: boolean;
  marginBottom?: string;
  marginTop?: string;
  breakpointFixed?: boolean;
};

function ContentWrapper({children, padding, marginBottom, marginTop, breakpointFixed}: ContentWrapperTypes) {
  return (
    <Box
      className={`content-wrapper${padding ? ' inner-padding' : ''}`}
      sx={{
        marginBottom: marginBottom,
        marginTop: marginTop,
        width: {
          sm: '100%',
          md: `${breakpointFixed ? '400px' : '100%'}`,
        },
        minWidth: {
          sm: '0',
          md: `${breakpointFixed ? '400px' : '0'}`,
        },
      }}
    >
      {children}
    </Box>
  );
}

export default ContentWrapper;
