import {styled} from '@mui/material';
import {Typography} from '@mui/material';

const PageTitleStyled = styled(Typography)(({theme}) => ({
  fontSize: theme.customTypography.pageTitle.fontSize,
  fontWeight: theme.customTypography.pageTitle.fontWeight,
  color: theme.customTypography.pageTitle.color,
  marginBottom: '22px'
}));

interface PageTitleProps {
  title: string;
  marginBottom?: string;
}

function PageTitle({title, marginBottom}: PageTitleProps) {
  return <PageTitleStyled
            variant="h2"
            sx={{
              marginBottom: (theme) => marginBottom ? marginBottom : theme.customTypography.pageTitle.marginBottom
            }}
          >{title}</PageTitleStyled>;
}

export default PageTitle;
