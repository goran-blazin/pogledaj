import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// components
import FooterMenuWrapper from "./front/footer/FooterMenuWrapper";
import HeaderMenuWrapper from "./front/header/HeaderMenuWrapper";

// scss
import "./App.scss";
import MainContentWrapper from "./front/mainContentWrapper/MainContentWrapper";

const theme = createTheme({
  palette: {
    background: {
      "default": "#091F3E"
    },
    primary: {
      main: '#091F3E',
    },
    text: {
      primary: "#000000",
      secondary: "#edf2ff"
    }
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
