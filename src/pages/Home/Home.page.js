import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/footer";
import { Feature, HeroBanner } from "../../components/home";

const HomePage = () => {
  const navigate = useNavigate();

  const onSignUpClick = () => navigate("/auth/signup");

  const onLoginClick = () => navigate("/auth/login");

  return (
    <>
      <HeroBanner onSignUpClick={onSignUpClick} onLoginClick={onLoginClick} />
      <Feature
        onSignUpClick={onSignUpClick}
        title="Controle suas salas de aula e aplique <strong>provas com tempo limite</strong>"
        description="Crie questões fechadas com uma resposta pré-definida, ou crie questões abertas e corrija você mesmo."
        cta="Quero avaliar"
        image="/assets/home/teacher.png"
      />
      <Feature
        onSignUpClick={onSignUpClick}
        title="Faça exames e veja a sua <strong>performance</strong>"
        description="Esteja ciente de que seu professor pode criar perguntas fechadas ou abertas, mas não os odeie por isso. Olhe para sua nota individual e notas de classe, talvez você não seja tão ruim."
        cta="(Não quero) Ser avaliado"
        image="/assets/home/student.png"
        imagePosition="left"
        backgroundGray
      />
      <Footer />
    </>
  );
};

export default HomePage;
