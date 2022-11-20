import { AppBar as AppBarMui, Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { IconButton } from "../../buttons";
import { LogoutRounded } from "@mui/icons-material";
import { useCallback } from "react";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onLogoutClick = useCallback(() => {
    logout();
    toast.success("Successfully logout");
    navigate("/");
  }, [logout]);

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rate Me
          </Typography>
          <IconButton
            Icon={LogoutRounded}
            title="Logout"
            onClick={onLogoutClick}
          />
        </Container>
      </AppBarMui>
    </Box>
  );
};

export default AppBar;
