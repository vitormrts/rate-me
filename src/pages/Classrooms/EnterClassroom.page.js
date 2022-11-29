import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import content from "../../content";
import { useClassrooms } from "../../hooks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const inputErrors = content.errors.input;

const EnterClassroomPage = () => {
  const navigate = useNavigate();
  const { classroomId } = useParams();
  const { enterClassroom } = useClassrooms();

  const schema = yup.object().shape({
    password: yup.string().required(inputErrors.empty),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onConfirm = async (data) => {
    const { success, error } = await enterClassroom(data, classroomId);
    if (success) {
      toast.success("Você entrou na sala com sucesso");
      navigate("/dashboard/classrooms");
      return;
    }
    toast.error(error.message);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Para entrar insira a senha da sala de aula
          </Typography>
          <form onSubmit={handleSubmit(onConfirm)}>
            <Box mt={2}>
              <TextField
                error={errors.password}
                fullWidth
                helperText={errors.password?.message}
                label="Senha"
                type="password"
                variant="standard"
                {...register("password")}
              />
            </Box>
            <Box mt={2}>
              <Button type="submit" variant="contained" fullWidth>
                Confirmar
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EnterClassroomPage;
