/* eslint-disable prettier/prettier */
import moment from "moment";
import { StatusTag } from "../components/tags";

const getFormattedExam = (exam, user) => {
  const todayDate = new Date();
  const initialDate = exam.initialDate.toDate();
  const finalDate = exam.finalDate.toDate();

  const start = moment(todayDate).isBefore(initialDate) && {
    text: "Will Start",
    color: "blue",
  };
  const finished = moment(todayDate).isAfter(finalDate) && {
    text: "Closed",
    color: "red",
  };
  const status = start ||
    finished || {
    text: "Open",
    color: "green",
  };

  const finishedExam = exam.performances.find((performance) => performance.studentId === user.uid);
  const myStatus = finishedExam ? { text: "Finished", color: "green" } : { text: "Not finished", color: "blue" };

  const StatusComponent = <StatusTag text={status.text} color={status.color} />;

  const MyStatusComponent = <StatusTag text={myStatus.text} color={myStatus.color} />;



  return {
    ...exam,
    initialDate: moment(initialDate).format("MMMM Do YYYY, h:mm"),
    finalDate: moment(finalDate).format("MMMM Do YYYY, h:mm"),
    questions: exam.questions.length,
    status,
    StatusComponent: StatusComponent,
    MyStatusComponent: MyStatusComponent,
    myStatus,
  };
};

export default getFormattedExam;
