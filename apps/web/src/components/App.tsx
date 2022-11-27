import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';

// components
import FooterMenuWrapper from './front/footer/FooterMenuWrapper';
import HeaderMenuWrapper from './front/header/HeaderMenuWrapper';

// scss
import './App.scss';
import MainContentWrapper from './front/mainContentWrapper/MainContentWrapper';

const theme = createTheme({
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
      secondary: '#595959',
    },
  },
});

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <HeaderMenuWrapper />
          <MainContentWrapper />
          <FooterMenuWrapper />
        </ThemeProvider>
      </div>
    </React.Fragment>
  );
}

export default App;
