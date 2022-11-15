import { useState } from "react";

const useStudents = (classroomId) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  return { students, loading };
};

export default useStudents;
