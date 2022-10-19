import styled, { css } from "styled-components";
import { DefaultContainer } from "../../../styles/Common";

export const Wrapper = styled.div`
  ${({ theme, backgroundGray }) => css`
    width: 100%;
    background-color: ${backgroundGray
      ? theme.colors.gray.light
      : theme.colors.white};
  `}
`;

export const Container = styled(DefaultContainer)`
  ${({ imagePosition }) => css`
    padding: 40px 0;
    flex-direction: ${imagePosition === "right" ? "row" : "row-reverse"};
    justify-content: space-between;
    align-items: center;
  `}
`;

export const TextContent = styled.div`
  max-width: 600px;
  width: 100%;
`;

export const ImageAdapter = styled.div``;

export const Image = styled.img``;

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
