import {styled} from '@mui/material';

const ListStyled = styled('ul')(({theme}) => ({
  fontSize: theme.customTypography.link.fontSize,
  color: theme.customTypography.link.color,
  textDecoration: 'none',
}));

interface LinkProps {
  children: React.ReactNode;
}

function Link({children}: LinkProps) {
  return <ListStyled>{children}</ListStyled>;
}

export default Link;
