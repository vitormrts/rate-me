import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { generateUniqueId } from "../devUtils";
import { useAuth } from "../hooks";

export const ClassroomsContext = createContext();

const ClassroomsContextProvider = ({ children }) => {
  const { user } = useAuth();
  const [myClassrooms, setMyClassrooms] = useState([]);

  const addClassroom = ({ name, description }) => {
    try {
      const newClassroom = {
        id: generateUniqueId(),
        name,
        description,
      };
      setMyClassrooms([...myClassrooms, newClassroom]);
      toast.success("Classroom created successfully");
      return { success: true };
    } catch (error) {
      toast.error("There was an error creating the room");
      return { success: false };
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    setMyClassrooms(user.classrooms);
  }, [user]);

  const memoized = useMemo(
    () => ({
      addClassroom,
      myClassrooms,
    }),
    [addClassroom, myClassrooms]
  );

  return (
    <ClassroomsContext.Provider value={memoized}>
      {children}
    </ClassroomsContext.Provider>
  );
};

export default ClassroomsContextProvider;
