import * as React from "react";
import {
  AppBar as AppBarMui,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { MenuRounded } from "@mui/icons-material";
import { Container } from "@mui/system";

const AppBar = ({ onToggle }) => {
  return (
    <Box sx={{ width: "100vw", position: "fixed", top: 0 }}>
      <AppBarMui position="static">
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: 64,
          }}
        >
          {onToggle && (
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
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rate Me
          </Typography>
        </Container>
      </AppBarMui>
    </Box>
  );
};

export default AppBar;
