import { useCallback } from "react";
import * as S from "./Radio.style";

const Radio = ({
  name,
  checked = false,
  label = "Label",
  onChange,
  value,
  error,
}) => {
  const handleOnChange = useCallback(() => {
    onChange && onChange(name, value);
  }, [onChange]);

  return (
    <S.Wrapper>
      <S.Label onChange={handleOnChange}>
        <S.Input type="radio" checked={checked} />
        {label}
        <S.Error>{error}</S.Error>
      </S.Label>
    </S.Wrapper>
  );
};

export default Radio;
