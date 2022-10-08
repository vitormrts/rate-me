import styled, { css } from "styled-components";

export const Button = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.white};
    min-width: 170px;
    padding: 15px 30px;
    border-radius: 4px;
  `}
`;
