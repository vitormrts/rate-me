import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { api } from "../services";
import { collectionsRef } from "../services/firebase";
import { getFormattedClassroom } from "../utils";

const useClassrooms = (classroomId) => {
  const [classroom, setClassroom] = useState();
  const [allClassrooms, setAllClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const createClassroom = async (data) => {
    const { name, description } = data;
    try {
      const newClassroom = {
        name,
        teacherId: null,
        description,
        students: [],
        exams: [],
      };
      await api.post({ collection: "classrooms", data: newClassroom });
      return {
        success: true,
        message: "Classroom created successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "There was an error create the classroom",
      };
    }
  };

  const updateClassroom = async (data, id) => {
    try {
      await api.put({
        collection: "classrooms",
        data,
        id,
      });

      return {
        success: true,
        message: "Classroom edited successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "There was an error editing the classroom",
      };
    }
  };

  const deleteClassroom = async (id) => {
    try {
      // Delete related exams to this classroom
      const relatedExams = await getRelatedExams(id);
      relatedExams.forEach(async (snapShot) => {
        await api.remove({ collection: "exams", id: snapShot.id });
      });

      // Need implement: remove classroom from students

      // Delete from classrooms
      await api.remove({ collection: "classrooms", id });

      return {
        success: true,
        message: "Classroom successfully deleted",
      };
    } catch (error) {
      return {
        success: false,
        message: "There was an error deleting the classroom",
      };
    }
  };

  useEffect(() => {
    (async () => {
      const classrooms = await api.getAll({ collection: "classrooms" });
      const classroomsMap = classrooms.map((classroom) =>
        getFormattedClassroom({ classroom })
      );
      setAllClassrooms(classroomsMap);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!classroomId) return;
    (async () => {
      const classroom = await api.getById({
        collection: "classrooms",
        id: classroomId,
      });
      setClassroom(classroom);
      setLoading(false);
    })();
  }, []);

  const getRelatedExams = async (id) => {
    const exams = query(collectionsRef.exams, where("classroom", "==", id));
    const querySnapshot = await getDocs(exams);
    return querySnapshot;
  };

  return {
    allClassrooms,
    classroom,
    createClassroom,
    deleteClassroom,
    updateClassroom,
    loading,
  };
};

export default useClassrooms;
