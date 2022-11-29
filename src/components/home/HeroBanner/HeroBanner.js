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
          <S.Title>Evaluate your technology students</S.Title>
          <S.Subtitle>
            Evaluate your students through exams. The equation is simple: you
            rate them, and they hate you.
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
