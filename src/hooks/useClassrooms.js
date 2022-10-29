import { addDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { api } from "../services";
import { collectionsRef } from "../services/firebase";

const useClassrooms = (classroomId) => {
  const [classroom, setClassroom] = useState();
  const [allClassrooms, setAllClassrooms] = useState([]);

  const createClassroom = async (data) => {
    const { name, description } = data;
    try {
      const newClassroom = {
        name,
        description,
        teacherId: null,
        students: 0,
        exams: 0,
        openExams: 0,
        closedExams: 0,
      };
      await addDoc(collectionsRef.classrooms, newClassroom);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "There was an error create the classroom",
      };
    }
  };

  const updateClassroom = async (data, id) => {
    try {
      const relatedExams = await getRelatedExams(id);
      relatedExams.forEach(async (snapShot) => {
        await api.put({
          collection: "exams",
          data: { classroom: data.name },
          id: snapShot.id,
        });
      });

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
      const relatedExams = await getRelatedExams(id);
      relatedExams.forEach(async (snapShot) => {
        await api.remove({ collection: "exams", id: snapShot.id });
      });

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
      setAllClassrooms(classrooms);
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
    })();
  }, []);

  const getRelatedExams = async (id) => {
    const classroom = await api.getById({
      collection: "classrooms",
      id,
    });
    const exams = query(
      collectionsRef.exams,
      where("classroom", "==", classroom.name)
    );
    const querySnapshot = await getDocs(exams);
    console.log(querySnapshot);
    return querySnapshot;
  };

  return {
    allClassrooms,
    classroom,
    createClassroom,
    deleteClassroom,
    updateClassroom,
  };
};

export default useClassrooms;
