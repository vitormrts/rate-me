import { Input, Radio } from "../../inputs";
import { Button } from "../../buttons";
import * as S from "./SignUpForm.style";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUpForm = ({ onSubmit }) => {
  const initialState = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
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
      fullName: !data.fullName,
      username: !data.username,
      email: !data.email,
      password: !data.password || data.password !== data.confirmPassword,
      role: !data.role,
    };
    const isValid = validate(formErrors);
    console.log(formErrors);
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
          label="Full Name"
          name="fullName"
          onChange={onChange}
          placeholder="Example"
          type="text"
          value={formData.fullName}
        />
        <Input
          label="Username"
          name="username"
          onChange={onChange}
          placeholder="example"
          value={formData.username}
          type="text"
        />
        <Input
          label="Email"
          name="email"
          onChange={onChange}
          placeholder="example@example.com"
          type="email"
          value={formData.email}
        />
        <Input
          label="Password"
          name="password"
          onChange={onChange}
          placeholder="******************"
          type="password"
          value={formData.password}
        />
        <Input
          label="Confirm password"
          name="confirmPassword"
          onChange={onChange}
          placeholder="******************"
          type="password"
          value={formData.confirmPassword}
        />
        <Radio
          checked={formData.role === "teacher"}
          name="role"
          onChange={onChange}
          value="teacher"
          label="I'm a teacher"
        />
        <Radio
          checked={formData.role === "student"}
          name="role"
          onChange={onChange}
          value="student"
          label="I'm a student"
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
