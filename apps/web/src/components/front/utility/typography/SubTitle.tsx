import {styled} from '@mui/material';
import {Typography} from '@mui/material';

const SubTitleStyled = styled(Typography)(({theme}) => ({
  fontSize: theme.customTypography.pageTitle.fontSize,
  fontWeight: theme.customTypography.pageTitle.fontWeight,
  color: theme.customTypography.pageTitle.color,
  marginBottom: '22px',
}));

interface SubTitleProps {
  title: string;
  marginBottom?: string;
  variant?: 'h2' | 'h3' | 'h4' | 'h5';
}

function SubTitle({title, marginBottom, variant = 'h2'}: SubTitleProps) {
  return (
    <SubTitleStyled
      variant={variant}
      sx={{
        marginBottom: (theme) => (marginBottom ? marginBottom : theme.customTypography.pageTitle.marginBottom),
      }}
    >
      {title}
    </SubTitleStyled>
  );
}

export default SubTitle;
