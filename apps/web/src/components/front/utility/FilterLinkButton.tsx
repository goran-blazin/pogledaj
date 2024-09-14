import {FilterAltOutlined} from '@mui/icons-material';
import {Button} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';

type FilterLinkButtonProptypes = {
  navigateTo: string;
  fullWidth?: boolean;
  height?: string;
  text: string;
};

function FilterLinkButton({navigateTo, fullWidth, text, height}: FilterLinkButtonProptypes) {
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
        height: `${height ? height : '100%'}`,
        borderRadius: '15px',
        fontSize: {
          xs: '14px',
          md: '16px',
        },
      }}
      onClick={handleClick}
      variant="contained"
      fullWidth={fullWidth}
    >
      <FilterAltOutlined fontSize="small" />
      {text}
    </Button>
  );
}

export default FilterLinkButton;
