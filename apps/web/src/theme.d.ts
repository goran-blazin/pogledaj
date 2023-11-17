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
    };
    customButtons: {
      buttonWithIcon: {
        color: string;
        textColor: string;
        iconBgColor: string;
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
    colorPalette: {
      darkGrey: {
        color: string;
      };
      grey: {
        color: string;
      };
      darkBlue: {
        color: string;
      };
      lightBlue: {
        color: string;
      };
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
    };
    customButtons?: {
      buttonWithIcon: {
        color: React.CSSProperties['color'];
        textColor: React.CSSProperties['color'];
        iconBgColor: React.CSSProperties['color'];
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
      darkBlue?: {
        color: React.CSSProperties['color'];
      };
      lightBlue?: {
        color: React.CSSProperties['color'];
      };
    };
  }
}
