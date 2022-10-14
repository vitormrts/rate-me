import { useContext } from "react";
import { ClassroomsContext } from "../contexts/ClassroomsContext";

const useClassrooms = () => useContext(ClassroomsContext);

export default useClassrooms;
