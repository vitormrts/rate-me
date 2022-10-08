import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import routes from "./routes";
import GlobalStyle from "./styles/GlobalStyle";
import { defaultTheme } from "./theme";

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <RouterProvider router={routes} />
  </ThemeProvider>
);

export default App;
