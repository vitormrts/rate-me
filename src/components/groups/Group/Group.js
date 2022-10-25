import * as S from "./Group.style";

const Group = ({ id, children, title = "Title", Button }) => {
  return (
    <S.Container id={id}>
      <S.TitleGroup>
        <S.Title>{title}</S.Title>
        {Button && (
          <S.ButtonAdapter>
            <Button />
          </S.ButtonAdapter>
        )}
      </S.TitleGroup>
      <S.Children>{children}</S.Children>
    </S.Container>
  );
};

export default Group;
