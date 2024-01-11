import {createTheme} from '@mui/material/styles';
import '../../../../styles/App.scss'

// TODO remove commented lines once tested

const lightTheme = createTheme({
  customTypography: {
    mainTitle: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#595959',
    },
    pageTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: `var(--light-blue)`,
      // color: '#3274F6',
      marginBottom: '30px',
    },
    paragraph: {
      fontSize: '14px',
      color: '#595959',
      marginBottom: '30px',
    },
    link: {
      fontSize: '14px',
      color: `var(--light-blue)`,
      // color: '#3274F6',
    },
  },
  customForm: {
    inputField: {
      color: '#F0F0F0',
      textColor: '#595959',
    },
    selectField: {
      color: '#F0F0F0',
      textColor: '#595959',
      startAdornmentTextColor: '#8A8A8A',
    },
  },
  customBackground: {
    primary: '#F0F0F0',
  },
  customButtons: {
    buttonWithIcon: {
      color: '#F0F0F0',
      textColor: '#595959',
      iconBgColor: '#3274F6',
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
    lightGrey: {
      color: '#F0F0F0',
    },
    darkBlue: {
      // color: '#091F3E',
      color: `var(--dark-blue)`,
    },
    lightBlue: {
      color: `var(--light-blue)`,
      // color: '#3274F6',
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
      main: `var(--light-blue)`,
      // main: '#3274F6',
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

export default lightTheme;
