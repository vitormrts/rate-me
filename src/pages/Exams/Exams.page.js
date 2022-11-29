import { IconButton } from "../../components/buttons";
import { getFormattedExam, isTeacherRole } from "../../utils";
import { useAuth, useClassrooms, useExams } from "../../hooks";
import { Table } from "../../components/tables";
import {
  DeleteRounded,
  RemoveRedEyeRounded,
  PersonRounded,
  HomeRounded,
  QuizRounded,
  SchoolRounded,
  RocketLaunchRounded,
} from "@mui/icons-material";
import { ConfirmModal } from "../../components/modals";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Empty } from "../../components/empty";
import { Group } from "../../components/groups";
import { Button } from "@mui/material";

const ListExamsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { classroomId } = useParams();
  const { classroom } = useClassrooms(classroomId);
  const { deleteExam } = useExams({
    classroom,
  });

  const examsMap = classroom?.exams.map((exam) => getFormattedExam(exam, user));

  const isTeacher = isTeacherRole(user?.role);

  const onViewExamClick = (id) =>
    navigate(`/dashboard/classrooms/${classroomId}/exams/${id}`);

  const onExamPerformanceClick = (id) =>
    navigate(`/dashboard/classrooms/${classroomId}/exams/${id}/performance`);

  const onConfirmTakeStartExam = async (id) => {
    const targetExam = examsMap.find((exam) => exam.id === id);
    const studentFinished = targetExam?.myStatus?.text === "Finished";
    const examClosed = targetExam?.status?.text === "Closed";

    if (examClosed) {
      toast.error(
        "Não foi possível iniciar este exame, pois ele está fechado."
      );
      return;
    }
    if (studentFinished) {
      toast.error("Você já finalizou este exame.");
      return;
    }
    navigate(`/dashboard/classrooms/${classroomId}/exams/${id}/take`);
    toast.success("Exame iniciado, boa sorte!");
  };

  const onConfirmExamDelete = async (id) => {
    const { success, message } = await deleteExam(id);
    if (success) {
      toast.success(message);
      navigate(0);
      return;
    }
    toast.error(message);
  };

  const breadcrumbs = [
    {
      text: "Salas de aula",
      Icon: HomeRounded,
      href: "/dashboard/classrooms",
    },
    {
      text: classroom?.name || "",
      Icon: SchoolRounded,
    },
    {
      text: "Exames",
      Icon: QuizRounded,
    },
  ];

  const columns = [
    {
      name: "Nome",
      key: "name",
    },
    {
      name: "Tempo limite (minutos)",
      key: "timeLimit",
    },
    {
      name: "Questões",
      key: "questions",
    },
    {
      name: "Data inicial",
      key: "initialDate",
    },
    {
      name: "Data final",
      key: "finalDate",
    },
    {
      name: "Status",
      key: "StatusComponent",
    },
    !isTeacher && {
      name: "Meu status",
      key: "MyStatusComponent",
    },
    {
      name: "Ações",
      actions: [
        {
          onClick: (id) => onViewExamClick(id),
          Component: ({ onClick }) => (
            <IconButton
              key="view"
              title="Ver questões"
              Icon={RemoveRedEyeRounded}
              onClick={onClick}
            />
          ),
          show: isTeacher,
        },
        {
          onClick: (id) => onExamPerformanceClick(id),
          Component: ({ onClick }) => (
            <IconButton
              key="view"
              title="Ver performances"
              Icon={PersonRounded}
              onClick={onClick}
            />
          ),
          show: true,
        },
        {
          onConfirm: (id) => onConfirmExamDelete(id),
          Component: ({ onConfirm }) => (
            <ConfirmModal
              onConfirm={onConfirm}
              text="Você tem certeza que deseja deletar esse exame?"
              description="Deletando este exame você perderá todos os dados relacionados a ele"
            >
              <IconButton key="delete" title="Deletar" Icon={DeleteRounded} />
            </ConfirmModal>
          ),
          show: isTeacher,
        },
        {
          onConfirm: (id) => onConfirmTakeStartExam(id),
          Component: ({ onConfirm }) => (
            <ConfirmModal
              onConfirm={onConfirm}
              text="Você tem certeza que quer iniciar este exame?"
              description="Uma vez iniciado não será possível cancelar."
            >
              <IconButton
                key="take-exam"
                title="Iniciar exame"
                Icon={RocketLaunchRounded}
              />
            </ConfirmModal>
          ),
          show: !isTeacher,
        },
      ],
    },
  ];

  const CreateExamButton = (props) => {
    if (!isTeacher) return;
    return (
      <Button
        onClick={() => navigate("./new")}
        variant="contained"
        fullWidth
        {...props}
      >
        + Adicionar
      </Button>
    );
  };

  const CreateExamOutlinedButton = () => (
    <CreateExamButton variant="outlined" />
  );

  return (
    <Group title="Exames" Button={CreateExamButton} breadcrumbs={breadcrumbs}>
      {classroom && examsMap.length > 0 && (
        <Table columns={columns} data={examsMap} />
      )}
      {classroom && examsMap.length === 0 && (
        <Empty
          image="/assets/exams/empty.webp"
          title={
            isTeacher
              ? "Oops! Você não criou exames nesta sala de aula."
              : "Oops! Essa sala não possui exames.."
          }
          subTitle={
            isTeacher
              ? "Mas calma! Que tal criar seu primeiro exame?"
              : "Que tal esperar seu professor adicionar um exame?"
          }
          Button={isTeacher && CreateExamOutlinedButton}
        />
      )}
    </Group>
  );
};

export default ListExamsPage;
