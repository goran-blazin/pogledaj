import {styled} from '@mui/material';
import {Typography} from '@mui/material';

const SubTitleStyled = styled(Typography)(({theme}) => ({
  fontFamily: 'var(--ff-open-sans)',
  fontWeight: 600,
  color: theme.customTypography.pageTitle.color,
  marginBottom: '22px',
  display: 'flex',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    marginRight: '5px',
    fontSize: '24px',
  },
}));

interface SubTitleProps {
  title: string;
  marginBottom?: string;
  variant?: 'h2' | 'h3' | 'h4' | 'h5';
  icon?: React.ReactNode;
  fontSize?: string;
}

function SubTitle({title, marginBottom, variant = 'h2', icon, fontSize}: SubTitleProps) {
  return (
    <SubTitleStyled
      variant={variant}
      sx={{
        marginBottom: (theme) => (marginBottom ? marginBottom : theme.customTypography.pageTitle.marginBottom),
        fontSize: fontSize ? fontSize : '16px',
      }}
    >
      {icon ? icon : null}
      {title}
    </SubTitleStyled>
  );
}

export default SubTitle;
