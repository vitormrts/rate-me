import { useNavigate } from "react-router-dom";
import { Base, LoginForm } from "../../components/auth";
import content from "../../content";
import { useAuth, useToast } from "../../hooks";

const LoginPage = () => {
  const navigate = useNavigate();
  const { dispatchToast } = useToast();
  const { login } = useAuth();

  const goToClassrooms = () => {
    dispatchToast("User logged in successfully", "SUCCESS");
    navigate("/classrooms");
  };

  const authFailed = () => {
    dispatchToast("Incorrect username or password", "ERROR");
  };

  return (
    <Base title="Login" subtitle="Enter your email and password">
      <LoginForm
        errorMessages={content.errors}
        onSubmit={login}
        onSuccess={goToClassrooms}
        onError={authFailed}
      />
    </Base>
  );
};

export default LoginPage;
