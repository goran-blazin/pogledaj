import React from 'react';

declare module '@mui/material/styles' {
  interface Theme {
    customTypography: {
      mainTitle: {
        // missing font weight
        fontSize: string;
        fontWeight: string;
        color: string;
      };
      pageTitle: {
        // missing font weight
        fontSize: string;
        fontWeight: string;
        color: string;
        marginBottom: string;
      };
      paragraph: {
        fontSize: string;
        color: string;
        marginBottom: string;
      };
      link: {
        fontSize: string;
        color: string;
      };
      movieProjectionsSubHeader: {
        color: string;
      };
    };
    customButtons: {
      buttonWithIcon: {
        color: string;
        textColor: string;
        iconBgColor: string;
      };
      dateButtons: {
        selectedColor: string;
        nonSelectedColor: string;
      };
    };
    customForm: {
      inputField: {
        color: string;
        textColor: string;
      };
      selectField: {
        color: string;
        textColor: string;
        startAdornmentTextColor: string;
      };
    };
    customBackground: {
      primary: string;
    };
    colorPalette: {
      darkGrey: {
        color: string;
      };
      grey: {
        color: string;
      };
      lightGrey: {
        color: string;
      };
      darkBlue: {
        color: string;
      };
      lightBlue: {
        color: string;
      };
    };
    eventPreviewAction: {
      backgroundColor: string;
      iconColor: string;
      iconHolderBorderColor: string;
      iconHolderBackgroundColor: string;
    };
    footerTheme: {
      backgroundColor: string;
      color: string;
      activeItemColor: string;
      borderColor: string;
    };
    headerTheme: {
      backgroundColor: string;
      color: string;
      activeItemColor: string;
      borderColor: string;
    };
    mainContentWrapperTheme: {
      backgroundColor: string;
      borderColor: string;
    };
  }

  interface ThemeOptions {
    customTypography?: {
      mainTitle?: {
        fontSize: React.CSSProperties['fontSize'];
        fontWeight: React.CSSProperties['fontWeight'];
        color: React.CSSProperties['color'];
      };
      pageTitle?: {
        fontSize: React.CSSProperties['fontSize'];
        fontWeight: React.CSSProperties['fontWeight'];
        color: React.CSSProperties['color'];
        marginBottom: React.CSSProperties['marginBottom'];
      };
      paragraph?: {
        fontSize: React.CSSProperties['fontSize'];
        color: React.CSSProperties['color'];
        marginBottom: React.CSSProperties['marginBottom'];
      };
      link?: {
        fontSize: React.CSSProperties['fontSize'];
        color: React.CSSProperties['color'];
      };
      movieProjectionsSubHeader?: {
        color: React.CSSProperties['color'];
      };
    };
    customButtons?: {
      buttonWithIcon: {
        color: React.CSSProperties['color'];
        textColor: React.CSSProperties['color'];
        iconBgColor: React.CSSProperties['color'];
      };
      dateButtons: {
        selectedColor: React.CSSProperties['color'];
        nonSelectedColor: React.CSSProperties['color'];
      };
    };
    customForm?: {
      inputField?: {
        color: React.CSSProperties['color'];
        textColor: React.CSSProperties['color'];
      };
      selectField: {
        color: React.CSSProperties['color'];
        textColor: React.CSSProperties['color'];
        startAdornmentTextColor: React.CSSProperties['color'];
      };
    };
    colorPalette?: {
      darkGrey?: {
        color: React.CSSProperties['color'];
      };
      grey?: {
        color: React.CSSProperties['color'];
      };
      lightGrey?: {
        color: React.CSSProperties['color'];
      };
      darkBlue?: {
        color: React.CSSProperties['color'];
      };
      lightBlue?: {
        color: React.CSSProperties['color'];
      };
    };
    customBackground: {
      primary: React.CSSProperties['color'];
    };
    eventPreviewAction: {
      backgroundColor: React.CSSProperties['backgroundColor'];
      iconColor: React.CSSProperties['color'];
      iconHolderBorderColor: React.CSSProperties['borderColor'];
      iconHolderBackgroundColor: React.CSSProperties['backgroundColor'];
    };
    footerTheme: {
      backgroundColor: React.CSSProperties['backgroundColor'];
      borderColor: React.CSSProperties['borderColor'];
      color: React.CSSProperties['color'];
      activeItemColor: React.CSSProperties['color'];
    };
    headerTheme: {
      backgroundColor: React.CSSProperties['backgroundColor'];
      borderColor: React.CSSProperties['borderColor'];
      color: React.CSSProperties['color'];
      activeItemColor: React.CSSProperties['color'];
    };
    mainContentWrapperTheme: {
      backgroundColor: React.CSSProperties['backgroundColor'];
      borderColor: React.CSSProperties['backgroundColor'];
    };
  }
}
