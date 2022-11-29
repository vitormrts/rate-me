import CardContent from "@mui/material/CardContent";
import { Box, Card, Checkbox, FormLabel, Typography } from "@mui/material";

const CorrectQuestionCard = ({
  statement,
  questionId,
  index,
  answer,
  onChange,
}) => {
  const handleOnChange = (event) => {
    onChange && onChange(index, questionId, event.target.checked);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: "#F8F8F8",
        marginBottom: "32px",
      }}
      fullWidth
    >
      <CardContent sx={{ position: "relative" }}>
        <Checkbox
          sx={{ position: "absolute", right: "16px" }}
          onChange={handleOnChange}
        />
        <Box mt={2}>
          <FormLabel>Pergunta</FormLabel>
          <Typography>{statement}</Typography>
        </Box>
        <Box mt={2}>
          <FormLabel>Student answer</FormLabel>
          <Typography>{answer}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CorrectQuestionCard;
