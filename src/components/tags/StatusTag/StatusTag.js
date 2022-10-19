import * as S from "./StatusTag.style";

const StatusTag = ({ text, color }) => (
  <S.Status color={color}>{text}</S.Status>
);

export default StatusTag;
