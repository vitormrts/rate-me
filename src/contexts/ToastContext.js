import { ToastContainer, toast } from "react-toastify";
import { createContext, useMemo } from "react";

export const ToastContext = createContext();

const ToastContextProvider = ({ children }) => {
  const dispatchToast = (message, status) => {
    console.log(message);
    console.log(status);
    const props = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    };

    const toasts = {
      INFO: toast.info,
      SUCCESS: toast.success,
      WARN: toast.warn,
      ERROR: toast.error,
    };
    const targetToast = toasts[status];
    targetToast ? targetToast(message, props) : toast(message, props);
  };

  const memoized = useMemo(() => ({ dispatchToast }), [dispatchToast]);

  return (
    <ToastContext.Provider value={memoized}>
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
