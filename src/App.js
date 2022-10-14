import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import {
  AuthContextProvider,
  ClassroomsContextProvider,
  ModalsContextProvider,
  ToastContextProvider,
} from "./contexts";
import routes from "./routes";
import GlobalStyle from "./styles/GlobalStyle";
import { defaultTheme } from "./theme";

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <ToastContextProvider>
      <AuthContextProvider>
        <ClassroomsContextProvider>
          <ModalsContextProvider>
            <RouterProvider router={routes} />
          </ModalsContextProvider>
        </ClassroomsContextProvider>
      </AuthContextProvider>
    </ToastContextProvider>
  </ThemeProvider>
);

export default App;
