import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import content from "../../content";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditClassroomPage = () => {
  const navigate = useNavigate();
  const inputErrors = content.errors.input;

  const schema = yup.object().shape({
    name: yup.string().required(inputErrors.empty),
    description: yup.string().required(inputErrors.empty),
  });

  const classroom = {
    name: "ACH2001",
    description:
      "Nessa sala você verá sobre análise de algoritmos de computação.",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onCreateClassroom = (data) => {
    console.log(data);
    toast.success("Classroom edited successfully");
    navigate("/dashboard/classrooms/list");
  };

  return (
    <form onSubmit={handleSubmit(onCreateClassroom)}>
      <TextField
        label="Name"
        variant="standard"
        error={errors.name}
        helperText={errors.name?.message}
        defaultValue={classroom.name}
        {...register("name")}
      />
      <TextField
        label="Description"
        variant="standard"
        error={errors.description}
        helperText={errors.description?.message}
        defaultValue={classroom.description}
        multiline
        {...register("description")}
      />
      <Button type="submit" variant="contained">
        Edit
      </Button>
    </form>
  );
};

export default EditClassroomPage;
