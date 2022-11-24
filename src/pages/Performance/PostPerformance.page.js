import { HomeRounded, PersonRounded, SchoolRounded } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CorrectQuestionCard from "../../components/cards/QuestionCard/CorrectQuestionCard";
import ViewQuestionCard from "../../components/cards/QuestionCard/ViewQuestionCard";
import { Group } from "../../components/groups";
import { useAuth, useClassrooms, useExams } from "../../hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const PostPerformanceExamPage = () => {
  const navigate = useNavigate();
  const { classroomId, examId, performanceId } = useParams();
  const { classroom } = useClassrooms(classroomId);
  const { correctExam } = useExams();
  const { user } = useAuth();

  const schema = yup.object().shape({
    correction: yup.array().of(
      yup.object().shape({
        questionId: yup.string(),
        correct: yup.bool(),
      })
    ),
  });

  const { getValues, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const exam = classroom?.exams.find((exam) => exam.id === examId);

  const performance = exam?.performances?.find(
    (performance) => performance.id === performanceId
  );

  const onChange = (index, questionId, checked) => {
    const fieldName = `correction[${index}]`;
    setValue(`${fieldName}.questionId`, questionId);
    setValue(`${fieldName}.correct`, checked);
  };

  const answersMap = performance?.answers.map(
    ({ answer, questionId }, index) => {
      const targetQuestion = exam.questions.find(
        (question) => question.id === questionId
      );

      const isClosedQuestion = targetQuestion.type === "closed";
      const isCorrect = isClosedQuestion
        ? answer === targetQuestion.answer
        : false;
      onChange(index, questionId, isCorrect);
      if (isClosedQuestion) {
        return (
          <ViewQuestionCard
            key={questionId}
            answer={answer}
            correctAnswer={targetQuestion.answer}
            alternatives={targetQuestion.alternatives}
            statement={targetQuestion.statement}
            type={targetQuestion.type}
            showIfAnswerIsCorrect
          />
        );
      }

      return (
        <CorrectQuestionCard
          key={questionId}
          questionId={questionId}
          index={index}
          statement={targetQuestion.statement}
          answer={answer}
          onChange={onChange}
        />
      );
    }
  );

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

  const handleOnSubmit = () => {
    const correction = getValues("correction");
    correctExam({ correction, performance, classroom, examId });
    toast.success("Exam evaluated successfully");
    navigate(
      `/dashboard/classrooms/${classroomId}/exams/${examId}/performance`
    );
  };

  return (
    <Group title="Exam performance" breadcrumbs={breadcrumbs}>
      {answersMap}
      <Button onClick={handleOnSubmit} fullWidth variant="contained">
        Submit
      </Button>
    </Group>
  );
};

export default PostPerformanceExamPage;
