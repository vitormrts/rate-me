import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { collectionsRef, db } from "../services/firebase";
import useExams from "./useExams";

const useClassrooms = (classroomId) => {
  const { deleteExam } = useExams();
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
      const classroomDoc = doc(db, "classrooms", id);
      await updateDoc(classroomDoc, data);
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
      const deleteRelatedExams = async () => {
        const { name } = await getClassroom(id);
        const exams = query(
          collectionsRef.exams,
          where("classroom", "==", name)
        );
        const querySnapshot = await getDocs(exams);
        querySnapshot.forEach(async (doc) => {
          deleteExam(doc.id);
        });
      };
      deleteRelatedExams();
      const classroomDoc = doc(db, "classrooms", id);
      await deleteDoc(classroomDoc);
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

  const getAllClassrooms = async () => {
    const data = await getDocs(collectionsRef.classrooms);
    const classrooms = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return classrooms;
  };

  const getClassroom = async (id) => {
    const classroomDoc = doc(db, "classrooms", id);
    const classroomSnap = await getDoc(classroomDoc);
    return classroomSnap.data();
  };

  useEffect(() => {
    (async () => {
      const classrooms = await getAllClassrooms();
      setAllClassrooms(classrooms);
    })();
  }, []);

  useEffect(() => {
    if (!classroomId) return;
    (async () => {
      const classroom = await getClassroom(classroomId);
      setClassroom(classroom);
    })();
  }, []);

  return {
    allClassrooms,
    classroom,
    createClassroom,
    deleteClassroom,
    getAllClassrooms,
    getClassroom,
    updateClassroom,
  };
};

export default useClassrooms;
