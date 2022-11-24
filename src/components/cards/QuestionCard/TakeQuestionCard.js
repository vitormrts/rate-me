import CardContent from "@mui/material/CardContent";
import {
  Box,
  Card,
  FormControl,
  FormGroup,
  FormLabel,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";

const TakeQuestionCard = ({
  statement,
  alternatives = [],
  control,
  register,
  index,
}) => {
  const name = `answers[${index}]`;

  const [selected, setSelected] = useState();

  const isClosedQuestion = alternatives.length > 0;

  const alternativesMap = alternatives.map((alternative, index) => {
    const option = `${index + 1}`;

    return (
      <FormGroup key={alternative} sx={{ flexDirection: "row", mt: 1 }}>
        <Controller
          name={`${name}.answer`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Radio
              onChange={(value) => {
                setSelected(option);
                field.onChange(value);
              }}
              checked={selected === option}
              value={option}
            />
          )}
        />
        <Typography alignSelf="center">{alternative}</Typography>
      </FormGroup>
    );
  });

  return (
    <Card
      variant="outlined"
      sx={{ backgroundColor: "#F8F8F8", marginBottom: "32px" }}
      fullWidth
    >
      <CardContent sx={{ position: "relative" }}>
        <Box>
          <FormLabel>Statement</FormLabel>
          <Typography>{statement}</Typography>
        </Box>
        <Box mt={1}>
          {isClosedQuestion && (
            <FormControl fullWidth>
              <FormLabel>Options</FormLabel>
              {alternativesMap}
            </FormControl>
          )}
          {!isClosedQuestion && (
            <TextField
              label="My answer"
              variant="standard"
              multiline
              fullWidth
              {...register(`${name}.answer`)}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TakeQuestionCard;
