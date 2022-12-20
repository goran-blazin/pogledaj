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
import lightTheme from './front/utility/themes/lightTheme'
import darkTheme from './front/utility/themes/darkTheme'

function App() {
  // handle dark theme switch
  const isDark = false;
  // handle env switch
  const reactAppEnv: EnvTypes = process.env.REACT_APP_ENV as EnvTypes;

  return (
    <React.Fragment>
      <div className="App">
        <CssBaseline />
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          {reactAppEnv === 'production' ? (
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
    </React.Fragment>
  );
}

export default App;
