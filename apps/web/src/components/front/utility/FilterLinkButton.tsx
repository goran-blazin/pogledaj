import {FilterAltOutlined} from '@mui/icons-material';
import {Button} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';

function FilterLinkButton({navigateTo}: {navigateTo: string}) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(navigateTo); // Path to your component
  };

  return (
    <Button
      href={navigateTo}
      sx={{
        maxWidth: '32px',
        maxHeight: '32px',
        minWidth: '32px',
        minHeight: '32px',
        borderRadius: '8px',
      }}
      onClick={handleClick}
      variant="contained"
    >
      <FilterAltOutlined fontSize="small" />
    </Button>
  );
}

export default FilterLinkButton;
