import { useCallback } from "react";
import * as S from "./ExamCard.style";
import { IconCalendar, IconClock } from "../../../icons";

const ExamCard = ({
  name = "Lorem ipsum",
  timeLimit,
  initialDate,
  finalDate,
  onClick,
  closed,
}) => {
  const handleOnClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return (
    <S.Wrapper onClick={handleOnClick} closed={closed}>
      <S.Name>{name}</S.Name>
      {closed && (
        <S.ClosedDescription>
          The deadline for this exam has been reached. See individual and room
          performances.
        </S.ClosedDescription>
      )}
      {!closed && (
        <S.Info>
          <S.Field>
            <strong>Time limit:</strong> {timeLimit} minutes
          </S.Field>
          <S.Field>
            <strong>Initial date:</strong> {initialDate}
          </S.Field>
          <S.Field>
            <strong>Final date:</strong> {finalDate}
          </S.Field>
        </S.Info>
      )}
    </S.Wrapper>
  );
};

export default ExamCard;
