import {Chip} from '@mui/material';

type ChipStyledProps = {
  color?: string | undefined;
  bg?: string | undefined;
  label: string | undefined;
  onClick?: () => void;
  margin?: string;
};

function ChipStyled({color, bg, label, margin, onClick}: ChipStyledProps) {
  return (
    <Chip
      sx={{
        color: (theme) => (color ? color : theme.customForm.inputFieldStyled.color),
        backgroundColor: (theme) => (bg ? bg : theme.customForm.inputFieldStyled.backgroundColor),
        fontSize: '14px',
        margin: margin,
      }}
      onClick={onClick}
      label={label}
    />
  );
}

export default ChipStyled;
