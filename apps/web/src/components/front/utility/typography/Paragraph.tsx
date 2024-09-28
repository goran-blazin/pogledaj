import {styled, Typography} from '@mui/material';

const ParagraphStyled = styled(Typography)(({theme}) => ({
  fontSize: theme.customTypography.paragraph.fontSize,
  color: theme.customTypography.paragraph.color,
}));

interface ParagraphStyledProps {
  children: React.ReactNode;
  marginBottom?: string;
  textAlign?: string;
}

function Paragraph({children, marginBottom, textAlign}: ParagraphStyledProps) {
  return (
    <ParagraphStyled
      sx={{
        textAlign: textAlign ? textAlign : 'left',
        marginBottom: (theme) => marginBottom || theme.customTypography.paragraph.marginBottom,
      }}
    >
      {children}
    </ParagraphStyled>
  );
}

export default Paragraph;
