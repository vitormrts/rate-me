import styled from "styled-components";
import { css } from "styled-components";
import { DefaultContainer } from "../../../styles/Common";

export const Container = styled(DefaultContainer)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
    background-color: ${theme.colors.white};
    max-height: 680px;
    padding: 16px;
    height: 100%;
    max-width: unset;
    width: 100%;
  `}
`;

export const TitleGroup = styled.div`
  ${({ theme }) => css`
    width: 100%;
    margin-bottom: 16px;
    padding-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.colors.primary.light};
  `}
`;

export const Title = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.gray.dark};
    font-weight: ${theme.font.weights.bold};
  `}
`;

export const ButtonAdapter = styled.div`
  max-width: 200px;
`;

export const Children = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
