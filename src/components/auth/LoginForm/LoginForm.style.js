import styled from "styled-components";
import { css } from "styled-components";

export const Form = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export const ButtonAdapter = styled.div`
  margin-top: 16px;
  width: 100%;
`;

export const ForgotPasswordLabel = styled.p`
  ${({ theme }) => css`
    width: 100%;
    strong {
      color: ${theme.colors.primary.main};
    }
  `}
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
