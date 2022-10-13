import * as S from "./Base.style";

const Base = ({ children, title, subtitle }) => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>{title}</S.Title>
        <S.Subtitle>{subtitle}</S.Subtitle>
        {children}
      </S.Container>
    </S.Wrapper>
  );
};

export default Base;
