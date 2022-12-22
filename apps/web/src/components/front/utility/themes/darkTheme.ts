import {createTheme} from '@mui/material/styles';

const darkTheme = createTheme({
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
      marginBottom: '30px',
    },
    paragraph: {
      fontSize: '14px',
      color: '#595959',
      marginBottom: '30px',
    },
    link: {
      fontSize: '14px',
      color: '#3274F6',
    },
  },
  customForm: {
    inputField: {
      color: '#091F3E',
      textColor: '#CEE4FF',
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

export default darkTheme;
