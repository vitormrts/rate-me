import { IconButton } from "../../components/buttons";
import { isTeacherRole } from "../../utils";
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
  const { allExams, deleteExam, shuffleExamQuestions, loading } = useExams({
    classroom,
  });

  const isTeacher = isTeacherRole(user?.role) || true;

  const onExamPerformanceClick = (id) =>
    navigate(`/dashboard/exams/${id}/performance/`);

  const onViewExamClick = (id) => navigate(`/dashboard/exams/${id}`);

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
      {!loading && allExams.length > 0 && (
        <Table columns={columns} data={allExams} />
      )}
      {!loading && allExams.length === 0 && (
        <Empty
          image="/assets/exams/empty.webp"
          title="Oops! You have no exams created."
          subTitle="But calm down! How about you create your first exam?"
          Button={CreateExamOutlinedButton}
        />
      )}
    </Group>
  );
};

export default ListExamsPage;
