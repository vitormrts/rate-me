import { Table } from "../../components/tables";
import {
  DeleteRounded,
  EditRounded,
  PersonRounded,
  QuizRounded,
  HomeRounded,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { ConfirmModal } from "../../components/modals";
import { IconButton } from "../../components/buttons";
import { isTeacherRole } from "../../utils";
import { useAuth, useClassrooms } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Empty } from "../../components/empty";
import { Group } from "../../components/groups";
import { Button } from "@mui/material";

const ListClassroomsPage = () => {
  const { allClassrooms, deleteClassroom, loading } = useClassrooms();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isTeacher = isTeacherRole(user?.role) || true;

  const onEditButtonClick = (id) =>
    navigate(`/dashboard/classrooms/${id}/edit`);

  const onStudentsButtonClick = (id) =>
    navigate(`/dashboard/classrooms/${id}/students`);

  const onExamsButtonClick = (id) =>
    navigate(`/dashboard/classrooms/${id}/exams`);

  const onConfirmClassroomDelete = async (id) => {
    const { success, message } = await deleteClassroom(id);
    if (success) {
      toast.success(message);
      navigate(0);
      return;
    }
    toast.error(message);
  };

  const CreateClassroomButton = (props) => {
    if (!isTeacher) return;
    return (
      <Button
        onClick={() => navigate("/dashboard/classrooms/new")}
        variant="contained"
        fullWidth
        {...props}
      >
        + Add classroom
      </Button>
    );
  };

  const CreateClassroomOutlinedButton = () => (
    <CreateClassroomButton variant="outlined" />
  );

  const breadcrumbs = [
    {
      text: "Classrooms",
      Icon: HomeRounded,
    },
  ];

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
          onClick: (id) => onExamsButtonClick(id),
          Component: ({ onClick }) => (
            <IconButton
              key="show-exams"
              title="View exams"
              Icon={QuizRounded}
              onClick={onClick}
            />
          ),
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
      ],
    },
  ];
  return (
    <Group
      title="Classrooms"
      Button={CreateClassroomButton}
      breadcrumbs={breadcrumbs}
    >
      {!loading && allClassrooms.length > 0 && (
        <Table columns={columns} data={allClassrooms} />
      )}
      {!loading && allClassrooms.length === 0 && (
        <Empty
          image="/assets/classroom/empty.jpg"
          title="Oops! You have no classrooms created."
          subTitle="But calm down! How about you create your first classroom?"
          Button={CreateClassroomOutlinedButton}
        />
      )}
    </Group>
  );
};

export default ListClassroomsPage;
