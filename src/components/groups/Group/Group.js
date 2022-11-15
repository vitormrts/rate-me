import * as S from "./Group.style";
import Breadcrumbs from "../../breadcrumbs";

const Group = ({ id, children, title = "Title", breadcrumbs = [], Button }) => {
  return (
    <S.Container id={id}>
      <Breadcrumbs items={breadcrumbs} />
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
