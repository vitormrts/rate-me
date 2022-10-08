import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/footer";
import { Feature, HeroBanner } from "../../components/home";

const HomePage = () => {
  const navigate = useNavigate();

  const onSignUpClick = () => navigate("sign-up");

  const onLoginClick = () => navigate("login");

  return (
    <>
      <HeroBanner onSignUpClick={onSignUpClick} onLoginClick={onLoginClick} />
      <Feature
        onSignUpClick={onSignUpClick}
        title="Manage classrooms and apply <strong>scheduled time-limited</strong> exams"
        description="Create closed questions that have a predefined answer or open questions with a code editor for your students. Ah, don't worry, you can shuffle the questions to prevent cheating."
        cta="I wan't to rate"
        image="/assets/home/teacher.png"
      />
      <Feature
        onSignUpClick={onSignUpClick}
        title="Take exams and get your <strong>performance</strong>"
        description="Be aware that your teacher can create closed or open questions, but don't hate them for it. Look at your individual grade and class grades, maybe you're not so bad."
        cta="(I don't want) to be rated"
        image="/assets/home/student.png"
        imagePosition="left"
        backgroundGray
      />
      <Footer />
    </>
  );
};

export default HomePage;
