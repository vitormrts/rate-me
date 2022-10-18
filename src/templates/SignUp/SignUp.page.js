import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Base, SignUpForm } from "../../components/auth";
import content from "../../content";
import { useAuth } from "../../hooks";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const onSuccess = () => {
    toast.success("User registered successfully");
    navigate("/login");
  };

  const onError = () => {
    toast.error("An error occurred when create user");
  };

  return (
    <Base title="Sign Up" subtitle="First create your account">
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
