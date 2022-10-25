import { Table } from "../../components/tables";
import { DeleteRounded, EditRounded, PersonAdd } from "@mui/icons-material";
import { toast } from "react-toastify";
import { ConfirmModal } from "../../components/modals";
import { IconButton } from "../../components/buttons";
import { copyToClipboard, isTeacherRole } from "../../utils";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";

const ListClassroomsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isTeacher = isTeacherRole(user?.role) || true;

  const onInviteButtonClick = (id) => {
    const { success } = copyToClipboard(id);
    success
      ? toast.info("Room URL copied! Send it to your student")
      : toast.error("There was an error copying the room URL");
  };

  const onEditButtonClick = (id) =>
    navigate(`/dashboard/classrooms/${id}/edit`);

  const onConfirmClassroomDelete = (id) => {
    console.log("Remove classroom ", id);
    toast.success("Classroom removed successfully");
  };

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
          show: isTeacher,
        },
        {
          onConfirm: (id) => onConfirmClassroomDelete(id),
          Component: ({ onConfirm }) => (
            <ConfirmModal
              onConfirm={onConfirm}
              text="Are you sure you want to delete this room?"
              description="By deleting this room you will lose the exams and students related to it."
            >
              <IconButton key="delete" title="Delete" Icon={DeleteRounded} />
            </ConfirmModal>
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
  return <Table columns={columns} data={data} />;
};

export default ListClassroomsPage;
