import * as S from "./Button.style";
import { useCallback } from "react";

const Button = ({ onClick, text = "Default Message" }) => {
  const handleOnClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return <S.Button onClick={handleOnClick}>{text}</S.Button>;
};

export default Button;
