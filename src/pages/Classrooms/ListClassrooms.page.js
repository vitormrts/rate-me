import { Table } from "../../components/tables";
import { DeleteRounded, EditRounded, PersonAdd } from "@mui/icons-material";
import { toast } from "react-toastify";
import { ConfirmModal } from "../../components/modals";
import { IconButton } from "../../components/buttons";
import { copyToClipboard, isTeacherRole } from "../../utils";
import { useAuth, useClassrooms } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Empty } from "../../components/empty";

const ListClassroomsPage = () => {
  const { allClassrooms, deleteClassroom, loading } = useClassrooms();
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

  const onConfirmClassroomDelete = async (id) => {
    const { success, message } = await deleteClassroom(id);
    if (success) {
      toast.success(message);
      navigate(0);
      return;
    }
    toast.error(message);
  };

  const columns = [
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
  return (
    <>
      {!loading && allClassrooms.length > 0 && (
        <Table columns={columns} data={allClassrooms} />
      )}
      {!loading && allClassrooms.length === 0 && (
        <Empty
          image="/assets/classroom/empty.jpg"
          title="Oops! You have no classrooms created."
          subTitle="If you wish to proceed, please create a classroom."
        />
      )}
    </>
  );
};

export default ListClassroomsPage;
