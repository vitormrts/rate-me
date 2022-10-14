import { useContext } from "react";
import { ModalsContext } from "../contexts/ModalsContext";

const useModal = () => useContext(ModalsContext);

export default useModal;
