import {createTheme} from '@mui/material/styles';
import '../../../../styles/App.scss';

const lightTheme = createTheme({
  customTypography: {
    color: `var(--dark-grey)`,
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
    movieProjectionsSubHeader: {
      color: '#8A8A8A',
    },
  },
  customForm: {
    inputField: {
      color: `var(--input-field-grey)`,
      textColor: `var(--dark-grey)`,
    },
    selectField: {
      color: `var(--input-field-grey)`,
      textColor: `var(--dark-grey)`,
      // startAdornmentTextColor: '#8A8A8A',
      startAdornmentTextColor: `var(--light-blue)`,
    },
    inputFieldStyled: {
      color: `var(--dark-grey)`,
      backgroundColor: `var(--cathegory-grey)`,
    },
    chipStyled: {
      color: 'var(--cathegory-grey)',
      background: `#00000042`,
    },
  },
  customBackground: {
    primary: `var(--input-field-grey)`,
  },
  customButtons: {
    buttonWithIcon: {
      color: `var(--input-field-grey)`,
      textColor: `var(--dark-grey)`,
      iconBgColor: `var(--light-blue)`,
    },
    dateButtons: {
      selectedColor: 'var(--light-blue)',
      nonSelectedColor: 'var(--cathegory-grey)',
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
      color: `var(--light-grey)`,
    },
    lightGrey: {
      color: `var(--input-field-grey)`,
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
  eventPreviewAction: {
    backgroundColor: `var(--white)`,
    iconColor: `var(--light-grey)`,
    iconHolderBorderColor: `var(--input-field-grey-light-border)`,
    iconHolderBackgroundColor: `var(--input-field-grey-light)`,
  },
  metaThemeBackgroundColor: '#F5F5F5',
  footerTheme: {
    backgroundColor: `var(--input-field-grey-light)`,
    borderColor: `var(--input-field-grey-light-border)`,
    color: `var(--dark-grey)`,
    activeItemColor: `var(--light-blue)`,
  },
  headerTheme: {
    backgroundColor: `var(--input-field-grey-light)`,
    borderColor: `var(--input-field-grey-light-border)`,
    color: `var(--dark-grey)`,
    activeItemColor: `var(--light-blue)`,
  },
  mainContentWrapperTheme: {
    backgroundColor: `var(--white)`,
    borderColor: `var(--input-field-grey-light-border)`,
  },
  eventInfoSection: {
    color: `var(--dark-grey)`,
    borderColor: `var(--input-field-grey)`,
  },
  cardFilm: {
    backgroundColor: '#1C1C1C',
    borderImageColor: '#1C1C1C',
    borderImageHole: 'white',
    borderImageHoleBg: '%231C1C1C',
  },
  searchTextField: {
    backgroundColor: `var(--input-field-grey-light)`,
    borderColor: `var(--cathegory-grey)`,
    color: `var(--dark-grey)`,
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: `var(--input-field-grey-light)`,
          color: `var(--dark-grey)`,
        },
        option: {
          color: `var(--dark-grey)`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          backgroundColor: `var(--input-field-grey)`,
          color: `var(--dark-grey)`,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          backgroundColor: `var(--input-field-grey)`,
        },
      },
    },
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

export default lightTheme;
