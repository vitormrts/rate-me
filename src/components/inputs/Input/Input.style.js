import styled from "styled-components";
import { css } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

export const Label = styled.label`
  ${({ theme }) => css`
    color: ${theme.colors.gray.main};
    width: 100%;
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray.light};
    border: none;
    border-radius: 4px;
    padding: 16px;
    width: 100%;
    margin-top: 2px;
    outline: 1px solid transparent;
    transition: 0.2s outline;
    &:focus {
      outline: 1px solid ${theme.colors.gray.dark};
    }
  `}
`;
