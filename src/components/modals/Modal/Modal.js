import { useCallback } from "react";
import * as S from "./Modal.style";

const Modal = ({ children, open, onClose }) => {
  const handleOnClose = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  return (
    <S.Overlay open={open}>
      <S.Content>
        <S.CloseModal onClick={handleOnClose} />
        {children}
      </S.Content>
    </S.Overlay>
  );
};

export default Modal;
