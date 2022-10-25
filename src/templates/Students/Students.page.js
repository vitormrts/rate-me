import { Outlet } from "react-router-dom";
import { Group } from "../../components/groups";

const StudentsPage = () => {
  return (
    <Group title="Students">
      <Outlet />
    </Group>
  );
};

export default StudentsPage;
