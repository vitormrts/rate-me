import { Base, LoginForm } from "../../components/auth";
import { useAuth } from "../../hooks";

const LoginPage = () => {
  const { login } = useAuth();
  return (
    <Base title="Login" subtitle="Enter your email and password">
      <LoginForm onSubmit={login} />
    </Base>
  );
};

export default LoginPage;
