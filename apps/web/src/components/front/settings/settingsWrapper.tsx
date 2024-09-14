import {Box, styled} from '@mui/material';
import PageTitle from '../utility/typography/PageTitle';
import ButtonWithIcon from '../utility/buttons/ButtonWithIcon';
import ButtonSwitch from '../utility/buttons/ButtonSwitch';
import React from 'react';
import Utils from '../../../helpers/Utils';
import ContentWrapper from '../layout/ContentWrapper';
import {useNavigate} from 'react-router-dom';
import {namedRoutes} from '../../../routes';
import MiscTextWrapper from '../layout/MiscTextWrapper';
import useUserSettings from '../../../store/UserSettingsStore';

const ButtonWrap = styled('div')(({theme}) => ({
  marginBottom: '12px',
  color: theme.customButtons.buttonWithIcon.textColor,
  fontSize: '14px',
  '&:last-child': {
    marginBottom: 0,
  },
}));

// const label = { inputProps: { 'aria-label': 'Color switch demo' } };

function settingsWrapper() {
  const navigate = useNavigate();
  const userSettingsStore = useUserSettings();

  return (
    <ContentWrapper padding>
      <MiscTextWrapper>
        <React.Fragment>
          {/* <Box
            sx={{
              textAlign: 'center',
              margin: '0 auto',
              maxWidth: '800px',
              '& img': {
                maxWidth: '100%',
                height: 'auto'
              }
            }}
          >
            <img src="/img/sofa.png" alt="" />
          </Box> */}
          <PageTitle title="Podešavanja" marginBottom={'22px'} />
          {/*<ButtonWrap>*/}
          {/*  <ButtonStyled onClick={handleLogin}>Uloguj se</ButtonStyled>*/}
          {/*</ButtonWrap>*/}
          {/*<ButtonWrap>*/}
          {/*  <ButtonWithIcon text={'Prati nas'} type={'button'} icon={'connect_without_contact'} />*/}
          {/*</ButtonWrap>*/}
          <ButtonWrap>
            <ButtonWithIcon
              text={'Prati nas'}
              type={'button'}
              icon={'chat_bubble_outline_icon'}
              onClick={() => navigate(namedRoutes.followUs)}
            />
          </ButtonWrap>
          <ButtonWrap>
            <ButtonWithIcon
              text={'Kontaktirajte nas'}
              type={'button'}
              icon={'headset_mic_outlined_icon'}
              onClick={() => navigate(namedRoutes.contactUs)}
            />
          </ButtonWrap>
          <ButtonWrap>
            <ButtonWithIcon
              text={'O nama'}
              type={'button'}
              icon={'info_outlined'}
              onClick={() => navigate(namedRoutes.aboutUs)}
            />
          </ButtonWrap>
          <ButtonWrap>
            <ButtonWithIcon
              text={'Uslovi korišćenja'}
              type={'button'}
              icon={'rule'}
              onClick={() => navigate(namedRoutes.termsOfAgreement)}
            />
          </ButtonWrap>
          <ButtonWrap>
            <ButtonWithIcon
              text={'Politika privatnosti'}
              type={'button'}
              icon={'privacy_tip_outlined_icon'}
              onClick={() => navigate(namedRoutes.privacyPolicy)}
            />
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
                Tamni mod
              </Box>
              <ButtonSwitch
                checked={userSettingsStore.theme === 'dark'}
                onChange={() => userSettingsStore.toggleTheme()}
              />
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
        </React.Fragment>
      </MiscTextWrapper>
    </ContentWrapper>
  );
}

export default settingsWrapper;
