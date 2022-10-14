import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {
  AuthContextProvider,
  ClassroomsContextProvider,
  ModalsContextProvider,
} from "./contexts";
import routes from "./routes";
import GlobalStyle from "./styles/GlobalStyle";
import { defaultTheme } from "./theme";

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <AuthContextProvider>
      <ClassroomsContextProvider>
        <ModalsContextProvider>
          <RouterProvider router={routes} />
        </ModalsContextProvider>
      </ClassroomsContextProvider>
    </AuthContextProvider>
  </ThemeProvider>
);

export default App;
