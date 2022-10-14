import styled from "styled-components";
import { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 8px;
  position: relative;
`;

export const Label = styled.label`
  ${({ theme }) => css`
    color: ${theme.colors.gray.dark};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  `}
`;

export const Input = styled.input`
  width: 16px;
  height: 16px;
`;

export const Error = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.indicators.error};
  `}
`;
