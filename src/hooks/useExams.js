import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { collectionsRef, db } from "../services/firebase";

const useExams = (examId) => {
  const [exam, setExam] = useState({});
  const [allExams, setAllExams] = useState([]);

  const createExam = async (data) => {
    const { name, classroom, timeLimit, initialDate, finalDate, questions } =
      data;
    try {
      const formattedQuestions = questions.map((question) => {
        const optionalFields = question.type === "closed" && {
          alternatives: question.alternatives,
          answer: question.answer,
        };
        return {
          statement: question.statement,
          type: question.type,
          ...optionalFields,
        };
      });
      const newExam = {
        name,
        classroom,
        timeLimit,
        initialDate,
        finalDate,
        questions: formattedQuestions,
        studentsFinished: 0,
        studentsNotFinished: 0,
      };
      await addDoc(collectionsRef.exams, newExam);
      return { success: true };
    } catch (error) {
      return { success: false, error: "There was an error creating the exam" };
    }
  };

  const updateExam = async (data, id) => {
    try {
      const examDoc = doc(db, "exams", id);
      await updateDoc(examDoc, data);
      return {
        success: true,
        message: "Exam edited successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "There was an error editing the exam",
      };
    }
  };

  const deleteExam = async (id) => {
    try {
      const examDoc = doc(db, "exams", id);
      await deleteDoc(examDoc);
      return {
        success: true,
        message: "Exam successfully deleted",
      };
    } catch (error) {
      return {
        success: false,
        message: "There was an error deleting the exam",
      };
    }
  };

  const shuffleExamQuestions = async (id) => {
    try {
      const targetExam = await getExam(id);
      const shuffledQuestions = targetExam.questions.sort(
        () => Math.random() - 0.5
      );
      await updateExam({ questions: shuffledQuestions }, id);
      return {
        success: true,
        message: "Successfully shuffled exam questions",
      };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred while shuffling the questions",
      };
    }
  };

  const getExam = async (id) => {
    const examDoc = doc(db, "exams", id);
    const examSnap = await getDoc(examDoc);
    return examSnap.data();
  };

  const getAllExams = async () => {
    const data = await getDocs(collectionsRef.exams);
    const exams = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return exams;
  };

  useEffect(() => {
    (async () => {
      const exams = await getAllExams();
      setAllExams(exams);
    })();
  }, []);

  useEffect(() => {
    if (!examId) return;
    (async () => {
      const exam = await getExam(examId);
      setExam(exam);
    })();
  }, []);

  return {
    allExams,
    exam,
    getAllExams,
    getExam,
    createExam,
    deleteExam,
    updateExam,
    shuffleExamQuestions,
  };
};

export default useExams;
