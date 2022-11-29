import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { DeleteRounded } from "@mui/icons-material";
import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { IconButton } from "../../buttons";
import Alternatives from "./Alternatives";
import { Controller } from "react-hook-form";

const QuestionCard = ({ errors = [], register, index, onRemove, control }) => {
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
        <IconButton
          title="Delete"
          Icon={DeleteRounded}
          onClick={onRemove(index)}
          sx={{ position: "absolute", right: "16px", zIndex: 2 }}
        />
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
                    <MenuItem value="closed">Closed question</MenuItem>
                    <MenuItem value="open">Open question</MenuItem>
                  </Select>
                );
              }}
            />
          </FormControl>
        </Box>
        {isClosedQuestion && (
          <Box mt={2}>
            <FormControl fullWidth>
              <FormLabel>Options</FormLabel>
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
