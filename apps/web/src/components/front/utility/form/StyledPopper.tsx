import {styled} from '@mui/material';
import Popper from '@mui/material/Popper';

const StyledPopper = styled(Popper)((theme) => ({
  '& .MuiPaper-root': {
    color: theme.theme.palette.text.primary,
    '& .MuiAutocomplete-noOptions': {
      color: theme.theme.palette.text.primary,
    },
  },
}));

export default StyledPopper;
