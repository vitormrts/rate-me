import * as React from "react";
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

const Breadcrumbs = ({ items = [] }) => {
  const itemsMap = items.map((item) => {
    const LinkComponent = ({ children }) =>
      item.href ? (
        <Link
          color="inherit"
          sx={{ display: "flex", alignItems: "center" }}
          underline="hover"
          component={RouterLink}
          to={item.href}
        >
          {children}
        </Link>
      ) : (
        <Typography
          color="text.primary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {children}
        </Typography>
      );

    return (
      <LinkComponent key={item.text}>
        <item.Icon sx={{ mr: 0.5 }} fontSize="inherit" />
        {item.text}
      </LinkComponent>
    );
  });

  return (
    <div role="presentation">
      <MuiBreadcrumbs aria-label="breadcrumb">{itemsMap}</MuiBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
