import {Chip} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import {styled} from '@mui/material';

const ClearIconStyled = styled(ClearIcon)(({theme}) => ({
  padding: '2px',
  color: `${theme.customForm.chipStyled.color} !important`,
  backgroundColor: theme.customForm.chipStyled.background,
  borderRadius: '50%',
  marginRight: '5px',
}));

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
      onDelete={onClick}
      deleteIcon={<ClearIconStyled />}
      label={label}
    />
  );
}

export default ChipStyled;
