import { Input, Radio } from "../../inputs";
import { Button } from "../../buttons";
import * as S from "./SignUpForm.style";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUpForm = ({ errorMessages, onSubmit, onSuccess }) => {
  const initialState = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
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

  const checkConfirmPassword = (password, confirmPassword) => {
    const isEmpty = checkEmpty(confirmPassword);
    if (isEmpty) return isEmpty;
    if (password !== confirmPassword) {
      return errorMessages.input.passwordsDontMatch;
    }
  };

  const handleOnClick = () => {
    const data = { ...formData };
    const formErrors = {
      fullName: checkEmpty(data.fullName),
      username: checkEmpty(data.username),
      email: checkEmpty(data.email),
      password: checkEmpty(data.password),
      confirmPassword: checkConfirmPassword(
        data.password,
        data.confirmPassword
      ),
      role: !data.role,
    };
    setErrors(formErrors);
    const isValid = validate(formErrors);
    if (isValid) {
      const { success } = onSubmit(data);
      success && onSuccess();
      return;
    }
  };

  const onChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <>
      <S.Form>
        <Input
          label="Full Name"
          name="fullName"
          onChange={onChange}
          placeholder="Example"
          type="text"
          value={formData.fullName}
          error={errors.fullName}
        />
        <Input
          label="Username"
          name="username"
          onChange={onChange}
          placeholder="example"
          value={formData.username}
          type="text"
          error={errors.username}
        />
        <Input
          label="Email"
          name="email"
          onChange={onChange}
          placeholder="example@example.com"
          type="email"
          value={formData.email}
          error={errors.email}
        />
        <Input
          label="Password"
          name="password"
          onChange={onChange}
          placeholder="******************"
          type="password"
          value={formData.password}
          error={errors.password || errors.confirmPassword}
        />
        <Input
          label="Confirm password"
          name="confirmPassword"
          onChange={onChange}
          placeholder="******************"
          type="password"
          value={formData.confirmPassword}
          error={errors.confirmPassword}
        />
        <Radio
          checked={formData.role === "teacher"}
          name="role"
          onChange={onChange}
          value="teacher"
          label="I'm a teacher"
          error={errors.role}
        />
        <Radio
          checked={formData.role === "student"}
          name="role"
          onChange={onChange}
          value="student"
          label="I'm a student"
          error={errors.role}
        />
        <S.ButtonAdapter>
          <Button onClick={handleOnClick} text="Sign up" />
        </S.ButtonAdapter>
      </S.Form>
      <S.AlreadyHaveAccountLabel>
        Already have an account?
        <Link to="/login">Login</Link>
      </S.AlreadyHaveAccountLabel>
    </>
  );
};

export default SignUpForm;
