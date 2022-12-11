import {ThemeOptions} from '@mui/material/styles';
import React from 'react';

declare module '@mui/material/styles' {
  interface Theme {
    customTypography: {
      mainTitle: {
        fontSize: string;
        fontWeight: string;
        color: string;
      };
      pageTitle: {
        fontSize: string;
        fontWeight: string;
        color: string;
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
