import { createContext, useEffect, useMemo, useState } from "react";
import { fake, generateUniqueId } from "../devUtils";
import { useAuth } from "../hooks";

export const ClassroomsContext = createContext();

const ClassroomsContextProvider = ({ children }) => {
  const { user } = useAuth();
  const [classrooms, setClassrooms] = useState([]);

  const addClassroom = ({ name, description }) => {
    try {
      const newClassroom = {
        id: generateUniqueId(),
        name,
        description,
      };
      fake.classrooms.push(newClassroom);
      user.classrooms.push(newClassroom);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    setClassrooms(user.classrooms);
  }, [user]);

  const memoized = useMemo(
    () => ({
      addClassroom,
      classrooms,
    }),
    [addClassroom, classrooms]
  );

  return (
    <ClassroomsContext.Provider value={memoized}>
      {children}
    </ClassroomsContext.Provider>
  );
};

export default ClassroomsContextProvider;
