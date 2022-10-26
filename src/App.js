import { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import {
  AuthContextProvider,
  ClassroomsContextProvider,
  ToastContextProvider,
} from "./contexts";
import GlobalStyle from "./styles/GlobalStyle";
import { defaultTheme } from "./theme";
import Router from "./routes/routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ToastContextProvider>
        <AuthContextProvider>
          <Router>
            <ClassroomsContextProvider />
          </Router>
        </AuthContextProvider>
      </ToastContextProvider>
    </LocalizationProvider>
  </ThemeProvider>
);

export default App;
