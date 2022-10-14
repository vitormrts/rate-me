import { useNavigate } from "react-router-dom";
import { Base, LoginForm } from "../../components/auth";
import content from "../../content";
import { useAuth } from "../../hooks";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const goToClassrooms = () => navigate("/classrooms");

  return (
    <Base title="Login" subtitle="Enter your email and password">
      <LoginForm
        errorMessages={content.errors}
        onSubmit={login}
        onSuccess={goToClassrooms}
      />
    </Base>
  );
};

export default LoginPage;
