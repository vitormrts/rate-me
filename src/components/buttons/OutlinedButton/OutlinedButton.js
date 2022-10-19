import * as S from "./OutlinedButton.style";
import { useCallback } from "react";

const OutlinedButton = ({ onClick, text = "Default Message", isBlue }) => {
  const handleOnClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return (
    <S.OutlinedButton isBlue={isBlue} onClick={handleOnClick}>
      {text}
    </S.OutlinedButton>
  );
};

export default OutlinedButton;
