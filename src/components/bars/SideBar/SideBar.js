import {
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListItem,
  List,
  SwipeableDrawer,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SideBar = ({ items = [], onToggle, isOpen }) => {
  const navigate = useNavigate();

  const itemsMap = items.map((item) => (
    <ListItem key={item.id} disablePadding onClick={() => navigate(item.href)}>
      <ListItemButton>
        <ListItemIcon>
          <item.Icon />
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItemButton>
    </ListItem>
  ));

  return (
    <div>
      <SwipeableDrawer
        open={isOpen}
        onClose={onToggle(false)}
        onOpen={onToggle(true)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={onToggle(false)}
          onKeyDown={onToggle(false)}
        >
          <List>{itemsMap}</List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default SideBar;
