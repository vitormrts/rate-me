import { createContext, useEffect, useMemo, useState } from "react";
import { generateUniqueId } from "../devUtils";
import { api } from "../services";

export const ClassroomsContext = createContext();

const ClassroomsContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [classrooms, setClassrooms] = useState([]);

  const addClassroom = async ({ name, description }) => {
    setLoading(true);
    const addClassroomFetch = async () => {
      try {
        const newClassroom = {
          id: generateUniqueId(),
          name,
          description,
        };
        await api.post({ url: "classrooms", data: newClassroom });
        return { success: true };
      } catch (error) {
        return { success: false };
      }
    };
    const status = await addClassroomFetch();
    setLoading(false);
    return status;
  };

  useEffect(() => {
    (async () => {
      const response = await api.get({ url: "classrooms" });
      setClassrooms(response.data);
    })();
  }, [loading]);

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
