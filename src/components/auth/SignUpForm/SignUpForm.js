import { Link } from "react-router-dom";
import { Box, Button, Radio, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import content from "../../../content";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const inputErrors = content.errors.input;

const SignUpForm = ({ onSubmit, onSuccess, onError }) => {
  const [role, setRole] = useState();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required(inputErrors.empty)
      .email(inputErrors.invalidEmail),
    password: yup.string().required(inputErrors.empty),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], inputErrors.passwordsDontMatch)
      .required(inputErrors.empty),
    role: yup.string().required(inputErrors.empty),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSignUp = async (data) => {
    const { success, error } = await onSubmit(data);
    success ? onSuccess() : onError(error.message);
  };

  return (
    <>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSignUp)}>
        <TextField
          error={errors.email}
          fullWidth
          helperText={errors.email?.message}
          label="Email"
          variant="standard"
          type="email"
          {...register("email")}
        />
        <TextField
          error={errors.password}
          fullWidth
          helperText={errors.password?.message}
          label="Password"
          variant="standard"
          type="password"
          {...register("password")}
        />
        <TextField
          error={errors.confirmPassword}
          fullWidth
          helperText={errors.confirmPassword?.message}
          label="Confirm password"
          variant="standard"
          type="password"
          {...register("confirmPassword")}
        />
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Box display="flex" alignItems="center">
              <Radio
                onChange={(value) => {
                  setRole("teacher");
                  field.onChange(value);
                }}
                checked={role === "teacher"}
                value="teacher"
              />
              <Typography>I am a teacher</Typography>
            </Box>
          )}
        />
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Box display="flex" alignItems="center">
              <Radio
                onChange={(value) => {
                  setRole("student");
                  field.onChange(value);
                }}
                checked={role === "student"}
                value="student"
              />
              <Typography>I am a student</Typography>
            </Box>
          )}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" fullWidth>
            Sign up
          </Button>
        </Box>
      </form>
      <Box mt={2}>
        Already have an account? <Link to="/auth/login">Login</Link>
      </Box>
    </>
  );
};

export default SignUpForm;
