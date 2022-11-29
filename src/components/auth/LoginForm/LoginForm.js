import { Link } from "react-router-dom";
import * as yup from "yup";
import content from "../../../content";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";

const inputErrors = content.errors.input;

const LoginForm = ({ onSubmit, onSuccess, onError }) => {
  const schema = yup.object().shape({
    email: yup.string().required(inputErrors.empty),
    password: yup.string().required(inputErrors.empty),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onLogin = async (data) => {
    const { success } = await onSubmit(data);
    success ? onSuccess() : onError();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onLogin)} style={{ width: "100%" }}>
        <Box mt={1}>
          <TextField
            error={errors.email}
            fullWidth
            helperText={errors.email?.message}
            label="Email"
            variant="standard"
            {...register("email")}
          />
        </Box>
        <Box mt={1}>
          <TextField
            error={errors.password}
            fullWidth
            helperText={errors.password?.message}
            label="Password"
            type="password"
            variant="standard"
            {...register("password")}
          />
        </Box>
        <Box mt={2}>
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Box>
      </form>
      <Box mt={2}>
        Não possui uma conta? <Link to="/auth/signup">Sign up</Link>
      </Box>
    </>
  );
};

export default LoginForm;
