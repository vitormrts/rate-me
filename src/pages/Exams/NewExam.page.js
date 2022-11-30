import { Box, Button, ButtonGroup, Divider, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import content from "../../content";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { QuestionCard } from "../../components/cards";
import { useState } from "react";
import { useClassrooms, useExams } from "../../hooks";
import { Group } from "../../components/groups";
import { AddRounded, HomeRounded, SchoolRounded } from "@mui/icons-material";

const NewExamPage = () => {
  const [questionsIndexes, setQuestionsIndexes] = useState([]);
  const [questionCounter, setQuestionCounter] = useState(0);
  const { classroomId } = useParams();
  const { classroom } = useClassrooms(classroomId);
  const { createExam } = useExams({ classroom });
  const navigate = useNavigate();

  const inputErrors = content.errors.input;

  const schema = yup.object().shape({
    name: yup.string().required(inputErrors.empty),
    timeLimit: yup
      .number()
      .typeError(inputErrors.mustBeNumber)
      .required(inputErrors.empty),
    initialDate: yup
      .date()
      .typeError(inputErrors.mustBeDate)
      .required(inputErrors.empty),
    finalDate: yup
      .date()
      .typeError(inputErrors.mustBeDate)
      .required(inputErrors.empty),
    questions: yup
      .array()
      .of(
        yup.object().shape({
          statement: yup.string().required(inputErrors.empty),
          type: yup.string().required(inputErrors.empty),
          answer: yup.string().defined(),
          alternatives: yup.array().when("type", {
            is: "closed",
            then: yup
              .array()
              .of(yup.string().nullable().required(inputErrors.empty))
              .defined(),
          }),
        })
      )
      .required(inputErrors.empty),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitClick = () => {
    if (!getValues("questions")) {
      toast.error("Você precisa criar uma questão");
    }
  };

  const onCreateExam = async (data) => {
    const { success, error } = await createExam(data);
    if (success) {
      toast.success("Exame criado com sucesso");
      navigate("/dashboard/classrooms/");
      return;
    }
    toast.error(error);
  };

  const onAddQuestionClick = () => {
    setQuestionsIndexes((prevIndexes) => [...prevIndexes, questionCounter]);
    setQuestionCounter((prevCounter) => prevCounter + 1);
  };

  const onRemoveQuestionClick = (index) => () => {
    setQuestionsIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setQuestionCounter((prevCounter) => prevCounter - 1);
  };

  const questionsMap = questionsIndexes.map((index) => {
    return (
      <QuestionCard
        key={index}
        errors={errors.questions}
        register={register}
        index={index}
        onRemove={onRemoveQuestionClick}
        control={control}
      />
    );
  });

  const DateComponent = ({ name, label }) => (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => {
        return (
          <DateTimePicker
            label={label}
            variant="standard"
            value={field.value}
            onChange={(date) => {
              field.onChange(date);
            }}
            minDate={moment.now()}
            renderInput={(props) => (
              <TextField
                {...props}
                variant="standard"
                error={errors[name]}
                helperText={errors[name]?.message}
                fullWidth
              />
            )}
          />
        );
      }}
    />
  );

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
      text: "Criar exame",
      Icon: AddRounded,
    },
  ];

  return (
    <Group title="Criar exame" breadcrumbs={breadcrumbs}>
      <form onSubmit={handleSubmit(onCreateExam)}>
        <Box mt={2}>
          <TextField
            label="Nome do exame"
            variant="standard"
            error={errors.name}
            helperText={errors.name?.message}
            fullWidth
            {...register("name")}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Tempo limite"
            variant="standard"
            error={errors.timeLimit}
            helperText={errors.timeLimit?.message}
            fullWidth
            {...register("timeLimit")}
          />
        </Box>
        <Box mt={2}>
          <DateComponent name="initialDate" label="Data inicial" />
        </Box>
        <Box mt={2}>
          <DateComponent name="finalDate" label="Data final" />
        </Box>
        <Divider sx={{ margin: "40px 0" }} />
        {questionsMap}
        <ButtonGroup variant="contained" fullWidth sx={{ gap: "16px" }}>
          <Button variant="outlined" onClick={onAddQuestionClick}>
            + Adicionar questão
          </Button>
          <Button type="submit" variant="contained" onClick={onSubmitClick}>
            Submeter
          </Button>
        </ButtonGroup>
      </form>
    </Group>
  );
};

export default NewExamPage;
