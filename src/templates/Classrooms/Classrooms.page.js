import { Group } from "../../components/groups";
import { Button, IconButton } from "../../components/buttons";
import { copyToClipboard, isTeacherRole } from "../../utils";
import { useAuth, useModal } from "../../hooks";
import { Table } from "../../components/tables";
import { EditRounded, DeleteRounded, PersonAdd } from "@mui/icons-material";
import { toast } from "react-toastify";
import { DefaultContainer, DefaultWrapper } from "../../styles/Common";

const ClassroomsPage = () => {
  const { open } = useModal();
  const { user } = useAuth();

  const isTeacher = isTeacherRole(user?.role);

  const CreateClassroomButton = () => {
    const showButton = isTeacherRole(user?.role);
    if (!showButton) {
      return;
    }
    return (
      <Button onClick={() => open("ADD_CLASSROOM")} text="+ Add classroom" />
    );
  };

  const onInviteButtonClick = (id) => {
    const { success } = copyToClipboard(id);
    success
      ? toast.success("Room URL copied! Send it to your student")
      : toast.error("There was an error copying the room URL");
  };

  const onEditButtonClick = (id) => console.log("edit ", id);

  const onDeleteButtonClick = (id) => console.log("delete ", id);

  const data = Array(20).fill({
    id: "1",
    name: "Sala exemplo",
    description: "Essa é uma sala de exemplo",
    students: 10,
    exams: 5,
    openExams: 3,
    closedExams: 2,
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
      name: "Description",
      key: "description",
    },
    {
      name: "Students",
      key: "students",
    },
    {
      name: "Exams",
      key: "exams",
    },
    {
      name: "Exams Open",
      key: "openExams",
    },
    {
      name: "Exams Closed",
      key: "closedExams",
    },
    {
      name: "Actions",
      actions: [
        {
          onClick: (id) => onEditButtonClick(id),
          Component: ({ onClick }) => (
            <IconButton
              key="edit"
              title="Edit"
              Icon={EditRounded}
              onClick={onClick}
            />
          ),
        },
        {
          onClick: (id) => onDeleteButtonClick(id),
          Component: ({ onClick }) => (
            <IconButton
              key="delete"
              title="Delete"
              Icon={DeleteRounded}
              onClick={onClick}
            />
          ),
          show: isTeacher,
        },
        {
          onClick: (id) => onInviteButtonClick(id),
          Component: ({ onClick }) => (
            <IconButton
              key="add"
              title="Invite student"
              Icon={PersonAdd}
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
        <Group
          id="classrooms"
          title="Classrooms"
          Button={CreateClassroomButton}
        >
          <Table columns={columns} data={data} />
        </Group>
      </DefaultContainer>
    </DefaultWrapper>
  );
};

export default ClassroomsPage;
