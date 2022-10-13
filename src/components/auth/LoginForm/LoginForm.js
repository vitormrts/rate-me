import { Input } from "../../inputs";
import { Button } from "../../buttons";
import * as S from "./LoginForm.style";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginForm = ({ onSubmit }) => {
  const initialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState([]);

  const validate = (formErrors) => {
    const isValid = Object.keys(formErrors).every((key) => !formErrors[key]);
    return isValid;
  };

  const handleOnClick = () => {
    const data = { ...formData };
    const formErrors = {
      username: !data.username,
      password: !data.password,
    };
    const isValid = validate(formErrors);
    if (isValid) {
      onSubmit(data);
      setFormData(initialState);
      return;
    }
    setErrors(formErrors);
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
          placeholder="example"
          type="text"
          value={formData.username}
        />
        <Input
          label="Password"
          name="password"
          onChange={onChange}
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
