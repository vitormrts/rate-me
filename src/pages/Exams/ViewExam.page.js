import { HomeRounded, QuizRounded, SchoolRounded } from "@mui/icons-material";
import { Divider, Grid, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import ViewQuestionCard from "../../components/cards/QuestionCard/ViewQuestionCard";
import { Group } from "../../components/groups";
import { useClassrooms } from "../../hooks";

const ViewExamPage = () => {
  const { classroomId, examId } = useParams();
  const { classroom } = useClassrooms(classroomId);

  const exam = classroom?.exams.find((exam) => exam.id === examId);

  const questionsMap = exam?.questions.map((question) => {
    return (
      <ViewQuestionCard
        key={question.id}
        viewMode
        statement={question.statement}
        type={question.type}
        alternatives={question.alternatives}
        answer={question.answer}
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

  return (
    <Group title="Ver exam" breadcrumbs={breadcrumbs}>
      <Grid container spacing={2}>
        {exam && (
          <>
            <Grid item xs={6}>
              <TextField
                label="Nome do exame"
                variant="standard"
                value={exam.name}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Tempo limite (minutos)"
                variant="standard"
                value={exam.timeLimit}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Data inicial"
                variant="standard"
                value={exam.initialDate.toDate()}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Data final"
                variant="standard"
                value={exam.finalDate.toDate()}
                disabled
                fullWidth
              />
            </Grid>
            <Divider sx={{ margin: "40px 0" }} />
          </>
        )}
      </Grid>
      {questionsMap}
    </Group>
  );
};

export default ViewExamPage;
