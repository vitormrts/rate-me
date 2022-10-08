import { Button, OutlinedButton } from "../../buttons";
import * as S from "./HeroBanner.style";

const HeroBanner = () => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Header>
          <S.Logo>Rate Me</S.Logo>
          <S.ButtonGroup>
            <Button text="Sign Up" />
            <OutlinedButton text="Login" />
          </S.ButtonGroup>
        </S.Header>
        <S.TextContent>
          <S.Title>Evaluate your technology students</S.Title>
          <S.Subtitle>
            Evaluate your students through exams. The equation is simple: you
            rate them, and they hate you.
          </S.Subtitle>
          <S.ButtonAdapter>
            <Button text="Sign up now" />
          </S.ButtonAdapter>
        </S.TextContent>
      </S.Container>
    </S.Wrapper>
  );
};

export default HeroBanner;
