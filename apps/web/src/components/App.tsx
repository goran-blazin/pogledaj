import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';

// components
import FooterMenuWrapper from './front/footer/FooterMenuWrapper';
import HeaderMenuWrapper from './front/header/HeaderMenuWrapper';

// scss
import './App.scss';
import MainContentWrapper from './front/mainContentWrapper/MainContentWrapper';
import ComingSoon from './front/comingSoon/ComingSoon';
import {EnvTypes} from '../types/GeneralTypes';

// theme
import lightTheme from './front/utility/themes/lightTheme';
import darkTheme from './front/utility/themes/darkTheme';
import {QueryClient, QueryClientProvider} from 'react-query';
import Utils from '../helpers/Utils';
import {Route, Routes, useLocation, useSearchParams} from 'react-router-dom';
import {isAdminRoute} from '../routes';
import AdminRoot from './admin/AdminRoot';
import useTheme from '../store/ThemeStore';

// Create a client
const queryClient = new QueryClient();

function App() {
  const [searchParams] = useSearchParams();
  if (!!searchParams.get('setBetaMode')) {
    window.localStorage.setItem('betaMode', '1');
  }

  if (!!searchParams.get('unsetBetaMode')) {
    window.localStorage.removeItem('betaMode');
  }

  // theme store
  const themeStore = useTheme();

  // handle env switch
  const reactAppEnv: EnvTypes = import.meta.env.VITE_ENV as EnvTypes;
  const comingSoon = reactAppEnv === 'production' && !Utils.isBetaMode();
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
        <div className="App">
          <CssBaseline />
          <ThemeProvider theme={themeStore.theme ? darkTheme : lightTheme}>
            {comingSoon ? (
              <ComingSoon />
            ) : (
              <React.Fragment>
                <HeaderMenuWrapper />
                <MainContentWrapper />
                <FooterMenuWrapper />
              </React.Fragment>
            )}
          </ThemeProvider>
        </div>
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
