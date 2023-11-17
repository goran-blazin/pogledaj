import {Box, Dialog, DialogActions, DialogContent, Typography} from '@mui/material';
import React from 'react';
import {styled} from '@mui/system';
import ButtonStyled from './buttons/Button';

const TypographyHeader = styled(Typography)(() => ({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '20px',
  lineHeight: '27px',
}));

const TypographyText = styled(Typography)(() => ({
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '16px',
  color: '#535353',
}));

function BigInfoDialog({
  open,
  imgSrc,
  header,
  text,
  buttons,
}: {
  open: boolean;
  imgSrc: string;
  header: string;
  text: string;
  buttons: {text: string; onClick: () => void}[];
}) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <img src={imgSrc} style={{width: '100%'}} />
        </Box>

        <TypographyHeader pb={2}>{header}</TypographyHeader>
        <TypographyText>{text}</TypographyText>
      </DialogContent>
      <DialogActions>
        {buttons.map((button, index) => {
          return (
            <ButtonStyled variant={'contained'} key={index} onClick={() => button.onClick()}>
              {button.text}
            </ButtonStyled>
          );
        })}
      </DialogActions>
    </Dialog>
  );
}

export default BigInfoDialog;
