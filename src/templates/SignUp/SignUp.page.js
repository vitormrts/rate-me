import { Base, SignUpForm } from "../../components/auth";
import { useAuth } from "../../hooks";

const SignUpPage = () => {
  const { signUp } = useAuth();
  return (
    <Base title="Sign Up" subtitle="First create your account">
      <SignUpForm onSubmit={signUp} />
    </Base>
  );
};

export default SignUpPage;
