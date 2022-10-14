import { ClassroomPage, HomePage, LoginPage, SignUpPage } from "../templates";

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
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "classrooms",
    element: <ClassroomPage />,
  },
]);

export default routes;
