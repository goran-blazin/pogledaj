import React from 'react';
import TextField from '@mui/material/TextField';
import {styled} from '@mui/material';

const TextFieldStyled = styled(TextField)(() => ({}));

type TextFieldTypes = {
  onChange: () => void;
  name: string;
  value: string;
};

export default function InputField(props: TextFieldTypes) {
  const {onChange, name, value} = props;

  return <TextFieldStyled id="outlined-basic" onChange={onChange} name={name} value={value} />;
}
