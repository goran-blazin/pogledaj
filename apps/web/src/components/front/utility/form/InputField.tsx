import {styled} from '@mui/material';

const TextFieldStyled = styled('input')(({theme}) => ({
  backgroundColor: theme.customForm.inputField.color,
  borderColor: theme.customForm.inputField.color,
  color: theme.colorPalette.darkGrey.color,
  height: '48px',
  lineHeight: '48px',
  outline: 'none',
  border: 'none',
  padding: '0 22px',
  borderRadius: '15px',
  fontSize: '14px',
  width: '100%'
}));

type TextFieldTypes = {
  onChange: () => void;
  name: string;
  value: string;
  placeholder?: string;
};

export default function InputField(props: TextFieldTypes) {
  const {onChange, name, value, placeholder} = props;

  return <TextFieldStyled onChange={onChange} name={name} value={value} placeholder={placeholder} />;
}
