import { addDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import api from "../services/api";
import { collectionsRef } from "../services/firebase";

const useExams = (examId) => {
  const [exam, setExam] = useState({});
  const [allExams, setAllExams] = useState([]);

  const createExam = async (data) => {
    const {
      name,
      classroom: classroomId,
      timeLimit,
      initialDate,
      finalDate,
      questions,
    } = data;
    try {
      const classroom = await api.getById({
        collection: "classrooms",
        id: classroomId,
      });
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
        classroom: classroom.name,
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
      await api.put({
        collection: "exams",
        id,
        data,
      });
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
      await api.remove({ collection: "exams", id });
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

  const deleteRelatedExams = async (name) => {
    const exams = query(collectionsRef.exams, where("classroom", "==", name));
    const querySnapshot = await getDocs(exams);
    querySnapshot.forEach(async (doc) => {
      deleteExam(doc.id);
    });
  };

  const shuffleExamQuestions = async (id) => {
    try {
      const targetExam = await api.getById({ collection: "exams", id });
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

  useEffect(() => {
    (async () => {
      const exams = await api.getAll({ collection: "exams" });
      setAllExams(exams);
    })();
  }, []);

  useEffect(() => {
    if (!examId) return;
    (async () => {
      const exam = await api.getById({ collection: "exams", id: examId });
      setExam(exam);
    })();
  }, []);

  return {
    allExams,
    exam,
    createExam,
    deleteExam,
    updateExam,
    shuffleExamQuestions,
    deleteRelatedExams,
  };
};

export default useExams;
