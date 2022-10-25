import { Button } from "../../components/buttons";
import { Group } from "../../components/groups";
import { isTeacherRole } from "../../utils";
import { useAuth } from "../../hooks";
import { Outlet, useNavigate } from "react-router-dom";

const ExamsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isTeacher = isTeacherRole(user?.role) || true;

  const CreateExamButton = () => {
    if (!isTeacher) return;
    return (
      <Button
        onClick={() => navigate("/dashboard/exams/new")}
        text="+ Add Exam"
      />
    );
  };

  return (
    <Group id="exams" title="Exams" Button={CreateExamButton}>
      <Outlet />
    </Group>
  );
};

export default ExamsPage;
