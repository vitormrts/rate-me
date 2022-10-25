import { Group } from "../../components/groups";
import { Button } from "../../components/buttons";
import { isTeacherRole } from "../../utils";
import { useAuth } from "../../hooks";
import { Outlet, useNavigate } from "react-router-dom";

const ClassroomsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isTeacher = isTeacherRole(user?.role) || true;

  const CreateClassroomButton = () => {
    if (!isTeacher) return;
    return (
      <Button
        onClick={() => navigate("/dashboard/classrooms/new")}
        text="+ Add classroom"
      />
    );
  };

  return (
    <Group title="Classrooms" Button={CreateClassroomButton}>
      <Outlet />
    </Group>
  );
};

export default ClassroomsPage;
