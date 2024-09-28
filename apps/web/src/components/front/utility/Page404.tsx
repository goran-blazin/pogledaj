import {Grid} from '@mui/material';
import Paragraph from './typography/Paragraph';
import Button from './buttons/Button';
import ContentWrapper from '../layout/ContentWrapper';

function page404() {
  return (
    <ContentWrapper padding>
      <Grid
        container
        spacing={1}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: {
            xs: 'wrap',
            md: 'nowrap',
          },
          gap: {
            xs: '20px',
            md: '60px',
          },
          marginTop: '36px',
        }}
      >
        <Grid
          item
          sx={{
            flex: '0 1 auto',
            '& img': {
              width: '100%',
            },
          }}
        >
          <img src="/img/404.svg" alt="404" />
        </Grid>
        <Grid
          item
          sx={{
            flex: {
              xs: '0 1 auto',
              md: '0 0 auto',
            },
          }}
        >
          <Paragraph textAlign="center">
            Verujemo da ovo nije bio tvoj izbor,
            <br /> vrati se u glavni hol.
          </Paragraph>
          <Button>Povratak na početnu stranu</Button>
        </Grid>
      </Grid>
    </ContentWrapper>
  );
}

export default page404;
