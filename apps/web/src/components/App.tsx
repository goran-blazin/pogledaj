import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import {useLocation} from 'react-router-dom';

// components
import FooterMenuWrapper from './front/footer/FooterMenuWrapper';
import HeaderMenuWrapper from './front/header/HeaderMenuWrapper';

// scss
import './App.scss';
import MainContentWrapper from './front/mainContentWrapper/MainContentWrapper';

const theme = createTheme({
  customTypography: {
    mainTitle: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#595959',
    },
    pageTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#3274F6',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  colorPalette: {
    darkGrey: {
      color: '#595959',
    },
    grey: {
      color: '#A4A4A4',
    },
    darkBlue: {
      color: '#091F3E',
    },
    lightBlue: {
      color: '#3274F6',
    },
  },
  typography: {
    fontFamily: ['Open Sans'].join(','),
  },
  palette: {
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    primary: {
      main: '#3274F6',
    },
    secondary: {
      main: '#F5F5F5',
      contrastText: '#A4A4A4',
    },
    text: {
      primary: '#000000',
      secondary: '#FFFFFF',
    },
  },
});

// styles for dark theme
const themeDark = createTheme({
  customTypography: {
    mainTitle: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#ffffff',
    },
    pageTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#3274F6',
    },
  },
  colorPalette: {
    darkGrey: {
      color: '#595959',
    },
    grey: {
      color: '#A4A4A4',
    },
    darkBlue: {
      color: '#091F3E',
    },
    lightBlue: {
      color: '#3274F6',
    },
  },
  typography: {
    fontFamily: ['Open Sans'].join(','),
  },
  palette: {
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    primary: {
      main: '#3274F6',
    },
    secondary: {
      main: '#F5F5F5',
      contrastText: '#A4A4A4',
    },
    text: {
      primary: '#000000',
      secondary: '#FFFFFF',
    },
  },
});

function App() {
  // handle dark theme switch
  const isDark = false;

  const {pathname} = useLocation();

  // eslint-disable-next-line no-console
  console.log('location', pathname);

  return (
    <React.Fragment>
      <div className="App">
        <CssBaseline />
        <ThemeProvider theme={isDark ? themeDark : theme}>
          {pathname.includes('coming-soon') ? null : <HeaderMenuWrapper />}
          <MainContentWrapper />
          {pathname.includes('coming-soon') ? null : <FooterMenuWrapper />}
        </ThemeProvider>
      </div>
    </React.Fragment>
  );
}

export default App;
