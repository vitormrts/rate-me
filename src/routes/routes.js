import {
  ExamsPage,
  ClassroomsPage,
  HomePage,
  LoginPage,
  SignUpPage,
  StudentsPage,
  DashboardPage,
} from "../templates";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="classrooms" element={<ClassroomsPage />} />
        <Route path="exams" element={<ExamsPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
