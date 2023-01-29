import {Icon, styled} from '@mui/material';

const ButtonStyled = styled('button')(({theme}) => ({
  backgroundColor: theme.customButtons.buttonWithIcon.color,
  borderColor: theme.customButtons.buttonWithIcon.color,
  color: theme.customButtons.buttonWithIcon.textColor,
  height: '48px',
  lineHeight: '48px',
  outline: 'none',
  border: 'none',
  padding: '0 22px 0 8px',
  borderRadius: '15px',
  fontSize: '14px',
  width: '100%',
  cursor: 'pointer',
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center',
}));

const IconStyledWrap = styled('div')(({theme}) => ({
  marginRight: '12px',
  backgroundColor: theme.customButtons.buttonWithIcon.iconBgColor,
  borderRadius: '10px',
  boxSizing: 'border-box',
  height: '32px',
  width: '32px',
  textAlign: 'center',
}));

const IconStyled = styled(Icon)(() => ({
  color: 'white',
}));

type ButtonStyledTypes = {
  onClick?: () => void;
  text: string;
  type: 'submit' | 'reset' | 'button' | undefined;
  icon?: React.ReactNode;
};

export default function Button(props: ButtonStyledTypes) {
  const {text, onClick, type, icon} = props;

  return (
    <ButtonStyled onClick={onClick} type={type}>
      <IconStyledWrap>
        <IconStyled>{icon}</IconStyled>
      </IconStyledWrap>
      {text}
    </ButtonStyled>
  );
}
