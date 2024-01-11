import {createTheme} from '@mui/material/styles';
import '../../../../styles/App.scss';

// TODO remove commented lines once tested

const lightTheme = createTheme({
  customTypography: {
    mainTitle: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: `var(--dark-grey)`,
    },
    pageTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: `var(--light-blue)`,
      marginBottom: '30px',
    },
    paragraph: {
      fontSize: '14px',
      color: `var(--dark-grey)`,
      marginBottom: '30px',
    },
    link: {
      fontSize: '14px',
      color: `var(--light-blue)`,
    },
  },
  customForm: {
    inputField: {
      color: '#F0F0F0',
      textColor: `var(--dark-grey)`,
    },
    selectField: {
      color: '#F0F0F0',
      textColor: `var(--dark-grey)`,
      startAdornmentTextColor: '#8A8A8A',
    },
  },
  customBackground: {
    primary: '#F0F0F0',
  },
  customButtons: {
    buttonWithIcon: {
      color: '#F0F0F0',
      textColor: `var(--dark-grey)`,
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
      color: `var(--dark-grey)`,
    },
    grey: {
      color: '#A4A4A4',
    },
    lightGrey: {
      color: '#F0F0F0',
    },
    darkBlue: {
      color: `var(--dark-blue)`,
    },
    lightBlue: {
      color: `var(--light-blue)`,
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
      // main: `var(--light-blue)`, // var not supported ??
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

export default lightTheme;
