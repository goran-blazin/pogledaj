import {ReactElement} from 'react';
import {Box} from '@mui/material';

type WrapperTypes = {
  children: ReactElement;
};

function MiscTextWrapper({children}: WrapperTypes) {
  return <Box mt="35px">{children}</Box>;
}

export default MiscTextWrapper;