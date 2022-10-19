import { useEffect, useState } from "react";
import { api } from "../services";

const useClassroom = (id) => {
  const [loading, setLoading] = useState(true);
  const [classroom, setClassroom] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    setLoading(true);
    (async () => {
      const response = await api.get({ url: `classrooms/${id}` });
      setClassroom(response.data);
    })();
    setLoading(false);
  }, []);

  return { classroom, loading };
};

export default useClassroom;
