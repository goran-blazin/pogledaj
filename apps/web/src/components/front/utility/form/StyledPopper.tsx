import {styled} from '@mui/material';
import Popper from '@mui/material/Popper';
// TODO - remove this component once tested - styles added to themes
const StyledPopper = styled(Popper)((theme) => ({
  '& .MuiPaper-root': {
    color: theme.theme.customForm.inputField.textColor,
    fontWeight: 400,
    borderRadius: '15px',
    '& .MuiAutocomplete-noOptions': {
      color: theme.theme.customForm.inputField.textColor,
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
