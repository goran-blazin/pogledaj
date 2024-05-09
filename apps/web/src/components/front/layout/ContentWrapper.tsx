import {ReactElement} from 'react';
import {Box} from '@mui/material';

type ContentWrapperTypes = {
  children: ReactElement;
  padding?: boolean;
};

function ContentWrapper({children, padding}: ContentWrapperTypes) {
  return <Box className={`content-wrapper${padding ? ' inner-padding' : ''}`}>{children}</Box>;
}

export default ContentWrapper;
