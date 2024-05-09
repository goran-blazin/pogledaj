import {Box, styled} from '@mui/material';
import PageTitle from '../utility/typography/PageTitle';
import ButtonWithIcon from '../utility/buttons/ButtonWithIcon';
import ButtonSwitch from '../utility/buttons/ButtonSwitch';
import React from 'react';
import useTheme from '../../../store/ThemeStore';
import Utils from '../../../helpers/Utils';
import ContentWrapper from '../layout/ContentWrapper';

const ButtonWrap = styled('div')(() => ({
  marginBottom: '12px',
  '&:last-child': {
    marginBottom: 0,
  },
}));

// const label = { inputProps: { 'aria-label': 'Color switch demo' } };

function settingsWrapper() {
  const themeStore = useTheme();

  return (
    <ContentWrapper padding>
      <>
        <PageTitle title="Podešavanja" marginBottom={'22px'} />
        {/*<ButtonWrap>*/}
        {/*  <ButtonStyled onClick={handleLogin}>Uloguj se</ButtonStyled>*/}
        {/*</ButtonWrap>*/}
        {/*<ButtonWrap>*/}
        {/*  <ButtonWithIcon text={'Prati nas'} type={'button'} icon={'connect_without_contact'} />*/}
        {/*</ButtonWrap>*/}
        <ButtonWrap>
          <ButtonWithIcon text={'Kontaktiraj nas'} type={'button'} icon={'support_agent'} />
        </ButtonWrap>
        <ButtonWrap>
          <ButtonWithIcon text={'O nama'} type={'button'} icon={'info_outlined'} />
        </ButtonWrap>
        <ButtonWrap>
          <ButtonWithIcon text={'Uslovi korišćenja'} type={'button'} icon={'rule'} />
        </ButtonWrap>
        {Utils.isBetaMode() && (
          <ButtonWrap>
            <ButtonWithIcon
              text={'Isključi beta mod'}
              type={'button'}
              icon={'info_outlined'}
              onClick={() => {
                if (window.confirm('Isključi beta mod?')) {
                  window.localStorage.removeItem('betaMode');
                  window.location.href = '/';
                }
              }}
            />
          </ButtonWrap>
        )}
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
              Tamni mod (eksperimentalno, moguće da ne radi kako treba na svim telefonima)
            </Box>
            <ButtonSwitch checked={themeStore.darkTheme} onChange={() => themeStore.toggleTheme()} />
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
            {!Utils.isBetaMode() && (
              <ButtonWrap>
                <ButtonWithIcon
                  text={'Ukljuci beta mod'}
                  type={'button'}
                  icon={'info_outlined'}
                  onClick={() => {
                    if (window.confirm('Ukljuci beta mod?')) {
                      window.localStorage.setItem('betaMode', '1');
                      window.location.href = '/';
                    }
                  }}
                />
              </ButtonWrap>
            )}
          </React.Fragment>
        )}
      </>
    </ContentWrapper>
  );
}

export default settingsWrapper;
