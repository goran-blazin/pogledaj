import {InputAdornment, styled, TextField} from '@mui/material';
import React from 'react';
import {Search} from '@mui/icons-material';
type SearchTextFieldProps = {
  id: string;
  placeholder?: string;
  EndAdornment?: React.ReactNode;
};

export const SearchTextFieldStyled = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f0f0f0',
    paddingLeft: '20px',
    borderRadius: '20px',
    '& fieldset': {
      borderColor: '#f0f0f0',
    },
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      borderColor: '#f0f0f0',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: '#000000',
  },
});

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
