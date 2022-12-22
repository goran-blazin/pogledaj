import {styled} from '@mui/material';

const ParagraphStyled = styled('p')(({theme}) => ({
  fontSize: theme.customTypography.paragraph.fontSize,
  color: theme.customTypography.paragraph.color,
}));

interface ParagraphStyledProps {
  text: string;
}

function Paragraph({text}: ParagraphStyledProps) {
  return <ParagraphStyled>{text}</ParagraphStyled>;
}

export default Paragraph;
