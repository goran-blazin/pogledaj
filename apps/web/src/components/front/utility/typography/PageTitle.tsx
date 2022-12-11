import {styled} from '@mui/material';
import {Typography} from '@mui/material';

const PageTitleStyled = styled(Typography)(({theme}) => ({
  fontSize: theme.customTypography.pageTitle.fontSize,
  fontWeight: theme.customTypography.pageTitle.fontWeight,
  color: theme.customTypography.pageTitle.color,
}));

interface PageTitleProps {
  title: string;
}

function PageTitle({title}: PageTitleProps) {
  return <PageTitleStyled variant="h2">{title}</PageTitleStyled>;
}

export default PageTitle;
