import {Chip} from '@mui/material';

type ChipStyledProps = {
  color?: string | undefined;
  label: string | undefined;
};

function ChipStyled({color, label}: ChipStyledProps) {
  return (
    <Chip
      sx={{
        color: (theme) => (color ? color : theme.eventPreviewAction.iconColor),
      }}
      label={label}
    />
  );
}

export default ChipStyled;
