import { Input } from "../../inputs";
import { Button } from "../../buttons";
import * as S from "./LoginForm.style";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginForm = ({ errorMessages, onSubmit, onSuccess, onError }) => {
  const initialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = (formErrors) => {
    const isValid = Object.keys(formErrors).every((key) => !formErrors[key]);
    return isValid;
  };

  const checkEmpty = (value) => {
    if (!value) {
      return errorMessages.input.empty;
    }
  };

  const handleOnClick = () => {
    const data = { ...formData };
    const formErrors = {
      username: checkEmpty(data.username),
      password: checkEmpty(data.password),
    };
    setErrors(formErrors);
    const isValid = validate(formErrors);
    if (isValid) {
      const { success } = onSubmit(data);
      success ? onSuccess() : onError();
    }
  };

  const onChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <>
      <S.Form>
        <Input
          label="Username"
          name="username"
          onChange={onChange}
          error={errors.username}
          placeholder="example"
          type="text"
          value={formData.username}
        />
        <Input
          label="Password"
          name="password"
          onChange={onChange}
          error={errors.password}
          placeholder="******************"
          type="password"
          value={formData.password}
        />
        <S.ForgotPasswordLabel>
          <strong>Forgot password?</strong>
        </S.ForgotPasswordLabel>
        <S.ButtonAdapter>
          <Button text="Login" onClick={handleOnClick} />
        </S.ButtonAdapter>
      </S.Form>
      <S.AlreadyHaveAccountLabel>
        Dont have an account?
        <Link to="/sign-up">Sign up</Link>
      </S.AlreadyHaveAccountLabel>
    </>
  );
};

export default LoginForm;
