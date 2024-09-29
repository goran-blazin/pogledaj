import {Box, Dialog, DialogContent} from '@mui/material';
import ButtonStyled from './buttons/Button';
import PageTitle from './typography/PageTitle';
import Paragraph from './typography/Paragraph';

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
        <Box sx={{textAlign: 'center', marginBottom: '20px'}}>
          <img
            src={imgSrc}
            style={{
              maxWidth: '100%',
            }}
          />
        </Box>
        <PageTitle title={header}></PageTitle>
        <Paragraph>{text}</Paragraph>
        {buttons.map((button, index) => {
          return (
            <ButtonStyled variant={'contained'} key={index} onClick={() => button.onClick()}>
              {button.text}
            </ButtonStyled>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}

export default BigInfoDialog;
