import {styled} from '@mui/material';

const TextareaStyled = styled('textarea')(({theme}) => ({
  backgroundColor: theme.customForm.inputField.color,
  borderColor: theme.customForm.inputField.color,
  color: theme.colorPalette.darkGrey.color,
  lineHeight: '16px',
  outline: 'none',
  border: 'none',
  padding: '18px 22px',
  borderRadius: '15px',
  fontSize: '14px',
  width: '100%',
}));

type TextareaTypes = {
  onChange: () => void;
  name: string;
  value: string;
  placeholder?: string;
  rows?: number;
};

export default function InputField(props: TextareaTypes) {
  const {onChange, name, value, placeholder, rows} = props;

  return <TextareaStyled onChange={onChange} name={name} value={value} placeholder={placeholder} rows={rows} />;
}
