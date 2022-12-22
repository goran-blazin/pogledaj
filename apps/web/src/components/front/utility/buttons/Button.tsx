import {styled} from '@mui/material';

const ButtonStyled = styled('button')(({theme}) => ({
  backgroundColor: theme.colorPalette.lightBlue.color,
  borderColor: theme.colorPalette.lightBlue.color,
  color: theme.palette.text.secondary,
  height: '48px',
  lineHeight: '48px',
  outline: 'none',
  border: 'none',
  padding: '0 22px',
  borderRadius: '15px',
  fontSize: '14px',
  width: '100%',
  cursor: 'pointer',
}));

type ButtonStyledTypes = {
  onClick?: () => void;
  text: string;
  type: any;
};

export default function Button(props: ButtonStyledTypes) {
  const {text, onClick, type} = props;

  return (
    <ButtonStyled onClick={onClick} type={type}>
      {text}
    </ButtonStyled>
  );
}
