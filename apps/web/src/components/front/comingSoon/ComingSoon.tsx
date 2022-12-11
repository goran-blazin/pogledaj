import {Grid, Box, styled} from '@mui/material';

const GridStyled = styled(Grid)(() => ({
  height: '100vh',
  backgroundColor: '#091F3E',
  alignItems: 'center',
  overflow: 'hidden',
}));

const BoxLeft = styled(Box)(() => ({
  overflow: 'hidden',
  textAlign: 'center',
}));
const BoxRight = styled(Box)(() => ({
  textAlign: 'center',
  overflow: 'hidden',
  '& img': {
    width: 'auto',
    height: '80%',
  },
}));

function ComingSoon() {
  return (
    <GridStyled container spacing={0}>
      <Grid xs={12} md={6} item={true}>
        <BoxLeft>
          <div>
            <img src="/logo_preview_white.png" alt="logo-preview" />
          </div>
        </BoxLeft>
      </Grid>
      <Grid xs={12} md={6} item={true}>
        <BoxRight>
          <div>
            <img src="/PreviewMobileImageSkewContained.png" alt="PreviewMobileImageSkew" />
          </div>
        </BoxRight>
      </Grid>
    </GridStyled>
  );
}

export default ComingSoon;
