import {styled} from '@mui/material';

const LinkStyled = styled('a')(({theme}) => ({
  fontSize: theme.customTypography.link.fontSize,
  color: theme.customTypography.link.color,
  textDecoration: 'none',
}));

interface LinkProps {
  text: string;
  link: string;
}

function Link({text, link}: LinkProps) {
  return <LinkStyled href={link}>{text}</LinkStyled>;
}

export default Link;
