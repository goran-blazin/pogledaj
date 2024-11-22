import React, {useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon';
import {LocalizationProvider, PickersLocaleText} from '@mui/x-date-pickers';

// components
import FooterMenuWrapper from './front/footer/FooterMenuWrapper';
import HeaderMenuWrapper from './front/header/HeaderMenuWrapper';
import MainLayout from './front/layout/MainLayout';
import CenterContent from './front/layout/CenterContent';

// scss
import '../styles/App.scss';
import MainContentWrapper from './front/mainContentWrapper/MainContentWrapper';

// theme
import lightTheme from './front/utility/themes/lightTheme';
import darkTheme from './front/utility/themes/darkTheme';
import {QueryClient, QueryClientProvider} from 'react-query';
import Utils from '../helpers/Utils';
import {Route, Routes, useLocation, useSearchParams} from 'react-router-dom';
import {isAdminRoute} from '../routes';
import AdminRoot from './admin/AdminRoot';
import useUserSettings from '../store/UserSettingsStore';
import useAppStore from '../store/AppStore';
import BigInfoDialog from './front/utility/BigInfoDialog';
import ComingSoon from './front/comingSoon/ComingSoon';

// Create a client
const queryClient = new QueryClient();

const customLocaleText: Partial<PickersLocaleText<Record<string, string>>> = {
  okButtonLabel: 'OK',
  cancelButtonLabel: 'OTKAŽI',
};

function App() {
  // init google tag if production
  if (Utils.env === 'production') {
    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line no-inner-declarations
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    gtag('js', new Date());

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    gtag('config', 'G-1ZNMWCBWV4');
  }

  const [searchParams] = useSearchParams();
  if (searchParams.get('setBetaMode')) {
    window.localStorage.setItem('betaMode', '1');
  }

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  if (searchParams.get('unsetBetaMode')) {
    window.localStorage.removeItem('betaMode');
  }

  const userSettingsStore = useUserSettings();
  const appStore = useAppStore();

  useEffect(() => {
    const currentTheme = userSettingsStore.theme === 'light' ? lightTheme : darkTheme;

    if (metaThemeColor) {
      // Update the content attribute
      metaThemeColor.setAttribute('content', currentTheme.metaThemeBackgroundColor);
    }
  }, [userSettingsStore.theme]); // Dependency on theme ensures this effect runs when the theme changes

  // handle env switch
  const repairModeEnabled = true;
  const repairMode = Utils.env === 'production' && repairModeEnabled;
  const location = useLocation();

  return isAdminRoute(location.pathname) ? (
    // admin backoffice
    <React.Fragment>
      <Routes>
        <Route path="/admin/*" element={<AdminRoot />} />
      </Routes>
    </React.Fragment>
  ) : (
    // customer front
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterLuxon} localeText={customLocaleText}>
          <div className="App">
            <CssBaseline />
            <ThemeProvider theme={userSettingsStore.theme === 'light' ? lightTheme : darkTheme}>
              <MainLayout>
                <CenterContent>
                  {repairMode ? (
                    <ComingSoon />
                  ) : (
                    <React.Fragment>
                      <HeaderMenuWrapper />
                      <MainContentWrapper />
                      {Utils.isBetaMode() && <FooterMenuWrapper />}
                      <BigInfoDialog
                        open={appStore.firstTimeVisitor}
                        imgSrc={'/img/couchPopcorn.svg'}
                        header={'Dobrodošli na pogledaj!'}
                        text={`
                            Čestitamo, postali ste deo budućnosti bioskopa! 
                            Svi vaši omiljeni filmski titlovi, omiljeni bioskopi od sada se nalaze na jednom mestu, nadohvat ruke! 
                            Neka uživanje počne!
                        `}
                        buttons={[{text: 'Pristupi platformi', onClick: appStore.setNotFirstTimeVisitor}]}
                      />
                    </React.Fragment>
                  )}
                </CenterContent>
              </MainLayout>
            </ThemeProvider>
          </div>
        </LocalizationProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
