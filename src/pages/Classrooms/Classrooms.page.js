import { Table } from "../../components/tables";
import { DeleteRounded, EditRounded, PersonRounded } from "@mui/icons-material";
import { toast } from "react-toastify";
import { ConfirmModal } from "../../components/modals";
import { Button, IconButton } from "../../components/buttons";
import { isTeacherRole } from "../../utils";
import { useAuth, useClassrooms } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Empty } from "../../components/empty";
import { Group } from "../../components/groups";

const ListClassroomsPage = () => {
  const { allClassrooms, deleteClassroom, loading } = useClassrooms();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isTeacher = isTeacherRole(user?.role) || true;

  const onEditButtonClick = (id) =>
    navigate(`/dashboard/classrooms/${id}/edit`);

  const onStudentsButtonClick = (id) =>
    navigate(`/dashboard/classrooms/${id}/students`);

  const onConfirmClassroomDelete = async (id) => {
    const { success, message } = await deleteClassroom(id);
    if (success) {
      toast.success(message);
      navigate(0);
      return;
    }
    toast.error(message);
  };

  const CreateClassroomButton = () => {
    if (!isTeacher) return;
    return (
      <Button
        onClick={() => navigate("/dashboard/classrooms/new")}
        text="+ Add classroom"
      />
    );
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
          onClick: (id) => onStudentsButtonClick(id),
          Component: ({ onClick }) => (
            <IconButton
              key="show-students"
              title="View students"
              Icon={PersonRounded}
              onClick={onClick}
            />
          ),
          show: isTeacher,
        },
      ],
    },
  ];
  return (
    <Group title="Classrooms" Button={CreateClassroomButton}>
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
    </Group>
  );
};

export default ListClassroomsPage;
