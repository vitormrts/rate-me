import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import React, { useCallback, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ConfirmModal = ({
  onConfirm,
  text = "Are you sure to do this?",
  description = "If you're sure, take action.",
  children,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleOnConfirm = useCallback(() => {
    onConfirm && onConfirm();
    handleClose();
  }, [onConfirm]);

  return (
    <>
      {React.cloneElement(children, { onClick: handleOpen })}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              {text}
            </Typography>
            <Typography sx={{ mt: 2 }}>{description}</Typography>
            <Box mt={2} display="flex" gap={1}>
              <Button variant="contained" fullWidth onClick={handleOnConfirm}>
                Confirmar
              </Button>
              <Button variant="outlined" fullWidth onClick={handleClose}>
                Cancelar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ConfirmModal;
