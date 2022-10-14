import styled from "styled-components";
import { css } from "styled-components";

export const Overlay = styled.div`
  ${({ open }) => css`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    ${open &&
    css`
      opacity: 1;
      visibility: visible;
    `}
    ${!open &&
    css`
      opacity: 0;
      visibility: hidden;
    `}
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    max-width: 700px;
    max-height: 500px;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    padding: 40px;
    position: relative;
  `}
`;

export const CloseModal = styled.div`
  position: absolute;
  right: 32px;
  top: 32px;
  width: 24px;
  height: 24px;
  opacity: 0.6;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    opacity: 1;
  }
  &::before,
  &::after {
    position: absolute;
    left: 15px;
    content: "";
    height: 33px;
    width: 2px;
    background-color: black;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;
