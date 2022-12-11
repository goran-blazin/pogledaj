import {styled} from '@mui/material';
import {Typography} from '@mui/material';

const MainTitleStyled = styled(Typography)(({theme}) => ({
  fontSize: theme.customTypography.mainTitle.fontSize,
  fontWeight: theme.customTypography.mainTitle.fontWeight,
  color: theme.customTypography.mainTitle.color,
}));

interface MainTitleProps {
  title: string;
}

function MainTitle({title}: MainTitleProps) {
  return <MainTitleStyled variant="h1">{title}</MainTitleStyled>;
}

export default MainTitle;
