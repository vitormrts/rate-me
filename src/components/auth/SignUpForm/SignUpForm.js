import { Input, Radio } from "../../inputs";
import { Button } from "../../buttons";
import * as S from "./SignUpForm.style";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  return (
    <>
      <S.Form>
        <Input label="Fullname" placeholder="Example" />
        <Input label="Username" placeholder="example" />
        <Input label="Email" placeholder="example@example.com" type="email" />
        <Input
          label="Password"
          placeholder="******************"
          type="password"
        />
        <Input
          label="Confirm password"
          placeholder="******************"
          type="password"
        />
        <Radio label="I'm a teacher" />
        <Radio label="I'm a student" />
        <S.ButtonAdapter>
          <Button text="Sign up" />
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
