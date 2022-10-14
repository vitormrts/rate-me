import { createContext, useMemo, useState } from "react";
import { AddClassroomModal, Modal } from "../components/modals";
import content from "../content";
import { useClassrooms, useToast } from "../hooks";

export const ModalsContext = createContext();

const ModalsContextProvider = ({ children }) => {
  const { dispatchToast } = useToast();
  const { addClassroom } = useClassrooms();
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState("");

  const close = () => {
    setModal("");
    setIsOpen(false);
  };

  const onAddClassroomSuccess = () => {
    close();
    dispatchToast("Classroom created", "SUCCESS");
  };

  const modals = {
    ADD_CLASSROOM: (
      <AddClassroomModal
        errorMessages={content.errors}
        onSubmit={addClassroom}
        onSuccess={onAddClassroomSuccess}
      />
    ),
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
