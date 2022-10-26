import { Tooltip, IconButton as IconButtonMui } from "@mui/material";
import { useCallback } from "react";

const IconButton = ({ title, Icon, onClick, ...props }) => {
  const handleOnClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return (
    <Tooltip title={title} {...props}>
      <IconButtonMui onClick={handleOnClick}>
        <Icon />
      </IconButtonMui>
    </Tooltip>
  );
};

export default IconButton;
