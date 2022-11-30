import { useState } from "react";
import { FormGroup, Radio, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const Alternatives = ({
  alternatives = [],
  errors = [],
  nameQuestion,
  control,
  defaultValue,
}) => {
  const [correctAlternative, setCorrectAlternative] = useState("1");

  const handleChange = (event) => {
    setCorrectAlternative(event.target.value);
  };

  const alternativesMap = alternatives.map((alternative, index) => {
    const fieldName = `${nameQuestion}.alternatives[${index}]`;
    const error = errors && errors[index];
    return (
      <FormGroup key={alternative} sx={{ flexDirection: "row", mt: 1 }}>
        <Controller
          name={`${nameQuestion}.answer`}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Radio
              onChange={(value) => {
                handleChange(value);
                field.onChange(value);
              }}
              checked={correctAlternative === alternative}
              value={alternative}
            />
          )}
        />
        <Controller
          control={control}
          defaultValue={null}
          name={fieldName}
          render={({ field }) => (
            <TextField
              label={`Alternativa ${alternative}`}
              variant="standard"
              error={error}
              helperText={error?.message}
              onChange={(value) => {
                field.onChange(value);
              }}
              value={field.value}
            />
          )}
        />
      </FormGroup>
    );
  });

  return alternativesMap;
};

export default Alternatives;
