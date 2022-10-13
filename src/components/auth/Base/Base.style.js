import styled from "styled-components";
import { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray.light};
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const Container = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
    padding: 56px;
    min-height: 856px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `}
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.gray.dark};
    text-align: center;
  `}
`;

export const Subtitle = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.gray.variant};
    text-align: center;
    margin: 16px 0 24px;
  `}
`;
