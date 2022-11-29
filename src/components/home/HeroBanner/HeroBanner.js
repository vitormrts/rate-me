import { Button } from "@mui/material";
import * as S from "./HeroBanner.style";

const HeroBanner = ({ onSignUpClick, onLoginClick }) => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Header>
          <S.Logo>Rate Me</S.Logo>
          <S.ButtonGroup>
            <Button variant="contained" onClick={onSignUpClick}>
              Sign Up
            </Button>
            <Button variant="outlined" onClick={onLoginClick}>
              Login
            </Button>
          </S.ButtonGroup>
        </S.Header>
        <S.TextContent>
          <S.Title>Avalie seus alunos</S.Title>
          <S.Subtitle>
            Avalie seus alunos por meio de exames. A equação é simples: você
            avalie-os, e eles te odeiam.
          </S.Subtitle>
          <S.ButtonAdapter>
            <Button text="Sign up now" onClick={onSignUpClick} />
          </S.ButtonAdapter>
        </S.TextContent>
      </S.Container>
    </S.Wrapper>
  );
};

export default HeroBanner;
