import { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./contexts";
import GlobalStyle from "./styles/GlobalStyle";
import { defaultTheme } from "./theme";
import Router from "./routes/routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ToastContainer } from "react-toastify";

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </LocalizationProvider>
  </ThemeProvider>
);

export default App;
