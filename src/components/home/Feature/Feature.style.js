import styled, { css } from "styled-components";
import { DefaultContainer } from "../../../styles/Common";

export const Wrapper = styled.div`
  ${({ theme, backgroundGray }) => css`
    width: 100%;
    padding: 0 15px;
    background-color: ${backgroundGray
      ? theme.colors.gray.light
      : theme.colors.white};
  `}
`;

export const Container = styled(DefaultContainer)`
  ${({ imagePosition, theme }) => css`
    padding: 40px 0;
    flex-direction: ${imagePosition === "right" ? "row" : "row-reverse"};
    justify-content: space-between;
    align-items: center;
    gap: 32px;
    @media (max-width: ${theme.breakpoints.lg}) {
      flex-direction: column;
    }
  `}
`;

export const TextContent = styled.div`
  ${({ theme }) => css`
    max-width: 600px;
    width: 100%;
    @media (max-width: ${theme.breakpoints.lg}) {
      max-width: 100%;
    }
  `}
`;

export const ImageAdapter = styled.div`
  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.lg}) {
      max-width: 320px;
    }
  `}
`;

export const Image = styled.img`
  width: 100%;
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.gray.dark};
    strong {
      color: ${theme.colors.primary.main};
    }
  `}
`;

export const Description = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.gray.variant};
    margin: 24px 0 40px;
    br {
      display: block; /* makes it have a width */
      content: ""; /* clears default height */
      height: 16px;
    }
  `}
`;

export const ButtonAdapter = styled.div`
  max-width: 284px;
  width: 100%;
`;
