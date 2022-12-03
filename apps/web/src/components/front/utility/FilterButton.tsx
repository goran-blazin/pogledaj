import { FilterAltOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

function FilterButton() {
  return (
    <Button
      sx={{
        maxWidth: '32px',
        maxHeight: '32px',
        minWidth: '32px',
        minHeight: '32px',
        borderRadius: '8px',
      }}
      variant='contained'
    >
      <FilterAltOutlined fontSize='small' />
    </Button>
  );
}

export default FilterButton;