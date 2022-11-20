import api from "../services/api";
import { v4 as uuid } from "uuid";

const useExams = ({ classroom } = {}) => {
  const createExam = async (data) => {
    const { name, timeLimit, initialDate, finalDate, questions } = data;
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
        id: uuid(),
        name,
        timeLimit,
        initialDate,
        finalDate,
        questions: formattedQuestions,
      };

      await api.put({
        collection: "classrooms",
        id: classroom.id,
        data: {
          exams: [...classroom.exams, newExam],
        },
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: "There was an error creating the exam" };
    }
  };

  const deleteExam = async (id) => {
    try {
      await api.put({
        collection: "classrooms",
        id: classroom.id,
        data: {
          exams: classroom.exams.filter((exam) => exam.id !== id),
        },
      });

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
      const targetExam = await api.getById({ collection: "exams", id });
      // Note: implement
      const shuffledQuestions = targetExam.questions.sort(
        () => Math.random() - 0.5
      );
      // await updateExam({ questions: shuffledQuestions }, id);
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

  return {
    createExam,
    deleteExam,
    shuffleExamQuestions,
  };
};

export default useExams;
