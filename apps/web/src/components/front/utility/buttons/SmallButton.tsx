import {Button, styled} from '@mui/material';

const SmallButton = styled(Button)(({theme}) => ({
  backgroundColor: theme.colorPalette.lightBlue.color,
  borderColor: theme.colorPalette.lightBlue.color,
  color: theme.palette.text.secondary,
  borderRadius: '15px',
  fontSize: '16px',
  fontWeight: '700',
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  textTransform: 'none',
}));

export default SmallButton;
