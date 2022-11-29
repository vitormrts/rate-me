import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Base, LoginForm } from "../../components/auth";
import content from "../../content";
import { useAuth } from "../../hooks";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSuccess = () => {
    toast.success("Usuário entrou com sucesso");
    navigate("/dashboard/classrooms");
  };

  const onError = () => {
    toast.error("Email ou senha incorretos");
  };

  return (
    <Base title="Login" subtitle="Insira o seu email e senha">
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
