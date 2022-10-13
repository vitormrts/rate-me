import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthContextProvider } from "./contexts";
import routes from "./routes";
import GlobalStyle from "./styles/GlobalStyle";
import { defaultTheme } from "./theme";

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <AuthContextProvider>
      <RouterProvider router={routes} />
    </AuthContextProvider>
  </ThemeProvider>
);

export default App;
