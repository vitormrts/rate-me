import { useCallback } from "react";
import * as S from "./Radio.style";

const Radio = ({ checked = false, label = "Label", onChange }) => {
  const handleOnChange = useCallback(() => {
    onChange && onChange(checked);
  }, [onChange, checked]);

  return (
    <S.Wrapper>
      <S.Label onChange={handleOnChange}>
        <S.Input type="radio" checked={checked} />
        {label}
      </S.Label>
    </S.Wrapper>
  );
};

export default Radio;
