import * as React from "react";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Link from "@mui/material/Link";

const Breadcrumbs = ({ items = [] }) => {
  const itemsMap = items.map((item) => {
    return (
      <Link
        key={item.text}
        underline={item.href ? "hover" : "none"}
        sx={{ display: "flex", alignItems: "center" }}
        color={item.href ? "inherit" : "text.primary"}
        href={item.href}
      >
        <item.Icon sx={{ mr: 0.5 }} fontSize="inherit" />
        {item.text}
      </Link>
    );
  });

  return (
    <div role="presentation">
      <MuiBreadcrumbs aria-label="breadcrumb">{itemsMap}</MuiBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
