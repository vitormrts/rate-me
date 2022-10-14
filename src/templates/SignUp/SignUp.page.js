import { useNavigate } from "react-router-dom";
import { Base, SignUpForm } from "../../components/auth";
import content from "../../content";
import { useAuth, useToast } from "../../hooks";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { dispatchToast } = useToast();
  const { signUp } = useAuth();

  const goToLogin = () => {
    dispatchToast("User registered successfully", "SUCCESS");
    navigate("/login");
  };

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
