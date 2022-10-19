import * as React from "react";
import {
  AppBar as AppBarMui,
  Box,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { MenuRounded } from "@mui/icons-material";

const AppBar = ({ onToggle }) => {
  return (
    <Box sx={{ width: "100vw", position: "fixed", top: 0 }}>
      <AppBarMui position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onToggle(true)}
          >
            <MenuRounded />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rate Me
          </Typography>
        </Toolbar>
      </AppBarMui>
    </Box>
  );
};

export default AppBar;
