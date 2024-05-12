import {styled} from '@mui/material';
import Popper from '@mui/material/Popper';

const StyledPopper = styled(Popper)((theme) => ({
  '& .MuiPaper-root': {
    color: theme.theme.palette.text.primary,
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '19px',
    '& .MuiAutocomplete-noOptions': {
      color: theme.theme.palette.text.primary,
    },
  },
}));

// /* Cobra (2022) */
// /* Paragraph - 14pt Regular Open Sans */
// font-family: 'Open Sans';
// font-style: normal;
// font-weight: 400;
// font-size: 14px;
// line-height: 19px;
// /* identical to box height */
//
// /* Light Blue */
// color: #3274F6;

export default StyledPopper;
