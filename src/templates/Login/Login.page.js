import { Base, LoginForm } from "../../components/auth";

const LoginPage = () => {
  return (
    <Base title="Login" subtitle="Enter your email and password">
      <LoginForm />
    </Base>
  );
};

export default LoginPage;
