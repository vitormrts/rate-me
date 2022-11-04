import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Base, LoginForm } from "../../components/auth";
import content from "../../content";
import { useAuth } from "../../hooks";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSuccess = () => {
    toast.success("User logged in successfully");
    navigate("/dashboard/classrooms");
  };

  const onError = () => {
    toast.error("Incorrect username or password");
  };

  return (
    <Base title="Login" subtitle="Enter your email and password">
      <LoginForm
        errorMessages={content.errors}
        onSubmit={login}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Base>
  );
};

export default LoginPage;
