import { useCallback } from "react";
import * as S from "./ClassroomCard.style";

const ClassroomCard = ({
  name = "Lorem ipsum",
  description = "Sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam",
  onClick,
}) => {
  const handleOnClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return (
    <S.Wrapper onClick={handleOnClick}>
      <S.Name>{name}</S.Name>
      <S.Description>{description}</S.Description>
    </S.Wrapper>
  );
};

export default ClassroomCard;
