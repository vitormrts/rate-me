import * as S from "./Container.style";

const Container = ({ children, title = "Title", Button }) => {
  return (
    <S.Background>
      <S.Content>
        <S.TitleGroup>
          <S.Title>{title}</S.Title>
          {Button && (
            <S.ButtonAdapter>
              <Button />
            </S.ButtonAdapter>
          )}
        </S.TitleGroup>
        <S.Children>{children}</S.Children>
      </S.Content>
    </S.Background>
  );
};

export default Container;
