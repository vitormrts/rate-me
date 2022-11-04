import { Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import content from "../../content";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useClassrooms } from "../../hooks";
import { Group } from "../../components/groups";

const NewClassroomPage = () => {
  const { createClassroom } = useClassrooms();
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

  const onCreateClassroom = async (data) => {
    const { success, message } = await createClassroom(data);
    if (success) {
      toast.success(message);
      navigate("/dashboard/classrooms");
      return;
    }
    toast.error(message);
  };

  return (
    <Group title="Create classroom">
      <form onSubmit={handleSubmit(onCreateClassroom)}>
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <TextField
              label="Name"
              variant="standard"
              error={errors.name}
              helperText={errors.name?.message}
              fullWidth
              {...register("name")}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              label="Description"
              variant="standard"
              error={errors.description}
              helperText={errors.description?.message}
              multiline
              fullWidth
              {...register("description")}
            />
          </Grid>
          <Grid item sm={4}>
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Group>
  );
};

export default NewClassroomPage;
