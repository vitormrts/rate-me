import { HomePage, SignUpPage } from "../templates";

import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "sign-up",
    element: <SignUpPage />,
  },
]);

export default routes;
