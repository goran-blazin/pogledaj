import {styled} from '@mui/material';

const TextFieldStyled = styled('input')(({theme}) => ({
  backgroundColor: theme.customForm.inputField.color,
  borderColor: theme.customForm.inputField.color,
  color: theme.customForm.inputField.textColor,
  height: '48px',
  lineHeight: '48px',
  outline: 'none',
  border: 'none',
  padding: '0 22px',
  borderRadius: '15px',
  fontSize: '14px',
  width: '100%',
  '&::placeholder': {
    color: theme.customForm.inputField.textColor,
  },
}));

type TextFieldTypes = {
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value?: string;
  placeholder?: string;
};

export default function InputField(props: TextFieldTypes) {
  const {onChange, name, value, placeholder} = props;

  return <TextFieldStyled onChange={onChange} name={name} value={value} placeholder={placeholder} />;
}
