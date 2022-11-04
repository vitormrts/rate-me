import { useEffect, useState } from "react";
import api from "../services/api";
import { getFormattedExam } from "../utils";

const useExams = (examId) => {
  const [exam, setExam] = useState({});
  const [allExams, setAllExams] = useState([]);
  const [loading, setLoading] = useState(true);

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
        classroom: classroomId,
        timeLimit,
        initialDate,
        finalDate,
        questions: formattedQuestions,
      };
      const { id } = await api.post({ collection: "exams", data: newExam });

      const classroom = await api.getById({
        collection: "classrooms",
        id: classroomId,
      });

      await api.put({
        collection: "classrooms",
        id: classroomId,
        data: { exams: [...classroom.exams, id] },
      });

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
      const exam = await api.getById({ collection: "exams", id });

      // Remove from classrooms
      const targetClassroom = await api.getById({
        collection: "classrooms",
        id: exam.classroom,
      });
      await api.put({
        collection: "classrooms",
        id: exam.classroom,
        data: {
          exams: targetClassroom.exams.filter((exam) => exam !== id),
        },
      });

      // Remove from exams
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
      const formattedExams = exams.map((exam) => getFormattedExam({ exam }));
      setAllExams(await Promise.all(formattedExams));
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!examId) return;
    (async () => {
      const exam = await api.getById({ collection: "exams", id: examId });
      setExam(exam);
      setLoading(false);
    })();
  }, []);

  return {
    allExams,
    exam,
    loading,
    createExam,
    deleteExam,
    updateExam,
    shuffleExamQuestions,
  };
};

export default useExams;
