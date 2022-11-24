import CardContent from "@mui/material/CardContent";
import {
  Box,
  Card,
  FormControl,
  FormGroup,
  FormLabel,
  Radio,
  TextField,
} from "@mui/material";

const ViewQuestionCard = ({
  statement,
  type,
  alternatives = [],
  answer,
  correctAnswer,
  showIfAnswerIsCorrect,
}) => {
  const isClosedQuestion = type === "closed";

  const alternativesMap = alternatives.map((alternative, index) => {
    return (
      <FormGroup key={alternative} sx={{ flexDirection: "row", mt: 1 }}>
        <Radio
          checked={answer === `${index + 1}`}
          value={alternative}
          disabled
        />
        <TextField
          label={`Alternative ${index + 1}`}
          variant="standard"
          value={alternative}
          disabled
        />
      </FormGroup>
    );
  });

  const borderColor = answer === correctAnswer ? "green" : "red";

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: "#F8F8F8",
        marginBottom: "32px",
        borderColor: showIfAnswerIsCorrect && borderColor,
      }}
      fullWidth
    >
      <CardContent sx={{ position: "relative" }}>
        <Box>
          <TextField
            label="Statement"
            multiline
            fullWidth
            variant="standard"
            value={statement}
            disabled
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Question type"
            multiline
            fullWidth
            variant="standard"
            value={type}
            disabled
          />
        </Box>
        {isClosedQuestion && (
          <Box mt={2}>
            <FormControl fullWidth disabled>
              <FormLabel>Options</FormLabel>
              {alternativesMap}
            </FormControl>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ViewQuestionCard;
