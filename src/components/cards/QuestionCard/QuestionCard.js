import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Alternatives from "./Alternatives";
import { Controller } from "react-hook-form";

const QuestionCard = ({ errors = [], register, index, control }) => {
  const [questionType, setQuestionType] = useState("closed");

  const isClosedQuestion = questionType === "closed";
  const fieldName = `questions[${index}]`;
  const error = errors && errors[index];

  const handleChangeQuestionType = (event) => {
    setQuestionType(event.target.value);
  };

  return (
    <Card
      variant="outlined"
      sx={{ backgroundColor: "#F8F8F8", marginBottom: "32px" }}
      fullWidth
    >
      <CardContent sx={{ position: "relative" }}>
        <TextField
          label="Pergunta"
          multiline
          fullWidth
          variant="standard"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum."
          error={error?.statement}
          helperText={error?.statement?.message}
          {...register(`${fieldName}.statement`)}
        />
        <Box mt={2}>
          <InputLabel error={error?.type} helperText={error?.type?.message}>
            Tipo da questão
          </InputLabel>
          <FormControl fullWidth>
            <Controller
              name={`${fieldName}.type`}
              control={control}
              defaultValue="closed"
              render={({ field }) => {
                return (
                  <Select
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      handleChangeQuestionType(value);
                    }}
                    variant="standard"
                  >
                    <MenuItem value="closed">Questão fechada</MenuItem>
                    <MenuItem value="open">Questão aberta</MenuItem>
                  </Select>
                );
              }}
            />
          </FormControl>
        </Box>
        {isClosedQuestion && (
          <Box mt={2}>
            <FormControl fullWidth>
              <FormLabel>Opções</FormLabel>
              <Alternatives
                alternatives={["1", "2", "3", "4"]}
                defaultValue="1"
                register={register}
                control={control}
                errors={error?.alternatives}
                nameQuestion={fieldName}
              />
            </FormControl>
          </Box>
        )}
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default QuestionCard;
