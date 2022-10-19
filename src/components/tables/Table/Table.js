import {
  Table as MuiTable,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";

const Table = ({ columns, data }) => {
  const tableHeading = columns.map((column) => (
    <TableCell key={column.key} component="th">
      {column.name}
    </TableCell>
  ));

  const tableData = data.map((row) => (
    <TableRow key={row.id}>
      {columns.map((column) => (
        <TableCell key={column.key}>
          {column.actions &&
            column.actions.map(
              ({ Component, onClick, show }) =>
                show && (
                  <Component key={column.key} onClick={() => onClick(row.id)} />
                )
            )}
          {!column.actions && row[column.key]}
        </TableCell>
      ))}
    </TableRow>
  ));

  return (
    <MuiTable stickyHeader>
      <TableHead>
        <TableRow>{tableHeading}</TableRow>
      </TableHead>
      <TableBody>{tableData}</TableBody>
    </MuiTable>
  );
};

export default Table;
