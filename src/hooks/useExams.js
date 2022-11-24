import api from "../services/api";
import { v4 as uuid } from "uuid";
import useAuth from "./useAuth";

const useExams = ({ classroom } = {}) => {
  const { user } = useAuth();

  const createExam = async (data) => {
    const { name, timeLimit, initialDate, finalDate, questions } = data;
    try {
      const formattedQuestions = questions.map((question, index) => {
        const optionalFields = question.type === "closed" && {
          alternatives: question.alternatives,
          answer: question.answer,
        };
        return {
          id: `${index}`,
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
        performances: [],
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

  const takeExam = async (data, examId) => {
    try {
      const { answers } = data;

      const exam = classroom.exams.find((exam) => exam.id === examId);

      const closedQuestions = exam.questions.filter(
        (question) => question.type === "closed"
      );
      const openQuestions = exam.questions.filter(
        (question) => question.type === "open"
      );

      const { hit, miss } = getCorrectQuestions(answers, closedQuestions);

      const newPerformance = {
        id: uuid(),
        fullName: user.fullName,
        studentId: user.id,
        hit,
        miss,
        waitingCorrection: openQuestions.length,
        answers,
      };

      classroom.exams
        .find((exam) => exam.id === examId)
        ?.performances?.push(newPerformance);

      await api.put({
        collection: "classrooms",
        id: classroom.id,
        data: classroom,
      });

      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
      };
    }
  };

  const correctExam = async ({
    correction,
    performance,
    classroom,
    examId,
  }) => {
    let hit = 0;
    let miss = 0;

    correction.forEach(({ correct }) => {
      correct ? hit++ : miss++;
    });

    const updatedPerformance = {
      ...performance,
      hit,
      miss,
      waitingCorrection: 0,
    };

    const examIndex = classroom.exams.findIndex((exam) => exam.id === examId);
    const performanceIndex = classroom.exams[examIndex]?.performances.findIndex(
      (target) => target.id === performance.id
    );
    classroom.exams[examIndex].performances[performanceIndex] =
      updatedPerformance;

    await api.put({
      collection: "classrooms",
      id: classroom.id,
      data: classroom,
    });
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

  const getCorrectQuestions = (studentAnswers, examClosedQuestions) => {
    let hit = 0;
    let miss = 0;

    examClosedQuestions.forEach((question) => {
      const targetStudentQuestion = studentAnswers.find(
        (answer) => answer.questionId === question.id
      );
      if (targetStudentQuestion.answer === question.answer) {
        hit += 1;
      } else {
        miss += 1;
      }
    });

    return {
      hit,
      miss,
    };
  };

  return {
    createExam,
    correctExam,
    deleteExam,
    takeExam,
    shuffleExamQuestions,
  };
};

export default useExams;
