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
import {useSearchParams} from 'react-router-dom';

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

  // handle dark theme switch
  const isDark = false;
  // handle env switch
  const reactAppEnv: EnvTypes = process.env.REACT_APP_ENV as EnvTypes;
  const comingSoon = reactAppEnv === 'production' && !Utils.isBetaMode();

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <CssBaseline />
          <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
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
