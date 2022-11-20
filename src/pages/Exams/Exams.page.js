import { IconButton } from "../../components/buttons";
import { getFormattedExam, isTeacherRole } from "../../utils";
import { useAuth, useClassrooms, useExams } from "../../hooks";
import { Table } from "../../components/tables";
import {
  ShuffleRounded,
  DeleteRounded,
  RemoveRedEyeRounded,
  PersonRounded,
  HomeRounded,
  QuizRounded,
  SchoolRounded,
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
  const { deleteExam, shuffleExamQuestions } = useExams({
    classroom,
  });

  const examsMap = classroom?.exams.map((exam) => getFormattedExam(exam));

  const isTeacher = isTeacherRole(user?.role);

  const onExamPerformanceClick = (id) =>
    navigate(`/dashboard/classrooms/${classroomId}/exams/${id}/performance/`);

  const onViewExamClick = (id) =>
    navigate(`/dashboard/classrooms/${classroomId}/exams/${id}`);

  const onConfirmExamDelete = async (id) => {
    const { success, message } = await deleteExam(id);
    if (success) {
      toast.success(message);
      navigate(0);
      return;
    }
    toast.error(message);
  };

  const onShuffleQuestionsClick = async (id) => {
    const { success, message } = await shuffleExamQuestions(id);
    success ? toast.success(message) : toast.error(message);
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
      text: "Exams",
      Icon: QuizRounded,
    },
  ];

  const columns = [
    {
      name: "Name",
      key: "name",
    },
    {
      name: "Time Limit (minutes)",
      key: "timeLimit",
    },
    {
      name: "Questions",
      key: "questions",
    },
    {
      name: "Initial Date",
      key: "initialDate",
    },
    {
      name: "Final Date",
      key: "finalDate",
    },
    {
      name: "Status",
      key: "status",
    },
    {
      name: "Actions",
      actions: [
        {
          onClick: (id) => onViewExamClick(id),
          Component: ({ onClick }) => (
            <IconButton
              key="view"
              title="View exam questions"
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
              title="View and evaluate students performance"
              Icon={PersonRounded}
              onClick={onClick}
            />
          ),
          show: isTeacher,
        },
        {
          onClick: (id) => onShuffleQuestionsClick(id),
          Component: ({ onClick }) => (
            <IconButton
              key="shuffle"
              title="Shuffle exam questions"
              Icon={ShuffleRounded}
              onClick={onClick}
            />
          ),
          show: false,
        },
        {
          onConfirm: (id) => onConfirmExamDelete(id),
          Component: ({ onConfirm }) => (
            <ConfirmModal
              onConfirm={onConfirm}
              text="Are you sure you want to delete this exam?"
              description="By deleting this exam you will lose all data related to it."
            >
              <IconButton key="delete" title="Delete" Icon={DeleteRounded} />
            </ConfirmModal>
          ),
          show: isTeacher,
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
        + Add Exam
      </Button>
    );
  };

  const CreateExamOutlinedButton = () => (
    <CreateExamButton variant="outlined" />
  );

  return (
    <Group title="Exams" Button={CreateExamButton} breadcrumbs={breadcrumbs}>
      {classroom && examsMap.length > 0 && (
        <Table columns={columns} data={examsMap} />
      )}
      {classroom && examsMap.length === 0 && (
        <Empty
          image="/assets/exams/empty.webp"
          title={
            isTeacher
              ? "Oops! You have no exams created."
              : "Oops! This room does not have exams."
          }
          subTitle={
            isTeacher
              ? "But calm down! How about you create your first exam?"
              : "How about waiting for your teacher to add an exam?"
          }
          Button={isTeacher && CreateExamOutlinedButton}
        />
      )}
    </Group>
  );
};

export default ListExamsPage;
