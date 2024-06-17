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
        textTransform: 'none',
        minWidth: '32px',
        minHeight: '32px',
        borderRadius: '8px',
        fontWeight: '700',
        fontSize: '16px',
        padding: '3px 6px',
      }}
      onClick={handleClick}
      variant="contained"
    >
      <FilterAltOutlined fontSize="small" />
      Filtriraj
    </Button>
  );
}

export default FilterLinkButton;
