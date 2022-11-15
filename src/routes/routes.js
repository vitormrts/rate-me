import {
  ExamsPage,
  ClassroomsPage,
  NewClassroomPage,
  HomePage,
  LoginPage,
  SignUpPage,
  StudentsPage,
  DashboardPage,
  NewExamPage,
  EditClassroom,
  ViewExamPage,
} from "../pages";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="auth">
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="dashboard" element={<DashboardPage />}>
          <Route path="classrooms" element={<ClassroomsPage />} />
          <Route path="classrooms/new" element={<NewClassroomPage />} />
          <Route
            path="classrooms/:classroomId/edit"
            element={<EditClassroom />}
          />
          <Route
            path="classrooms/:classroomId/students"
            element={<StudentsPage />}
          />
          <Route path="classrooms/:classroomId/exams" element={<ExamsPage />} />
          <Route
            path="classrooms/:classroomId/exams/new"
            element={<NewExamPage />}
          />
          <Route path="exams/:id" element={<ViewExamPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
