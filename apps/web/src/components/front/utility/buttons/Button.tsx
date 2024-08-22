import {Button, styled} from '@mui/material';

const ButtonStyled = styled(Button)(({theme}) => ({
  backgroundColor: theme.colorPalette.lightBlue.color,
  borderColor: theme.colorPalette.lightBlue.color,
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: theme.colorPalette.lightBlue.color,
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: theme.colorPalette.lightBlue.color,
  },
  height: '48px',
  lineHeight: '22px',
  outline: 'none',
  border: 'none',
  padding: '0 22px',
  borderRadius: '15px',
  fontSize: '16px',
  fontWeight: '700',
  width: '100%',
  cursor: 'pointer',
  textTransform: 'none',
}));
export default ButtonStyled;
