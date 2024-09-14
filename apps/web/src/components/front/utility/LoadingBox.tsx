import {Box} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingBox() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingBox;
