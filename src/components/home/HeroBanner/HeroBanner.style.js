import styled, { css } from "styled-components";
import { DefaultWrapper, DefaultContainer } from "../../../styles/Common";

export const Wrapper = styled(DefaultWrapper)`
  background-image: url("/assets/home/hero-banner.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Container = styled(DefaultContainer)`
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Header = styled.header`
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Logo = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weights.bold};
  `}
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const ButtonAdapter = styled.div`
  max-width: 284px;
  width: 100%;
`;

export const TextContent = styled.div`
  margin: auto 0;
  max-width: 700px;
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `}
`;

export const Subtitle = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    margin: 24px 0 40px;
  `}
`;
