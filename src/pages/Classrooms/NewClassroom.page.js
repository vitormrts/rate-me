import { Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import content from "../../content";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useClassrooms } from "../../hooks";
import { Group } from "../../components/groups";
import { AddRounded, HomeRounded } from "@mui/icons-material";

const NewClassroomPage = () => {
  const { createClassroom } = useClassrooms();
  const navigate = useNavigate();
  const inputErrors = content.errors.input;

  const schema = yup.object().shape({
    name: yup.string().required(inputErrors.empty),
    description: yup.string().required(inputErrors.empty),
    password: yup.string().required(inputErrors.empty),
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

  const breadcrumbs = [
    {
      text: "Salas de aula",
      Icon: HomeRounded,
      href: "/dashboard/classrooms",
    },
    {
      text: "Criar sala de aula",
      Icon: AddRounded,
    },
  ];

  return (
    <Group title="Criar sala de aula" breadcrumbs={breadcrumbs}>
      <form onSubmit={handleSubmit(onCreateClassroom)}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <TextField
              label="Nome"
              variant="standard"
              error={errors.name}
              helperText={errors.name?.message}
              fullWidth
              {...register("name")}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label="Senha"
              variant="standard"
              type="password"
              error={errors.password}
              helperText={errors.password?.message}
              fullWidth
              {...register("password")}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Descrição"
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
              Adicionar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Group>
  );
};

export default NewClassroomPage;
