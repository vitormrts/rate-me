import styled from "styled-components";
import { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary.light};
    width: 100%;
    max-width: 330px;
    min-height: 220px;
    padding: 24px;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  `}
`;

export const Name = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.gray.dark};
    font-weight: ${theme.font.weights.bold};
  `}
`;

export const Description = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.gray.variant};
  `}
`;

export const Info = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;
export const Field = styled.p`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    color: ${theme.colors.gray.dark};
    strong {
      color: ${theme.colors.gray.dark};
    }
  `}
`;
