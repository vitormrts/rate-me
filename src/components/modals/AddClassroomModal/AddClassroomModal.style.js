import styled from "styled-components";
import { css } from "styled-components";

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.gray.dark};
  `}
`;
