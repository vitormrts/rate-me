import { Input } from "../../inputs";
import { Button } from "../../buttons";
import * as S from "./LoginForm.style";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <>
      <S.Form>
        <Input label="Username" placeholder="example" />
        <Input
          label="Password"
          placeholder="******************"
          type="password"
        />
        <S.ForgotPasswordLabel>
          <strong>Forgot password?</strong>
        </S.ForgotPasswordLabel>
        <S.ButtonAdapter>
          <Button text="Login" />
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
