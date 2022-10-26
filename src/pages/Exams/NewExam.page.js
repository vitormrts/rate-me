import { Button, ButtonGroup, Divider, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import content from "../../content";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { QuestionCard } from "../../components/cards";
import { useState } from "react";

const NewExamPage = () => {
  const [questionsIndexes, setQuestionsIndexes] = useState([]);
  const [questionCounter, setQuestionCounter] = useState(0);
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
    questions: yup.array().of(
      yup.object().shape({
        statement: yup.string().required(inputErrors.empty),
        type: yup.string().required(inputErrors.empty),
        answer: yup.string(),
        alternatives: yup.array().when("type", {
          is: "closed",
          then: yup
            .array()
            .of(yup.string().nullable().required(inputErrors.empty)),
        }),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onCreateExam = (data) => {
    console.log(data);
    toast.success("Exam created successfully");
    // navigate("/dashboard/exams/list");
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

  // console.log(errors);
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
              />
            )}
          />
        );
      }}
    />
  );

  return (
    <form onSubmit={handleSubmit(onCreateExam)}>
      <TextField
        label="Exam name"
        variant="standard"
        error={errors.name}
        helperText={errors.name?.message}
        {...register("name")}
      />
      <TextField
        label="Time limit (minutes)"
        variant="standard"
        error={errors.timeLimit}
        helperText={errors.timeLimit?.message}
        multiline
        {...register("timeLimit")}
      />
      <DateComponent name="initialDate" label="Initial Date" />
      <DateComponent name="finalDate" label="Final Date" />
      <Divider sx={{ margin: "8px 0 40px" }} />
      {questionsMap}
      <ButtonGroup variant="contained" fullWidth sx={{ gap: "16px" }}>
        <Button variant="outlined" onClick={onAddQuestionClick}>
          + Add question
        </Button>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default NewExamPage;
