import styled, { css } from "styled-components";

export const OutlinedButton = styled.button`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.primary.main};
    color: ${theme.colors.white};
    cursor: pointer;
    min-width: 170px;
    padding: 15px 30px;
    border-radius: 4px;
    transition: 0.2s;
    &:hover {
      filter: brightness(0.8);
    }
  `}
`;
