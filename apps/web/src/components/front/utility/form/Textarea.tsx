import {styled} from '@mui/material';

const TextareaStyled = styled('textarea')(({theme}) => ({
  backgroundColor: theme.customForm.inputField.color,
  borderColor: theme.customForm.inputField.color,
  color: theme.customForm.inputField.textColor,
  lineHeight: '16px',
  outline: 'none',
  border: 'none',
  padding: '18px 22px',
  borderRadius: '15px',
  fontSize: '14px',
  width: '100%',
  '&::placeholder': {
    color: theme.customForm.inputField.textColor,
  },
}));

type TextareaTypes = {
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  value: string;
  placeholder?: string;
  rows?: number;
};

export default function InputField(props: TextareaTypes) {
  const {onChange, name, value, placeholder, rows} = props;

  return (
    <TextareaStyled
      onChange={onChange}
      name={name}
      value={value}
      placeholder={placeholder}
      rows={rows}
      sx={{
        resize: 'none',
      }}
    />
  );
}
