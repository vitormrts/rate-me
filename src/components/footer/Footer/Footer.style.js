import styled, { css } from "styled-components";

export const Footer = styled.footer`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.colors.primary.main};
  `}
`;

export const Copyright = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weights.bold};
    padding: 24px 0;
    text-align: center;
  `}
`;
