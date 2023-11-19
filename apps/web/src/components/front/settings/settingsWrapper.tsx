import {Box, styled} from '@mui/material';
import PageTitle from '../utility/typography/PageTitle';
import ButtonWithIcon from '../utility/buttons/ButtonWithIcon';
import ButtonSwitch from '../utility/buttons/ButtonSwitch';
import React from 'react';
import useTheme from '../../../store/ThemeStore';
import ButtonStyled from '../utility/buttons/Button';
import Utils from '../../../helpers/Utils';

const ButtonWrap = styled('div')(() => ({
  marginBottom: '12px',
  '&:last-child': {
    marginBottom: 0,
  },
}));

// const label = { inputProps: { 'aria-label': 'Color switch demo' } };

function settingsWrapper() {
  const themeStore = useTheme();

  const handleLogin = () => {
    // eslint-disable-next-line no-console
    return console.log('should handle login');
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    themeStore.toggleTheme(e.target.checked);
  };

  return (
    <Box>
      <PageTitle title="Podešavanja" marginBottom={'22px'} />
      <ButtonWrap>
        <ButtonStyled onClick={handleLogin}>Uloguj se</ButtonStyled>
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
      <ButtonWrap>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              paddingLeft: '8px',
            }}
          >
            Tamni mod
          </Box>
          <ButtonSwitch checked={themeStore.theme} onChange={(e) => handleSwitchChange(e)} />
        </Box>
      </ButtonWrap>
      {Utils.env !== 'production' && (
        <React.Fragment>
          <PageTitle title="DEV TOOLS" marginBottom={'22px'} />
          <ButtonWrap>
            <ButtonWithIcon
              text={'Obrisi sve podatke sa aplikacije'}
              type={'button'}
              icon={'delete_forever'}
              onClick={() => {
                if (window.confirm('Obrisi sve podatke i vrati na pocetnu stranu?')) {
                  window.localStorage.clear();
                  window.location.href = '/';
                }
              }}
            />
          </ButtonWrap>
        </React.Fragment>
      )}
    </Box>
  );
}

export default settingsWrapper;
