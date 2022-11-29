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
import { getFormattedClassroom, isTeacherRole } from "../../utils";
import { useAuth, useClassrooms } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Empty } from "../../components/empty";
import { Group } from "../../components/groups";
import { Button } from "@mui/material";

const ListClassroomsPage = () => {
  const { classrooms, deleteClassroom } = useClassrooms();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isTeacher = isTeacherRole(user?.role);

  const classroomsMap = classrooms?.map((classroom) =>
    getFormattedClassroom(classroom)
  );

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
        + Adicionar
      </Button>
    );
  };

  const CreateClassroomOutlinedButton = () => (
    <CreateClassroomButton variant="outlined" />
  );

  const breadcrumbs = [
    {
      text: "Salas de aula",
      Icon: HomeRounded,
    },
  ];

  const columns = [
    {
      name: "Nome",
      key: "name",
    },
    {
      name: "Descrição",
      key: "description",
    },
    {
      name: "Estudantes",
      key: "students",
    },
    {
      name: "Exames",
      key: "exams",
    },
    {
      name: "Ações",
      actions: [
        {
          onClick: (id) => onExamsButtonClick(id),
          Component: ({ onClick }) => (
            <IconButton
              key="show-exams"
              title="Ver exames"
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
              title="Ver estudantes"
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
              title="Editar"
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
              text="Você tem certeza que deseja deletar essa sala de aula?"
              description="Deletando a sala você perderá os seus alunos e seus exames"
            >
              <IconButton key="delete" title="Deletar" Icon={DeleteRounded} />
            </ConfirmModal>
          ),
          show: isTeacher,
        },
      ],
    },
  ];
  return (
    <Group
      title="Salas de aula"
      Button={CreateClassroomButton}
      breadcrumbs={breadcrumbs}
    >
      {classrooms && classroomsMap.length > 0 && (
        <Table columns={columns} data={classroomsMap} />
      )}
      {classrooms && classroomsMap.length === 0 && (
        <Empty
          image="/assets/classroom/empty.jpg"
          title={
            isTeacher
              ? "Oops! Você não criou nenhuma sala de aula."
              : "Oops! Você não está em nenhuma sala de aula."
          }
          subTitle={
            isTeacher
              ? "Mas calma! Que tal criar uma?"
              : "Mas calma! Que tal pedir ao seu professor para ele te convidar?"
          }
          Button={isTeacher && CreateClassroomOutlinedButton}
        />
      )}
    </Group>
  );
};

export default ListClassroomsPage;
