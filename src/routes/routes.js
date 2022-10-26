import {
  ExamsPage,
  ClassroomsPage,
  ListClassroomsPage,
  NewClassroomPage,
  HomePage,
  LoginPage,
  SignUpPage,
  StudentsPage,
  DashboardPage,
  ListExamsPage,
  NewExamPage,
  EditClassroom,
  ListStudentsPage,
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
          <Route path="classrooms" element={<ClassroomsPage />}>
            <Route path="new" element={<NewClassroomPage />} />
            <Route path="list" element={<ListClassroomsPage />} />
            <Route path=":id/edit" element={<EditClassroom />} />
          </Route>
          <Route path="exams" element={<ExamsPage />}>
            <Route path="new" element={<NewExamPage />} />
            <Route path="list" element={<ListExamsPage />} />
            <Route path=":id" element={<ViewExamPage />} />
          </Route>
          <Route path="students" element={<StudentsPage />}>
            <Route path="list" element={<ListStudentsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
