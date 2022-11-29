import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Base, SignUpForm } from "../../components/auth";
import content from "../../content";
import { useAuth } from "../../hooks";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const onSuccess = () => {
    toast.success("Usuário registrado com sucesso");
    navigate("/auth/login");
  };

  const onError = (error) => {
    toast.error(error);
  };

  return (
    <Base title="Sign Up" subtitle="Primeiro, crie sua conta">
      <SignUpForm
        errorMessages={content.errors}
        onSubmit={signUp}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Base>
  );
};

export default SignUpPage;
