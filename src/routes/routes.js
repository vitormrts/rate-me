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
  EnterClassroom,
  TakeExamPage,
  PerformancePage,
  PostPerformancePage,
} from "../pages";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { useAuth, useClassrooms } from "../hooks";
import { isTeacherRole } from "../utils";

const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return;
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const OwnerClassroomRoute = ({ children }) => {
  const { classroomId } = useParams();
  const { classroom } = useClassrooms(classroomId);
  const { user, loading } = useAuth();

  const isOwner = classroom?.teacherId === user?.uid;

  const isTeacher = isTeacherRole(user?.role);

  if (loading || !classroom) {
    return;
  }

  if (!user || !isTeacher || !isOwner) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const TeacherRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const isTeacher = isTeacherRole(user?.role);

  if (loading) {
    return;
  }
  if (!user || !isTeacher) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const isTeacher = isTeacherRole(user?.role);

  if (loading) {
    return;
  }
  if (!user || isTeacher) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="*" element={<h1>Error not found</h1>} />
        <Route path="auth">
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route
          path="dashboard"
          element={
            <AuthRoute>
              <DashboardPage />
            </AuthRoute>
          }
        >
          <Route
            path="classrooms"
            element={
              <AuthRoute>
                <ClassroomsPage />
              </AuthRoute>
            }
          />
          <Route
            path="classrooms/new"
            element={
              <TeacherRoute>
                <NewClassroomPage />
              </TeacherRoute>
            }
          />
          <Route
            path="classrooms/:classroomId/edit"
            element={
              <OwnerClassroomRoute>
                <EditClassroom />
              </OwnerClassroomRoute>
            }
          />
          <Route
            path="classrooms/:classroomId/students"
            element={
              <OwnerClassroomRoute>
                <StudentsPage />
              </OwnerClassroomRoute>
            }
          />
          <Route
            path="classrooms/:classroomId/invite"
            element={
              <StudentRoute>
                <EnterClassroom />
              </StudentRoute>
            }
          />
          <Route
            path="classrooms/:classroomId/exams"
            element={
              <AuthRoute>
                <ExamsPage />
              </AuthRoute>
            }
          />
          <Route
            path="classrooms/:classroomId/exams/new"
            element={
              <TeacherRoute>
                <NewExamPage />
              </TeacherRoute>
            }
          />
          <Route
            path="classrooms/:classroomId/exams/:examId"
            element={
              <OwnerClassroomRoute>
                <ViewExamPage />
              </OwnerClassroomRoute>
            }
          />
          <Route
            path="classrooms/:classroomId/exams/:examId/take"
            element={
              <StudentRoute>
                <TakeExamPage />
              </StudentRoute>
            }
          />
          <Route
            path="classrooms/:classroomId/exams/:examId/performance"
            element={
              <AuthRoute>
                <PerformancePage />
              </AuthRoute>
            }
          />
          <Route
            path="classrooms/:classroomId/exams/:examId/performance/:performanceId"
            element={
              <OwnerClassroomRoute>
                <PostPerformancePage />
              </OwnerClassroomRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
