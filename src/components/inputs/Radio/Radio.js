import { useCallback } from "react";
import * as S from "./Radio.style";

const Radio = ({ name, checked = false, label = "Label", onChange, value }) => {
  const handleOnChange = useCallback(() => {
    onChange && onChange(name, value);
  }, [onChange]);

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
