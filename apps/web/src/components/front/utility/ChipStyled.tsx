import {Chip} from '@mui/material';

type ChipStyledProps = {
  color?: string | undefined;
  bg?: string | undefined;
  label: string | undefined;
};

function ChipStyled({color, bg, label}: ChipStyledProps) {
  return (
    <Chip
      sx={{
        color: (theme) => (color ? color : theme.customForm.inputFieldStyled.color),
        backgroundColor: (theme) => (bg ? bg : theme.customForm.inputFieldStyled.backgroundColor),
        fontSize: '14px',
      }}
      label={label}
    />
  );
}

export default ChipStyled;
