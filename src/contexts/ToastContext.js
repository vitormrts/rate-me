import { ToastContainer } from "react-toastify";
import { createContext } from "react";

export const ToastContext = createContext();

const ToastContextProvider = ({ children }) => {
  return (
    <ToastContext.Provider>
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
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
