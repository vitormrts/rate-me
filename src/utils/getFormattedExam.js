/* eslint-disable prettier/prettier */
import moment from "moment";
import { StatusTag } from "../components/tags";

const getFormattedExam = ({ exam }) => {
  const todayDate = new Date();
  const initialDate = exam.initialDate.toDate();
  const finalDate = exam.finalDate.toDate();

  const start = moment(todayDate).isBefore(initialDate) && {
    text: "Will Start",
    color: "blue",
  };
  const finished = moment(todayDate).isAfter(finalDate) && {
    text: "Finished",
    color: "red",
  };
  const status = start ||
    finished || {
    text: "In progress",
    color: "green",
  };

  const StatusComponent = <StatusTag text={status.text} color={status.color} />;

  return {
    ...exam,
    initialDate: moment(initialDate).format("MMMM Do YYYY, h:mm"),
    finalDate: moment(finalDate).format("MMMM Do YYYY, h:mm"),
    questions: exam.questions.length,
    status: StatusComponent,
  };
};

export default getFormattedExam;
