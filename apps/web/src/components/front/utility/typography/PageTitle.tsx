import {styled} from '@mui/material';
import {Typography} from '@mui/material';

const PageTitleStyled = styled(Typography)(({theme}) => ({
  fontSize: theme.customTypography.pageTitle.fontSize,
  fontWeight: theme.customTypography.pageTitle.fontWeight,
  color: theme.customTypography.pageTitle.color,
  marginBottom: '22px',
}));

interface PageTitleProps {
  title: string;
  marginBottom?: string;
  variant?: 'h2' | 'h3' | 'h4' | 'h5';
}

function PageTitle({title, marginBottom, variant = 'h2'}: PageTitleProps) {
  return (
    <PageTitleStyled
      variant={variant}
      sx={{
        marginBottom: (theme) => (marginBottom ? marginBottom : theme.customTypography.pageTitle.marginBottom),
      }}
    >
      {title}
    </PageTitleStyled>
  );
}

export default PageTitle;
