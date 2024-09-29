import {ReactElement} from 'react';
import {Box} from '@mui/material';

type ContentWrapperTypes = {
  children: ReactElement;
  padding?: boolean;
  marginBottom?: string;
  marginTop?: string;
};

function ContentWrapper({children, padding, marginBottom, marginTop}: ContentWrapperTypes) {
  return (
    <Box
      className={`content-wrapper${padding ? ' inner-padding' : ''}`}
      sx={{
        marginBottom: marginBottom,
        marginTop: marginTop,
      }}
    >
      {children}
    </Box>
  );
}

export default ContentWrapper;
