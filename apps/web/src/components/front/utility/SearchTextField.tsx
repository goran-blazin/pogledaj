import { Box, TextField } from "@mui/material";
import React from "react";
type SearchTextFieldProps = {
  id: string,
  label: string,
  mb?: number
}

function SearchTextField({id, label, mb = 20}: SearchTextFieldProps) {
  return (
    <Box
      sx={{
        mb: `${mb.toString()}px`
      }}
    >
      <TextField
        id={id}
        label={label}
        variant="outlined"
      />
    </Box>
  )
}

export default SearchTextField;