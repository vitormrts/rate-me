import { createContext, useMemo, useState } from "react";
import { AddClassroomModal, Modal } from "../components/modals";

export const ModalsContext = createContext();

const ModalsContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState("");

  const close = () => {
    setModal("");
    setIsOpen(false);
  };

  const modals = {
    ADD_CLASSROOM: <AddClassroomModal close={close} />,
  };

  const open = (name) => {
    setModal(modals[name]);
    setIsOpen(true);
  };

  const memoized = useMemo(() => ({ modal, open }), [modal, open]);

  return (
    <ModalsContext.Provider value={memoized}>
      <Modal onClose={close} open={isOpen}>
        {modal}
      </Modal>
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsContextProvider;
