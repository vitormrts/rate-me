import styled from "styled-components";
import { css } from "styled-components";
import { DefaultBackground, DefaultContainer } from "../../../styles/Common";

export const Background = styled(DefaultBackground)``;

export const TitleGroup = styled.div`
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.gray.dark};
  `}
`;

export const ButtonAdapter = styled.div`
  max-width: 200px;
`;

export const Content = styled(DefaultContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Children = styled.div`
  max-height: 680px;
  width: 100%;
  overflow-y: auto;
`;
