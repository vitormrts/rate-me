import { useCallback } from "react";
import * as S from "./Input.style";

const Input = ({
  label = "Label",
  placeholder = "Placeholder",
  type = "text",
  name,
  value,
  onChange,
  error,
}) => {
  const handleOnChange = useCallback(
    (event) => {
      onChange && onChange(name, event.target.value);
    },
    [onChange]
  );

  return (
    <S.Wrapper>
      <S.Label>
        {label}
        <S.Input
          error={error}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={handleOnChange}
        />
        <S.Error>{error}</S.Error>
      </S.Label>
    </S.Wrapper>
  );
};

export default Input;
