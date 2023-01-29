import {Box, styled} from '@mui/material';
import PageTitle from '../utility/typography/PageTitle';
import ButtonWithIcon from '../utility/buttons/ButtonWithIcon';
import Button from '../utility/buttons/Button';

const ButtonWrap = styled('div')(() => ({
  marginBottom: '12px',
  '&:last-child': {
    marginBottom: 0,
  },
}));

function settingsWrapper() {
  const handleLogin = () => {
    // eslint-disable-next-line no-console
    return console.log('should handle login');
  };

  return (
    <Box>
      <PageTitle title="Podešavanja" marginBottom={'22px'} />
      <ButtonWrap>
        <Button onClick={handleLogin} text={'Uloguj se'} type={'button'} />
      </ButtonWrap>
      <ButtonWrap>
        <ButtonWithIcon text={'Prati nas'} type={'button'} icon={'connect_without_contact'} />
      </ButtonWrap>
      <ButtonWrap>
        <ButtonWithIcon text={'Kontaktiraj nas'} type={'button'} icon={'support_agent'} />
      </ButtonWrap>
      <ButtonWrap>
        <ButtonWithIcon text={'O nama'} type={'button'} icon={'info_outlined'} />
      </ButtonWrap>
      <ButtonWrap>
        <ButtonWithIcon text={'Uslovi korišćenja'} type={'button'} icon={'rule'} />
      </ButtonWrap>
    </Box>
  );
}

export default settingsWrapper;
