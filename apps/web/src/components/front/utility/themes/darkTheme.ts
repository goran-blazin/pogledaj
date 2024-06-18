import {createTheme} from '@mui/material/styles';

const darkTheme = createTheme({
  customTypography: {
    mainTitle: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: `var(--white)`,
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
      color: 'var(--light-blue)',
    },
  },
  customForm: {
    inputField: {
      color: `var(--dark-blue)`,
      textColor: `var(--dark-mode-text)`,
    },
    selectField: {
      color: `var(--dark-blue)`,
      textColor: `var(--dark-mode-text)`,
      startAdornmentTextColor: `var(--light-blue)`,
    },
  },
  customBackground: {
    primary: `var(--dark-blue)`,
  },
  customButtons: {
    buttonWithIcon: {
      color: `var(--dark-blue)`,
      textColor: `var(--dark-mode-text)`,
      iconBgColor: `var(--light-blue)`,
    },
    dateButtons: {
      selectedColor: 'var(--dark-mode-text)',
      nonSelectedColor: 'var(--dark-mode-cathegory-blue)',
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
    backgroundColor: `var(--dark-mode-background)`,
    iconColor: `var(--light-blue)`,
    iconHolderBorderColor: `var(--dark-blue-bright)`,
    iconHolderBackgroundColor: `var(--dark-blue)`,
  },
  footerTheme: {
    backgroundColor: `var(--dark-blue)`,
    borderColor: `var(--dark-mode-cathegory-blue)`,
    color: `var(--dark-mode-text)`,
    activeItemColor: `var(--light-blue)`,
  },
  headerTheme: {
    backgroundColor: `var(--dark-blue)`,
    borderColor: `var(--dark-mode-cathegory-blue)`,
    color: `var(--dark-mode-text)`,
    activeItemColor: `var(--light-blue)`,
  },
  mainContentWrapperTheme: {
    backgroundColor: `var(--dark-mode-background)`,
    borderColor: `var(--dark-mode-cathegory-blue)`,
  },
  eventInfoSection: {
    color: `var(--dark-mode-text)`,
    borderColor: `var(--dark-blue)`,
  },
  cardFilm: {
    // use %23 instead of # for svg fill
    backgroundColor: '#132F57',
    borderImageColor: '#081A34',
    borderImageHole: '%23081A34',
    borderImageHoleBg: `%23132F57`,
  },
  searchTextField: {
    backgroundColor: `var(--dark-blue)`,
    borderColor: 'var(--dark-mode-cathegory-blue)',
    color: `var(--dark-mode-text)`,
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: `var(--dark-blue)`,
          color: `var(--dark-mode-text)`,
        },
        option: {
          color: `var(--dark-mode-text)`,
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

export default darkTheme;
