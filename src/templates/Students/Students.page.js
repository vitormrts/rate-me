import { Group } from "../../components/groups";
import { IconButton } from "../../components/buttons";
import { Table } from "../../components/tables";
import { DefaultContainer, DefaultWrapper } from "../../styles/Common";
import { PersonRemove } from "@mui/icons-material";
import { isTeacherRole } from "../../utils";
import { useAuth } from "../../hooks";

const StudentsPage = () => {
  const { user } = useAuth();

  const isTeacher = isTeacherRole(user?.role);

  const onUserKickButton = (id) => console.log("kick user ", id);

  const data = Array(20).fill({
    id: "1",
    name: "Vitor Martins Cruz",
    email: "vitormartinscruz@usp.br",
  });

  const columns = [
    {
      name: "#",
      key: "id",
    },
    {
      name: "Name",
      key: "name",
    },
    {
      name: "Email",
      key: "email",
    },
    {
      name: "Actions",
      actions: [
        {
          onClick: (id) => onUserKickButton(id),
          Component: ({ onClick }) => (
            <IconButton
              key="kick"
              title="Kick from classroom"
              Icon={PersonRemove}
              onClick={onClick}
            />
          ),
          show: isTeacher,
        },
      ],
    },
  ];

  return (
    <DefaultWrapper>
      <DefaultContainer>
        <Group title="Students">
          <Table columns={columns} data={data} />
        </Group>
      </DefaultContainer>
    </DefaultWrapper>
  );
};

export default StudentsPage;
