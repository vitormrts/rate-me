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
      text: "Classrooms",
      Icon: HomeRounded,
      href: "/dashboard/classrooms",
    },
    {
      text: classroom?.name || "",
      Icon: SchoolRounded,
    },
    {
      text: "Students",
      Icon: PersonRounded,
    },
  ];

  const columns = [
    {
      name: "Full name",
      key: "fullName",
    },
    {
      name: "Hit",
      key: "hit",
    },
    {
      name: "Miss",
      key: "miss",
    },
    {
      name: "Waiting correction",
      key: "waitingCorrection",
    },
    {
      name: "Actions",
      actions: [
        {
          onClick: (id) => onEvaluateStudentExamClick(id),
          Component: ({ onClick }) => (
            <IconButton
              key="evaluate"
              title="Evaluate student exam"
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
    <Group title="Exam performance" breadcrumbs={breadcrumbs}>
      {classroom && performances.length > 0 && (
        <Table columns={columns} data={performances} />
      )}
      {classroom && performances.length === 0 && (
        <Empty
          image="/assets/classroom/empty.jpg"
          title="No students took the exam"
          subTitle="How about waiting for someone to finish?"
        />
      )}
    </Group>
  );
};

export default PerformanceExamPage;
