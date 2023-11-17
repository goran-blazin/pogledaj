import {Select, styled} from '@mui/material';

const SelectBoxStyled = styled(Select)((theme) => ({
  backgroundColor: theme.theme.customForm.selectField.color,
  borderColor: theme.theme.customForm.selectField.textColor,
  color: theme.theme.customForm.selectField.textColor,
  borderRadius: '15px',
  '& fieldset': {
    color: theme.theme.customForm.selectField.color,
    borderColor: theme.theme.customForm.selectField.color,
  },
  '& p': {
    color: theme.theme.customForm.selectField.startAdornmentTextColor,
    minWidth: '65px',
  },
})) as unknown as typeof Select;

export default SelectBoxStyled;
