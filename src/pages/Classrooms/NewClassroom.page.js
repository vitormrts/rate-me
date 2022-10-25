import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import content from "../../content";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewClassroomPage = () => {
  const navigate = useNavigate();
  const inputErrors = content.errors.input;

  const schema = yup.object().shape({
    name: yup.string().required(inputErrors.empty),
    description: yup.string().required(inputErrors.empty),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onCreateClassroom = (data) => {
    console.log(data);
    toast.success("Classroom created successfully");
    navigate("/dashboard/classrooms/list");
  };

  return (
    <form onSubmit={handleSubmit(onCreateClassroom)}>
      <TextField
        label="Name"
        variant="standard"
        error={errors.name}
        helperText={errors.name?.message}
        {...register("name")}
      />
      <TextField
        label="Description"
        variant="standard"
        error={errors.description}
        helperText={errors.description?.message}
        multiline
        {...register("description")}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default NewClassroomPage;
