import styled from "styled-components";
import { css } from "styled-components";

export const DefaultBackground = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray.light};
    width: 100vw;
    height: 100vh;
  `}
`;

export const DefaultSection = styled.div`
  ${({ theme }) => css`
    width: 100%;
    box-shadow: 10px 10px 10px black;
    background-color: ${theme.colors.white};
    padding: 32px;
  `}
`;

export const DefaultWrapper = styled.div`
  width: 100%;
`;

export const DefaultContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1170px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0 15px;
`;
