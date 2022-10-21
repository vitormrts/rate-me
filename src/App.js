import { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import {
  AuthContextProvider,
  ClassroomsContextProvider,
  ModalsContextProvider,
  ToastContextProvider,
} from "./contexts";
import GlobalStyle from "./styles/GlobalStyle";
import { defaultTheme } from "./theme";
import Router from "./routes/routes";

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <ToastContextProvider>
      <AuthContextProvider>
        <ModalsContextProvider>
          <Router>
            <ClassroomsContextProvider />
          </Router>
        </ModalsContextProvider>
      </AuthContextProvider>
    </ToastContextProvider>
  </ThemeProvider>
);

export default App;
