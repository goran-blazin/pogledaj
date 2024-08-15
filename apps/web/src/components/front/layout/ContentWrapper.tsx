import {ReactElement} from 'react';
import {Box} from '@mui/material';

type ContentWrapperTypes = {
  children: ReactElement;
  padding?: boolean;
  marginBottom?: string;
};

function ContentWrapper({children, padding, marginBottom}: ContentWrapperTypes) {
  return (
    <Box
      className={`content-wrapper${padding ? ' inner-padding' : ''}`}
      sx={{
        marginBottom: marginBottom,
      }}
    >
      {children}
    </Box>
  );
}

export default ContentWrapper;
