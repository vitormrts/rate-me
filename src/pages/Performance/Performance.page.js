import { HomeRounded, PersonRounded, SchoolRounded } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton } from "../../components/buttons";
import { Empty } from "../../components/empty";
import { Group } from "../../components/groups";
import { Table } from "../../components/tables";
import { useAuth, useClassrooms } from "../../hooks";
import { isTeacherRole } from "../../utils";

const PerformanceExamPage = () => {
  const navigate = useNavigate();
  const { classroomId, examId } = useParams();
  const { classroom } = useClassrooms(classroomId);
  const { user } = useAuth();

  const isTeacher = isTeacherRole(user?.role);

  const performances = classroom?.exams.find(
    (exam) => exam.id === examId
  )?.performances;

  const onEvaluateStudentExamClick = (id) => {
    navigate(
      `/dashboard/classrooms/${classroomId}/exams/${examId}/performance/${id}`
    );
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
      text: "Performances",
      Icon: PersonRounded,
    },
  ];

  const columns = [
    {
      name: "Email",
      key: "email",
    },
    {
      name: "Questões certas",
      key: "hit",
    },
    {
      name: "Questões erradas",
      key: "miss",
    },
    {
      name: "Questões aguardando correção",
      key: "waitingCorrection",
    },
    {
      name: "Ações",
      actions: [
        {
          onClick: (id) => onEvaluateStudentExamClick(id),
          Component: ({ onClick }) => (
            <IconButton
              key="evaluate"
              title="Avaliar exame do aluno"
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
    <Group title="Performances do exame" breadcrumbs={breadcrumbs}>
      {classroom && performances.length > 0 && (
        <Table columns={columns} data={performances} />
      )}
      {classroom && performances.length === 0 && (
        <Empty
          image="/assets/classroom/empty.jpg"
          title="Nenhum aluno fez o exame"
          subTitle="Que tal esperar alguém finalizar?"
        />
      )}
    </Group>
  );
};

export default PerformanceExamPage;
