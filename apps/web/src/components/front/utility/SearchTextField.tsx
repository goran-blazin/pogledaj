import {InputAdornment, styled, TextField} from '@mui/material';
import React from 'react';
import {Search} from '@mui/icons-material';
type SearchTextFieldProps = {
  id: string;
  placeholder?: string;
  EndAdornment?: React.ReactNode;
};

export const SearchTextFieldStyled = styled(TextField)(({theme}) => ({
  '& .MuiOutlinedInput-root': {
    height: '48px',
    backgroundColor: theme.searchTextField.backgroundColor,
    paddingLeft: '20px',
    paddingRight: '9px !important',
    borderRadius: '20px',
    border: '1px solid #D6D6D6',
    borderColor: theme.searchTextField.borderColor,
    '& fieldset': {
      borderColor: theme.searchTextField.backgroundColor,
    },
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      borderColor: theme.searchTextField.backgroundColor,
    },
  },
  '& .MuiOutlinedInput-input': {
    color: theme.searchTextField.color,
  },
  '& .MuiSvgIcon-root ': {
    color: theme.customForm.selectField.startAdornmentTextColor,
  },
}));

function SearchTextField({id, placeholder, EndAdornment}: SearchTextFieldProps) {
  return (
    <SearchTextFieldStyled
      id={id}
      variant="outlined"
      fullWidth
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search color="primary" />
          </InputAdornment>
        ),
        endAdornment: EndAdornment ? <InputAdornment position="end">{EndAdornment}</InputAdornment> : null,
      }}
    />
  );
}

export default SearchTextField;
