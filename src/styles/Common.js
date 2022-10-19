import styled from "styled-components";
import { css } from "styled-components";

export const DefaultWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DefaultContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1220px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 15px;
`;

export const DefaultTable = styled.table`
  ${({ theme }) => css`
    border-spacing: unset;
    border-collapse: collapse;
    width: 100%;
    thead {
      background-color: ${theme.colors.primary.main};
      color: ${theme.colors.white};
    }
    th,
    td {
      padding: 10px;
      text-align: start;
    }
    tr {
      &:nth-child(even) {
        background-color: ${theme.colors.primary.light};
      }
    }
  `}
`;
