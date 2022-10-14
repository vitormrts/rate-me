import { useNavigate } from "react-router-dom";
import { Base, SignUpForm } from "../../components/auth";
import content from "../../content";
import { useAuth } from "../../hooks";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const goToLogin = () => navigate("/login");

  return (
    <Base title="Sign Up" subtitle="First create your account">
      <SignUpForm
        errorMessages={content.errors}
        onSubmit={signUp}
        onSuccess={goToLogin}
      />
    </Base>
  );
};

export default SignUpPage;
