import {styled, TextField} from '@mui/material';

const TextFieldStyled = styled(TextField)((theme) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.theme.customForm.selectField.color,
    paddingLeft: '20px',
    borderRadius: '20px',
    '& fieldset': {
      borderColor: theme.theme.customForm.selectField.color,
    },
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      borderColor: theme.theme.customForm.selectField.color,
    },
    '& p': {
      color: theme.theme.customForm.selectField.startAdornmentTextColor,
      minWidth: '65px',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: '#000000',
  },
})) as unknown as typeof TextField;

export default TextFieldStyled;
