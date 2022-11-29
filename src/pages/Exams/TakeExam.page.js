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
import { useEffect, useState } from "react";
import { getFormattedTime } from "../../utils";

const TakeExamPage = () => {
  const navigate = useNavigate();
  const { classroomId, examId } = useParams();
  const { classroom } = useClassrooms(classroomId);
  const { takeExam } = useExams({ classroom, examId });

  const exam = classroom?.exams.find((exam) => exam.id === examId);

  const [countdown, setCountdown] = useState(undefined);
  const started = exam?.timeLimit !== undefined;

  const time = getFormattedTime(countdown);

  useEffect(() => {
    if (countdown === 60) {
      toast.info(
        "Ultimo minuto para realizar o exame. Ao chegar no tempo limite, o mesmo sera submetido"
      );
    }

    if (countdown === undefined && started) {
      setCountdown(exam.timeLimit * 60);
    }
    if (!started) {
      return;
    }
    if (countdown === 0) {
      toast.info("Tempo limite atingido. O exame foi submetido.");
      onSubmitExam(getValues());
    }
    const timer = setInterval(() => setCountdown(countdown - 1), 1 * 1000);
    return () => clearInterval(timer);
  }, [countdown, started]);

  const schema = yup.object().shape({
    answers: yup.array().of(
      yup.object().shape({
        answer: yup.string(),
        questionId: yup.string(),
      })
    ),
  });

  const { register, handleSubmit, control, setValue, getValues } = useForm({
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

  const onSubmitExam = async (data) => {
    const { success } = await takeExam(data, examId);
    if (success) {
      toast.success("Exame submetido com sucesso");
      navigate(`/dashboard/classrooms/${classroomId}/exams`);
      return;
    }
    toast.error("Ocorreu um erro ao submeter o exame.");
  };

  return (
    <Group title="Realizar exame" breadcrumbs={breadcrumbs}>
      {exam && (
        <>
          <Typography variant="h4" color="primary">
            {exam.name}
          </Typography>
          {countdown && (
            <Typography variant="p">
              Tempo para finalizar: {time.minutes}:{time.seconds}
            </Typography>
          )}

          <Divider sx={{ margin: "40px 0" }} />
          <div>
            {questionsMap}
            <ConfirmModal
              onConfirm={handleSubmit(onSubmitExam)}
              text="Ao submeter não será possível editar as respostas"
              description="Tenha certeza que preencheu as respostas corretamente"
            >
              <Button type="submit" variant="contained" fullWidth>
                Submeter exame
              </Button>
            </ConfirmModal>
          </div>
        </>
      )}
    </Group>
  );
};

export default TakeExamPage;
