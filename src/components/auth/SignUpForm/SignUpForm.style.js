import styled from "styled-components";
import { css } from "styled-components";

export const Form = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export const ButtonAdapter = styled.div`
  margin-top: 16px;
  width: 100%;
`;

export const AlreadyHaveAccountLabel = styled.p`
  ${({ theme }) => css`
    margin-top: 12px;
    a {
      margin-left: 4px;
      color: ${theme.colors.primary.main};
    }
  `}
`;
