import * as S from "./Input.style";

const Input = ({
  label = "Label",
  placeholder = "Placeholder",
  type = "text",
  onClick,
}) => {
  return (
    <S.Wrapper>
      <S.Label onClick={onClick}>
        {label}
        <S.Input placeholder={placeholder} type={type} />
      </S.Label>
    </S.Wrapper>
  );
};

export default Input;
