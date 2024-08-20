import {IconButton, styled} from '@mui/material';
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';
import {ReactElement} from 'react';

type IconButtonStyledProps = {
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
  iconStyles?: SvgIconProps;
  children: ReactElement;
};

const IconButtonWithStyled = styled(IconButton)((theme) => ({
  width: '32px',
  height: '32px',
  backgroundColor: theme.theme.eventPreviewAction.iconHolderBackgroundColor,
  boxSizing: 'border-box',
  border: `1px solid ${theme.theme.eventPreviewAction.iconHolderBorderColor}`,
  borderRadius: 10 + 'px',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    color: theme.theme.eventPreviewAction.iconColor,
  },
}));

export default function IconButtonStyled(props: IconButtonStyledProps) {
  const {handleClick, children} = props;

  return (
    <>
      <IconButtonWithStyled aria-label="Action" onClick={handleClick}>
        <SvgIcon>{children}</SvgIcon>
      </IconButtonWithStyled>
    </>
  );
}
