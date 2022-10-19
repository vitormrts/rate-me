import styled, { css } from "styled-components";

export const OutlinedButton = styled.button`
  ${({ theme, isBlue }) => css`
    border: 1px solid ${theme.colors.primary.main};
    color: ${isBlue ? theme.colors.primary.main : theme.colors.white};
    cursor: pointer;
    min-width: 170px;
    width: 100%;
    padding: 15px 30px;
    border-radius: 4px;
    transition: 0.2s;
    &:hover {
      filter: brightness(0.8);
    }
  `}
`;
