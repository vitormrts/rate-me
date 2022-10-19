import { Tooltip, IconButton as IconButtonMui } from "@mui/material";
import { useCallback } from "react";

const IconButton = ({ title, Icon, onClick }) => {
  const handleOnClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return (
    <Tooltip title={title}>
      <IconButtonMui onClick={handleOnClick}>
        <Icon />
      </IconButtonMui>
    </Tooltip>
  );
};

export default IconButton;
