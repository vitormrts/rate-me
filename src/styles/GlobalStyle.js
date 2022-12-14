import { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => css`
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      font-family: "Roboto", "sans-serif";
    }
    body {
      background-color: ${theme.colors.gray.light};
    }
    h1 {
      font-size: ${theme.font.sizes.xxxl};
      line-height: 75px;
      font-weight: ${theme.font.weights.bold};
    }
    h2 {
      font-size: ${theme.font.sizes.xxl};
      line-height: 56px;
      font-weight: ${theme.font.weights.bold};
    }
    h3 {
      font-size: ${theme.font.sizes.xl};
      font-weight: ${theme.font.weights.regular};
      line-height: 36px;
    }
    p,
    span {
      font-size: ${theme.font.sizes.md};
      line-height: 24px;
    }
    small {
      font-size: ${theme.font.sizes.sm};
    }
    button {
      font-size: ${theme.font.sizes.xxs};
      background: none;
      border: none;
      text-transform: uppercase;
      text-align: center;
      font-weight: ${theme.font.weights.bold};
    }
    strong {
      font-weight: ${theme.font.weights.bold};
    }
    br {
      display: block;
      content: "";
    }
  `}
`;

export default GlobalStyle;
