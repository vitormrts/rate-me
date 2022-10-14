import styled, { css } from "styled-components";

export const Button = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.white};
    min-width: 170px;
    padding: 16px 32px;
    border-radius: 4px;
    width: 100%;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      filter: brightness(0.8);
    }
  `}
`;
