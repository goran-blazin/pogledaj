import {Box} from '@mui/material';
import * as React from 'react';

function LoadingBox({text = 'Ucitava se...'}: {text?: string}) {
  return <Box>{text}</Box>;
}

export default LoadingBox;
