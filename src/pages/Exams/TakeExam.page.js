import { HomeRounded, QuizRounded, SchoolRounded } from "@mui/icons-material";
import { Button, Divider, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TakeQuestionCard from "../../components/cards/QuestionCard/TakeQuestionCard";
import { Group } from "../../components/groups";
import { useClassrooms, useExams } from "../../hooks";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ConfirmModal } from "../../components/modals";
import { toast } from "react-toastify";

const TakeExamPage = () => {
  const navigate = useNavigate();
  const { classroomId, examId } = useParams();
  const { classroom } = useClassrooms(classroomId);
  const { takeExam } = useExams({ classroom, examId });

  const exam = classroom?.exams.find((exam) => exam.id === examId);

  const schema = yup.object().shape({
    answers: yup.array().of(
      yup.object().shape({
        answer: yup.string(),
        questionId: yup.string(),
      })
    ),
  });

  const { register, handleSubmit, control, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const questionsMap = exam?.questions.map((question, index) => {
    setValue(`answers[${index}].questionId`, question.id);
    return (
      <TakeQuestionCard
        key={question.id}
        statement={question.statement}
        alternatives={question.alternatives}
        register={register}
        control={control}
        index={index}
      />
    );
  });

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

  const onSubmitExam = async (data) => {
    const { success } = await takeExam(data, examId);
    if (success) {
      toast.success("Successfully completed exam");
      navigate(`/dashboard/classrooms/${classroomId}/exams`);
      return;
    }
    toast.error("Please resubmit the exam.");
  };

  return (
    <Group title="Take exam" breadcrumbs={breadcrumbs}>
      {exam && (
        <>
          <Typography variant="h4" color="primary">
            {exam.name}
          </Typography>
          <Divider sx={{ margin: "40px 0" }} />
          <div>
            {questionsMap}
            <ConfirmModal
              onConfirm={handleSubmit(onSubmitExam)}
              text="When submitting the exam it will not be possible to change your answers."
              description="Make sure you filled in the questions correctly."
            >
              <Button type="submit" variant="contained" fullWidth>
                Submit
              </Button>
            </ConfirmModal>
          </div>
        </>
      )}
    </Group>
  );
};

export default TakeExamPage;
