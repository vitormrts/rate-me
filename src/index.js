import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./templates";
import { defaultTheme } from "./theme";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Home />
    </ThemeProvider>
  </React.StrictMode>
);
