import styled, { css } from "styled-components";

export const Status = styled.span`
  ${({ theme, color }) => css`
    background-color: ${theme.colors.gray.dark};
    color: ${theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    text-align: center;
    font-size: 10px;
    line-height: 14px;
    ${color === "blue" &&
    css`
      background-color: ${theme.colors.primary.main};
      color: ${theme.colors.white};
    `}
    ${color === "red" &&
    css`
      background-color: ${theme.colors.indicators.error};
      color: ${theme.colors.white};
    `}
    ${color === "green" &&
    css`
      background-color: ${theme.colors.indicators.success};
      color: ${theme.colors.white};
    `}
  `}
`;
